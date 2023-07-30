import mongoose from 'mongoose';
import config from 'config';

const mongoConnector = () => {
  mongoose.connect(
    `mongodb://${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.name}`,
    { useNewUrlParser: true },
  );
};

export default mongoConnector;
