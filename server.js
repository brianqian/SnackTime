require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

const db = require('./models');

// Define middleware here
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, 'client/build')));
}

app.use(
  session({
    key: 'user_sid',
    secret: 'asgasfhr4xv41zjgjx',
    resave: false,
    saveUninitialized: false,
    path: '/',
    cookie: {
      expires: 600000,
    },
  })
);

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie('user_sid');
//   }
//   next();
// });

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

// function authChecker(req, res, next) {
//   if (req.session.staff || req.path==='/') {
//     console.log("req.session.staff", req.session.staff);
//       next();
//   } else {
//      res.redirect("/");
//   }
// }

// app.use(authChecker);

app.use(routes);
// router for handling 404 requests(unavailable routes)
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
// Start the API server
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
