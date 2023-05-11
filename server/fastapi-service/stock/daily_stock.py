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



    def daily_stock_insert(self):
        con = pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, charset='utf8')
        cur = con.cursor()

        cur.execute("SELECT * FROM stock")

        stocks = cur.fetchall()
        for stock in stocks:
            time.sleep(0.05)
            
            print(stock[0], stock[2]) #pk code
            cur = con.cursor()
            cur.execute("SELECT * FROM daily_stock where stock_id = '%s'  order by stock_date desc",stock[0])
            recent_row = cur.fetchone()
            start_date = recent_row[6]+timedelta(days=1)
            end_date = datetime.today().date()

            df = fdr.DataReader(stock[2], start_date, end_date)

            for row in df.iterrows():
                if  math.isnan(row[1]['Change']) : 
                    continue
                sql = "INSERT INTO daily_stock(change_rate,close_price,high_price,low_price,open_price,stock_date,volume,stock_id) VALUES(%s, %s, %s,%s,%s, %s, %s,%s)"
                cur.execute(sql, (row[1]['Change'], row[1]['Close'],row[1]['High'], row[1]['Low'], row[1]['Open'], row[0],row[1]['Volume'], stock[0]))
                con.commit()

        con.close()
        
    def daily_stock_update(self):
        con = pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, charset='utf8')

        today = datetime.today().date()
        cur = con.cursor()

        cur.execute("SELECT * FROM stock")
        stocks = cur.fetchall()
        for stock in stocks:
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
    
