/**
 * Represents an internal server error exception.
 */
class InternalServerErrorException extends Error {
  /**
   * Creates a new instance of InternalServerErrorException.
   *
   * @param cause - The cause of the exception.
   */
  constructor(cause: string) {
    super(`There was an exception when processing the request. Cause: ${cause}`)
  }
}

/**
 * Represents a resource not found exception.
 */
class ResourceNotFound extends Error {
  /**
   * Creates a new instance of ResourceNotFound.
   *
   * @param cause - The cause of the exception.
   */
  constructor(cause: string) {
    super(`There was an exception when processing the request. Cause: ${cause}`)
  }
}

/**
 * An object containing different application-specific exception classes.
 */
export const APP_EXCEPTION = {
  /**
   * The class representing an internal server error exception.
   */
  InternalServerErrorException,

  /**
   * The class representing a resource not found exception.
   */
  ResourceNotFound
}
