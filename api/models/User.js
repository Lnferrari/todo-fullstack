import mongoose from 'mongoose'

const {Schema, model} = mongoose

const UserSchema = new Schema({
  avatar: {
    type: String,
    default: 'https://mldpyw8anemv.i.optimole.com/w:364/h:205/q:90/rt:fill/g:ce/https://149368935.v2.pressablecdn.com/wp-content/uploads/2019/12/Baby-Yoda-364x205.jpg'
  },
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
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


const User = model('User', UserSchema)

export default User