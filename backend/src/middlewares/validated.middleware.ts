import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import AppError from "../errors";
import { JwtPayload, verify } from "jsonwebtoken";

const body =
    (schema: ZodTypeAny) =>
    (req: Request, resp: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body)

      return next()
    }

const token = (req: Request, resp: Response, next: NextFunction): void => {
    const authorization: string | undefined = req.headers.authorization

    if (!authorization) throw new AppError('Missing bearer token', 401)

    const [_bearer, token] = authorization.split(' ')

    const decoded = verify(token, process.env.SECRET_KEY!) as JwtPayload
  
    resp.locals.credencials = {
        id: decoded.sub,
        permission: decoded.permission,
    }

    return next()
}



export default { 
    body, 
    token 
}