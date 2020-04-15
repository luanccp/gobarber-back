import express from 'express';
import routes from './routes';

const app = express();

app.use(routes)

app.use(express.json())

app.listen(3330, () => {
  console.log('API, working fine!')
});
