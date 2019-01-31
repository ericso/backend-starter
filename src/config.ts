export default {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  SECRET: process.env.SECRET,
};

export const sequelizeConfig = {
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  params: {
    dialect: process.env.SQL_DIALECT,
  },
};
