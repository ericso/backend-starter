export default {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  SECRET: process.env.SECRET,
};

export const sequelizeConfig = {
  databaseUrl: process.env.DATABASE_URL,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  params: {
    host: process.env.DATABASE_HOST,
    dialect: process.env.SQL_DIALECT,
  },
};
