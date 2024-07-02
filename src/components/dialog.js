import {Dialog} from '@reach/dialog'
import React from 'react'
import '@reach/dialog/styles.css'
import { LandingForm } from './landing-form'

const handleSubmit = (formData) => {
  console.log('login', formData)
}

const LandingPageDialog = ({showDialog, handleToggle, formType}) => {
  return (
    <div>
      <Dialog aria-label={`${formType} form`} isOpen={showDialog} onDismiss={handleToggle}>
        <button onClick={handleToggle}>
          <span aria-hidden>x</span>
        </button>
        <LandingForm handleSubmit={handleSubmit} formType={formType}/>

      </Dialog>
    </div>
  )
}

export {LandingPageDialog}
