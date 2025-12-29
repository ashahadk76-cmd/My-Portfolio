import mongoose from "mongoose";

const replaySchema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true,
  },
  replaymessage: {
    type: String,
    required: true,
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Replay || mongoose.model('Replay', replaySchema);