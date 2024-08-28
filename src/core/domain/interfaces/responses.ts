/**
 * Represents a general application response with essential information.
 */
export interface ApplicationGeneral {
  /**
   * The HTTP status code associated with the response.
   */
  httpStatusCode: number

  /**
   * A boolean value indicating whether the operation or request passed successfully.
   */
  passed: boolean

  /**
   * A descriptive message providing additional information about the response.
   */
  message: string
}

/**
 * Represents a data source response output containing data and a descriptive
 * message.
 *
 * @typeParam T - The type of the data source object.
 */
export interface DataSourceOutput<T> {
  /**
   * The HTTP status code associated with the response.
   */
  httpStatusCode: number

  /**
   * An object containing a descriptive message and the data source of type T.
   */
  data: {
    /**
     * A message providing additional information about the response.
     */
    message: string

    /**
     * The data source of type T.
     */
    dataSource: T
  }
}

/**
 * Represents a failed application response output with a descriptive message.
 */
export interface ApplicationFailedOutput {
  /**
   * The HTTP status code associated with the response.
   */
  httpStatusCode: number

  /**
   * An object containing a descriptive message about the failed response.
   */
  data: {
    /**
     * A message providing additional information about the response.
     */
    message: string
  }
}
