import React, { useContext, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { PostContext } from '../Context/Context';
import photo from '../accets/logoimage.jpg'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Login() {

    const navigate = useNavigate();

    const { logindata, setLogindata } = useContext(PostContext);

    const Login = () => {

        navigate('/')
        localStorage.setItem('readerlogin', JSON.stringify(logindata))

    }

    const handleonchange = (e) => {
        setLogindata((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const [token, setToken] = useState()

    const getOtp = () => {
        const random = Math.random() * 9000;
        const token = Math.floor(1000 + random);
        setToken(token);
        // window.alert("OTP is " + token);
        toast('OTP is  ' + token)
        console.log(token);

    }

    const [touchuser, setTouchuser] = useState(false);
    const [touchcontact, setTouchcontact] = useState(false);
    const [touchotp, setTouchotp] = useState(false);


    const invalidUser = touchuser && (logindata.username === '')
    const invalidContact = touchcontact && (logindata.contact === '')
    const invalidContactlength = touchcontact && (logindata.contact !== '') && (((logindata.contact).length) !== 10)
    const invalidOtp = touchotp && (logindata.otp === '')
    const invalidmatch = touchotp && (logindata.otp !== '') && (logindata.otp != token)

    const validUser = touchuser && (logindata.username !== '');
    const validContact = touchcontact && (logindata.contact !== '') && (((logindata.contact).length) === 10);
    const validotp = touchotp && (logindata.otp !== '')
    const validmatch = (logindata.otp == token)

    return (
        <div className='login'>
            <ToastContainer position='top-center' theme='dark' autoClose={8000} />
            <div className='lpage'>
                <img src={photo} className='loginphoto' />
                <div className='loginpage'>
                    <div>
                        <h1 className='loginhead'>Reader</h1>
                    </div>
                    <div className='loginitems'>
                        <div className='items'>
                            <lable className="lable">Username: </lable>
                            <input className='userinput' type='text' value={logindata.username} name='username' onChange={handleonchange} onBlur={() => setTouchuser(true)} />
                        </div>
                        {invalidUser && <p className='error'>Username is Required.</p>}

                        <div className='items'>
                            <lable className="lable">Select role: </lable>
                            <span className='radio'>Admin</span>
                            <input className='select' type='radio' name="role" value={'admin'} onChange={handleonchange} />
                            <span className='radio'>User</span>
                            <input className='select' type='radio' name="role" value={'user'} onChange={handleonchange} />
                        </div>


                        <div className='items'>
                            <lable className="lable">Contact no:</lable>
                            <input className='userinput' type='number' value={logindata.contact} name='contact' onChange={handleonchange} onBlur={() => setTouchcontact(true)} />
                        </div>
                        {invalidContact && <p className='error'>Contact is Required.</p>}
                        {invalidContactlength && <p className='error'>Contact must contain 10 numbers.</p>}

                        <div className='items'>
                            <lable className="lable">Verification:</lable>
                            <input className='userinput' id='otp' type='number' value={logindata.otp} name='otp' onChange={handleonchange} onBlur={() => setTouchotp(true)} />
                            <button className='otpbtn' onClick={getOtp}>Get OTP</button>
                        </div>
                        {invalidOtp && <p className='error'>OTP is Required.</p>}
                        {invalidmatch && <p className='error'>OTP does't Match.</p>}
                    </div>

                    <div>
                        <button className='loginbtn' disabled={((logindata.role !== '') && validContact && validUser && validotp && validmatch) ? '' : 'disabled'} onClick={Login}>Login</button>
                    </div>

                </div>


            </div>
        </div >
    )
}
