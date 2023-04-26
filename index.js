// const express = require("express");
// const mysql = require("mysql");

// const app = express();

// // Create connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "first",
//     port     : "3307",
//   });
  

//   // Connect to database
//   db.connect((error) => {
//     if (error) {
//       console.error("Error connecting to database: ", error);
//       return;
//     }
  
//     console.log("Database connected successfully!");
//   });


// //create Database

// app.get('/',(req, res)=>{
//     const sql = 'CREATE DATABASE first';
//     db.query(sql, (err, result)=>{
//         if(err) throw err,
//         console.log(result);
//         res.send("Database Created!");
//     })
// })

// app.listen(8000, ()=>{
//     console.log("Server is Successfully Running on port 8000!!");
// });

const express = require("express");
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"second",
    port:'3307',
});

db.connect((err)=>{
    if(err){
        console.log("error is happening here");
    }
    console.log("Connection Successful");
})

app.get('/create',(req,res)=>{
    let sql="CREATE DATABASE second";
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Database Created Successfully so enjoy it !!!");
    });
});


//create table
app.get('/table',(req, res)=>{
     let sql="CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
     db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Table Created Successfully!!!");
    });
})

//insert data
app.get("/post1", (req, res)=>{
    let post ={title : "post one", body:"this is body 2"};
    let sql ="INSERT INTO posts SET ?"
    let query = db.query(sql, post, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Post one  is added Successfully !!!");
    });
})

//Select Posts
app.get("/select", (req, res)=>{
    let sql="SELECT * FROM posts";
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Data is fetched successfully");
    });
});


//Select single post
app.get("/select/:id", (req, res)=>{
    let sql=`SELECT * FROM posts  WHERE id=${req.params.id}`;
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Select single post ");
    });
});

//update Table
app.get('/update', (req, res)=>{
    let newTitle ="Kingo title"
    let sql = `UPDATE posts SET title = "${netTitle}" WHERE id=${req.params.id}`;
    db.query(sql, (err, result)=>{
    if(err){
        throw err;
    }
    console.log(result);
    res.send("Data is Updated Successfully !");

});});

//Delete Posts
app.get("/delete/:id", (req, res)=>{
    let sql = `DELETE FROM posts  WHERE id=${req.params.id}`;
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Data Deleted Successfully !!")
    })
})
app.listen("3000", (req, res)=>{
    console.log("Server is successfully running on port 3000, Successfully !!");
})