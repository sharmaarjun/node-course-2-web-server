const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000 ;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render ('maintenance.hbs', {
//         heading: 'Maintenance Page',
//         pageTitle: 'Under maintenance',
//     });
// })
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req, res) => {                // request and response
//     //res.send('<h1>Hello Express</h1>');
//     res.send({
//         name: 'Arjun',
//         likes: [
//             'biking',
//             'making friends'
//         ]
//     });
// });

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        heading: 'About Page',
        pageTitle: 'About page is title',
        //currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        heading: 'Home Page',
        pageTitle: 'Home is ours',
       // currentYear: new Date().getFullYear(),
        welcomeMessage: 'Hi, My name is Arjun Sharma. Im working as QA in Clicklabs'
    })
})

app.listen(port, () => {
    console.log(`Our server is up to run on port ${port} `);
});           // local host to view our web server app
