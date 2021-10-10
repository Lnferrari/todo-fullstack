import React, { useState } from 'react'
import Resizer from "react-image-file-resizer";
import { useHistory } from 'react-router';
import { signupUser, loginUser } from '../helpers/apiCalls';

const initialState = {
  email: '',
  password: ''
}

const Form = ({formType}) => {
  const [ inputs, setInputs ] = useState(initialState)

  let history = useHistory()

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const fileHandler = async (e) => {
    const file = e.target.files[0]
    const image = await resizeFile(file)
    setInputs({
      ...inputs,
      avatar: image
    })
  };

  const handleInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userApi = {}
    try {
      if (formType === 'signup') {
        userApi = await signupUser(inputs)
      } else {
        userApi = await loginUser(inputs)
      }

      if (!userApi.error) {
        history.push('/dashboard')
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        formType === 'signup'
        ? <>
          <div className="input-container avatar">
            <label htmlFor="avatar">
              <img src={inputs.avatar || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sqhUFRHRSP73IW9-wcDMcQHaHa%26pid%3DApi&f=1'} alt="avatar" />
                {!inputs.avatar && <p>Choose an avatar</p>}
              </label>
            <input type="file" accept='image/*' name="avatar" id="avatar" onChange={fileHandler}/>
          </div>
          <div className="input-container">
            <input type="text" name="firsname" placeholder='First Name' autoComplete='off' onChange={handleInput} required />
            <input type="text" name="lastname" placeholder='Last Name' autoComplete='off' onChange={handleInput} required />
          </div>
          </>
        : <div className="input-container">
            <img src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sqhUFRHRSP73IW9-wcDMcQHaHa%26pid%3DApi&f=1'} alt="avatar" />
          </div>
      }

      <div className="input-container">
        <input type="email" name="email" placeholder='Email' autoComplete='off' onChange={handleInput} required />
      </div>

      <div className="input-container">
        <input type="password" placeholder='Password' name="password" autoComplete='off' onChange={handleInput} required />
      </div>

      <button type="submit">
        ENTER
      </button>

    </form>
  )
}

export default Form
