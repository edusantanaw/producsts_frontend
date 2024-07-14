import { useState } from "react";
import { Button } from "../../shared/components/Button";
import { Input } from "../../shared/components/Input";
import { useAuthContext } from "../../shared/hooks/useAuthContext";

const Signup = () => {
  const { handleLogin, error } = useAuthContext();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();


  async function handleLoginAction() {
    if (!email || !password) return;
    await handleLogin(email, password);
  }

  const submmitEnable = !!email && !!password;

  return (
    <div>
      <Input
        title="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        title="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <span className="error">{error}</span>}
      <Button
        title="Enviar"
        action={handleLoginAction}
        disabled={!submmitEnable}
      />
    </div>
  );
};

export default Signup;
