import "dotenv/config";
import { SignOptions } from "jsonwebtoken";

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

function getEnvNumber(key: string): number {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  const parsed = Number(value);

  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }

  return parsed;
}

export const env = {
  node: getEnv("NODE_ENV"),
  port: getEnvNumber("PORT"),

  bcrypt: {
    saltRounds: getEnvNumber("SALT_ROUNDS"),
  },

  db: {
    host: getEnv("DB_HOST"),
    port: getEnvNumber("DB_PORT"),
    name: getEnv("DB_NAME"),
    user: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
  },

  jwt: {
    accessSecret: getEnv("JWT_ACCESS_SECRET"),
    refreshSecret: getEnv("JWT_REFRESH_SECRET"),
    accessExpiresIn: getEnv(
      "JWT_ACCESS_EXPIRES_IN",
    ) as SignOptions["expiresIn"],
    refreshExpiresIn: getEnv(
      "JWT_REFRESH_EXPIRES_IN",
    ) as SignOptions["expiresIn"],
  },

  zeroUUID: getEnv("ZERO_UUID")
};
