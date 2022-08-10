const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
const db = require("./db.json");
const fs = require("fs"); 

   
// Read users.json file 

fs.readFile("db.json", function(err, data) { 

    // Check for errors 

    if (err) throw err; 

    // Converting to JSON 

    const student = JSON.parse(data); 
   
    app.get('/', (req, res) => {
        res.send('Welcome to Student portal');
        });
         
        app.get('/api/student/course', (req,res)=> {
        res.send(db);
        console.log(`Invoking details of localhost:${port}/api/student/course`);
        });
        
        app.get('/api/student/course/:courseid', (req, res) => {
        const book = db.find(c => c.courseid === parseInt(req.params.courseid));
        if (!book) {
            console.log(`Data not available for Subject ${req.params.courseid}`);
            return res.status(404).send(`Data not available for Subject ${req.params.courseid}`);
          }
          let jsonString = JSON.stringify(book);
          res.send(jsonString);
          console.log(`Invoking details of localhost:${port}/api/student/course/${req.params.courseid}`);
          console.log("Details of the Subject:", jsonString);
        });

         
        // if (!book) res.status(404).send('Data not available');
        // res.send(book);
        // });
         
         
        //PORT ENVIRONMENT VARIABLE
        const port = process.env.PORT || 8082;
        app.listen(port, () => console.log(`Listening on port ${port}..`));
      

     
}); 

