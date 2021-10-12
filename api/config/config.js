import dotenv from 'dotenv'
import fs from 'fs'
import path, { dirname } from 'path'
import { env } from 'process'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

if (env.NODE_ENV === 'production')
  dotenv.config()
else {
  let envPath = path.join(__dirname, '..', '.env.development')
  if (fs.existsSync(envPath))
    dotenv.config({ path: envPath })
  else dotenv.config()
}

const config = {
  env: env.NODE_ENV || 'development',
  frontendOrigin: env.FRONTEND_ORIGIN_DEV || env.FRONTEND_ORIGIN_PROD,
  secretKey: env.SECRET_KEY_DEV || env.SECRET_KEY_PROD,
  mongooseUrl: env.MONGOOSE_DB_DEV || env.MONGOOSE_DB_PROD,
  cloudinary: {
    name: env.CLOUDINARY_NAME_DEV || env.CLOUDINARY_NAME_PROD,
    key: env.CLOUDINARY_API_KEY_DEV || env.CLOUDINARY_API_KEY_PROD,
    secret: env.CLOUDINARY_API_SECRET_DEV || env.CLOUDINARY_API_SECRET_PROD,
  }
}

export default config