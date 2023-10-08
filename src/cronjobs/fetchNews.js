const cron = require('node-cron');
const fetchNews = require('../controllers/getNews');


/**
 * Fetches the news from NewsAPI.org every 14 mins
 */
const cronjob = cron.schedule('*/14 * * * *', () => {
    console.log("Fetching news from NewsAPI");
    fetchNews();
});

module.exports = cronjob;