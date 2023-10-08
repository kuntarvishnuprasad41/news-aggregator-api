const { v4: uuidv4 } = require("uuid");
const timestamp = require("time-stamp");

/**
 * Data model for news
 */
class News {
  static type = {
    admin: "admin",
    other: "normal",
  };

   categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ]

  constructor(
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content
  ) {
    this.news_id = uuidv4();
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
  }
}

/**
 * to convert newsAPI object to newsDb object
 * @param {from newsAPI} obj 
 * @returns [news]
 */
function newsFromJSON(obj, category = "create") {
  if (!obj) return new News();
  let newsObj = [];
  obj.forEach((element) => {
    let { author, title, description, url, urlToImage, publishedAt, content } =
      element;
    newsObj.push(
      new News(
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        content
      )
    );
  });

  return JSON.parse(JSON.stringify(newsObj));
}

module.exports = { News, newsFromJSON };
