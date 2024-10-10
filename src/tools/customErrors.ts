import { ServerResponse } from "http";
export class BaseError extends Error {
  public statusCode: number;
  constructor(name: string, statusCode: number, desc: string) {
    super(desc);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export class APiError extends BaseError {
  constructor(desc = "Server Interval Error") {
    super("ApiError", 500, desc);
  }
}

export class NotFoundError extends BaseError {
  constructor(desc = "Not Found") {
    super("Not Found", 404, desc);
  }
}

export class BadRequestError extends BaseError {
  constructor(desc = "Bad Request") {
    super("Bad Request", 400, desc);
  }
}

export function serviceLayerError(err: any) {
  if (err instanceof NotFoundError || err instanceof BadRequestError) {
    throw err;
  } else {
    throw new APiError(
      "An unexpected error occurred while fetching categories."
    );
  }
}

export function errorHandler(err: any, res: ServerResponse) {
  if (err instanceof BaseError) {
    res.writeHead(err.statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  } else {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}
