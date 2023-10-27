import { error } from 'console'
import { Router } from 'express'
import { access } from 'fs'
import { loginController, logoutTokenController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const usersRoute = Router()

usersRoute.get('/login', loginValidator, wrapAsync(loginController))

usersRoute.post('/register', registerValidator, wrapAsync(registerController))

/*
  des: lougout
  path: /users/logout
  method: POST
  Header: {Authorization: 'Bearer <access_token>'}
  body: {refresh_token: string}
  */
usersRoute.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutTokenController)) //ta sẽ thêm middleware sau
export default usersRoute
