import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const navigator = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async () => {
        console.log(user);
        const res = await fetch("http://localhost:8000/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.ok) {
            navigator("/login");
        } else {
            console.log(data);
        }
    }

    return (
        <div>
            <Card sx={{ p: 4, py: 5, maxWidth: "550px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }} elevation={15}>
                <CardContent sx={{ m: 0 }}>
                    <Typography gutterBottom variant="h4" component="div" sx={{ m: 0, textAlign: "center" }}>
                        Register Here
                    </Typography>
                </CardContent>
                <TextField id="filled-basic" label="Name" variant="filled" type={"name"} name={"name"} onChange={handleChange} value={user.name} />
                <TextField id="filled-basic" label="Email" variant="filled" type={"email"} name={"email"} onChange={handleChange} value={user.email} />
                <TextField id="filled-basic" label="Password" variant="filled" type={"password"} name={"password"} onChange={handleChange} value={user.password} />
                <Button sx={{ width: "90px" }} variant="contained" onClick={handleSubmit}>Register</Button>
            </Card>
        </div>
    )
}

export default Register