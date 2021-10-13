import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const {Schema, model} = mongoose

const UserSchema = new Schema({
  avatar: {
    type: String,
    default: 'https://mldpyw8anemv.i.optimole.com/w:364/h:205/q:90/rt:fill/g:ce/https://149368935.v2.pressablecdn.com/wp-content/uploads/2019/12/Baby-Yoda-364x205.jpg'
  },
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
},
{
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, returnDoc) => {
      delete returnDoc.password
    }
  }
})

UserSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  user.password = bcrypt.hashSync( user.password, 10 )
  console.log('saved user with hashed pw =>', user)
  next()
})

UserSchema.methods.generateToken = function () {
  const user = this
  const token = jwt.sign(
    {_id: user._id, email: user.email},
    config.secretKey,
    {expiresIn: '1d'}
  )
  return token
}

const User = model('User', UserSchema)

export default User