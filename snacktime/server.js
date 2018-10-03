const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(
  session({
    key: 'staff_sid',
    secret: 'cookiecutter',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('staff_sid');
  }
  next();
});

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
