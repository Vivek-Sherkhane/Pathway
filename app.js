//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose= require("mongoose");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
mongoose.connect("mongodb://localhost:27017/pathDB",{useNewUrlParser:true, useUnifiedTopology : true});
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));


//database
const signupschema = new mongoose.Schema({
  userName:String,
  password:String
});

const blogSchema = new mongoose.Schema({
  name : String,
  content : String,
  status : String
});

const blog = mongoose.model("blog", blogSchema);


app.post("/compose", function(req,res){
  const newBlog= new blog({
    name : req.body.userName,
    content : req.body.content,
    status :req.body.status
  });

  newBlog.save();
  // posts.push(newBlog);
  res.redirect("/blog");
});

let checkuser="";
const signup= new mongoose.model("signup",signupschema);
app.post("/",function(req,res)
{
  if(!req.body.confirmpassword)
  {
      checkuser=req.body.username;
    const checkpass=req.body.password;


      signup.findOne({userName : checkuser , password: checkpass} , function(err , foundItem){
        if(!err)
        {
          if(foundItem)
          res.render("main");
          else
          {
            console.log("Wrong password or wrong username");
            res.render("home");
          }
        }
      });
  }

  else
  {
    if(req.body.confirmpassword === req.body.password)
    {checkuser=req.body.username;
      const newUser= new signup(
        {
          userName:req.body.username,
          password:req.body.password
        });

        newUser.save();
        res.render("main");
  } else {
    console.log("password doesn't match!!");
    res.render("home");
  }
}

})




//database

//quiz

app.post("/quiz" , function(req,res){

    var q1Value = req.body.q1Value;
   var q2Value = req.body.q2Value;
   var q3Value = req.body.q3Value;
   var q4Value = req.body.q4Value;
   var q5Value = req.body.q5Value;
   var ans1="";
   var ans2="";
   var ans3="";
   var ans4="";
   if(q2Value === "C++")

    ans1="Starting with basics you should be well versed with syntax , data types and conditional statements.then go for arrays and functions. Then you are ready to learn data structres and algorithms and STL.After gaining enough knowledge of above mentioned topics you should move towards advanced concepts such as graphs, segmented trees etc.. For resources you can go with GEEKSFORGEEKS, HACKERANK.";

   else if(q2Value === "JAVA")
    ans1="Starting with basics you should be well versed with syntax , data types and conditional statements.then go for arrays and functions. Then you are ready to learn data structres and algorithms and STL.After gaining enough knowledge of above mentioned topics you should move towards advanced concepts such as graphs, segmented trees etc.. For resources you can go with GEEKSFORGEEKS, HACKERANK.";

   else if(q2Value === "PYTHON")
    ans1="Starting with basics you should be well versed with syntax , data types and conditional statements.then go for arrays and functions. Then you are ready to learn data structres and algorithms and STL.After gaining enough knowledge of above mentioned topics you should move towards advanced concepts such as graphs, segmented trees etc.. For resources you can go with GEEKSFORGEEKS, CODINGBAT.";

    else if(q2Value === "NONE OF THE ABOVE")
    ans1="It's never too late to begin... Start now and start learning any language of your choice. ";


    if(q3Value === "WEB DEVELOPMENT")
    ans2= "Web development is basically divided in two categories the first one is front-end and the other is back-end.First of all start with front-end Skills which include HTML,CSS and JAVASCRIPT and go for front end frameworks , there are many , you can go with BOOTSTRAP . After this you should learn back-end skills which includes node.js, express.js . There are many databases but the most preferable are SQL and MongoDB."

    else if(q3Value === "APP DEVELOPMENT")
    ans2 = "Begin with JAVA programming language, and then move towards Kotlin and Flutter frameworks. You can learn these skills from various resources like Coursera and Udemy. "
    else if(q3Value === "MACHINE LEARNING")
    ans2="Learn some statistics, Learn Python or R language for data analysis, Learn Unsupervised learning,  Learn Supervised Learning, Learn Big data technologies, Explore Deep learning models,  Complete a data project."
    else if(q3Value === "BLOCK-CHAIN")
    ans2="Learn about DAPPS that already exist, Learn Ethereun , Learn Development tools and libraries, Learn about smart contracts and solidity, Build your own Dapps, Prepare for internship.";

     if(q5Value === "PAG")
     ans4="For placement purposes you need to have a good hold on any one language and should be good in problem solving, along with the subjects that are taught to you during college. You also have to be good in development field like web dev, app dev, ML... there are many options for you. Also you will have to maintain a decent CGPA and make development projects and try to get atleast 1-2 internships."
     else if(q5Value === "POST-GRADUATION")
     ans4="For higher studies you have to be highly involved in development and try to make as many dev projects as possible. Also you have to maintain a very good cgpa in college like 9 or above. Also try to write some research papers and start the preparation for the admission exams like GRE and all from second third year itself."
     else if(q5Value === "START-UP")
     ans4="First find the field of your interest in which you want your start up. Now slowly get into development and try to learn as much as you can regarding your field. Also get into business statistics and stuff.";



     if(q4Value === "BEGINNER")
     ans3="enter this field and explore all about it. Sharpen your skills in the particular language of your choice and start practicing basic question that involves logic building. You can find such problems from sources like HACKERANK and Codechef.";


     else if(q4Value === "INTERMEDIATE")
     ans3="Learn concepts about tree and graph data structres and algorithms and solve as much  problems you can on these particular topics , also start pay attention towards minimizing time complexity of solutions";

     else if(q4Value === "ADVANCE")
     ans3="Learn Advanced topics like segment tree, dynamic programming, and start practicing on platforms like codeforces and codechef and try to take part in as many contests as you can. Also learn required mathematics for pogramming. ";




   res.render("path", {title1 : q2Value, title2 : q3Value, title3 : q4Value, title4 : q5Value, name : checkuser, que2:ans1, que3:ans2, que4:ans3, que5:ans4});

});





let posts=[];
var object="";
app.get("/",function(req,res)
{
   res.render("home" );

});
app.get("/home",function(req,res)
{
   res.render("home");

});
app.get("/heads",function(req,res)
{
  res.render("heads", {name : checkuser});
});
app.get("/main",function(req,res)
{
  res.render("main");
});


app.get("/blog",function(req,res)
{
  // posts=[];
  blog.find(function(err,foundItems){
    foundItems.forEach(function(Item){
      posts.push(Item);
    });
  });
  res.render("blog",{posts:posts , name : checkuser});

   posts=[];

});

app.get("/path",function(req,res)
{
  res.render("path",{name : checkuser});
});
app.get("/quiz",function(req,res)
{
  res.render("quiz",{ name: checkuser});
});

app.get("/compose",function(req,res)
{

  res.render("compose", {name : checkuser});

});
// app.post("/compose",function(req,res)
// {
//   object={
//     title:req.body.content,
//     content:req.body.textarea
//   };
//   posts.push(object);
//   res.redirect("/blog");
// });
// app.post("/blog",function(req,res)
// {
//   object={
//     title:req.body.content,
//     content:req.body.textarea
//   };
//   posts.push(object);
//   res.redirect("/");
// });

// app.get("/posts/:title",function(req,res)
// {
//   var part1=_.lowerCase(req.params.title);
//   posts.forEach(function(post)
// {
//   var part2=_.lowerCase(post.title);
//   if(part1===part2){
//     res.render("post",{topic:post.title, para:post.context});
//   }
// });
// });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
