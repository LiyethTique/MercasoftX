import { useState, useNavigate } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import { ReactSession } from "react-client-session";

const LoginForm = () => {
  const [Cor_User, setCor_User] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([Cor_User, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
      return;
    }

    try {
      const url = "/api/user/login";
      const { data } = await clienteAxios.post(url, {
        Cor_User: Cor_User,
        password: password,
      });

      // Se guarda el Token En el LocalStorage del navegador
      ReactSession.set("token", data.token);
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  // ... Resto del componente
};

export default LoginForm;