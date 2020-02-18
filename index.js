const express = require('express');
const hdlbrs = require('express-handlebars');
const bodyparser = require('body-parser')
const app = express();
const port = 4000;

app.use(bodyparser.urlencoded({extended: false}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', hdlbrs())
app.set('view engine', 'handlebars')

let invArr = [{id: 1, name: "Processzor", group: "Számítástechnika"},{id: 2, name: "Processzor", group: "Számítástechnika"},{id: 3, name: "Processzor", group: "Számítástechnika"}]

app.get('/tables', (req,res) => {
    res.render('table', {invArr})
})



app.listen(port, (err) => {
    if(err){
        console.log('Error: '+err);
    }else{
        console.log(`App listens to port: ${port}`);
    }
})