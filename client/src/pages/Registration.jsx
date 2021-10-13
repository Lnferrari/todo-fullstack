import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Form from '../components/registration/Form'

const Registration = () => {
  const [ formType, setFormType ] = useState('signup')

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ButtonGroup sx={{ display: 'flex', alignItems: 'center'}} disableElevation>
          <Button
            fullWidth
            variant={`${formType === 'signup' ? 'contained' : 'outlined'}`}
            onClick={() => setFormType('signup')}
          >
            Sign up
          </Button>
          <Button
            fullWidth
            variant={`${formType === 'signup' ? 'outlined' : 'contained'}`}
            onClick={() => setFormType('login')}
          >
            Log In
          </Button>
        </ButtonGroup>
        <Form formType={formType} />
      </Box>
    </Container>
  )
}

export default Registration
