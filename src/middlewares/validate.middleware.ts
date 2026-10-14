import type { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../utils/app-error.js";

type RequestSource = "body" | "params" | "query";

type ValidationSchemas = Partial<Record<RequestSource, z.ZodType>>;

export const validateRequest = (schemas: ValidationSchemas): RequestHandler => {
  return (req, res, next) => {
    const validated: Partial<Record<RequestSource, unknown>> = {};

    for (const source of ["params", "query", "body"] as const) {
      const schema = schemas[source];

      if (!schema) {
        continue;
      }

      const result = schema.safeParse(req[source]);

      if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
          field: [source, ...issue.path.map(String)].join("."),
          message: issue.message,
        }));

        return next(new AppError("Validation failed", 400, errors));
      }

      validated[source] = result.data;
    }

    res.locals.validated = validated;

    next();
  };
};
