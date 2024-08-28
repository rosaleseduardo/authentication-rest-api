import { Router } from 'express'
import { EntryPoint } from 'entities/users/infrastructure/entry-points'

const ROUTER = Router()

ROUTER.use('/users', EntryPoint.Router)

export default ROUTER
