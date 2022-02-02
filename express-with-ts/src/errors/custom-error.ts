export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string, error?: any) {
    super(message);

    // Because we are extending a built in class (Error)
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    error?: any,
    message: string,
    statusCode: number
  };
}
