import os
import time
import json
from flask import request, jsonify, make_response
from app import app
from app.schemas.request import validate_request
from app.services import headlines_service, stock_service
from app.utils.utils import obj_dict, DateTimeEncoder

import logger
from pytickersymbols import PyTickerSymbols
from yahoo_fin import stock_info

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@app.route('/api/ticker/details', methods=['GET'])
def get_ticker_details():
    ''' Retrieving Ticker Details '''
    request_data = validate_request(request.args.get('search'))
    LOG.info('Inside get_ticker_details()')
    start_time = time.time()

    if request_data['status']:
        request_data = request_data['data']
        ticker_stock_details = stock_service.get_stock_ticker_details(request_data)
        LOG.info("Retrieved ticker details in " + str(time.time() - start_time) + " s")
        return make_response(ticker_stock_details.to_json(orient='records', date_format='iso'), 200)
    else:
        LOG.info(" Failed to retrieve sentiment data " + str(time.time() - start_time) + "s")
        return make_response(jsonify({'ERROR': 'Parameter validation error'}), 404)

@app.route('/api/ticker/headlines', methods=['GET'])
def get_ticker_headlines():
    ''' Retrieving Ticker Headlines '''
    return ''

@app.route('/api/ticker/headlines/sentiment', methods=['GET'])
def get_ticker_headlines_sentiment():
    ''' Retrieving Ticker Headlines Sentiment '''
    request_data = validate_request(request.args.get('search'))
    LOG.info('Inside get_ticker_headlines_sentiment()')
    start_time = time.time()

    if request_data['status']:
        request_data = request_data['data']

        # method to generate sentiment headlines report
        ticker_headlines_sentiment = headlines_service.get_ticker_headlines_sentiment(request_data)

        LOG.info("Generated enterpulse headlines sentiment report in " + str(time.time() - start_time) + " s")
        return make_response(json.dumps(ticker_headlines_sentiment, default=obj_dict), 200)
    else:
        LOG.info(" Failed to retrieve sentiment data " + str(time.time() - start_time) + "s")
        return make_response(jsonify({'ERROR': 'Parameter validation error'}), 404)

@app.route('/api/tickers', methods=['GET'])
def get_tickers():
    ''' Retrieving All Tickers '''
    # Can be ALL, NASDQ, ETC..
    start_time = time.time()
    tickers = stock_service.get_tickers('ALL')
    LOG.info('Retrieved all ticker symbols in: ' + str(time.time() - start_time) + " s")
    return json.dumps(tickers, default=obj_dict), 200

@app.route('/api/ticker/days', methods=['GET'])
def test():
    ''' Retrieving DAYS '''
    today = datetime.datetime.today()
    days = []
    days.append(today.date())
    days.append((today - BDay(2)).date())
    return json.dumps(days, indent=4, sort_keys=True, default=str), 200

