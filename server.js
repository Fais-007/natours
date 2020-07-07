const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORDS>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('DB Connected');
    });

const port = process.env.port || 3000;
const server = app.listen(port, () => {
    console.log('App is running');
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
