import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

interface EnvConfig {
  PORT: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  PLATFORM_ADMIN_NAME: string;
  PLATFORM_ADMIN_EMAIL: string;
  PLATFORM_ADMIN_PASSWORD: string;
  BCRYPT_SALT_ROUND: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredVariables: string[] = [
    "PORT",
    "DATABASE_URL",
    "PLATFORM_ADMIN_EMAIL",
    "PLATFORM_ADMIN_NAME",
    "PLATFORM_ADMIN_PASSWORD",
    "BCRYPT_SALT_ROUND",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_EXPIRES_IN",
  ];
  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing env variables ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    PLATFORM_ADMIN_NAME: process.env.PLATFORM_ADMIN_NAME as string,
    PLATFORM_ADMIN_EMAIL: process.env.PLATFORM_ADMIN_EMAIL as string,
    PLATFORM_ADMIN_PASSWORD: process.env.PLATFORM_ADMIN_PASSWORD as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  };
};

export const envVariables = loadEnvVariables();
