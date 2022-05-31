import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { engine } from 'express-handlebars';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// handle log request
morgan.token('id', (req: any) => {
    return req.id;
});
app.use((req: any, res: any, next) => {
    req.id = uuidv4();
    next();
});
app.use(morgan(':id :method :url :response-time'));

// handle view engine
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../src/views/layouts'),
    partialsDir: path.join(__dirname, '../src/views'),
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '../src/views'));

app.get('/', (req: Request, res: Response) => {
    // res.send('Hi, to day i will learning about nodejs expressJS.');
    res.render('Home');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
