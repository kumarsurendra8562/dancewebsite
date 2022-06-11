const express = require('express');
const app = express();

const port = 8000;
const fs = require('fs');
const { Server } = require('http');
const path=require('path');
const { emitWarning } = require('process');


// express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// bug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// endpoints
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);

});
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    // console.log(req.body);
    // form=req.body;
    name = req.body.name;
    phone = req.body.phone;
    email = req.body.email;
    address = req.body.address;
    desc = req.body.desc;
    let OutputInFile = `Name of Client IS: ${name}, Phone Numeber of Client: ${phone}, Email Id of client : ${email}, Address of client ${address}, concern of Him/Her: ${desc}`;
    fs.writeFileSync('output.txt', OutputInFile);

    const params = { 'massege': 'Your Form has been Submitted Succesfully' };
    res.status(200).render('index.pug', params);
})

// start  the Server
app.listen(port, () => {
    console.log(`Application is Successfully Run On the port :${port}`);
})