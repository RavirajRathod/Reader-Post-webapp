import React from 'react'
import { Link } from 'react-router-dom'

export default function Errorpage() {
    return (
        <div className='errorpage'>
            <h1>404 Error!</h1>
            <p>Page note found&#128546;</p>
            <p className='redirect'>Go to  <Link to='/' className='errorhome'>Home</Link>  Page.</p>
        </div>
    )
}
