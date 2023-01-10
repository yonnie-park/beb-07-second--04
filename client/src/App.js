import './App.css';
import React, {useState} from "react"
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./pages/Main"
import Mypage from "./pages/Mypage"
import View from "./pages/View"
import Mint from "./pages/Mint"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"

import {UserContext} from "./UserContext"


function App() {
  const [account, setAccount] = useState({
    user_id:"",
    user_password: "",
    user_IMG: "",
    user_account: ""
  });
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{account, setAccount}}>
        <Header/>
        <Routes>
          <Route path ="/" element={<Main/>}/>
          <Route path="/mypage/:account" element={<Mypage account={account}/>}/>
          <Route path="/mint" element={<Mint/>}/>
          <Route path="/view" element={<View/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        <Footer/>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
