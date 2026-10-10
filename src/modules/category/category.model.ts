import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category.types";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Category name must be at least 3 chars"],
      maxLength: [32, "Category name must be less than 32 chars"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

export const categoryModel = mongoose.model<ICategory>(
  "Category",
  categorySchema,
);
