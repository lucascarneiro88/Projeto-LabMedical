import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../contexts/useAppContext";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

function DetailList({ data }) {
  return (
    <ul className="list-group">
      {Object.entries(data).map(([campo, valor]) => (
        <li key={campo} className="list-group-item">
          <strong>{campo}:</strong> {valor}
        </li>
      ))}
    </ul>
  );
}

function ProntuarioPaciente() {
  const { pacientes, consultas: todasConsultas, exames: todosExames } = useAppContext();
  const { pacienteId } = useParams();

  const getConsultasExamesPaciente = () => {
    const paciente = pacientes.find((paciente) => paciente.id === pacienteId);
    if (!paciente) return { consultas: [], exames: [] };

    const pacienteConsultas = todasConsultas.filter(
      (consulta) => consulta.pacienteId === pacienteId
    );
    const pacienteExames = todosExames.filter(
      (exame) => exame.pacienteId === pacienteId
    );

    return { paciente, consultas: pacienteConsultas, exames: pacienteExames };
  };

  const { paciente, consultas, exames } = getConsultasExamesPaciente();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Sidebar />
      <Container className="mb-4 flex-grow-1" style={{ paddingBottom: "60px" }}>
       
        {paciente ? (
          <>
            <h1>Prontuário de {paciente.nomeCompleto}</h1>

            <h2>Dados do Paciente</h2>
            <DetailList data={paciente} />

            {consultas.length > 0 && (
              <>
                <h2>Consultas</h2>
                {consultas.map((consulta) => (
                  <DetailList key={consulta.id} data={consulta} />
                ))}
              </>
            )}

            {exames.length > 0 && (
              <>
                <h2>Exames</h2>
                {exames.map((exame) => (
                  <DetailList key={exame.id} data={exame} />
                ))}
              </>
            )}

            {consultas.length === 0 && exames.length === 0 && (
              <h3>Nenhum registro encontrado para este paciente.</h3>
            )}
          </>
        ) : (
          <h3>Paciente não encontrado.</h3>
        )}
      </Container>
     
    </div>
  );
}

export default ProntuarioPaciente;
