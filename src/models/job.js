import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema({
  title: {
    type: String,
  },
  department: {
    type: String,
  },
}, { collection: 'job' });

export default mongoose.model('Job', JobSchema);
