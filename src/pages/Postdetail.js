import React, { useContext } from 'react'
import './Postdetail.css'
import photo from './photo.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { PostContext } from '../Context/Context'

export default function Postdetail() {

    const { postdata, logindata, editPost, deletepost, setDeletenow } = useContext(PostContext);

    const navigate = useNavigate();

    const { postId } = useParams();

    const post = postdata.find((item) => item.id == postId);
    console.log(post);

    const edit = () => {
        editPost(post.id);
        navigate('/create_post');
    }


    return (
        <>
            <div className='detailedpost'>
                <div className='item'>
                    <div className='imgdiv'>
                        {(post.file == '') ? <p className='imgfall'>Image is not awailable.</p> : <img src={post.file} className='postimg' />}
                    </div>

                    <div className='postdetail'>
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>

                        {(logindata.role == 'admin') ? <div className='postaction'>
                            <button className='editaction' onClick={edit} >Edit</button>
                            <button className='deleteaction' onClick={() => setDeletenow({ state: true, id: post.id })} >Delete</button>
                        </div> : ''}

                    </div>
                </div>
            </div>

        </>
    )
}
