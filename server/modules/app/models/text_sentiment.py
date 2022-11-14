class TextSentiment(object):
    text = ""
    bert_sentiment = ""
    date = ""
    vader_score = 0
    bert_score = 0

    # The class "constructor" - Initializer
    def __init__(self, text, bert_sentiment, vader_score, bert_score, date):
        self.text = text
        self.bert_sentiment = bert_sentiment
        self.vader_score = vader_score
        self.bert_score = bert_score
        self.date = date

def set_text_sentiment(text, bert_sentiment, vader_score, bert_score, date):
    text_sentiment = TextSentiment(text, bert_sentiment, vader_score, bert_score, date)
    return text_sentiment