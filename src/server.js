import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import cors from 'cors';
import routes from '#src/routes';
import redisClient from '#src/middlewares/redisClient';
import mongoDbConnector from '#core/mongoConnector';

const app = express();

const port = config.port || 3000;

mongoDbConnector();

app.use(redisClient());

app.use(cors({ origin: config.cors_urls }));

// urlencoded - this type of body will be convert
// extended - which need to allow rich data or simple data
app.use(bodyParser.urlencoded({
  extended: true,
}));

// body-parser use to convert http post data to json
app.use(bodyParser.json());

// routes(app);

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
