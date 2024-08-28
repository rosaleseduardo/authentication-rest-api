import chalk from 'chalk'

import { Enum, type Log } from '../../../../domain'

/**
 * Defines the background color for successful output.
 */
const successOutput = chalk.bgGreenBright
/**
 * Defines the background color for warning output.
 */
const warningOutput = chalk.bgYellowBright
/**
 * Defines the background color for error output.
 */
const errorOutput = chalk.bgRedBright
/**
 * Defines the background color for info output.
 */
const infoOutput = chalk.bgBlueBright

function success(message: string): void {
  console.log(successOutput(`${chalk.bold(Enum.APP_RESPONSE_TYPE.SUCESS)}: ${message}`))
}

function warning(message: string): void {
  console.log(warningOutput(`${chalk.bold(Enum.APP_RESPONSE_TYPE.WARNING)}: ${message}`))
}

function exception(message: string): void {
  console.log(errorOutput(`${chalk.bold(Enum.APP_RESPONSE_TYPE.EXCEPTION)}: ${message}`))
}

function info(message: string): void {
  console.log(infoOutput(`${chalk.bold(Enum.APP_RESPONSE_TYPE.INFO)}: ${message}`))
}

/** Outputs the response from a process */
export const AppResponseLog: Log.AppResponseDefinition = {
  success,
  warning,
  exception,
  info
}
