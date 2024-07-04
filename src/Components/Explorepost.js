import React, { useEffect, useState } from 'react'
import '../pages/Home.css'
import Post from './Post'

export default function Explorepost() {

    const [currentpage, setCurrentpage] = useState(1);
    const itemsperPage = 10;
    const [dataLoaded, setDataLoaded] = useState(false);
    const [text, setText] = useState('')
    const [searchPost, setSearchPost] = useState('')

    const fetchdata = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
        const Explorepost = await response.json()
        localStorage.setItem('explore', JSON.stringify(Explorepost))
        setDataLoaded(true);
    }

    const Explore = JSON.parse(localStorage.getItem('explore')) || []

    const totalPage = Math.round(Explore.length / itemsperPage)
    const start = (currentpage - 1) * itemsperPage;
    const end = start + itemsperPage;
    const finaldata = Explore.slice(start, end);


    const handleSearch = (e) => {
        setText(e.target.value);
        const post = Explore.filter((item) => (item.title).startsWith(text, 0))
        setSearchPost(post)
        console.log(searchPost)
    }

    useEffect(() => {
        fetchdata();
    }, [])


    return (
        <>
            {dataLoaded && <div div className='home' >
                <div className='searchdiv'>
                    <input className='filter' placeholder='Search' value={text} onChange={handleSearch} />
                </div>


                <div className='homepost'>
                    {(text !== '') ? searchPost.map((post) => <Post post={post} />) : finaldata.map((post) => <Post post={post} />)}
                </div>

                {
                    (text !== '') ? '' : (Explore.length > 10) ?
                        <div className='page'>
                            {(currentpage === 1) ? "" : <button className='pagebtn' onClick={() => setCurrentpage(currentpage - 1)}>Previous</button>}
                            <p className='pagebtn' id='pageno'>{currentpage}</p>
                            {(currentpage === totalPage) ? "" : <button className='pagebtn' onClick={() => setCurrentpage(currentpage + 1)}>Next</button>}
                        </div> : ''
                }



            </div >}
        </>

    )
}
