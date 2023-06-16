import React, { useContext, useState, useRef, useEffect } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginHost = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    forgotPassword: false,
    email: "",
    number: ""
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const timer = useRef(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (loginAttempts >= 3 && countdown === 0) {
      startTimer();
    }
  }, [loginAttempts, countdown]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAdminClick = () => {
    navigate("/registerHost");
  };

  const handleForgotPassword = () => {
    setCredentials((prev) => ({ ...prev, forgotPassword: true }));
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const { email, number } = credentials;
    try {
      const res = await axios.post("/auth/forgotPasswordHost", { email, number });
      const { hostId, password } = res.data; // Récupérer l'ID de l'hôte et le mot de passe de la réponse
  
      // Utilisez l'hostId et le mot de passe comme nécessaire dans la logique de votre application
      // Par exemple, vous pouvez les afficher dans une alerte ou les utiliser pour d'autres opérations
  navigate(`/newPassword?hostId=${hostId}`)
     
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  

  const handleClick = async (e) => {
    e.preventDefault();
    if (loginAttempts >= 3) {
      return;
    }
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/loginHost", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      const adminId = res.data.details._id;
      sessionStorage.setItem("adminId", adminId);
      navigate(`/hostels`);
    } catch (err) {
      setLoginAttempts((prev) => prev + 1);
      if (loginAttempts + 1 === 3) {
        startTimer();
      }
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const startTimer = () => {
    let time = 120;
    setCountdown(time);
    timer.current = setInterval(() => {
      time--;
      setCountdown(time);
      if (time <= 0) {
        clearInterval(timer.current);
      }
    }, 1000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <html lang="en">
    <head>
      <title>Connexion</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <link rel="stylesheet" href="../../css6/style.css" />
    </head>
    <body className="img js-fullheight" style={{backgroundImage: 'url(../../images/forr.jpg)'}}>
      <section className="ftco-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-5">
          <h2 className="heading-section">Se connecter</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-wrap p-0">
            <h3 className="mb-4 text-center">Vous avez déjà un compte</h3>
            <form action="#" className="signin-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  id="username"
                  placeholder="Nom d'utilisateur"
                  disabled={loginAttempts >= 3 && countdown > 0}
                  required
                />
              </div>
              <div className="form-group">
              <input
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        id="password"
                        disabled={loginAttempts >= 3 && countdown > 0}
                        className="form-control"
                        placeholder="Mot de passe"
                        required
                      />
                      <span
                        toggle="#password-field"
                        className={`fa fa-fw field-icon toggle-password ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={togglePasswordVisibility}
                      ></span>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  disabled={loading || loginAttempts >= 3}
                  onClick={handleClick}
                  className="form-control btn btn-primary submit px-3"
                >
                  Connexion
                </button>
                {loginAttempts >= 3 && countdown > 0 && (
                  <p className="countdown">
                    Vous êtes bloqué pendant : {formatTime(countdown)} min
                  </p>
                )}
              </div>
              {error && <span>{error.message}</span>}
              {!credentials.forgotPassword ? (
                <div className="form-group d-md-flex">
                  <div className="w-50"></div>
                  <div className="w-20 text-md-right">
                    <button
                      className="btn btn-link"
                      onClick={handleForgotPassword}
                      style={{ color: "#fff" }}
                    >
                       Password oublié
                    </button>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                   <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  /></div>
                   <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="number"
                    placeholder="Numéro"
                    onChange={handleChange}
                    required
                  /></div>
                 <div className="container"> <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleForgotPasswordSubmit}
                  >
                    Envoyer
                  </button>
                  <button
                  style={{marginLeft:'10px'}}
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setCredentials((prev) => ({ ...prev, forgotPassword: false }))
                    }
                  >
                    Annuler
                  </button></div> 
                </div>
              )}
            </form>
            <div className="social d-flex text-center"></div>
          </div>
          <a
            href=""
            className="px-2 py-6 mr-md-1 rounded"
            onClick={handleAdminClick}
            style={{ marginTop: "3px" }}
          >
            <span className="ion-logo-facebook mr-2"></span> S'inscrire
          </a>
        </div>
      </div>
    </div>
    </section>

<script src="../../js/jquery.min.js"></script>
<script src="../../js/popper.js"></script>
<script src="../../js/bootstrap.min.js"></script>
<script src="../../js/main.js"></script>
</body>
</html>
  );
};

export default LoginHost;
