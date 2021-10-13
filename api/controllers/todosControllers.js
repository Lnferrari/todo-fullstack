import createError from 'http-errors'
import Todo from '../models/Todo.js'


export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({
      userId: req.params.id
    }).sort('completed').sort('deadline')
    res.json(todos)
  } catch (err) {
    next(err)
  }
}

export const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body)
    const populatedTodo = await Todo.findOne({
      _id: todo._id
    }).populate('userId')
    res.json(populatedTodo)
  } catch (err) {
    next(err)
  }
}

export const getTodo = async (req, res, next) => {
  try {
    const {id, todoId} = req.params
    const todo = await Todo.findOne({
      userId: id,
      _id: todoId
    })
    if (!todo) throw new createError(
      404,
      `No todo with id: ${todoId} can be found.`
    )
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

export const updateTodo = async (req, res, next) => {
  try {
    const {id, todoId} = req.params
    const todo = await Todo.findByIdAndUpdate(
      {userId: id, _id: todoId},
      req.body,
      {new: true}
    )
    if (!todo) throw new createError(
      404,
      `No todo with id: ${todoId} can be found.`
    )
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

export const deleteTodo = async (req, res, next) => {
  try {
    const {id, todoId} = req.params
    const todo = await Todo.findOneAndDelete({
      userId: id,
      _id: todoId
    })
    if (!todo) throw new createError(
      404,
      `No todo with id: ${todoId} can be found.`
    )
    res.json(todo)
  } catch (err) {
    next(err)
  }
}