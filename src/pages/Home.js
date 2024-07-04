import React, { useContext, useEffect } from 'react'
import Post from '../Components/Post'
import './Home.css'
import { PostContext } from '../Context/Context'
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
    const { postdata, setExplore } = useContext(PostContext);

    useEffect(() => {
        setExplore(false)
    }, [])

    return (
        <>

            <div className='home'>

                <div className='homepost' >

                    {(postdata.length == 0) ? <h1 className='postinfo'>No Post yet.</h1> : postdata.map((post) => <Post post={post} />)}


                </div>
                {/* {(postdata.length > 10) ?
                    <div className='page'>
                        <button className='pagebtn'>Previous</button>
                        <p className='pagebtn' id='pageno'>1</p>
                        <button className='pagebtn'>Next</button>
                    </div> : ''
                } */}
            </div >


        </>
    )
}
