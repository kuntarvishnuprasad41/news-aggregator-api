const { v4: uuidv4 } = require("uuid");
const timestamp = require("time-stamp");

class News {
  static type = {
    admin: "admin",
    other: "normal",
  };

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

function newsFromJSON(obj, operation = "create") {
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
