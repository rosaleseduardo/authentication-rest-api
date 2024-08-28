/**
 * Enum representing informational HTTP status codes.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses}
 */
export const enum INFORMATIONAL_HTTP_STATUS_CODE {
  /**
   * Continue: The server has received the request headers and the client should
   * proceed to send the request body.
   */
  CONTINUE = 100,
}

/**
 * Enum representing successful HTTP status codes.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses}
 */
export const enum SUCCESSFUL_HTTP_STATUS_CODE {
  /**
   * OK: The request has succeeded.
   */
  OK = 200,

  /**
   * Created: The request has been fulfilled, resulting in the creation of a new
   * resource.
   */
  CREATED = 201,

  /**
   * Accepted: The request has been accepted for processing, but the processing
   * has not been completed.
   */
  ACCEPTED = 202,
}

/**
 * Enum representing redirection HTTP status codes.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages}
 */
export const enum REDIRECTION_HTTP_STATUS_CODE {
  /**
   * See Other: The response to the request can be found under a different URI.
   */
  SEE_OTHER = 303,

  /**
   * Not Modified: The resource has not been modified since the last request.
   */
  NOT_MODIFIED = 304,
}

/**
 * Enum representing client error HTTP status codes.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses}
 */
export const enum CLIENT_ERROR_HTTP_STATUS_CODE {
  /**
   * Bad Request: The server cannot process the request due to a client error
   * (e.g., malformed request syntax).
   */
  BAD_REQUEST = 400,

  /**
   * Unauthorized: The client must authenticate itself to get the requested
   * response.
   */
  UNAUTHORIZED = 401,

  /**
   * Forbidden: The client does not have access rights to the content, i.e.,
   * they are unauthorized.
   */
  FORBIDDEN = 403,

  /**
   * Not Found: The server cannot find the requested resource.
   */
  NOT_FOUND = 404,

  /**
   * This response is sent when a request conflicts with the current state of
   * the server.
   */
  CONFLICT = 409,

  /**
   * Too Many Requests: The user has sent too many requests in a given amount of
   * time ("rate limiting").
   */
  TOO_MANY_REQUESTS = 429,
}

/**
 * Enum representing server error HTTP status codes.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses}
 */
export const enum SERVER_ERROR_HTTP_STATUS_CODE {
  /**
   * Internal Server Error: A generic error message, given when an unexpected
   * condition was encountered.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * Service Unavailable: The server is not ready to handle the request. Common
   * causes include when the server is down for maintenance or overloaded.
   */
  SERVICE_UNAVAILABLE = 503,
}

/**
 * Enum representing different response types of the application.
 */
export const enum APP_RESPONSE_TYPE {
  /**
   * SUCCESS: The application response indicating successful operation or request.
   */
  SUCESS = 'SUCCESS',

  /**
   * WARNING: The application response indicating a warning or non-critical issue.
   */
  WARNING = 'WARNING',

  /**
   * EXCEPTION: The application response indicating an exception or critical error.
   */
  EXCEPTION = 'EXCEPTION',

  /**
   * INFO: The application response containing additional information.
   */
  INFO = 'INFO',
}
