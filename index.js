import express from "express";
import bodyParser from "body-parser";
import notifier from "node-notifier";


const app=express();
const port=3000;

var blogs=[];
var des=[];
var cont=[];
var dat=[];
var th;
var ko;
var mk;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{blogs: blogs, des:des});
});

app.post("/view",(req,res)=>{
    for(let i=0;i<blogs.length;i++){
        if(blogs[i]==req.body["tit"]){
            th=i;
            break;
        }
    }
    res.render("display.ejs",{title: blogs[th], body:des[th],date:dat[th],content:cont[th]});
});

app.post("/delete",(req,res)=>{
    for(let i=0;i<blogs.length;i++){
        if(blogs[i]==req.body["del"]){
            ko=i;
            break;
        }
    }
    blogs.splice(ko,1);
    des.splice(ko,1);
    cont.splice(ko,1);
    res.render("index.ejs",{blogs: blogs, des:des});
});


app.post("/new",(req,res)=>{
    res.render("makeBlog.ejs");
});



app.post("/blog",(req,res)=>{
    let m=req.body["Title"];
    let n=req.body["Description"];
    let o=req.body["Content"];
    let p=true;
    if(m==""){
        notifier.notify({
            title: 'OOPS! Something went wrong.',
            message: 'Please Enter Title!',
            appID: 'Alert!',

          });
        p=false;
    }
    else{
        blogs.push(m);
        des.push(n);
        cont.push(o);
        p=true;
        var k=new Date().getDate()+" "+new Date().toLocaleString('default', {month: 'long'})+", "+new Date().getFullYear();
        dat.push(k);
    }
    if(p==true) res.render("display.ejs",{title: m, body:n,date:k,content:o});
});

app.post("/edit",(req,res)=>{
    for(let i=0;i<blogs.length;i++){
        if(blogs[i]==req.body["edi"]){
            mk=i;
            break;
        }
    }
    res.render("makeBlog.ejs",{t:blogs[mk], d:des[mk], c:cont[mk]});
});

app.post("/update",(req,res)=>{
    if(req.body["Title"]==""){
        notifier.notify({
            title: 'OOPS! Something went wrong.',
            message: 'Please Enter Title!',
            appID: 'Alert!',

          });
    }
    else{
        blogs[mk]=req.body["Title"];
    des[mk]=req.body["Description"];
    cont[mk]=req.body["Content"];

    notifier.notify({
        title: 'Blog Updated!',
        message: 'Your Blog has been updated.',
        appID: 'Alert!',

      });
      res.render("display.ejs",{title: blogs[mk], body:des[mk],date:dat[mk],content:cont[mk]});
    }
});



app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server running on port ${port}`);
});