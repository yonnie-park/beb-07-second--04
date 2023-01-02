import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./pages/Main"
import Mypage from "./pages/Mypage"
import View from "./pages/View"
import Mint from "./pages/Mint"
 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Main/>}/>
      <Route path="/mypage" element={<Mypage/>}/>
      <Route path="/mint" element={<Mint/>}/>
      <Route path="/view" element={<View/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
