

import Shop from './Components/Pages/Shop'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ShopCategory from './Components/Pages/ShopCategory';
import Product from './Components/Pages/Product';
import LoginSignup from './Components/Pages/LoginSignup';
import Cart from './Components/Pages/Cart';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory category="men"/>}/>
        <Route path='/womens' element={<ShopCategory  category="women"/>}/>
        <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
      
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
     
      <Footer/>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
