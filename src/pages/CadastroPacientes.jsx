import React, { useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/useAppContext";
import { v4 as uuidv4 } from 'uuid';
import Sidebar from "../components/Sidebar";


function CadastroPacientes() {

  const { handleAdicionarPaciente } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {
    register,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function createPaciente(data) {
    const paciente = {
      ...data,
      id: uuidv4(),
      consultas: [], // Array para armazenar as consultas do paciente
      exames: []    // Array para armazenar os exames do paciente
    };

    handleAdicionarPaciente(paciente);
    setIsSaved(true);
    setShowSuccessAlert(true);
  }

  //API CEP
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("localidade", data.localidade);
        setValue("uf", data.uf);
        setFocus("número", "");
      });
  };

  return (
    <>
      <Sidebar />
      <Container>
        <h1>INFORME OS CAMPOS PARA CADASTRAR O PACIENTE</h1>
        <section className="area-form">
          <form onSubmit={handleSubmit(createPaciente)}>
            <Row>
              <Col>
                <h2>INDENTIFICAÇÃO</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="NomeCompleto">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="nome completo"
                    {...register("nomeCompleto", { required: true })}
                  />
                  {errors.nomeCompleto && (
                    <span>Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Genero">
                  <Form.Label>Gênero</Form.Label>
                  <Form.Select {...register("genero", { required: true })}>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </Form.Select>
                  {errors.genero && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="RG">
                  <Form.Label>RG com órgão expedidor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="RG com órgão expedidor"
                    {...register("rg", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                  {errors.rg && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="CPF">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="000.000.000-00"
                    {...register("cpf", {
                      required: true,
                      pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        message:
                          "CPF inválido. Utilize o formato 000.000.000-00."
                      }
                    })}
                  />
                  {errors.cpf && <span>{errors.cpf.message}</span>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="DataNascimento">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="dd/mm/aaaa"
                    {...register("dataNascimento", {
                      required: true,
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message:
                          "Data inválida. Utilize o formato aaaa-mm-dd."
                      }
                    })}
                  />
                  {errors.dataNascimento && (
                    <span>{errors.dataNascimento.message}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="Alergias">
                  <Form.Label>Lista de Alergias</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="lista de alergias"
                    {...register("alergias")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="CuidadosEspecificos">
                  <Form.Label>Lista de Cuidados Específicos</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="lista de cuidados específicos"
                    {...register("cuidadosEspecificos")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>CONVÊNIO</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="Convenio">
                  <Form.Label>Convênio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="convênio"
                    {...register("convenio")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="NumeroConvenio">
                  <Form.Label>Número do Convênio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="número do convênio"
                    {...register("numeroConvenio")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="ValidadeConvenio">
                  <Form.Label>Validade do Convênio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="validade do convênio"
                    {...register("validadeConvenio")}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Outros campos */}
            <Row>
              <Col>
                <Form.Group controlId="email-Paciente">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@example.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Telefone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="(00) 0000-0000"
                    {...register("telefone")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="Celular">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="(00) 00000-0000"
                    {...register("celular", { required: true })}
                  />
                  {errors.celular && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="ContatoEmergencia">
                  <Form.Label>Contato de Emergência</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="(00) 00000-0000"
                    {...register("contato", { required: true })}
                  />
                  {errors.celular && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h2>DADOS DE ENDEREÇO</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="Cep">
                  <Form.Label>Cep</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="00000-000"
                    {...register("cep", { required: true })}
                    onBlur={checkCEP}
                  />
                  {errors.cep && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Logradouro">
                  <Form.Label>Logradouro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="rua"
                    {...register("logradouro", { required: true })}
                  />
                  {errors.logradouro && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="número">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="nº"
                    {...register("número", { required: true })}
                  />
                  {errors.número && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Estado"
                    {...register("uf", { required: true })}
                  />
                  {errors.uf && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="Bairro">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="bairro"
                    {...register("bairro", { required: true })}
                  />
                  {errors.bairro && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Cidade">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="cidade"
                    {...register("localidade", { required: true })}
                  />
                  {errors.localidade && <span>Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="Complemento">
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="complemento"
                    {...register("complemento")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div >
              <Button className="btn-salvar"
                type="submit" >Salvar
              </Button>
            </div>
            {showSuccessAlert && (
              <div className="alert alert-success mt-3">
                Cadastro efetuado com sucesso!
              </div>
            )}
          </form>

        </section>
      </Container>
      
    </>
  );
}

export default CadastroPacientes;
