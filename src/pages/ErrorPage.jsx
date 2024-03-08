import { Button, Navbar } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";


function ErrorPage() {
    const navigate = useNavigate()
    return (
        <>
            < Navbar />
            <h1>Error 404</h1>
            <p> Ops! <br />
                Não conseguimos encontrar a página <br /> que você esta procurando.
                <br /></p>
            <Button type="submit" onClick={() => {
                navigate("/");
            }}
                variant="primary" id="btnLogin">Voltar para o início</Button>
        </>
    );
}

export default ErrorPage;