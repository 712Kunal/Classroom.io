import dotenv from "dotenv";
dotenv.config();

const ENV_VARIABLES = {
  CLIENT_URL: process.env.CLIENT_URL,
  PORT: process.env.PORT,
};

export default ENV_VARIABLES;
