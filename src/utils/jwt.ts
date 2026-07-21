import jwt, { JwtPayload, JsonWebTokenError } from "jsonwebtoken";

export const verifyToken = (token: string, secretKey: string) => {
  try {
    const decode = jwt.verify(token, secretKey);
    return { success: true, data: decode as JwtPayload };
  } catch (error: unknown) {
    return { success: false, error: error as JsonWebTokenError };
  }
};
