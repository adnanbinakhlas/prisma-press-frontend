const env = {
  api_url: process.env.NEXT_PUBLIC_BACKEND_API_URL as string,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
};

export default env;
