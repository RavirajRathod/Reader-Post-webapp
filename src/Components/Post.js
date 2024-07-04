import React, { useContext } from 'react'
import '../pages/Home.css'
import { PostContext } from '../Context/Context'
import { useNavigate } from 'react-router-dom';

export default function Post({ post }) {
    const { editPost, explore, logindata, setDeletenow } = useContext(PostContext);
    const navigate = useNavigate();



    const description = post.description || post.body

    const redirect = () => {
        if (explore === false) {
            navigate(`post/${post.id}`)

        }
    }
    const edit = () => {
        editPost(post.id);
        navigate('create_post')
    }

    return (
        <div className='post' >
            <div>
                <div onClick={redirect}>
                    <div className='imageport' >
                        {!explore && <div>
                            {(post.file === '' || !post.file) ? <div className='imagefallback'><p>Image is not awailable</p></div> : <img src={post.file} className='img' />}
                        </div>}
                        {explore && <div > <img src={`http://picsum.photos/id/${post.id}/530/300`} className='img' /></div>}


                    </div>

                    <h2>{post.title}</h2>
                    <div className='description'>
                        <p>{description.slice(0, 120)}{(description.length > 120) ? '...' : ''} </p>
                    </div>

                </div>
                {
                    (explore === false && logindata.role === 'admin') ? <div className='postaction'>
                        <button className='editaction' onClick={edit}>Edit</button>
                        <button className='deleteaction' onClick={() => setDeletenow({ state: true, id: post.id })}>Delete</button>
                    </div> : ''
                }

            </div>
        </div >

    )
}
