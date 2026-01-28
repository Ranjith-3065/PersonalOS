const app = require('./app');
const dotenv = require('dotenv');
const mongodbconnection = require('./config/db');
dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
    await mongodbconnection();

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};

startServer();
