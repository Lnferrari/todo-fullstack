import React, { useState } from 'react'
import Form from '../components/Form'

const Registration = () => {
  const [ formType, setFormType ] = useState('signup')

  return (
    <section className='page-wrapper' id='registration'>
      <div className="form-container">
        <div className="buttons-container">
          <button onClick={() => setFormType('signup')}>
            Sign up
          </button>
          <button onClick={() => setFormType('login')}>
            Log In
          </button>
        </div>
        <Form formType={formType} />
      </div>
    </section>
  )
}

export default Registration
