import createError from 'http-errors'
import User from '../models/User.js'


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
    const newUser = await User.create(req.body)
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

