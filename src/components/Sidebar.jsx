import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// Importe os estilos do CSS
import '../assets/stylesSidebar.css';

// Importe os estilos do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light shadow">
        <div className="container-fluid">
          <button
            className="navbar-toggler "
            type="button"
            onClick={openModal}
          >
            <div className="menu-icon-container">
              <span className="navbar-toggler-icon">

              </span>
            </div>
          </button>
          <div className='lognav'>
          <img  src="/src/assets/logoo.png" alt="Logo" /></div>
          <Link to="/" className="btn btn-primary">Logout</Link>
        </div>
      </nav>

      {isModalOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">MENU</h1>
                  <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <Link to="/dashboard" className='nav-link px-1'>
                        <i className='bi-house' />
                        <span className='ms-2 d-none d-sm-inline text-dark'>HOME</span>
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/cadastroPacientes" className='nav-link px-2'>
                        <i className='bi-people' /><span className='ms-2 d-none d-sm-inline text-dark'>CADASTRO PACIENTE</span>
                      </Link>
                    </li>

                    <li className="list-group-item">
                      <Link to="/cadastroConsultas" className='nav-link px-2'>
                        <i className='bi-table' />
                        <span className='ms-1 d-none d-sm-inline text-dark'>CADASTRO CONSULTA</span>
                      </Link>
                    </li>

                    <li className="list-group-item">
                      <Link to="/cadastroExames" className='nav-link px-2'>
                        <i className='bi-speedometer' />
                        <span className='ms-1 d-none d-sm-inline text-dark'>CADASTRO EXAMES</span>
                      </Link>
                    </li>

                    <li className="list-group-item">
                      <Link to="/listaProntuario" className='nav-link px-2'>
                        <i className='bi-list' />
                        <span className='ms-1 d-none d-sm-inline text-dark'>LISTA PRONTUÁRIO</span>
                      </Link>
                    </li>
                 
                  </ul>
                <div className='sidimg'>   <img  src="/src/assets/logoo.png" alt="Logo" /></div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>FECHAR</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;




