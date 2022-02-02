import { CustomError } from "./custom-error";
import { HttpStatusCode } from "./status-codes";

export class BadRequestError extends CustomError {
  statusCode: number = HttpStatusCode.BAD_REQUEST;

  constructor(public message: string, public error: any) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return {
      error: this.error,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
