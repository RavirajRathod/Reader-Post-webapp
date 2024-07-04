import React from 'react'
import './CreatePost.css'

import { useNavigate } from 'react-router-dom'
import { PostContext } from '../Context/Context'
import { useContext } from 'react'
import { nanoid } from 'nanoid';

import { toast, Bounce } from 'react-toastify'

export default function CreatePost() {

    const { setImage, image, title, setTitle, description, setDescription, postdata, setPostdata, update, setUpdate, index, setIndex } = useContext(PostContext);


    const navigate = useNavigate();

    const uploadImg = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.addEventListener('load', (e) => {
            setImage({ file: reader.result })
        })
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const addpost = () => {
        const post = {
            id: nanoid(),
            title: title,
            description: description,
            file: image.file
        }
        const newpost = [...postdata, post];
        setPostdata(newpost);
        localStorage.setItem('posts', JSON.stringify(newpost))
        setTitle('');
        setDescription('')
        setImage({ file: "" })
        toast.success('New post created!')
        navigate('/')


    }

    // console.log(toast(")

    const updatepost = () => {
        const post = {
            id: nanoid(),
            title: title,
            description: description,
            file: image.file
        }
        postdata[index] = post;
        localStorage.setItem('posts', JSON.stringify(postdata))
        setTitle('');
        setDescription('')
        setImage({ file: "" })
        setIndex('')
        setUpdate(false);
        navigate('/');

    }

    const cancel = () => {
        setTitle('');
        setDescription('')
        setImage({ file: "" })
        setIndex('')
        navigate('/')
        setUpdate(false);

    }

    return (
        <div className='createpost'>

            <div className='postform'>
                <lable className="formlable" type="text" id='titlelable'>Enter Title : </lable>
                <input className='forminput' value={title} onChange={handleTitle} />

                <lable className="formlable">Enter description : </lable>
                <textarea className='formtext' rows={8} value={description} onChange={handleDescription} />

                <lable className="formlable">Choose image : </lable>
                <input type='file' className='fileinput' onChange={uploadImg} />

                <div className='imagediv'>
                    <img src={image.file} className='imagepreview' />
                </div>

                <div className='formbtn'>
                    <button className='cancelcreate' onClick={cancel}>Cancel</button>
                    {(update === false) ? <button className='createbtn' disabled={(title == '' || description == '') ? 'disabled' : ''} onClick={addpost}>Add</button> : <button className='createbtn' onClick={updatepost}>Update</button>}
                </div>

            </div>
        </div>
    )
}
