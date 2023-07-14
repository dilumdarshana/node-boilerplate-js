import express from 'express';
import bodyParser from 'body-parser';
import routes from '#src/routes';

const app = express();

const port = process.env.port || 3000;

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
