import React, { useContext, useState } from "react";
import "./Register.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterHost = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    number: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate('/loginHost');
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.email || !credentials.password || !credentials.number) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (credentials.password.length < 8 ||
      !/\d/.test(credentials.password) ||
      !/[a-z]/.test(credentials.password) ||
      !/[A-Z]/.test(credentials.password) ||
      !/[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/.test(credentials.password)) {
      alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }
    if(credentials.number.length !== 9) {
      alert("Le mot de passe doit contenir 9 chifrres");
    }
    if (credentials.number === "123456789") {
      alert("Le nombre ne peut pas être '123456789'.");
      return;
    }
    

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/registerHost", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      const adminId = res.data._id;
      sessionStorage.setItem("adminId", adminId);
      navigate(`/hostels`);

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <html lang="en">
    <head>
      <title>Inscription</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet"/>
  
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    
    <link rel="stylesheet" href="../../css6/style.css"/>
    </head>
    <body className="img js-fullheight" style={{backgroundImage: 'url(../../images/forr.jpg)'}}>
    <section className="ftco-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-5">
          <h2 className="heading-section">S'inscrire</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-wrap p-0">
            <h3 className="mb-4 text-center">Créer un compte</h3>
            <form className="signin-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Nom d'utulisateur"
                  pattern=".{8,}"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                 type={showPassword ? "text" : "password"}
                 
                  className="form-control"
                  id="password"
                  placeholder="Mot de passe"
                  required
                  onChange={handleChange}
                />
                 <span
                        toggle="#password-field"
                        className={`fa fa-fw field-icon toggle-password ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={togglePasswordVisibility}
                      ></span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  placeholder="Entrez un nombre de 9 chiffres"
                  maxLength={9}
                  required
                  onChange={handleChange}
                />
                <p style={{color:'white'}}>*Obligatoire en cas de perte de password !</p>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control btn btn-primary submit px-3"
                  onClick={handleClick}
                >
                  Inscription
                </button>
              </div>
              {error && <span>{error.message}</span>}
            </form>
            <a href="" className="px-2 py-6 mr-md-1 rounded" onClick={handleAdminClick} style={{ marginTop: '3px' }}>
              <span className="ion-logo-facebook mr-2"></span> Se connecter
            </a>
          </div>
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

export default RegisterHost;
