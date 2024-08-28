/**
 * Represents the definition of different response types that can be used in the
 * application.
 */
export interface AppResponseDefinition {
  /**
   * SUCCESS: A response function for indicating a successful operation or request.
   *
   * @param message - A string containing additional information or a success message.
   */
  success: (message: string) => void

  /**
   * WARNING: A response function for indicating a warning or non-critical issue.
   *
   * @param message - A string containing the warning message or additional information.
   */
  warning: (message: string) => void

  /**
   * EXCEPTION: A response function for indicating an exception or critical error.
   *
   * @param message - A string containing the error message or details about the exception.
   */
  exception: (message: string) => void

  /**
   * INFO: A response function for providing additional information.
   *
   * @param message - A string containing the information or details to convey.
   */
  info: (message: string) => void
}
