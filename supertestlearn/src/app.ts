import express from 'express';
import bodyParser from 'body-parser';
import validatePassword from './validatePassword';
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/users',async (req, res) => {
    const { username, password } = req.body;
    if (!password || !username) {
        res.sendStatus(400);
        return;
    }

    if (! validatePassword(password)) {
        res.sendStatus(400);
        return;
    }
    
    res.json({ time: new Date(), userId: Math.random() * 10});
});

export default app;