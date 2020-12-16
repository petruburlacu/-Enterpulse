from app import app
import json
from app.utils.utils import obj_dict
from app.data_access import headlines_data  
from app.models.text_sentiment import TextSentiment
from app.utils.sentiment import get_sentiment

from random import *

def get_ticker_headlines_sentiment(request_data):
    ticker_headlines_sentiment = []

    twitter_data = headlines_data.get_twitter_data(request_data)
    for tweet in twitter_data:
        result_sentiment = get_sentiment(tweet.tweet)
        # bert_score = (get_bert_score(result_sentiment[0]) + result_sentiment[1]) / 2
        bert_score = get_bert_score(result_sentiment[0])
        twitSentiment = TextSentiment(tweet.tweet, result_sentiment[0], result_sentiment[1], bert_score, tweet.datestamp)
        ticker_headlines_sentiment.append(twitSentiment)

    news_data = headlines_data.get_news_data(request_data)    
    for news in news_data:
        result_sentiment = get_sentiment(news[3])
        # bert_score = (get_bert_score(result_sentiment[0]) + result_sentiment[1]) / 2
        bert_score = get_bert_score(result_sentiment[0])
        newsSentiment = TextSentiment(news[3], result_sentiment[0], result_sentiment[1], bert_score, news[1])
        ticker_headlines_sentiment.append(newsSentiment)

    return ticker_headlines_sentiment

def get_bert_score(bert_sentiment):
    bert_score = 0
    if bert_sentiment == 'positive':
        bert_score = 1
    if bert_sentiment == 'negative':
        bert_score = -1
    if bert_sentiment == 'neutral':
        bert_score = 0

    # bert_score = randint(-1, 1)
    return bert_score