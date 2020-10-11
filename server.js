const mongoose = require('mongoose');

const express = require('express');
const cors = require('cors');
const  dotenv = require('dotenv');
const bodyParser =require('body-parser');
const session   = require ('express-session');
// const {Router as api} from './router.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

//CORS allows request to come in from React
const corsOptions={
    credentials:true,
    origin:'http://localhost:3000',// Include Allowable Origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

//MiddleWare for User Login
app.use(session({
  secret: "keepitSecretQuantico",
  resave:false,
  saveUninitialized:false,
}))

mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.MONGODBCLOUD, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("database connected"))
    .catch(err => console.log("could not connect database", err));

//MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //can change to false
// parse application/json
app.use(bodyParser.json());

app.use((req,res,next)=>{
    console.log('this is who is logged in ', req.session.userId)
    next();
})

//server works --200 status
app.get('/', (req, res) => {
  res.status(200).send('<p style="text-align: center; font-weight: 600">Welcome to VICINAGE API ...</p>');
})
//API Routes
app.use('/api/v1.0', require('./api/index'));

app.on('error', (err) => {
  console.error(`Express server error ${err}`);
});

app.listen(PORT, ()=>{
    console.log(`listening on  PORT ${PORT}`);
})



