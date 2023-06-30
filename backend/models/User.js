import mongoose from "mongoose";
import bcrypt from "bcrypt";

mongoose.set('strictQuery', true);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const jumped = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, jumped);
});

userSchema.methods.buyerPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
