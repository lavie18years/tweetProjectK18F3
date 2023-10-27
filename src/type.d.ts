// file này dùng để định nghĩa lại request truyền lên
import User from './models/schemas/User.schema'
import { Request } from 'express'

declare module 'express' {
  interface Request {
    user?: User //thêm ? vì k phải request nào cũng có user
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
