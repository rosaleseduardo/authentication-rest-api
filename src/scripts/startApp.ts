import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

import { Implementation } from '../core/infrastructure/implementations'

const envFile = path.join(__dirname, '../../') + '.env'

if (fs.existsSync(envFile)) {
  Implementation.Util.AppResponseLog.info('Starting the app')
  execSync(
    'ts-node-dev -r tsconfig-paths/register ./src/scripts/startApiRestServices.ts',
    {
      stdio: 'inherit'
    }
  )
}

Implementation.Util.AppResponseLog.exception('Please, create your .env file, it is required to continue\n')
Implementation.Util.AppResponseLog.info('App was stopped\n')
