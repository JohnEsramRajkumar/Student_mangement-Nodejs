const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
const studentdata = require("./studentdata.json");
const fs = require("fs"); 

   
// Read users.json file 

fs.readFile("studentdata.json", function(err, data) { 

    // Check for errors 

    if (err) throw err; 

    // Converting to JSON 

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
        
        if (!book) {
            console.log(`Data not available for Subject ${req.params.st_id}`);
            return res.status(404).send(`Data not available for Subject ${req.params.st_id}`);
          }
          let jsonString = JSON.stringify(book);
          res.send(jsonString);
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

