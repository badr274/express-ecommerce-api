import { z } from "zod";

const productNameSchema = z
  .string()
  .trim()
  .min(2, "Product name must contain at least 2 characters")
  .max(50, "Product name cannot exceed 50 characters");

const productDescriptionSchema = z
  .string()
  .trim()
  .min(10, "Product description must contain at least 10 characters")
  .max(500, "Product description cannot exceed 500 characters");

const productPriceSchema = z
  .number()
  .min(0, "Product price must be a positive number")
  .max(10000, "Product price cannot exceed 10000");

const productQuantitySchema = z
  .number()
  .int("Product quantity must be an integer")
  .min(0, "Product quantity must be a positive number")
  .max(1000, "Product quantity cannot exceed 1000");

export const createProductSchema = z.object({
  name: productNameSchema,
  description: productDescriptionSchema,
  price: productPriceSchema,
  quantity: productQuantitySchema,
});

export const updateProductSchema = z
  .object({
    name: productNameSchema.optional(),
    description: productDescriptionSchema.optional(),
    price: productPriceSchema.optional(),
    quantity: productQuantitySchema.optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
