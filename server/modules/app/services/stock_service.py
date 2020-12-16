from app.data_access import stock_data  

# Service Layer
def get_stock_ticker_details(request_data):
    ticker_details = stock_data.get_ticker_details(request_data)
    # Convert pandas dataframe to json
    # https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_json.html
    ticker_details['date'] = ticker_details['date'].dt.strftime('%Y-%m-%d')
    return ticker_details

# Service Layer
def get_tickers(request_data):
    return stock_data.get_tickers(request_data)