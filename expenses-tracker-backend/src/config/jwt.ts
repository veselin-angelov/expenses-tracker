export const JWT_CONFIG_KEY = 'jwt';
export type JwtConfig = {
  secretKey: string;
  expiryTime: string;
  refreshTokenExpiryTime: string;
};

export const jwt = (): { [JWT_CONFIG_KEY]: Partial<JwtConfig> } => ({
  [JWT_CONFIG_KEY]: {
    secretKey: process.env.JWT_SECRET as string,
    expiryTime: process.env.JWT_EXPIRY_TIME as string,
    refreshTokenExpiryTime: process.env.JWT_REFRESH_EXPIRY_TIME as string,
  },
});
