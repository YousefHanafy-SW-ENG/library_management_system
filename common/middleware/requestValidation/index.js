import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const { BAD_REQUEST } = StatusCodes;

export const validateRequest = (schema = {}) => {
  const keys = ["headers", "params", "query", "body"];

  return (req, res, next) => {
    try {
      for (const key of keys) {
        const zodSchema = schema[key];
        if (!zodSchema) continue;
        const parsed = zodSchema.parse(req[key]);
        req[key] = parsed;
      }
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const first = err.issues?.[0];
        return res.status(BAD_REQUEST).json({
          success: false,
          message: first?.message || "Validation error",
          errors: err.issues,
        });
      }
      return next(err);
    }
  };
};
