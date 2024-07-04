import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute(props) {

    const Login = JSON.parse(localStorage.getItem('readerlogin')) || false

    return (
        <>
            {
                !Login ?
                    <Navigate to='/login' />
                    : Login && props.children
            }

        </>
    )
}
