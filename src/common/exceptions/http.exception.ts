export class HttpException extends Error {
  constructor(
    private readonly status: number,
    private readonly objectOrError: string | Record<string, any>,
    private readonly description?: string
  ) {
    super();
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  public getStatus = () => {
    return this.status;
  };

  public getObjectOrError = () => {
    return this.objectOrError;
  };

  public getDescription = () => {
    return this.description;
  };

  public createBody = () => {
    if (this.description) {
      return {
        statusCode: this.status,
        message: this.objectOrError,
        error: this.description,
      };
    }

    return { statusCode: this.status, message: this.objectOrError };
  };
}
