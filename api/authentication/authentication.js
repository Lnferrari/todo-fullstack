import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const auth = async (req, res, next) => {

  const token = req.cookies.token

  try {
    const decoded = jwt.verify(token, config.secretKey)
    const user = await User.findOne({
      _id: decoded._id,
      email: decoded.email
    })
    if (!user) next(new Error(`Authentication failed.`))
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
  
}

export default auth