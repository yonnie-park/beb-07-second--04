import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./pages/Main"
import Mypage from "./pages/Mypage"
import View from "./pages/View"
import Mint from "./pages/Mint"
import Join from "./pages/Join"
import Login from "./pages/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path ="/" element={<Main/>}/>
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/mint" element={<Mint/>}/>
        <Route path="/view" element={<View/>}>
          <Route path=":id"/>
        </Route>
        <Route path="/join" element={<Join/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
