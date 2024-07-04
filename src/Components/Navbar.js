import React, { useContext } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { PostContext } from '../Context/Context';
import Model from './Model';
import { createPortal } from 'react-dom'

export default function Navbar() {

    const navigate = useNavigate();

    const { logindata, setExplore, setLogoutpage, logoutpage, deletenow } = useContext(PostContext);
    const created = () => {
        setExplore(false);
        navigate('/');
    }

    const exploremore = () => {
        setExplore(true);
        navigate('explore_post');
    }

    const page = window.location.pathname;
    console.log(page);

    return (
        <div className='navbar'>
            <div>
                <h1 className='title'>Reader</h1>
            </div>
            <div className='create'>
                {(logindata.role == 'admin') ? <p className='navitems' id={(page == '/create_post') ? 'item' : ''} onClick={() => navigate('create_post')}>CreatePost</p> : ''}
                <p className='navitems' id={(page == '/') ? 'item' : ''} onClick={created}>Created</p>
                <p className='navitems' id={(page == '/explore_post') ? 'item' : ''} onClick={exploremore}>Explore</p>
            </div>

            {(logoutpage || deletenow.state) && <div className='log'>{createPortal(<Model />, document.getElementById("modal"))}</div>}

            <div className='navbtn'>
                <button className='logoutbtn' onClick={() => setLogoutpage(true)}>Logout</button>
            </div>
        </div >
    )
}
