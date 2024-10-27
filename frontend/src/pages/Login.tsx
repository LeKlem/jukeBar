import { FormEvent, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { login } from "../webservices/AuthWebService";
import { LoginUserDTO } from "../models/UserModels";

export default function Login() {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    async function submitLogin(e: FormEvent) {
        e.preventDefault();
        const loginUserDTO: LoginUserDTO = {email: email, password: password}
        const token = (await login(loginUserDTO)).data;
        //TODO Link token to user + redirect to home
        console.log(token);
    }

    return (
        <div className="d-flex col-6 offset-3 align-items-center">
            <Form className="border rounded p-5 w-100 d-flex flex-column gap-3" onSubmit={(e) => submitLogin(e)}>
                <h1 className="text-center">Connexion</h1>
                <FormGroup>
                    <FormLabel>Adresse Email</FormLabel>
                    <FormControl type="email" onChange={(e) => setMail(e.target.value)} value={email}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </FormGroup>
                <Button className="col-3 align-self-center" type="submit">Se connecter</Button>
            </Form>
        </div>
    )
}