import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import 'express-async-errors'
import cors from 'cors'
require('dotenv')
import * as dotenv from 'dotenv'
import { router } from './routes'
dotenv.config()

const app = express()

// Add this middleware to parse JSON data
app.use(bodyParser.json());

app.use(express.json())
//app.use(express.static('public'));//<=

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions))

app.use(router)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            eror: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error.'

    })
})


app.listen(3001, () => {
    console.log("Rodando na porta 3001")
})