//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");



const homeStartingContent = "A successful website does three things, It attracts the right kinds of visitors, Guides them to the main services or product you offer, Collect Contact details for future ongoing relation. Blog is an abbreviated version of weblog, which is a term used to describe websites that maintain an ongoing chronicle of information. A blog features diary-type commentary and links to articles on other websites, usually presented as a list of entries in reverse chronological order. Blogs range from the personal to the political, and can focus on one narrow subject or a whole range of subjects. Many blogs focus on a particular topic, such as web design, home staging, sports, or mobile technology. Some are more eclectic, presenting links to all types of other sites. And others are more like personal journals, presenting the author’s daily life and thoughts.";
const aboutContent = "Hello, I am a web developer willing to explore more and make more interesting and useful sites. Designing something and seeing that in action is really cool and this boost me for the work I do. With this I do competetive programming also, CP is fun and that give a feel of competition and help to push yourself over your limits! I enjoy my work a lot!! Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam liber ";
const contactContent = "You can contact me through my email, my Email: tusharevenge@gmail.com . Remaining enjoy your life!!!!  Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv:Atlas Password and userID @cluster0.yfkgr.mongodb.net/blogDB", {useNewUrlParser: true , useUnifiedTopology: true });

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){
  Post.find({},function(err,posts){
    res.render("home",{
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err,post){
    res.render("post",{
      title:post.title,
      content: post.content
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port= process.env.PORT;
if(port== null || port ==""){
  port=3000;
}
app.listen(port , function() {
  console.log("Server has started Successfully!!!");
});
