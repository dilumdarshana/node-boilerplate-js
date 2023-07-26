import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema({
  title: {
    type: String,
  },
  level: {
    type: String,
  },
}, { collection: 'job' });

export default mongoose.model('Job', JobSchema);
