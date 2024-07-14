import { useState } from "react";
import { Button } from "../../shared/components/Button";
import { Input } from "../../shared/components/Input";
import { useAuthContext } from "../../shared/hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const { handleLogin, error } = useAuthContext();

  async function handleLoginAction() {
    if (!email || !password) return;
    await handleLogin(email, password);
  }

  const submitEnable = !!email && !!password;

  return (
    <div>
      <Input
        title="E-mail"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <Input
        title="Senha"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      {error && <span className="error">{error}</span>}
      <Button
        title="Enviar"
        action={handleLoginAction}
        disabled={!submitEnable}
      />
    </div>
  );
};

export default Login;
