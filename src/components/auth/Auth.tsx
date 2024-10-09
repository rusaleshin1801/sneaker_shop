import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/slices/getProductApi";
import Button from "../../ui/component/button/Button";
import Input from "../../ui/component/input/Input";
import Logo from "../../assets/logo/logo.svg";
import styles from "./styles.module.css";

const Auth: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token !== "expired") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      localStorage.setItem("authToken", response.token);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.imgContainer}>
          <img src={Logo} alt="Company Logo" width={164} height={44} />
        </div>
      </header>
      <section className={styles.container}>
        <h1 className={styles.title}>Sign in</h1>
        <form
          onSubmit={handleLogin}
          className={styles.form}
          aria-label="Sign in form"
        >
          <div className={styles.inputGroup}>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          <Button
            text="Sign in"
            width="small"
            aria-label="Sign in"
            disabled={isLoading}
          />
        </form>
      </section>
    </main>
  );
};

export default Auth;
