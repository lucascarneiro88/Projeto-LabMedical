import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/useAppContext";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";



function CadastroConsultas() {
  const { handleAdicionarConsulta, pacientes } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const consulta = {
      ...data,
      id: uuidv4(),
    };

    handleAdicionarConsulta(consulta);
    setIsSaved(true);
    setShowSuccessAlert(true);
  }

  return (
    <div>
      <Sidebar />
      <Container>


        <h1>INFORME OS CAMPOS PARA CADASTRO</h1>
        <section className="form-med">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Cadastro Consultas</h2>
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

              <Form.Group name="consulta">
                <Form.Label>Motivo da consulta:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Motivo da consulta"
                  {...register("consulta", { required: true, minLength: 8, maxLength: 64 })}
                />
                {errors.consulta && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="dataConsulta">
                <Form.Label>Data da Consulta:</Form.Label>
                <Form.Control
                  type="date"
                  {...register("dataConsulta", { required: true })}
                />
                {errors.dataConsulta && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="horarioConsulta">
                <Form.Label>Horário da Consulta:</Form.Label>
                <Form.Control
                  type="time"
                  defaultValue={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {...register("horarioConsulta", { required: true })}
                />
                {errors.horarioConsulta && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="descricaoProblema">
                <Form.Label>Descrição do Problema:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Descrição do Problema"
                  {...register("descricaoProblema", { required: true, minLength: 16, maxLength: 1024 })}
                />
                {errors.descricaoProblema && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="medicacaoReceitada">
                <Form.Label>Medicação Receitada:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Medicação Receitada"
                  {...register("medicacaoReceitada")}
                />
              </Form.Group>

              <Form.Group name="tipo">
                <Form.Label>Tipo Medicamento:</Form.Label>
                <Form.Select
                  {...register("tipo", { required: true })}
                >
                  <option>Selecione</option>
                  <option>Medicamento controlado</option>
                  <option>Medicamento comum</option>
                </Form.Select>
                {errors.tipo && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="dosagem">
                <Form.Label>Dosagem e Precauções:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Dosagem e Precauções"
                  {...register("dosagem", { required: true, minLength: 16, maxLength: 256 })}
                />
                {errors.dosagem && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>
            </div>

            <div >
              <Button className="btn-salvar" type="submit" >
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
     
    </div>
  );
}


export default CadastroConsultas;
