import './index.scss'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Outlet } from "react-router-dom"
import Header from "./components/header/Header"
import { ModalProvider } from './context/ModalContext'
import CustomModal from './components/customModal/CustomModal'

function App() {
  return (
    <ModalProvider>
      <div className='d-flex flex-column w-100'>
        <Header />
        <div className="px-4">
          <Outlet />
          <CustomModal/>
        </div>
      </div>
    </ModalProvider>
  )
}

export default App
