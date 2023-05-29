import React from 'react'
import FormCreateUserGroup from '../../CreateUserJs/Form/FormCreateUser';


const UpdateUserJs = () => {
    // Use the `isUpdate` prop to indicate whether it's for creating or updating a user
    const isUpdate = true; // Set to true if it's for updating a user
    return (
        <FormCreateUserGroup isUpdate={isUpdate} />
    )
}

export default UpdateUserJs