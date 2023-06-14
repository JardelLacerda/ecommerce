import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';
import AppError from "../errors";
import { QueryFailedError } from "typeorm";

const handleError = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: error.message });
  }

  if(error instanceof QueryFailedError){
    return res.status(400).json({ message: error.message });
  }

  if(error instanceof SyntaxError){
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default handleError