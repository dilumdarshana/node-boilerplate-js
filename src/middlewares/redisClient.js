import { createClient } from 'redis';
import config from 'config';

export default () => async (req, res, next) => {
  const redisClient = createClient({ url: `redis://${config.cache.redis.host}:${config.cache.redis.port}` });

  redisClient.on('error', (err) => {
    console.log('#### Redis connection error ####', err);
  });

  await redisClient.connect();

  req.redis = redisClient;

  next();
};
