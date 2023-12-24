import mongoose, { Schema, model,Types } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.models.Category || model("Category", categorySchema);

export default categoryModel;
