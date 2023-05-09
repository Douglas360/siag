import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string
}

export function auth(req: Request, res: Response, next: NextFunction) {
    // Check if the JWT_SECRET environment variable is set
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET environment variable is not set' });
    }

    //receber o token
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).json({ error: 'Token was not provided' }).end()

    }

    const [, token] = authToken.split(" ")

    //validar token
    try {
        verify(token, process.env.JWT_SECRET!) as Payload


        return next()

    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' }).end()
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid Token' }).end()
            }
            return res.status(500).json({ error: 'An error occurred while verifying the token' }).end()
        }

    }
}