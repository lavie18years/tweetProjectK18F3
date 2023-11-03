import { error } from 'console'
import { Router } from 'express'
import { access } from 'fs'
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutTokenController,
  registerController,
  resendEmailVerifyController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router()

usersRouter.get('/login', loginValidator, wrapAsync(loginController))

usersRouter.post('/register', registerValidator, wrapAsync(registerController))

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutTokenController)) //ta sẽ thêm middleware sau

usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapAsync(emailVerifyController))

usersRouter.post('/resend-verify-email', accessTokenValidator, wrapAsync(resendEmailVerifyController))

usersRouter.post('/forgot-password', forgotPasswordValidator, wrapAsync(forgotPasswordController))

usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordTokenController)
)

export default usersRouter
