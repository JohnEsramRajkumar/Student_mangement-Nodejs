const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
const datas = require("./datas.json");
const fs = require("fs"); 


   
// Read users.json file 

fs.readFile("datas.json", function(err, data) {   

    // Check for errors 

    if (err) throw err;  

    // Converting to JSON 

    const student = JSON.parse(data); 
   
    app.get('/', (req, res) => {
        res.send('Welcome to Student portal');
        
        });
         
        app.get('/api/student/subject', (req,res)=> {
        res.send(datas);
        console.log(`Invoking details of localhost:${port}/api/student/subject`);
        });
         
        app.get('/api/student/subject/:courseid', (req, res) => {
        //const book = datas.find(book1) ;
        // function book1(value){
        //     // console.log(req.params);
        //     return (value.courseid == req.params.courseid);
        //     console.log(value)
        // }
    
         const book = datas.filter( c => c.courseid === parseInt(req.params.courseid)) ;
         const newArray =[];
         book.forEach(element => {
          newArray.push(element.subject);
         });
        // console.log(book);
        if (!book) {
            console.log(`Data not available for Subject ${req.params.subj_id}`);
            return res.status(404).send(`Data not available for Subject ${req.params.subj_id}`);
          }
          let jsonString = JSON.stringify(book);
          res.send(newArray);
          console.log(`Invoking details of localhost:${port}/api/student/subject/${req.params.subj_id}`);
          console.log("Details of the Subject:", jsonString);
        });
        // if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
        // res.send(book);
        // });
         
         
        //PORT ENVIRONMENT VARIABLE
        const port = process.env.PORT || 8083;
        app.listen(port, () => console.log(`Listening on port ${port}..`));
      

     
}); 

