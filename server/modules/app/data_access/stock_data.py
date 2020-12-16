import os
from app import app
import logger
from app.utils.utils import get_start_date, get_end_date
from yahoo_fin import stock_info
from pytickersymbols import PyTickerSymbols

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, 'output.log'))

def get_ticker_details(request_data):
    ticker_details = stock_info.get_data(request_data, start_date = get_start_date(365), end_date = get_end_date(0), index_as_date = False, interval = '1d')
    return ticker_details

def get_tickers(request_data):
    tickers_data = PyTickerSymbols()
    tickers_data.get_stocks_by_index('all')
    return tickers_data