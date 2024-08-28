import type { Enum, Response } from '../../../domain'

export function DataSourceResponse<T>(
  httpStatusCode: Enum.SUCCESSFUL_HTTP_STATUS_CODE,
  message: string,
  dataSource: T
): Response.DataSourceOutput<T> {
  return {
    httpStatusCode,
    data: {
      message,
      dataSource
    }
  }
}
