from fastapi import FastAPI
from pydantic import BaseSettings
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from stock import daily_stock
import pymysql
from pprint import pprint
import os
import time
from tqdm import tqdm
import numpy as np
import pandas as pd



class DBSettings(BaseSettings):
    host: str
    port: str
    db: str
    user: str
    password : str

    class Config:
        env_file = '.env'


settings = DBSettings()
app = FastAPI()
scheduler = BackgroundScheduler()
scheduler.start()

@app.on_event('startup')
def start_scheduler():
    print("현재시각" ,datetime.today().date())
    print("시각 ",datetime.now())
    host = settings.host
    db = settings.db
    user = settings.user
    password = settings.password
    port = settings.port
    print(host,db,user,password,port)

    stockCrawler = daily_stock.Stock(host,port,db,user,password)
    @scheduler.scheduled_job(trigger=CronTrigger(hour ='9'))
    def stock_daily_create():
        print("주식 데이터 생성")
        stockCrawler.stock_daily_create()
        print(stockCrawler.updateList)
        print(stockCrawler.insertList)

        

    @scheduler.scheduled_job(trigger=CronTrigger(hour ='9-18',minute='*/5'))
    def stock_daily_update():
        start = time.time()
        stockCrawler.daily_stock_update()
        end = time.time()
        print("걸린시간 : " ,end-start)
        print(stockCrawler.updateList)
        print(stockCrawler.insertList)
