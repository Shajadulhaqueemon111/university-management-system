import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycript_salt_rounded: process.env.BYCRIPT_SALT_ROUNDED,
  default_password: process.env.DEFAULT_PASSWOED,
  jwt_access_secreet: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires: process.env.JWT_EXPIRES_IN,
  jwt_refress_secreet: process.env.JWT_REFRESH_SECRET,
  jwt_refress_expires: process.env.JWT_REFRESH_EXPIRES_IN,
  rest_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  gmail_app_pass_key: process.env.GMAIL_APP_PASS_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
