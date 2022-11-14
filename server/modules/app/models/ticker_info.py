class TickerInfo(object):
    name = ""
    symbol = ""
    country = ""
    indices = []
    industries = []
    symbols = []
    metadata


    # The class "constructor" - Initializer
    def __init__(self, name, symbol, country, indices, industries, symbols, metadata):
        self.name = name
        self.symbol = symbol
        self.country = country
        self.indices = indices
        self.industries = industries
        self.symbols = symbols
        self.metadata = metadata

def set_ticker_info(name, symbol, country, indices, industries, symbols, metadata):
    ticker_info = TickerInfo(text, sentiment, score, datestamp)
    return ticker_info