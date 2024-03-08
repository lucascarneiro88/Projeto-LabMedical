
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Form, Button, Navbar, } from 'react-bootstrap';

const schema = object({
    email: string().required("Campo Obrigatório."),
    password: string().required("Campo Obrigatório.").min(8, "A senha precisa de 8 ou mais caracteres com números e letras."),
    nome: string().required("Campo Obrigatório.").min(2, "O nome precisa de no mínimo 2 caracteres."),
})

function createPassword(data) {
    console.log(data);
}

function RecuperarSenha() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    return (
        <>
            <Navbar />
            <h1>Esqueceu sua senha?</h1>
            <section className="area-login">
                <form className="form-login" onSubmit={handleSubmit(createPassword)}>
             <img  src="/src/assets/logoo.png" alt="Logo"   />
<br />

                    <h5>Informe seu e-mail cadastrado no sistema para <br /> enviarmos as instruções de redefinição da senha.</h5>
                    <br />

                    <Form.Group className="col-8" controlid="Email">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email" {...register("email", { required: true })} />
                        {errors.email && <span>Campo Obrigatório</span>}



                    </Form.Group>
                    <Button type="submit" onClick={() => alert('E-mail enviado com sucesso!')} variant="primary" id="btnLogin">Continuar</Button>
                </form>
            </section>
        </>);
}

export default RecuperarSenha;