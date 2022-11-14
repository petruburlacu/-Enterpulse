import re
import json
import datetime
import calendar
from pandas.tseries.offsets import BDay

# Process the retrieved text of noise
def sanitize(text):
    # text = re.sub("[0-9]+", "number", text)
    text = re.sub("#", "", text)
    text = re.sub("\n", "", text)
    text = re.sub("$[^\s]+", "", text)
    text = re.sub("@[^\s]+", "", text)
    text = re.sub("(http|https)://[^\s]*", "", text)
    text = re.sub("[^\s]+@[^\s]+", "", text)
    text = re.sub('[^a-z A-Z]+', '', text)
    text = text.strip()
    return text

#Get start date
def get_start_date(number):
    return '{:%Y-%m-%d}'.format((datetime.datetime.today() - BDay(number)).date())

def get_end_date(number):
    if number == 0:
        current_date = '{:%Y-%m-%d}'.format(datetime.datetime.today().date())
        print('Getting todays date: ' + current_date)
        return current_date
    else:
        return '{:%Y-%m-%d}'.format((datetime.datetime.today() - BDay(number)).date())

def convert_date(old_date):
    dtformat = "%Y-%m-%d"
    return datetime.datetime.strptime(old_date,'%b-%d-%y').strftime(dtformat)

# Return object for json format
def obj_dict(obj):
    return obj.__dict__

# JSON datetime serialization
class DateTimeEncoder(json.JSONEncoder):
    def default(self, z):
        if isinstance(z, datetime.datetime):
            return (str(z))
        else:
            return super().default(z)