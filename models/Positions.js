import mongoose from "mongoose";

const { Schema } = mongoose;

const PositionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },

  positionId: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  speakerPosition: {
    type: Object,
    required: true,
  },

  listenerPosition: {
    type: Object,
    required: true,
  },
});

const Positions = mongoose.model("Positions", PositionSchema);

export default Positions;
