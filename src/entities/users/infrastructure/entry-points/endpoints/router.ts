import { Router as ExpressRouter } from 'express'

import { Controller } from '../controllers'
import { Middleware } from '../middlewares'

export const Router = ExpressRouter()

Router.post('/auth', Controller.authenticate)
Router.get('/refresh', Controller.refreshToken)
Router.get('/logout', Controller.logOut)
Router.post('/', Controller.create)

Router.use(Middleware.verifyToken)

Router.get('/', (_req, res) => {
  res.json({ message: 'Obteniendo el recurso de usuarios' })
})
Router.put('/', (_req, res) => {
  res.json({ message: 'Modificando el recurso de usuarios' })
})
Router.delete('/', (_req, res) => {
  res.json({ messaje: 'Eliminando un nuevo recurso de usuarios' })
})
