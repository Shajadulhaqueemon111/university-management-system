import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycript_salt_rounded: process.env.BYCRIPT_SALT_ROUNDED,
  default_pass: process.env.DEFAULT_PASS,
};
