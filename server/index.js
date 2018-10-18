const express = require('express');
const bP = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession.js');
const swagController = require('./controllers/swag_controller.js');
const auth = require('./controllers/auth_controller.js');
const cart = require('./controllers/cart_controller.js');
const search = require('./controllers/search_controller.js');

const app = express();
app.use(bP.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookies: {

    // }
}));
app.use(checkForSession);
app.use( express.static( `${__dirname}/build`));
//swag
app.get('/api/swag', swagController.read);
//auth
app.post('/api/login', auth.login);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
app.get('/api/user', auth.getUser);
//cart
app.post('/api/cart', cart.add);
app.post('/api/cart/checkout', cart.checkout);
app.delete('/api/cart', cart.delete);
//search
app.get('/api/search', search.search);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, ()=>{
    console.log(`server in port ${port}`)
})