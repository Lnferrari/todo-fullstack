import mongoose from 'mongoose'

const {Schema, model} = mongoose

const TodoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {type: String, required: true},
  body: {type: String},
  deadline: {type: Date},
  priority: {
    type: String,
    enum: ['None', 'Low', 'Medium', 'High'],
    default: 'None'
  },
  completed: {type: Boolean, default: false}
},
{
  timestamps: true,
  versionKey: false,
})


const Todo = model('Todo', TodoSchema)

export default Todo