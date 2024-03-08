import React, { createContext, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [exames, setExames] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [prontuarios, setProntuarios] = useState([]);

  //função que realiza uma cópia profunda (deep copy) de um objeto ou array 
  function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    let copy;
    if (Array.isArray(obj)) {
      copy = [];
      for (let i = 0; i < obj.length; i++) {
        copy[i] = deepCopy(obj[i]);
      }
    } else {
      copy = {};
      for (const key in obj) {
        if (typeof obj[key] !== 'function' && !(obj[key] instanceof Element)) {
          copy[key] = deepCopy(obj[key]);
        }
      }
    }

    return copy;
  }

  // Função para inicializar os dados de pacientes, consultas e exames
  function initializeData() {
    const pacientesPreCadastrados = [
      {
        id: "1",
        nomeCompleto: "João da Silva",
        genero: "Masculino",
        rg: "1234567",
        cpf: "111.222.333-44",
        dataNascimento: "1990-01-01",
        alergias: "Nenhuma",
        cuidadosEspecificos: "Nenhum",
        convenio: "Plano Saúde",
        numeroConvenio: "ABC123",
        validadeConvenio: "2025-12-31",
        email: "joao@example.com",
        telefone: "(00) 1234-5678",
        celular: "(00) 98765-4321",
        contatoEmergencia: "(00) 1111-2222",
        cep: "12345-678",
        logradouro: "Rua dos Testes",
        numero: "123",
        uf: "SP",
        bairro: "Centro",
        localidade: "Cidade Teste",
        complemento: "Apto 101"
      },
      {
        id: "2",
        nomeCompleto: "Maria Souza",
        genero: "Feminino",
        rg: "7654321",
        cpf: "555.666.777-88",
        dataNascimento: "1985-05-05",
        alergias: "Poeira",
        cuidadosEspecificos: "Nenhum",
        convenio: "Plano Saúde Plus",
        numeroConvenio: "XYZ789",
        validadeConvenio: "2024-06-30",
        email: "maria@example.com",
        telefone: "(00) 2222-3333",
        celular: "(00) 99999-8888",
        contatoEmergencia: "(00) 4444-5555",
        cep: "98765-432",
        logradouro: "Avenida dos Exames",
        numero: "456",
        uf: "RJ",
        bairro: "Bairro Novo",
        localidade: "Cidade Nova",
        complemento: "Casa 2"
      },
    ];

    // Pré-cadastrar pacientes
    setPacientes(pacientesPreCadastrados);
    localStorage.setItem('Lista Pacientes', JSON.stringify(pacientesPreCadastrados));

    // Pré-cadastrar consultas
    const consultasPreCadastradas = pacientesPreCadastrados.map((paciente) => ({
      id: uuidv4(),
      pacienteId: paciente.id,
      consulta: 'Consulta de rotina',
      dataConsulta: '2023-07-29',
      horarioConsulta: '10:00',
      descricaoProblema: 'Consulta de rotina e acompanhamento de saúde',
    }));
    setConsultas(consultasPreCadastradas);
    localStorage.setItem('Lista Consultas', JSON.stringify(consultasPreCadastradas));

    // Pré-cadastrar exames
    const examesPreCadastrados = pacientesPreCadastrados.map((paciente) => ({
      id: uuidv4(),
      pacienteId: paciente.id,
      exame: 'Exame de sangue',
      tipo: 'Sangue',
      dataExame: '2023-08-15',
      horaExame: '14:30',
      laboratorio: 'Laboratório ABC',
    }));
    setExames(examesPreCadastrados);
    localStorage.setItem('Lista Exames', JSON.stringify(examesPreCadastrados));
  }

  // Chama a função de inicialização assim que o componente for montado
  useEffect(() => {
    initializeData();
  }, []);

  // useEffect exame
  useEffect(() => {
    const examesDoStorage = localStorage.getItem('Lista Exames');
    if (examesDoStorage) {
      setExames(JSON.parse(examesDoStorage));
    }
  }, []);

  // useEffect consulta
  useEffect(() => {
    const consultasDoStorage = localStorage.getItem('Lista Consultas');
    if (consultasDoStorage) {
      setConsultas(JSON.parse(consultasDoStorage));
    }
  }, []);

  // useEffect paciente
  useEffect(() => {
    const pacientesDoStorage = localStorage.getItem('Lista Pacientes');
    if (pacientesDoStorage) {
      setPacientes(JSON.parse(pacientesDoStorage));
    }
  }, []);

  // useEffect prontuario
  useEffect(() => {
    const prontuariosDoStorage = localStorage.getItem('Lista Prontuarios');
    if (prontuariosDoStorage) {
      setProntuarios(JSON.parse(prontuariosDoStorage));
    }
  }, []);

  // adicionar exame
  function handleAdicionarExame(exame) {
    localStorage.setItem(
      'Lista Exames',
      JSON.stringify([...exames, exame])
    );
    setExames([...exames, exame]);
  }

  function limparStorageExames() {
    setExames([]);
  }

  // adicionar consulta
  function handleAdicionarConsulta(consulta) {
    // Fazendo uma cópia profunda (deep copy) do objeto consulta
    const consultaCopy = cloneDeep(consulta);

    // Salvando a cópia no localStorage
    localStorage.setItem('Lista Consultas', JSON.stringify([...consultas, consultaCopy]));

    // Atualizando o estado com a nova consulta
    setConsultas([...consultas, consultaCopy]);
  }

  // adicionar prontuario
  function handleAdicionarProntuario(prontuario) {
    localStorage.setItem(
      'Lista Prontuarios',
      JSON.stringify([...prontuarios, prontuario])
    );
    setProntuarios([...prontuarios, prontuario]);
  }

  function limparStorageProntuarios() {
    setProntuarios([]);
  }

  // adicionar paciente
  function handleAdicionarPaciente(paciente) {
    localStorage.setItem(
      'Lista Pacientes',
      JSON.stringify([...pacientes, paciente])
    );
    setPacientes([...pacientes, paciente]);
  }

  function limparStoragePacientes() {
    setPacientes([]);
  }

  // Função para editar um paciente existente
  function handleEditarPaciente(id, pacienteEditado) {
    // encontra paciente com o ID correspondente no estado atual
    const pacienteIndex = pacientes.findIndex((paciente) => paciente.id === id);

    // Se o paciente não for encontrado retorna uma mensagem tipo alert
    if (pacienteIndex === -1) {
      alert('Paciente não encontrado!');
      return;
    }

    // cópia profunda do array de pacientes
    const pacientesCopy = cloneDeep(pacientes);

    // atualiza o paciente editado na cópia do array
    pacientesCopy[pacienteIndex] = pacienteEditado;

    // atualiza o estado com o novo array de pacientes
    setPacientes(pacientesCopy);

    // atualiza também o localStorage com os dados atualizados
    localStorage.setItem('Lista Pacientes', JSON.stringify(pacientesCopy));
  }

  // handleExcluirPacientes
  function handleExcluirPaciente(pacienteId) {
    // Filtra a lista de pacientes para remover o paciente com o ID correspondente
    const pacientesAtualizados = pacientes.filter((paciente) => paciente.id !== pacienteId);

    // Atualiza o estado com a nova lista de pacientes
    setPacientes(pacientesAtualizados);

    // Atualiza também o localStorage com os dados atualizados
    localStorage.setItem('Lista Pacientes', JSON.stringify(pacientesAtualizados));
  }

  return (
    <AppContext.Provider
      value={{
        exames,
        consultas,
        pacientes,
        prontuarios,
        handleAdicionarExame,
        handleAdicionarConsulta,
        handleAdicionarPaciente,
        handleAdicionarProntuario,
        handleEditarPaciente,
        handleExcluirPaciente,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
