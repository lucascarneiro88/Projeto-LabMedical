import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Form, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Regex para validar email
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Validação da senha e do email
const schema = object({
  email: string()
    .required("Campo Obrigatório.")
    .matches(emailRegex, "Digite um email válido."),
  password: string()
    .required("Campo Obrigatório.")
    .min(8, "A senha precisa ter 8 ou mais caracteres com números e letras."),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function createUser(data) {
    console.log(data);
    navigate("/Dashboard");
  }

  function onSubmit(data) {
    handleSubmit(createUser)(data);
  }

  return (
    <div>
      <Navbar />
      <h1>Bem-vindo(a)!</h1>
      <div className="text">
        <h3>LABMedical - sua solução completa para gestão de clínicas!</h3>
      </div>
      <section className="area-login">
        <form className="form-login" onSubmit={onSubmit}>
        <img  src="/src/assets/logoo.png" alt="Logo" />


          <h2>Acesse sua conta!</h2>
          <Form.Group className="col-8" controlId="Email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
            <span className="errors">{errors?.email?.message}</span>
          </Form.Group>
          <Form.Group className="col-8" controlId="Senha">
            <Form.Label>Senha:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            <span className="errors">{errors?.password?.message}</span>
          </Form.Group>
          <Button type="submit" variant="primary" id="btnLogin">
            Acessar
          </Button>
          <Link to="CadastroConta">Não possui conta? Cadastre aqui!</Link>
          <Link to="RecuperarSenha">Esqueceu sua senha?</Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
