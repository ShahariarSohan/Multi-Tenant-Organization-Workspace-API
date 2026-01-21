/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import bcrypt from "bcrypt";

import { jwtHelpers } from "../../utils/jwtHelpers";

import { Secret } from "jsonwebtoken";

import AppError from "../../errorHelpers/AppError";
import { envVariables } from "../../config/env";
import { prisma } from "../../config/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid user or email");
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    envVariables.ACCESS_TOKEN_SECRET as Secret,
    envVariables.ACCESS_TOKEN_EXPIRES_IN as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    envVariables.REFRESH_TOKEN_SECRET as Secret,
    envVariables.REFRESH_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


export const authService = {
  loginUser,
};
