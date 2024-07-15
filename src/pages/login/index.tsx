import { useState } from "react";
import { Button } from "../../shared/components/Button";
import { Input } from "../../shared/components/Input";
import { useAuthContext } from "../../shared/hooks/useAuthContext";
import { AuthContainer, AuthForm } from "./style";
import { Link } from "react-router-dom";
import { Label } from "../../shared/styles/input";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const { handleLogin, error, loading } = useAuthContext();

  async function handleLoginAction() {
    if (!email || !password) return;
    await handleLogin(email, password);
  }

  const submitEnable = !!email && !!password;

  return (
    <AuthContainer>
      <AuthForm>
        <h2>Login</h2>
        <div className="input">
          <Label>E-mail:</Label>
          <Input
            title="E-mail"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="input">
          <Label>Senha:</Label>
          <Input
            title="Senha"
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
            action={handleLoginAction}
            disabled={!submitEnable}
          />
        )}
        <span>
          Ainda não tem uma conta?
          <Link to="/signup">Criar conta</Link>
        </span>
      </AuthForm>
    </AuthContainer>
  );
};

export default Login;
