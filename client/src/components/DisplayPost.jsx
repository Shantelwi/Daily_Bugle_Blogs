import React, { useEffect, useState } from 'react';
import {Box} from "@mui/material";
import PostCard from '../components/PostCard';

const DisplayPost = () => {

    const [post, setPost] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch("http://localhost:8000/api/blog/", {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if (res.ok) {
                setPost(data)
            }else{
                console.log(data)
            }
        }
        fetchData()
    },[post])

    return (
        <Box sx={{ maxWidth: "600px", display: "flex", flexDirection: "column", margin: "auto", gap: 3, py:4 }}>
            {post && post.map(post=>(
                <PostCard post={post} key={post._id}/>

                ))}
        </Box>
    )
}

export default DisplayPost