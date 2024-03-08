//reaproveitamento de estrutura

import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

import './assets/App.css'


function App() {


  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
