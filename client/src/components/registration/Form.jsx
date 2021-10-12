import React, { useState } from 'react'
import Resizer from "react-image-file-resizer";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { signupUser, loginUser } from '../../helpers/apiCalls';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl } from '@mui/material';
import { setUser } from '../../redux/userSlice';

const initialState = {
  email: '',
  password: ''
}

const Form = ({formType}) => {
  const [ inputs, setInputs ] = useState(initialState)
  const [ showPassword, setShowPassword ] = useState(false)

  const dispatch = useDispatch()

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
        dispatch(setUser(userApi))
        history.push('/dashboard')
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box component="form" fullWidth onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {
          formType === 'signup'
          ? <>
            <FormControl fullWidth sx={{ m: 1, textAlign: 'center' }} variant="standard">
              <label htmlFor="avatar" sx={{ }}>
                <img src={inputs.avatar || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sqhUFRHRSP73IW9-wcDMcQHaHa%26pid%3DApi&f=1'} alt="avatar" className='form-avatar' />
                  {!inputs.avatar && <p className='italic'>Choose an avatar</p>}
                </label>
              <input type="file" accept='image/*' name="avatar" id="avatar"
              className='hidden'
              onChange={fileHandler}/>
            </FormControl>
              <TextField
                required
                fullWidth
                autoFocus
                sx={{ m: 1, width: '21ch' }}
                variant='standard'
                name="firstname"
                label='First Name'
                onChange={handleInput}
              />
            <FormControl sx={{ m: 1, width: '21ch' }}>
              <TextField
                required
                fullWidth
                variant='standard'
                name="lastname"
                label='Last Name'
                onChange={handleInput}
              />
            </FormControl>
            </>
          : <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <img src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sqhUFRHRSP73IW9-wcDMcQHaHa%26pid%3DApi&f=1'} alt="avatar"
              className='form-avatar'/>
            </FormControl>
        }

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor='email'>
            Email *
          </InputLabel>
          <Input
            required
            fullWidth
            variant='standard'
            id="email"
            name="email"
            label='Email'
            onChange={handleInput}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor='password'>
            Password *
          </InputLabel>
          <Input
            required
            fullWidth
            variant='standard'
            id="password"
            type={showPassword ? 'text' : 'password'}
            label='Password'
            name="password"
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          type='submit'
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color='success'
        >
          ENTER
        </Button>
      </Grid>
    </Box>
  )
}

export default Form
