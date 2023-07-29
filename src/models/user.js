import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  job: {
    type: ObjectId,
    ref: 'Job',
    default: null,
  },
}, { collection: 'user' });

export default mongoose.model('User', UserSchema);
