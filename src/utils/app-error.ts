export interface ValidationIssue {
  field: string;
  message: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: ValidationIssue[];

  constructor(message: string, statusCode: number, errors?: ValidationIssue[]) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
