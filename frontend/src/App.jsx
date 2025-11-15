import './App.css'
import {Home, Product} from './pages/index'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { LocationMap, Navigation } from './components/layout/index'
import {InsertTenant, TenantProfile} from './components/Tenant/index'
import {InsertOwner, OwnerProfile} from './components/Owner/index'
import {InsertPG, PgDetails} from './components/PG/index'
import {Login, Signup} from './components/auth/index';
import TenantDashboard from './components/Tenant/TenantDashboard'
import UpdateProfileForm from './components/form/UpdateProfileForm'
function App() {

  return (
    <> 
      <Router>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/> }/>  
          <Route path='/rooms' element={<Product/> }/>  
          <Route path='/rooms/:id' element={<PgDetails/> }/>  
          <Route path='/map' element={<Product/> }/>  
          <Route path='/tenant' element={<TenantDashboard/> }/> 
          <Route path='/tenant-dashboard' element={<TenantProfile/> }/>  
          <Route path='/owner-dashboard' element={<OwnerProfile/> }/>  
          <Route path='/update-user' element={<UpdateProfileForm/> }/>  
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route/>  
        </Routes>
      </Router> 
    </>
  )
}

export default App;
