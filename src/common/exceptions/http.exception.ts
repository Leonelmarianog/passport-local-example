export class HttpException extends Error {
  constructor(
    private readonly status: number,
    private readonly description: string,
    private readonly details?: Record<string, any>
  ) {
    super();
  }

  public getStatus = () => {
    return this.status;
  };

  public getDescription = () => {
    return this.description;
  };

  public getDetails = () => {
    return this.details;
  };

  public createBody = (
    statusCode: number,
    message: string,
    details?: Record<string, any>
  ) => {
    if (!details) {
      return { statusCode, message };
    }
    return { statusCode, message, details };
  };
}
