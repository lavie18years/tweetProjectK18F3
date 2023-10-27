import express, { NextFunction, Request, Response } from 'express'
import usersRoute from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandle } from './middlewares/error.middlewares'
const app = express()
app.use(express.json())
const port = 3000
databaseService.connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', usersRoute)
// http://localhost:3000/users/tweets

app.use(defaultErrorHandle)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})
