import os
from app import app
import logger
import twint
from bs4 import BeautifulSoup
from urllib.request import urlopen, Request
from app.utils.utils import get_start_date, get_end_date, convert_date

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, 'output.log'))

def get_twitter_data(request_data):
    tweets = []

    # Twitter Search Configuration
    config = twint.Config()
    
    config.Search = request_data
    config.Since = get_start_date(1)
    config.Until = get_end_date(0)

    config.Lang = "en"
    config.Store_object = True
    config.Store_object_tweets_list = tweets
    config.Min_likes = 5
    config.Min_retweets = 5
    config.Min_replies = 5
    config.Links = "exclude"
    config.Count = True
    config.Popular_tweets = True

    config.Filter_retweets = False
    config.Members_list = None

    # config.Limit = 1000
    config.Hide_output = True

    #running search
    twint.run.Search(config)
    return tweets

# Parameters 
n = 10 #the # of article headlines displayed per ticker
finviz_url = 'https://finviz.com/quote.ashx?t='

# https://towardsdatascience.com/sentiment-analysis-of-stocks-from-financial-news-using-python-82ebdcefb638
# https://towardsdatascience.com/stock-news-sentiment-analysis-with-python-193d4b4378d4
def get_news_data(ticker):
    ticker = ticker
    url = finviz_url + ticker
    req = Request(url=url,headers={'user-agent': 'enterpulse/0.0.1'}) 
    resp = urlopen(req)    
    html = BeautifulSoup(resp, features="lxml")
    news_table = html.find(id='news-table')
    
    try: 
        df = news_table
        df_tr = df.findAll('tr')
        
        for i, table_row in enumerate(df_tr):
            a_text = table_row.a.text
            td_text = table_row.td.text
            td_text = td_text.strip()
            print(a_text,'(',td_text,')')
            if i == n-1:
                break
    except KeyError:
        pass

    news_data = []

    for x in news_table.findAll('tr'):
        text = x.a.get_text()
        date_scrape = x.td.text.split()

        if len(date_scrape) == 1:
            time = date_scrape[0]
        else:
            date = date_scrape[0]
            time = date_scrape[1]

        processed_date = convert_date(date)
        news_data.append([ticker, processed_date, time, text])
    return news_data