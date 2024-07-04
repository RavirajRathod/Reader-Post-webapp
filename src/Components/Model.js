import React, { useContext } from 'react'
import './Model.css'
import { PostContext } from '../Context/Context'
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function Logout() {

    const { logoutpage, setLogoutpage, setLogindata, deletenow, setDeletenow, deletepost } = useContext(PostContext);

    const navigate = useNavigate();

    const logout = () => {
        setLogoutpage(false);
        navigate('/login')
        setLogindata({ username: '', role: '', contact: '', otp: '' })
        localStorage.removeItem('readerlogin');

    }

    const cancel = () => {
        setLogoutpage(false);
        setDeletenow(false);

    }

    const backdrop = () => {
        setLogoutpage(false)
        setDeletenow({ state: false, id: '' })
    }

    const deletePost = () => {
        deletepost(deletenow.id);
        navigate('/')
        toast('Post deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
        })
    }



    return (
        <div className='Logout'>

            <div className='backdrop' onClick={backdrop}> </div>
            <div className='logoutmenu'>
                <div className='logoutpopup'>
                    <p className='logouthead'>{(logoutpage) ? `Are you sure to logout?` : (deletenow.state) ? `Are you sure to delete this post?` : ''}</p>

                    <div className='confirmbtn'>
                        <button className='cancellogout' onClick={cancel}>Cancel</button>
                        {(logoutpage) ? <button className='confirmlogout' onClick={logout}>Logout</button> : (deletenow.state) ? <button className='confirmlogout' onClick={deletePost}>Delete</button> : ''}
                    </div>
                </div>

            </div>
        </div>
    )
}
