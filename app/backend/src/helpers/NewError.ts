export default class ServerError extends Error {
  public error;
  constructor(
    public statusCode: number,
    public message: string
  ) {
  super(message);
  this.error = message;
 }
}