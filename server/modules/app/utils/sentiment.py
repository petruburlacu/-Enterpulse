import os
import torch
import torch.nn.functional as Functional
from pytorch_pretrained_bert import BertTokenizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from app.models.bert import BertClassification
from app.utils import utils
import string

labels = {0:'neutral', 1:'positive',2:'negative'}
num_labels= len(labels)
vocab = "finance-uncased"

base_path = 'C:/Development/Git/Enterpulse'

vocab_path = base_path + '/server/modules/app/analyst_tone/vocab'
pretrained_weights_path = base_path + "/server/modules/app/analyst_tone/pretrained_weights" # this is pre-trained FinBERT weights
fine_tuned_weight_path = base_path + "/server/modules/app/analyst_tone/fine_tuned.pth"    # this is fine-tuned FinBERT weights
max_seq_length=256
device='cpu'

model = BertClassification(weight_path= pretrained_weights_path, num_labels=num_labels, vocab=vocab)
checkpoint = torch.load(fine_tuned_weight_path, map_location=device)
model.load_state_dict(checkpoint, strict=False)
model.to(device)

tokenizer = BertTokenizer(vocab_file = vocab_path, do_lower_case = True, do_basic_tokenize = True)

# https://pythonspot.com/nltk-stemming/
# from nltk.stem import PorterStemmer
# porter_stemmer = PorterStemmer()

# Analize data
def get_vader_sentiment_score(tweet):
        sanitized_tweet = utils.sanitize(tweet.lower())
        return SentimentIntensityAnalyzer().polarity_scores(sanitized_tweet)['compound']

def get_sentiment(text):
    # Vader Sentiment
    vader_score = get_vader_sentiment_score(text)

    # Tokenize
    tokenized_sent = tokenizer.tokenize(text)

    # remove punctuation from each word
    table = str.maketrans('', '', string.punctuation)
    stripped = [w.translate(table) for w in tokenized_sent]
    
    # remove remaining tokens that are not alphabetic
    tokens = [w for w in stripped if w.isalpha()]
    if len(tokenized_sent) > max_seq_length:
        tokenized_sent = tokenized_sent[:max_seq_length]

    
    ids_review  = tokenizer.convert_tokens_to_ids(tokenized_sent)
    mask_input = [1]*len(ids_review)        
    padding = [0] * (max_seq_length - len(ids_review))
    ids_review += padding
    mask_input += padding
    input_type = [0]*max_seq_length
    
    input_ids = torch.tensor(ids_review).to(device).reshape(-1, max_seq_length)
    attention_mask =  torch.tensor(mask_input).to(device).reshape(-1, max_seq_length)
    token_type_ids = torch.tensor(input_type).to(device).reshape(-1, max_seq_length)
    
    with torch.set_grad_enabled(False):
        outputs = model(input_ids, token_type_ids, attention_mask)
        outputs = Functional.softmax(outputs,dim=1)

    bert_sentiment_label = labels[torch.argmax(outputs).item()]
    return [bert_sentiment_label, vader_score]
    # return ['neutral', vader_score]

# In the context of sentiment analysis in this project, removing stop words can be problematic 
# if context is affected. For example suppose your stop word corpus includes ‘not’, 
# which is a negation that can alter the valence of the passage. Additionally, stemming words are inconsistent and can affect the overall result accuracy.
# So you have to be cautious of exactly what is being dropped and what consequences it can have.
# https://www.quora.com/Is-there-a-stop-word-list-specifically-designed-for-sentiment-analysis?share=1
# http://www.lrec-conf.org/proceedings/lrec2014/pdf/292_Paper.pdf   <- On Stopwords, Filtering and Data Sparsity for Sentiment Analysis of Twitter
# In the future could build my own financial sentiment analysis stopwords dictionary to reduce noise and avoid elimenating negating or high importance words.

# pip install numpy
# pip install ntlk
# pip install torch==1.7.0+cpu torchvision==0.8.1+cpu torchaudio===0.7.0 -f https://download.pytorch.org/whl/torch_stable.html