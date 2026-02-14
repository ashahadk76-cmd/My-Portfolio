import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: [
    {
      url: {
        type: String,
        required: true,
      },
      publicID: {
        type: String,
        required: true,
      }
    }
  ],
  proj_Link: {
    type: String,
    required: true,
  },
  githubcodeLink: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  }

});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
