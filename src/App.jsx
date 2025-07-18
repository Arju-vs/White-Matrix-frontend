import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import LoginPage from './pages/Login'
import DashLayout from './components/DashLayout'
import DashboardPage from './pages/Dashboard'
import NewPrescriptionPage from './pages/NewPrescription'
import EditPrescriptionPage from './pages/EditPrescription'
import MyPrescriptionPage from './pages/MyPrescription'
import PreviewPage from './pages/Preview'
import './App.css'
import{ Toaster } from 'react-hot-toast';
import Pnf from './pages/Pnf'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={ <LandingPage/> } />
        <Route path={'/login'} element={ <LoginPage />} />
        <Route path={'/register'} element={ <LoginPage insideRegister = {true}/> } />
        {/* dashboard */}
          <>
          <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashLayout />}>
            <Route path="mainPage" element={<DashboardPage />} />
            <Route path="newpres" element={<NewPrescriptionPage />} />
            <Route path="editpres/:id" element={<EditPrescriptionPage />} />
            <Route path="mypres" element={<MyPrescriptionPage />} />
            <Route path="preview/:id" element={<PreviewPage />} />
          </Route>
        </Route>
        </>
        <Route path='*' element={<Pnf />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
