import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Login() {
    const [user, setUser] = useState({ email: "", password: "" })
    const navigator = useNavigate()
    const { setRefresh } = useContext(AuthContext);


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async () => {
        console.log(user);
        const res = await fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.ok) {
            localStorage.setItem("token", data.token);
            setRefresh(true);
            navigator("/");
        } else {
            console.log(data);
        }
    }

    return (
        <div>
            <Card sx={{ p: 4, py: 5, maxWidth: "550px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }} elevation={15}>
                <CardContent sx={{ m: 0 }}>
                    <Typography gutterBottom variant="h4" component="div" sx={{ m: 0, textAlign: "center" }}>
                        Login Here
                    </Typography>
                </CardContent>
                <TextField id="filled-basic" label="Email" variant="filled" type={"email"} name={"email"} onChange={handleChange} value={user.email} />
                <TextField id="filled-basic" label="Password" variant="filled" type={"password"} name={"password"} onChange={handleChange} value={user.password} />
                <Button sx={{ width: "50px" }} variant="contained" onClick={handleSubmit}>Login</Button>
            </Card>
        </div>
    )
}

export default Login