import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/useAppContext";
import { useForm } from "react-hook-form";


import Sidebar from "../components/Sidebar";

function EditarPaciente() {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const { pacientes, handleEditarPaciente, handleExcluirPaciente } = useAppContext();
  const [pacienteEditado, setPacienteEditado] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const pacienteData = pacientes.find((paciente) => paciente.id === pacienteId);
    if (!pacienteData) {
      navigate("/cadastroPacientes");
      return;
    }

    setPacienteEditado(pacienteData);
    Object.entries(pacienteData).forEach(([key, value]) => setValue(key, value));
  }, [pacienteId, pacientes, navigate, setValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacienteEditado((prevPaciente) => ({
      ...prevPaciente,
      [name]: value,
    }));
  };

  const onSubmit = (data) => {
    handleEditarPaciente(pacienteId, data);
    navigate(`/prontuarioPaciente/${pacienteId}`);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => Object.entries(data).forEach(([key, value]) => setValue(key, value)));
  };

  const handleNovaConsulta = () => {
    navigate("/cadastroConsultas");
  };

  const handleNovoExame = () => {
    navigate("/cadastroExames");
  };
  const handleExcluir = async () => {
    try {
      await handleExcluirPaciente(pacienteId);
      navigate("/dashboard");
    } catch (error) {
      console.log("Erro ao excluir o paciente: ", error);
    }
  };

  if (!pacienteEditado) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Sidebar />
      <Container>
        <h1>EDITAR PACIENTE</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group controlId="NomeCompleto">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="nomeCompleto"
                  {...register("nomeCompleto", { required: true })}
                />
                {errors.nomeCompleto && <span>Campo Obrigatório</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Genero">
                <Form.Label>Gênero</Form.Label>
                <Form.Control as="select" name="genero" {...register("genero", { required: true })}>
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </Form.Control>
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
                  name="rg"
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
                  name="cpf"
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
                  name="dataNascimento"
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
                  name="alergias"
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
                  name="cuidadosEspecificos"
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
                  name="convenio"
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
                  name="numeroConvenio"
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
                  name="validadeConvenio"
                  {...register("validadeConvenio")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="email-Paciente">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  name="email"
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
                  name="telefone"
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
                  name="celular"
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
                  name="contato"
                  {...register("contato", { required: true })}
                />
                {errors.contato && <span>Campo Obrigatório</span>}
              </Form.Group>
            </Col>
          </Row>
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
                  name="cep"
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
                  name="logradouro"
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
                  name="número"
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
                  name="uf"
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
                  name="bairro"
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
                  name="localidade"
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
                  name="complemento"
                  {...register("complemento")}
                />
              </Form.Group>
            </Col>
          </Row>


          <div >
            <Button
              type="submit"
              variant="primary"
              id="btn-salvar"
              className="btn-salvar"
            >
              Salvar
            </Button>

            <Button variant="primary" onClick={handleNovaConsulta} className="btn-salvar">
              Nova Consulta
            </Button>
            <Button variant="primary" onClick={handleNovoExame} className="btn-salvar">
              Novo exame
            </Button>
            <Button variant="danger" onClick={handleExcluir} className="btn-excluir">
              Excluir Paciente
            </Button>
          </div>


        </Form>
      </Container>
    </>
  );
}

export default EditarPaciente;