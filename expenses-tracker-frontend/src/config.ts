const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID;

if (!serverBaseUrl) {
  throw new Error('Please specify VITE_SERVER_BASE_URL');
}

if (!googleClientId) {
  throw new Error('Please speicfy VITE_GOOGLE_LOGIN_CLIENT_ID');
}

export const config = {
  serverBaseUrl: serverBaseUrl as string,
  googleClientId: googleClientId as string,
};
