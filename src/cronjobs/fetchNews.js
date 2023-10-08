const cron = require('node-cron');
const fetchNews = require('../controllers/getNews');

const cronjob = cron.schedule('*/14 * * * *', () => {
    console.log("Fetching news from NewsAPI");
    fetchNews();



});

module.exports = cronjob;