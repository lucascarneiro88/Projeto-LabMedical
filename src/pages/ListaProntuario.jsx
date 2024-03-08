
import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/useAppContext";
import { Container, Card, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

function ListaProntuario() {
  const { pacientes } = useAppContext();

  return (
    <div>
      <Sidebar />
      <Container>
        <h1 className="my-4">Lista de Pacientes</h1>
        {pacientes.map((paciente) => (
          <Card key={paciente.id} className="my-3">
            <Card.Body>
              <Card.Title>{paciente.nomeCompleto}</Card.Title>
              <Card.Text>
                <strong>Gênero:</strong> {paciente.genero}
                <br />
                <strong>RG:</strong> {paciente.rg}
                <br />
                <strong>CPF:</strong> {paciente.cpf}

              </Card.Text>
              <Link to={`/prontuarioPaciente/${paciente.id}`}>
                <Button className="btn-ver">Ver Mais</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default ListaProntuario;









