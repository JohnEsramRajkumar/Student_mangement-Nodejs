const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
const studentdata = require("./studentdata.json");
const fs = require("fs"); 
const fetch = require('node-fetch');
const { text } = require('express');

fs.readFile("studentdata.json", function(err, data) { 

    if (err) throw err; 

    const student = JSON.parse(data); 
   
    app.get('/', (req, res) => {
        res.send('Welcome to Student portal');
        });
         
        app.get('/api/student/data', (req,res)=> {
        res.send(studentdata);
        console.log(`Invoking details of localhost:${port}/api/student/data`);
        });
        
        app.get('/api/student/data/:st_id', (req, res) => {
        const book = studentdata.find(c => c.st_id === parseInt(req.params.st_id));
        console.log(book.courseid);
        var dataurl= "http://host.docker.internal:49161/api/student/course/"+book.courseid;
        var dataurl2="http://host.docker.internal:49162/api/student/subject/"+book.courseid;

        // console.log(book.subj_id);
        // var dataurl1= "http://localhost:8083/api/student/subject/1/1"+book.subj_id;
          
        if (!book) {
            console.log(`Data not available for Subject ${req.params.st_id}`);
            return res.status(404).send(`Data not available for Subject ${req.params.st_id}`);
          }
          let jsonString = JSON.stringify(book);
          // fetch(dataurl)
          //    .then(res => res.json())
          //     .then(text => res.send(Object.assign(book,text)));
              (async () => {
                const response =  await fetch(dataurl);
                const body = await response.json();
                console.log(body);
                const response1 =  await fetch(dataurl2);
                const body1 = await response1.json();
                console.log(body1);
                res.send(Object.assign(book,body,{"subject":body1}));
                console.log(body.subj_id);
              })();
             
          // let jsonString1 = JSON.stringify(fetcheddata);
          // res.send(jsonString);
          console.log(`Invoking details of localhost:${port}/api/student/data/${req.params.st_id}`);
          console.log("Details of the Subject:", jsonString);
        });
         
        // if (!book) res.status(404).send('Data not available');
        // res.send(book);
        // });
         
         
        //PORT ENVIRONMENT VARIABLE
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`Listening on port ${port}..`));
      

     
}); 

