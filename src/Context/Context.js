import React, { useState } from 'react'
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';


export const PostContext = createContext();


export const PostContextProvider = (props) => {
    const [logindata, setLogindata] = useState(JSON.parse(localStorage.getItem('readerlogin')) ||
    {
        username: '',
        role: '',
        contact: '',
        otp: ''

    }

    );
    const [image, setImage] = useState({ file: "" });
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [postdata, setPostdata] = useState(JSON.parse(localStorage.getItem('posts')) || '');
    const [index, setIndex] = useState()
    const [explore, setExplore] = useState(true)
    const [update, setUpdate] = useState(false)
    const [logoutpage, setLogoutpage] = useState(false)
    const [deletenow, setDeletenow] = useState({ state: false, id: '' })



    const editPost = (id) => {
        setUpdate(true);
        const post = postdata.find((item) => item.id === id);
        const n = postdata.indexOf(post);
        setIndex(n);
        setTitle(post.title);
        setDescription(post.description);
        setImage({ file: post.file })
    }

    const deletepost = (id) => {
        const post = postdata.filter((item) => item.id !== id);
        console.log(post);
        setPostdata(post);
        localStorage.setItem('posts', JSON.stringify(post))
        setDeletenow(false);
    }

    const context = { deletenow, setDeletenow, editPost, deletepost, logindata, setLogindata, image, setImage, postdata, setPostdata, title, setTitle, description, setDescription, update, setUpdate, index, setIndex, explore, setExplore, logoutpage, setLogoutpage };

    return <PostContext.Provider value={context}>{props.children}</PostContext.Provider>
}