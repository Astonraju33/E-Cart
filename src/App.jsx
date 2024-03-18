import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Wishlist from './Pages/Wishlist'
import View from './Pages/View'
import Cart from './Pages/Cart'

function App() {
//cart using redux
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/Wishlist' element= { <Wishlist/> }/>
        <Route path='/View/:id' element={ <View/> } />
        <Route path='/Cart' element={ <Cart/> } />
        <Route path='/*' element={ <Navigate to={'/'}/> }/>

      </Routes>
     
      <Footer/>

    </>
  )
}

export default App