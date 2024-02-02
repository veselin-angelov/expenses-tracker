export const JWT_CONFIG_KEY = 'jwt';
export type JwtConfig = {
  expiryTime: number;
  secretKey: string;
};

export const jwt = (): { [JWT_CONFIG_KEY]: JwtConfig } => ({
  [JWT_CONFIG_KEY]: {
    expiryTime: Number(process.env.JWT_EXPIRY_TIME),
    secretKey: process.env.JWT_SECRET as string,
  },
});
