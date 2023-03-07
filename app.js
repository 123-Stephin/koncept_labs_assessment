const mysql = require('mysql');
const express = require("express");
const app= express();


app.use(express.static(__dirname + '/public'));

var bodyparser = require("body-parser");
const { response } = require('express');
var urlencodedParser = bodyparser.urlencoded({
    extended: false
   });

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.listen(8000, () => 
{
  console.log("listening on 8000");
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// $$$$$$$$$$login page$$$$$$$$$$$
  app.post("/signin", urlencodedParser, (req, res) => {
  console.log("body ",req.body);
  var email= req.body.email;
  var pwd= req.body.pwd;
  console.log("hello all",email,pwd);
  res.status(200).send("Login Successfully completed")
  });

  //$$$$$$$$$$$$$$ signup page%%%%%%%%%%
    app.post("/signup", urlencodedParser, (req, res) => {
    console.log("body ",req.body);
    var email= req.body.email;
    var newpswd= req.body.newpswd;
    var cnfpswd= req.body.cnfpswd;

    var query="INSERT INTO user(email,password) VALUES(?,?);";

    console.log("welcome to signup page", email,newpswd,cnfpswd);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database:"demo",  
    });

    con.connect(function(error)
      {
        if(error) throw error
        else console.log("connected to the database successfully")  
      });

      con.query(query, [email,newpswd], (err, rows) => {
            if (err) throw err;
            console.log("Row inserted with id = "+ rows.insertId);
        });
    });
