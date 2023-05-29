import React from 'react'
import FormCreateUser from './Form/FormCreateUser'

const CreateUserJs = () => {
  // Use the `isUpdate` prop to indicate whether it's for creating or updating a user
  const isUpdate = false; // Set to true if it's for updating a user
  return (
    <FormCreateUser isUpdate={isUpdate} />
  )
}

export default CreateUserJs