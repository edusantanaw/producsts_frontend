import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccountService } from "../../services/auth";
import { Button } from "../../shared/components/Button";
import { Input } from "../../shared/components/Input";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { Label } from "../../shared/styles/input";
import { AuthContainer, AuthForm } from "./style";
import SweetAlert from "../../shared/components/SweetAlert";
import { validateEmail } from "../../shared/utils/emailValidator";

const Signup = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSweetAlert, setShowSweeatAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  function validateFields() {
    const isEmail = validateEmail(email!);
    if (!isEmail) return "E-mail invalido";
    if ((password ?? "").length < 3) return "Senha invalida!";
    if ((name ?? "").length < 3) return "Nome invalido!";
  }

  async function handleCreateAccount() {
    if (!email || !password || !name) return;
    if (error) setError(() => null);
    const maybeError = validateFields();
    if (maybeError) {
      setError(maybeError);
      return;
    }
    setLoading(() => true);
    try {
      await createAccountService({ name, email, password });
      setShowSweeatAlert(true);
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    }
    setLoading(() => false);
  }

  function handleConfirm() {
    navigate("/login");
  }

  const submitEnable = !!email && !!password && !!name;

  return (
    <AuthContainer>
      <AuthForm>
        {showSweetAlert && (
          <SweetAlert
            message="Conta criado com sucesso!"
            type="success"
            onConfirm={handleConfirm}
          />
        )}
        <h2>Criar conta</h2>
        <div className="input">
          <Label>Nome:</Label>
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className="input">
          <Label>E-mail:</Label>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="input">
          <Label>Senha:</Label>
          <Input
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        {error && <span className="error">{error}</span>}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button
            title="Enviar"
            action={handleCreateAccount}
            disabled={!submitEnable}
          />
        )}
        <span>
          Já tem uma conta?
          <Link to="/login">Login</Link>
        </span>
      </AuthForm>
    </AuthContainer>
  );
};

export default Signup;
