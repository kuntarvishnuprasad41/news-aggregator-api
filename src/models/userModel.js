const { v4: uuidv4 } = require('uuid');
const timestamp = require('time-stamp');


class User{
   
  static type = {
    admin: "admin",
    other: "normal"
  };


  constructor(user_id, user_name = "Default name" , user_email = "something@something.com", type = User.type.other, user_preferences = [], liked_news = [], created_at)  {
    this.user_id = user_id
    this.user_name = user_name;
    this.user_email = user_email;
    this.user_type = type;
    this.user_preferences = user_preferences;
    this.liked_news = liked_news;
    this.created_at = created_at;
    
  }
} 

function userFromJSON(obj){
  
  if (!obj) return new User();

  let { user_name, user_email, type, user_preferences, liked_news } = obj;
  let user_id = uuidv4();
  let created_at = timestamp("YYYYMMDDHHmmss") ;
  
  return new User(user_id ,user_name, user_email, type, user_preferences, liked_news, created_at);
};

module.exports  = {User, userFromJSON};