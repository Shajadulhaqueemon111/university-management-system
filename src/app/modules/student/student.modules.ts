/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';

import {
  Guardian,
  localGuardian,
  Student,
  UserName,
} from './student.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is Required'],
    trim: true, //space tik kora day
    maxlength: [20, 'Name can not be more than 20 character'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'LastName is Required'],
    maxlength: 10,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNumber: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNumber: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<localGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});
const studentSchema = new Schema<Student>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, 'pasword is required'],

      maxlength: [20, 'password can not be 20 charecter'],
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported',
      },
    }, //using enum,
    deathOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    presentAddress: { type: String, required: true },
    parmanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },

    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],

      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
studentSchema.pre('save', async function (next) {
  //   console.log(this, 'pre hook : we will save data');
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_salt_rounded),
  );
  next();
});
studentSchema.post('save', function (doc, next) {
  //   console.log(this, 'post hook : we will save data');
  doc.password = '';
  next();
});

//deleted function jeno na asa
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const StudentModel = model<Student>('Student', studentSchema);
export default StudentModel;
