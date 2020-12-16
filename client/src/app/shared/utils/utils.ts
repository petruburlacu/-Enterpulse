import * as _ from 'lodash';

export default class Utils {
    static groupSentimentByDate(data): any {
        return _.chain(data).groupBy(item => item.date).map((value, key) => {
            let bertScores = [];
            let vaderScores = [];
            value.forEach(entry => {
                bertScores = [...bertScores, entry.bert_score];
                vaderScores = [...vaderScores, entry.vader_score];
            });
            return { date: key, scoreVader: _.mean(vaderScores), scoreBert: _.mean(bertScores), data: value };
        }).value();
    }

    static sortData(array): any {
        return _.sortBy(array, ['date']);
    }
}