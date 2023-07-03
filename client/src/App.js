import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import NavBar from './components/NavBar';
// import BlogPost from './components/BlogCom_Like';

import { Container } from '@mui/material';

export const AuthContext = createContext();

const App = () => {
  const [auth, setAuth] = useState(null);
  const[refresh, setRefresh] = useState(false);

  return (
    <AuthContext.Provider value={{auth, setAuth, refresh, setRefresh}}>

      <BrowserRouter>

        <NavBar />

        <Container sx={{ p: 1, mt: 15 }}>

          <Routes>
            <Route path="/" element={<Home /> }/>
            {/* <Route path="/" element={<BlogPost /> }/> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Routes>

        </Container>

      </BrowserRouter>

    </AuthContext.Provider>
  )
}

export default App