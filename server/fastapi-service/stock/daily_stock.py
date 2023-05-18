import FinanceDataReader as fdr
import pymysql
import math
from datetime import timedelta ,datetime
import time
class Stock:
    def __init__(self,host,port,db,user,password):
        self.host = host
        self.port = port
        self.db = db
        self.user = user
        self.password = password
        self.stockList = []
        self.insertList = []
        self.updateList = []
        #  첫시작, 100개 종목 select
        con = pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, charset='utf8')
        cur = con.cursor()
        cur.execute("SELECT * FROM stock")
        stocks = cur.fetchall()
        self.stockList = stocks


    def stock_daily_create(self):
        # 9시에 stockList 초기화
        self.insertList = self.stockList
        self.updateList = []

        
    def daily_stock_update(self):
        self.insertList,newUpdateList = self.stock_insert(self.insertList)
        self.updateList.extend(newUpdateList)

    def stock_insert(self,insertList):
        con = pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, charset='utf8')
        cur = con.cursor()
        newInsertList = []
        newUpdateList = []

        # 주식 insert 해야하는 종목들에 대하여
        for stock in insertList:
            time.sleep(0.05)
            cur = con.cursor()
            cur.execute("SELECT * FROM daily_stock where stock_id = '%s'  order by stock_date desc",stock[0])
            recent_row = cur.fetchone()
            start_date = recent_row[6]+timedelta(days=1)
            end_date = datetime.today().date()

            df = fdr.DataReader(stock[2], start_date, end_date)

            for row in df.iterrows():
                if  math.isnan(row[1]['Change']) : 
                    newInsertList.append(stock) # 실패한 종목들
                    continue
                sql = "INSERT INTO daily_stock(change_rate,close_price,high_price,low_price,open_price,stock_date,volume,stock_id) VALUES(%s, %s, %s,%s,%s, %s, %s,%s)"
                cur.execute(sql, (row[1]['Change'], row[1]['Close'],row[1]['High'], row[1]['Low'], row[1]['Open'], row[0],row[1]['Volume'], stock[0]))
                con.commit()
                newUpdateList.append(stock)
        con.close()
        return newInsertList,newUpdateList

    # 주식 종목 업데이트
    def stock_update(self):
        con = pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, charset='utf8')

        today = datetime.today().date()
        cur = con.cursor()

        for stock in self.updateList:
            cur = con.cursor()
            df = fdr.DataReader(stock[2], today)
            for row in df.iterrows():
                if  math.isnan(row[1]['Change']) : 
                    continue
            change_rate = row[1]['Change']
            close_price =  row[1]['Close']
            high_price = row[1]['High']
            low_price = row[1]['Low']
            open_price = row[1]['Open']
            volume = row[1]['Volume']
            sql =  f"UPDATE daily_stock set change_rate = {change_rate} \
                ,close_price={close_price},high_price={high_price} \
                ,low_price={low_price},open_price={open_price}\
                ,volume={volume} \
                where stock_id ={stock[0]} and stock_date = '{today}'"
            cur.execute(sql)
            con.commit()