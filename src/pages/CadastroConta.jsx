import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Form, Button, Navbar, } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const schema = object({
    email: string().required("Campo Obrigatório."),
    password: string().required("Campo Obrigatório.").min(8, "A senha precisa de 8 ou mais caracteres com números e letras."),
    nome: string().required("Campo Obrigatório.").min(2, "O nome precisa de no mínimo 2 caracteres."),
})

function criarConta(data) {
    console.log(data);
}

function CadastroConta() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    function handleCriarConta(data) {
        criarConta(data);
        setShowSuccessAlert(true);
    }

    return (
        <>
            <Navbar />
            <h1>Crie sua conta!</h1>
            <section className="area-login">
                <form className="form-login" onSubmit={handleSubmit(handleCriarConta)}>
                <img  src="/src/assets/logoo.png" alt="Logo" /> 
                    <Form.Group className="col-8" controlid="Nome">
                        <Form.Label>Nome Completo:</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu nome" {...register("nome", { required: true })} />
                        {errors.nome && <span>Campo Obrigatório</span>}
                    </Form.Group>

                    <Form.Group className="col-8" controlid="Email">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email" {...register("email", { required: true })} />
                        {errors.email && <span>Campo Obrigatório</span>}
                    </Form.Group>

                    <Form.Group className="col-8" controlid="Senha">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha" {...register("password", { required: true })} />
                        {errors.password && <span>Campo Obrigatório</span>}
                    </Form.Group>
                    <Button type="submit" variant="primary" id="btnLogin">Registrar</Button>
                    <Link to="/">Acesse sua conta!</Link>
                    {showSuccessAlert && (
                        <div className="alert alert-success mt-3">
                            Cadastro efetuado com sucesso!
                        </div>
                    )}
                </form>
            </section>
        </>
    );
}

export default CadastroConta;
