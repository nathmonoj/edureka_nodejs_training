export class APIResponse {
  data;
  message;
  statusCode;
  res;
  constructor(res, data, message, statusCode = 200) {
    this.data = data;
    this.message = message;
    this.res = res;
    this.statusCode = statusCode;
  }

  json() {
    this.res
      .status(this.statusCode)
      .json({ data: this.data, message: this.message })
  }
}

export class APIError {
  data;
  message;
  statusCode;
  res;

  constructor(res, data, message, statusCode = 500) {
    this.data = data;
    this.message = message;
    this.res = res;
    this.statusCode = statusCode;
  }

  json() {
    this.res
      .status(this.statusCode)
      .json({ data: this.data, message: this.message });
  }
}