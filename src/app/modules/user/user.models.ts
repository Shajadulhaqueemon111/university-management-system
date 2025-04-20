/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  //   console.log(this, 'pre hook : we will save data');
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_salt_rounded),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  //   console.log(this, 'post hook : we will save data');
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
