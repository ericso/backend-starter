const config = {
    PORT: parseInt(process.env.PORT, 10) || 5000,
    DATABASE: process.env.DATABASE,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    SECRET: process.env.SECRET,
  };

export default config;
