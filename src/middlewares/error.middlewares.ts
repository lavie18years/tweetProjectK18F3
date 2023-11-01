import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Error'

export const defaultErrorHandle = (err: any, req: Request, res: Response, next: NextFunction) => {
  // đây là nơi mà tất cả những lỗi trên toàn hệ thống sẽ dồn về
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }
  // nếu mà lỗi xuống đc đây
  Object.getOwnPropertyNames(err).forEach((key) => {
    // for in ko duyệt đc enumerable là false
    Object.defineProperty(err, key, { enumerable: true })
  })
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfor: omit(err, ['stack'])
    // ko cho quăng stack vì nó chứa nhiều thông tin nguy hiểm
  })
}
