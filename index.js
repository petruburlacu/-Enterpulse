// Get dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const path = require('path');
const app = express();
const twit = require('twit');
const dotenv = require('dotenv');
const colors = require('colors/safe');
// https://www.npmjs.com/package/sentiment
const sentiment = require('sentiment');

// Configuring dotenv
dotenv.config();
const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET
} = process.env;

const config_twitter = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuration fix for mongoose
mongoose.Promise = global.Promise;

// Database connectivity
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could not connect to database: ', err);
  } else {
    console.log(config.secret);
    console.log('Connecting to database: ' + config.db);
  }
});

// Static path to dist
app.use(express.static(__dirname + '/client/dist'));

// Catch routes and return to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
  console.log('Listening on port: 8080');
});

let api = new twit(config_twitter);

/** Filter through retrieved data to handle links and retweets */
function get_text(tweet) {
  let txt = tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text;
  return txt.split(/ |\n/).filter(v => !v.startsWith('http')).join(' ');
}

/** Retrieve tweets based on search keyword and tweets count
 * TODO: Research Twitter API to see how to filter based on time
 */
async function get_tweets(q, count) {
  let tweets;
  try {
    tweets = await api.get('search/tweets', {q, count, tweet_mode: 'extended'});
    console.log('inside api >> ' + q);
    return tweets.data.statuses.map(get_text);
  } catch(err) {
    console.log(err);
  }
}

async function main() {
  let keyword = 'BlackRock';
  let count = 100;
  let tweets = await get_tweets(keyword, count);
  // console.log(tweets);
  for (tweet of tweets) {
    let test = new sentiment();
    // console.log(test.analyze(tweet));
    console.log('--------------------------');
    let score = test.analyze(tweet).comparative;
    console.log('Score: ' + score);
      // let score = new sentiment(tweet).comparative;
      tweet = `${tweet}\n`;
      if (score > 0) {
          tweet = colors.green(tweet);
      } else if (score < 0) {
          tweet = colors.red(tweet);
      } else {
          tweet = colors.blue(tweet)
      }
      console.log(tweet)
  }
}

main();