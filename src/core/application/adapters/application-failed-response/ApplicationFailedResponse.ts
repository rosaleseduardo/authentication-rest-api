import { type Response } from '../../../domain'

export function ApplicationFailedResponse(
  httpStatusCode: number,
  message: string
): Response.ApplicationFailedOutput {
  return {
    httpStatusCode,
    data: {
      message
    }
  }
}
