import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let blogList = [];

//add blog
app.post("/home", (req, res) => {
    const blogTitle = req.body.blogTitle;
    const blogDescription = req.body.blogDes;
    const dateToday = new Date();

//formatted date
const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit' 
};

const formattedDate = dateToday.toLocaleString('en-US', options);

    blogList.push({
      id: generateID(),
      title: blogTitle,
      description: blogDescription,
      date: formattedDate,
    });
    res.redirect("/");
  });



//view blog details
app.get("/blogDetails/:id", (req, res) => {
    const blogId = req.params.id;
    const blogDetails = blogList.find((blog) => blog.id === parseInt(blogId));
    res.render("blogdetails.ejs", {
      blogDetails: blogDetails,
    });
  });

  //delete blog
  app.post("/delete/:id", (req, res) => {
    const blogId = req.params.id;
    blogList = blogList.filter((blog) => blog.id !== parseInt(blogId));
    res.send(
      '<script>alert("Blog deleted successfully"); window.location="/";</script>'
    );
   
  });


  

  //show blog list
  app.get("/", (req, res) => {
    res.render("index.ejs", { blogList: blogList });
});



app.listen(port, () => 
{
  console.log(`Listening on port ${port}`);
});

function generateID() {
    return Math.floor(Math.random() * 10000);
  }