import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/httpHooks";
import { useMessage } from "../hooks/messageHook";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request, error, cleanError } = useHttp();

  const popUpMessage = useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    popUpMessage(error);
    console.log(error);
    cleanError();
  }, [cleanError, error, popUpMessage]);

  const handleRegistration = async () => {
    try {
      const response = await request("api/auth/registration", "POST", form);
      popUpMessage(response.message);
    } catch (error) {}
  };

  const handleLogin = async () => {
    try {
      const response = await request("api/auth/login", "POST", form);
      auth.login(response.token, response.userId)
      popUpMessage(response.message);
      navigate('/create')
    } catch (error) {}
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  return (
    <div className="row grey lighten-3" style={{ height: 1000 }}>
      <div className="col s6 offset-s3">
        <h1>Link Shorter</h1>
        <div className="card white">
          <div className="card-content black-text">
            <span className="card-title">Sigh in to your account</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                />
                <label htmlFor="email">Enter email</label>
              </div>
            </div>
            <div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={form.password}

                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow-darken-4 "
              disabled={loading}
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="btn grey-lighten-1"
              style={{ marginLeft: 10 }}
              onClick={handleRegistration}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
