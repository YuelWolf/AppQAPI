import App from './app';
import database from './database';
require('./config/passport')

database();
const app = new App();
app.start();