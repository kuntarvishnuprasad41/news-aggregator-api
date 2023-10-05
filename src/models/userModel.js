const { v4: uuidv4 } = require('uuid');
const timestamp = require('time-stamp');


class User{
   
  static type = {
    admin: "admin",
    other: "normal"
  };


  constructor(user_id, user_name = "Default name" , user_email = "something@something.com", password, type = User.type.other, user_preferences = [], liked_news = [], created_at= " ")  {
    this.user_id = user_id
    this.user_name = user_name;
    this.user_email = user_email;
    this.password = password;
    this.user_type = type;
    this.user_preferences = user_preferences;
    this.liked_news = liked_news;
    this.created_at = created_at;
    this.read_articles = [];
    this.favorite_news = [];
  }
} 

function userFromJSON(obj,operation = "create"){
  if (!obj) return new User();
  if(operation == "create"){
    let { user_name, user_email, password, type, user_preferences, liked_news } = obj;
    let user_id = uuidv4();
    let created_at = timestamp("YYYYMMDDHHmmss") ;
    return new User(user_id ,user_name, user_email, password, type, user_preferences, liked_news, created_at);
  }else{
    let { user_id, user_name, user_email, password, type, user_preferences, liked_news, created_at } = obj;  
    return new User(user_id ,user_name, user_email, password, type, user_preferences, liked_news, created_at);
  }
};

module.exports  = {User, userFromJSON};