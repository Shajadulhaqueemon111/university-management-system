import { Schema, model } from 'mongoose';
import {
  Guardian,
  localGuardian,
  TStudent,
  UserName,
} from './student.interface';

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
const studentSchema = new Schema<TStudent>(
  {
    user: {
      type: Schema.ObjectId,
      required: [true, ' Id is required'],
      unique: true,
      ref: 'User',
    },
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
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
    deathOfBirth: { type: Date },
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

    isDeleted: {
      type: Boolean,
      default: false,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemiester',
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

//deleted function jeno na asa
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const StudentModel = model<TStudent>('Student', studentSchema);
export default StudentModel;
