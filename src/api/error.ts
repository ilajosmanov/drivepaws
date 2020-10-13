class HttpNetworkError {
  readonly status: number;

  readonly message: string;

  constructor({ status, message }: HttpNetworkError) {
    this.status = status;
    this.message = message;
  }
}

export { HttpNetworkError };
