/**
 * NGError is used to represent application-specific errors.
 * It extends the built-in Error class and includes an additional code property.
 */
export class NGError extends Error {
  public readonly code: number;

  /**
   * Constructs a new NGError.
   * @param message - The error message.
   * @param code - The error code.
   */
  constructor(message: string, code: number) {
    super(message);
    this.name = 'NGError';
    this.code = code;
  }

  toErrorMessage() {
    return `${this.name}: ${this.message} (Code: ${this.code})`;
  }
}
