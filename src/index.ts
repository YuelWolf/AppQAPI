import App from './app';
import database from './database';
import passport from './config/passport'

database();
const app = new App();
app.start();