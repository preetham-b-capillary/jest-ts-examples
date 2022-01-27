import express from 'express';
import bodyParser from 'body-parser';
import swapiGetter from './api';


export default function(database: any) {
  const app = express();
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.post('/users', async(req, res) => {
    try {
      const { username, password } = req.body;
      if (!password || !username) {
        res.sendStatus(400);
        return;
      }

      const user = await database.getUser(username, password);
      if (user) {
        res.send({userId: user.userId});
        return;
      }

      const userId = await database.createUser(username, password);
      res.send({ userId});
      return;
    } catch (error) {
      res.sendStatus(500);
      return;
    }
  });

  app.get('/api', async(req, res) => {
    const result = await swapiGetter(1);
    res.send({result});
  });

  return app;
}

