import mongoose, { Schema } from 'mongoose';

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
  phone: {
    type: String,
  },
}, { collection: 'user' });

export default mongoose.model('User', UserSchema);
