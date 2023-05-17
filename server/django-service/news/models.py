from django.db import models

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Industry(models.Model):
    industry_id = models.BigAutoField(primary_key=True)
    category = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    name = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'industry'
class Keyword(models.Model):
    keyword_id = models.BigAutoField(primary_key=True)
    description = models.TextField(blank=True, null=True)
    name = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'keyword_v2'
class News(models.Model):
    news_id = models.BigAutoField(primary_key=True)
    category = models.CharField(max_length=45, blank=True, null=True)
    hdfs_id = models.CharField(max_length=100, blank=True, null=True)
    news_url = models.CharField(max_length=2083, blank=True, null=True)
    press = models.CharField(max_length=100, blank=True, null=True)
    pressed_at = models.DateField(blank=True, null=True)
    title = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'news'


class NewsRelation(models.Model):
    news_keyword_id = models.BigAutoField(primary_key=True)
    industry = models.ForeignKey(Industry, models.DO_NOTHING, blank=True, null=True)
    keyword = models.ForeignKey(Keyword, models.DO_NOTHING, blank=True, null=True)
    news = models.ForeignKey(News, models.DO_NOTHING)
    stock = models.ForeignKey('Stock', models.DO_NOTHING, blank=True, null=True)
    news_type = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'news_relation_v2'

class Stock(models.Model):
    stock_id = models.BigAutoField(primary_key=True)
    basic_info = models.CharField(max_length=200, blank=True, null=True)
    code = models.CharField(max_length=45)
    company_sales = models.CharField(max_length=100, blank=True, null=True)
    company_size = models.CharField(max_length=45, blank=True, null=True)
    credit_rank = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    market_cap = models.BigIntegerField(blank=True, null=True)
    name = models.CharField(max_length=45)
    stock_count = models.BigIntegerField()
    industry = models.ForeignKey(Industry, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'stock'
