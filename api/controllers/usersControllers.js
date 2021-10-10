import createError from 'http-errors'
import User from '../models/User.js'
import cloudinary from 'cloudinary'


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('username')
    res.json(users)
  } catch (err) {
    next(err)    
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { avatar, ...userData } = req.body
    // uploading image on cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(avatar, {
      overwrite: true,
      invalidate: true,
      width: 600, height: 400, crop: "fill"
    })
    if (uploadResponse.error) {
      return new Error(`Ups! Something went wrong`)
    }
    const newUser = await User.create({
      ...userData,
      avatar: uploadResponse.secure_url
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)
    if (!user) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      {new: true}
    )
    if(!user) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) throw new createError(
      404,
      `Email not valid`
    )
    if (user.password !== password) 
      throw new createError(
        404,
        `Password not valid`
      )
    res.json(user)  
  } catch (err) {
    next(err)
  }
}

