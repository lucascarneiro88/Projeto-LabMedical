import React from "react";
import { Card, Col, Button, Container, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useAppContext } from "../contexts/useAppContext";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard"; 


function Dashboard() {
  const { pacientes, consultas, exames } = useAppContext(); // Adicione as variáveis consultas e exames aqui

  return (
    <>
      <Sidebar />
     
      <Container>
        <h1>Painel de Controle</h1>
        <Row>
          <Col>
          
            <DashboardCard titulo="Pacientes Cadastrados" quantidade={pacientes.length} />
          </Col>
          <Col>
            <DashboardCard titulo="Consultas Realizadas" quantidade={consultas.length} />
          </Col>
          <Col>
            <DashboardCard titulo="Exames Realizados" quantidade={exames.length} />
          </Col>
        </Row>
    
        <h1>PACIENTES</h1>
        <div className="cards">
          <Row xs={1} sm={2} md={3} className="mb-4">
            {pacientes.map((paciente) => (
              <Col key={paciente.id} className="mb-4">
                <Card style={{ width: "300px", height: "400px" }} className="text-center">
                  <Card.Img
                    className="foto mt-3"
                    variant="top"
                    src="src\assets\Person.png"
                    style={{ maxWidth: "150px", margin: "0 auto" }}
                  />
                  <Card.Body className="mt-3">
                    <Card.Title>
                      <div>{paciente.pacientes}</div>
                      <div>Nome: {paciente.nomeCompleto}</div>
                      <div>Nascimento: {paciente.dataNascimento}</div>
                      <div>Telefone: {paciente.telefone}</div>
                    </Card.Title>
                  </Card.Body>
                  <Col xs={12}>
                    <Link to={`/editarPaciente/${paciente.id}`}>
                      <Button className="btn-ver">Ver mais</Button>
                    </Link>
                  </Col>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
