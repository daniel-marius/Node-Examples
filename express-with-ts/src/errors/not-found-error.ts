import { CustomError } from "./custom-error";
import { HttpStatusCode } from "./http-status";

export class NotFoundError extends CustomError {
  statusCode: number = HttpStatusCode.NOT_FOUND;

  constructor(public message: string, public error?: any) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      error: this.error,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
