import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, SpeedDial, SpeedDialIcon } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [blog, setBlog] = useState({ title: "", content: "", image: "" })
    const navigator = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value })
    }

    const handleSubmit = async () => {
        console.log(blog);
        const res = await fetch("http://localhost:8000/api/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        if (res.ok) {
            console.log(data);
            alert("blog created successfully")
            setBlog({ title: "", content: "", image: "" })
            navigator("/")
        } else {
            console.log(data);
        }
    }

    return (
        <div>

            <Card sx={{ p: 4, py: 5, maxWidth: "680px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }} elevation={15}>
                <CardContent sx={{ m: 0 }}>
                    <Typography gutterBottom variant="h4" component="div" sx={{ m: 0, textAlign: "center" }}>
                        Create your post Here!
                    </Typography>
                </CardContent>
                <TextField id="filled-basic" label="title" variant="filled" name="title" onChange={handleChange} value={blog.title} />
                <TextField id="filled-basic" label="imageURL" variant="filled" name="image" onChange={handleChange} value={blog.image} />
                <TextField id="filled-basic" label="content" variant="filled" name="content" rows={8} onChange={handleChange} value={blog.content} multiline />
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<SpeedDialIcon />}
                    onClick={handleSubmit}
                />
            </Card>
        </div>
    )
}

export default CreatePost