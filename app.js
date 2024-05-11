const express = require('express');
const app = express();
const path = require('path');
const MongoStore = require('connect-mongo');
const { connectToMongoDB } = require('./mongodb.js');
const authRoutes = require('./src/auth/route.js');
const groupRoutes = require('./src/groups/route.js')
const expenseRoutes = require('./src/expenses/route.js');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
    cookie: {
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

require('./src/config/passport-config.js');
connectToMongoDB();

app.use('/splitwise/auth', authRoutes);
app.use('/splitwise/group', groupRoutes);
app.use('/splitwise/expense', expenseRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
