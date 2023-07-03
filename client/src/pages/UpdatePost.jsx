import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, SpeedDial } from "@mui/material";
import { Add } from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
    const [blog, setBlog] = useState({ title: "", content: "", image: "" });
    const { id } = useParams()
    const navigator = useNavigate()

    useEffect(() => {
        const fetchOneBlog = async () => {
            const res = await fetch("http://localhost:8000/api/blog/" + id, {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if (res.ok) {
                setBlog(data)
            } else {
                console.log(data)
            }
        }
        fetchOneBlog()
    }, [id])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value })
    }

    const handleSubmit = async () => {
        console.log(blog);
        const res = await fetch("http://localhost:8000/api/blog/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        if (res.ok) {
            console.log(data);
            alert("blog updated successfully")
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
                        Update Blog!
                    </Typography>
                </CardContent>
                <TextField id="filled-basic" label="title" variant="filled" name="title" onChange={handleChange} value={blog.title} />
                <TextField id="filled-basic" label="imageURL" variant="filled" name="image" onChange={handleChange} value={blog.image} />
                <TextField id="filled-basic" label="content" variant="filled" name="content" rows={8} onChange={handleChange} value={blog.content} multiline />
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<Add />}
                    onClick={handleSubmit}
                />
            </Card>
        </div>

    )
}

export default UpdatePost;