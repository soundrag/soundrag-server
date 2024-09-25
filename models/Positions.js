import mongoose from "mongoose";

const { Schema } = mongoose;

const PositionSchema = new Schema({
  userId: {
    type: String,
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

  firstSpeakerPosition: {
    type: Array,
    required: true,
  },

  secondSpeakerPosition: {
    type: Array,
    required: true,
  },

  listenerPosition: {
    type: Array,
    required: true,
  },
});

PositionSchema.post("save", async function (doc) {
  try {
    await mongoose.model("Users").findOneAndUpdate(
      { userId: doc.userId },
      {
        $push: {
          positions: doc._id,
        },
      },
    );
  } catch (error) {
    console.error("Error updating user positions: ", error);
  }
});

const Positions = mongoose.model("Positions", PositionSchema);

export default Positions;
