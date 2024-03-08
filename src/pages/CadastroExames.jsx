import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/useAppContext";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from 'uuid';



function CadastroExames() {
  const { handleAdicionarExame, pacientes } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  function createExame(data) {
    const exame = {
      ...data,
      id: uuidv4(),
    };

    const {
      Exame,
      Tipo,
      DataExame,
      HoraExame,
      Laboratorio,
      Documento,
    } = exame;

    handleAdicionarExame(exame);
    setIsSaved(true);
    setShowSuccessAlert(true);
  }

  return (
    <>
      <Sidebar />
      <Container>


        <h1>INFORME OS CAMPOS PARA CADASTRO</h1>
        <section className="form-med">
          <form onSubmit={handleSubmit(createExame)}>
            <h2>Cadastro Exames</h2>
            <Row>
              <Col>
                <div className="form-section">
                  <Form.Group controlId="pacienteId">
                    <Form.Label>Selecione o paciente:</Form.Label>
                    <Form.Select
                      {...register("pacienteId", { required: true })}
                    >
                      <option value="">Selecione o paciente</option>
                      {pacientes.map(paciente => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nomeCompleto}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.pacienteId && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>

                <Form.Group name="exame">
                  <Form.Label>Nome do Exame:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do exame"
                    {...register("exame", { required: true })}
                  />
                  {errors.exame && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group name="Tipo">
                  <Form.Label>Tipo de Exame:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o tipo de exame"
                    {...register("tipo", { required: true })}
                  />
                  {errors.tipo && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group name="DataExame">
                  <Form.Label>Data do Exame:</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("dataExame", { required: true })}
                  />
                  {errors.dataExame && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group name="HoraExame">
                  <Form.Label>Hora do Exame:</Form.Label>
                  <Form.Control
                    type="time"
                    defaultValue={new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {...register("horaExame", { required: true })}
                  />
                  {errors.horaExame && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group name="Laboratorio">
                  <Form.Label>Laboratório:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do laboratório"
                    {...register("laboratorio", { required: true })}
                  />
                  {errors.laboratorio && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group name="Documento">
                  <Form.Label>URL do Documento:</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Digite a URL do documento"
                    {...register("documento")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="btn-section">

              <Button className="btn-salvar" type="submit"  >
                Salvar
              </Button>
            </div>
          </form>

          {showSuccessAlert && (
            <div className="alert alert-success mt-3">
              Cadastro efetuado com sucesso!
            </div>
          )}
        </section>
      </Container>
    
    </>
  );
}

export default CadastroExames;
