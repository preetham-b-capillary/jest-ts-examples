import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import http from 'http';

const app = express();
const server = new http.Server(app);
server.listen(4000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    next();
});
import GetAllUsersRequest from './allusers'; 

app.get('/users/list', GetAllUsersRequest);