import React, { useContext, useState } from "react";
import "./Register.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const handleuserClick = () => {
    navigate('/login');
  };
  const { loading, error, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.email || !credentials.password) {
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

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      const userId = res.data._id;
    sessionStorage.setItem("userId", userId);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <html lang="en">
    <head>
      <title>inscription</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet"/>
  
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    
    <link rel="stylesheet" href="../../css6/style.css"/>
  
    </head>
    <body className="img js-fullheight" style={{backgroundImage: 'url(../../images2/hero_4.jpg)'}}>
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
              <form action="#" className="signin-form">

                <div className="form-group">
                  <input type="text" className="form-control"
                   onChange={handleChange} id="username" 
                   placeholder="Nom d'utulisateur"  pattern=".{8,}" required/>
                </div>
               
                <span className="error">{credentials.username && credentials.username.length < 8 ? "Le username doit comporter au moins 8 caractères Nom et Prenom" : null}</span>
              <div className="form-group">
                  <input type="email" className="form-control"
                   onChange={handleChange} id="email" 
                   placeholder="email"  required/>
                </div>   
                
                
                <div className="form-group">
                  <input  type={showPassword ? "text" : "password"} onChange={handleChange} id="password" className="form-control" placeholder="Mot de passe" required/>
                  <span
                        toggle="#password-field"
                        className={`fa fa-fw field-icon toggle-password ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={togglePasswordVisibility}
                      ></span>
                </div>
                <span className="error">{credentials.password && credentials.password.length < 8 ? "Le password doit comporter au moins 8 caractères" : null}</span>
                <div className="form-group">
                  <button type="submit"  onClick={handleClick} className="form-control btn btn-primary submit px-3">Sign In</button>
                </div>
                {error && <span>{error.message}</span>}
                <div className="form-group d-md-flex">
                  <div className="w-50">
                    
                  </div>
                  
                </div>
              </form>
             
              <div className="social d-flex text-center">
                
              </div>
            </div><a href="" className="px-2 py-6 mr-md-1 rounded" onClick={handleuserClick} style={{marginTop:'3px'}}>
              <span className="ion-logo-facebook mr-2"></span>Se connecter</a>
          <div className="w-20 text-md-right">
                   
                  </div></div>
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

export default Register;
