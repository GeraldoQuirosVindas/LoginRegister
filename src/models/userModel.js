import { Schema, model,mongoose } from "mongoose";
import bcryptjs from "bcryptjs"


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true, 
    },
    password:{
        type: String,
        required: true,
    }
    },{ timestamps: true });


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

export default model('User',userSchema)