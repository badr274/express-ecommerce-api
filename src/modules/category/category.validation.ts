import { z } from "zod";

const categoryNameSchema = z
  .string()
  .trim()
  .min(2, "Category name must contain at least 2 characters")
  .max(50, "Category name cannot exceed 50 characters");

export const createCategorySchema = z.object({
  name: categoryNameSchema,
});

export const updateCategorySchema = z
  .object({
    name: categoryNameSchema,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
