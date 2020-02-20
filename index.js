const express = require('express');
const hdlbrs = require('express-handlebars');
const bodyparser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

const app = express();
const url = 'http://localhost:4000'
const port =process.env.port || 4000;
const db = new sqlite3.Database('inventory.db')

app.use(bodyparser.urlencoded({extended: false}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', hdlbrs())
app.set('view engine', 'handlebars')

app.get('/availables', (req,res) => {
    res.render('available', {invArr})
})

app.get('/products', (req,res) => {
    db.serialize(function() {
        db.all("SELECT rowid as id,name,category from products", function(err, results) {
            if (err != null) {
                // hibakezelés
            }
          res.render('product', {
            invArr: results
          }) 
          console.log(results)
        });
      });
})

app.get('/groups', (req,res) => {
    res.render('group')
})



app.listen(port, (err) => {
    if(err){
        console.log('Error: '+err);
    }else{
        console.log(`App listens to port: ${port}`);
    }
})