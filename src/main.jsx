import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import "./assets/index.css";




//configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import bootstrap

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


//import pages

import Login from './pages/Login.jsx';
import CadastroConta from './pages/CadastroConta.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CadastroPacientes from './pages/CadastroPacientes.jsx'
import CadastroConsultas from './pages/CadastroConsultas.jsx';
import CadastroExames from './pages/CadastroExames.jsx';
import ListaProntuario from './pages/ListaProntuario.jsx';
import ProntuarioPaciente from './pages/ProntuarioPaciente.jsx';
import EditarPaciente from './pages/EditarPaciente.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import RecuperarSenha from './pages/RecuperarSenha.jsx';



//import contexto

import { AppProvider } from "./contexts/AppProvider";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [

      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/cadastroConta",
        element: <CadastroConta />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cadastroPacientes",
        element: <CadastroPacientes />,
      },
      {
        path: "/cadastroConsultas",
        element: <CadastroConsultas />,
      },
      {
        path: "/cadastroExames",
        element: <CadastroExames />,
      },
      {
        path: "/prontuarioPaciente/:pacienteId",
        element: <ProntuarioPaciente />,
      },
  
      {
        path: "/listaProntuario",
        element: <ListaProntuario />,
      },
      {
        path: "/recuperarSenha",
        element: <RecuperarSenha />,
      },
      {
        path: "/editarPaciente/:pacienteId",
        element: <EditarPaciente />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AppProvider>
  </React.StrictMode>

);
