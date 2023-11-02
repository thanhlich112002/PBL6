import React from 'react'
import Signin from './Page/signIn/signIn'
import SignUpCustomer from './Page/signUp/signUpCustomer'
import SignUpShipper from './Page/signUp/signUpShipper'
import SignUpOwner from './Page/signUp/signUpOwner'
import SignUpStore from './Page/signUp/signUpStore'
import Header from './Components/header/header'
import ForgotPass from './Page/resetPass/forgotPass'
import ResetPass from './Page/resetPass/resetPass'
import Verify from './Page/resetPass/verify'
import Footer from './Components/footer/footer'
import Profile from './Page/customer/profile'
import UpdateAddress from './Page/customer/updateAddress'
import OrderHistory from './Page/customer/orderHistory'
import Home from './Page/customer/home'
import OrderPage from './Page/customer/orderPage'
import StoreDetail from './Page/customer/storeDetail'
import './App.css'
import SomeComponent from './Components/header/new'
import SomeOneComponent from './Components/header/new1'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './services/authContext'
import { CityProvider } from './services/CityContext'
import { LanguageProvider } from './services/languageContext'
const App = () => {

  return (
    // <Router>
    <LanguageProvider>
      <AuthProvider>
        <CityProvider>
          <Router>
            <div className='wrapper'>
              <Header />
              <Routes>
                <Route path="/" element={<SomeComponent />} />
                <Route path="/test" element={<SomeOneComponent />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signUpCustomer" element={<SignUpCustomer />} />
                <Route path="/signUpShipper" element={<SignUpShipper />} />
                <Route path="/signUpOwner" element={<SignUpOwner />} />
                <Route path="/signUpStore" element={<SignUpStore />} />
                <Route path="/forgotPass" element={<ForgotPass />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/resetPass" element={<ResetPass />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/orderHistory" element={<OrderHistory />} />
                <Route path="/user/updateAddress" element={<UpdateAddress />} />
                <Route path="/user/order" element={<OrderPage />} />
                <Route path="/home/storeDetail" element={<StoreDetail />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </CityProvider>
      </AuthProvider>
    </LanguageProvider>
    // </Router>

  )

}

export default App