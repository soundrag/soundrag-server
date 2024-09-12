import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  positions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Position",
      required: true,
    },
  ],
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
