// // server/index.js

// // const express = require("express");

// const PORT = process.env.PORT || 5000;

// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors())

// app.get('/api', (req, res) => {
//       res.send('Hello from our server!')
// })

// app.listen(PORT, () => {
//       console.log(`server listening on port ${PORT}`)
// })

// const path = require('path');
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();
// app.use(express.static(path.resolve(__dirname, '../build')))
app.use(cors());
app.use(bodyParser.json());

app.get("/api/contact", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADRESS,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready to send");
  }
});

app.post(
  "/api/contact",
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
      from: lastName + firstName,
      to: process.env.EMAIL_CONTACT,
      subject: "Contact d'Ekklêsia-web",
      html: `<p>Prénom: ${firstName}</p>
             <p>Nom: ${lastName}</p>
               <p>Email: ${email}</p>
               <p>Téléphone: ${phone}</p>
               <p>Message: ${message}</p>
        `,
    };

    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json(error);
      } else {
        res.json({ code: 200, message: " message sent " });
      }
    });

    // return true;
  }
);

// });

// app.get('*', (req, res) =>{
//     res.sendFile(path.resolve(__dirname, '../buid', 'index.html'))
// })

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

// const path = require('path');
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const nodemailer = require('nodemailer');
// const bodyParser = require ('body-parser')

// const PORT = process.env.PORT || 3001;

// const app = express();
// app.use(express.static(path.resolve(__dirname, '../build')))
// app.use(cors());
// app.use(bodyParser.json());

// app.get("/api", (req,res) =>{
//     res.json ({ message: "Hello from server!"})
// });

// const contactEmail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_ADRESS,
//         pass: process.env.EMAIL_PASS
//     }

// });

// contactEmail.verify((error) =>{
//     if(error) {
//         console.log(error)
//     }else {
//         console.log("ready to send")
//     }
// });

// app.post("/api/contact", bodyParser.urlencoded({ extended: false}), (req, res) => {
//     const name = req.body.firstName + req.body.lastName;
//     const email = req.body.email;
//     const message = req.body.message;
//     const phone = req.body.phone;
//     const mail = {
//         from: name,
//         to: process.env.EMAIL_CONTACT,
//         subject : "Contact Form Submission - Portfolio",
//         html: `<p>Name: ${name}</p>
//                <p>Email: ${email}</p>
//                <p>Phone: ${phone}</p>
//                <p>Message: ${message}</p>
//         `
//     }
//     contactEmail.sendMail(mail, (error) =>{
//         if (error) {
//             res.json(error);
//         } else {
//             res.json({ code: 200, message :" message sent "})
//         }
//     })

// });

// app.get('*', (req, res) =>{
//     res.sendFile(path.resolve(__dirname, '../buid', 'index.html'))
// })

// app.listen(PORT, () =>{
//     console.log(`Server is listening on port: ${PORT}`);
// })
