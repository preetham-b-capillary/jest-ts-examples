import makeApp from "./app";
import * as database from './database';
const app = makeApp(database);
app.listen(8080, () => console.log('listening on port 8080'));