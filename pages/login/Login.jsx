import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';




const Login = ()=>{
  
    const [credentials ,setCredentials] =useState({
        username:undefined,
        password:undefined,
    })
    const {loading,error,dispatch} =useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate =useNavigate()

const handleChange = (e)=>{
setCredentials((prev) =>({...prev ,[e.target.id]: e.target.value}));
}
const handleuserClick = () => {
  navigate('/register');
};
const handleClick = async (e) => {
  e.preventDefault();
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", credentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    const userId = res.data.details._id;
    sessionStorage.setItem("userId", userId);
      navigate(`/`);
   
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  }

};
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
    return (
   
      <html lang="en">
        <head>
          <title>Connexion</title>
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
                <h2 className="heading-section">Se connecter</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="login-wrap p-0">
                  <h3 className="mb-4 text-center">Vous avez déja un compte</h3>
                  <form action="#" className="signin-form">
                    <div className="form-group">
                      <input type="text" className="form-control" onChange={handleChange} id="username" placeholder="Nom d'utulisateur" required/>
                    </div>
                    <div className="form-group">
                      <input  type={showPassword ? "text" : "password"} onChange={handleChange} id="password" className="form-control" placeholder="Mot de passe" required/>
                      <span
                        toggle="#password-field"
                        className={`fa fa-fw field-icon toggle-password ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={togglePasswordVisibility}
                      ></span>
                    </div>
                    <div className="form-group">
                      <button type="submit"  onClick={handleClick} className="form-control btn btn-primary submit px-3">Connexion</button>
                    </div>
                    {error && <span>{error.message}</span>}
                    <div className="form-group d-md-flex">
                      <div className="w-50">
                        
                      </div>
                      
                    </div>
                  </form>
                 
                  <div className="social d-flex text-center">
                    
                  </div>
                </div><a href="" className="px-2 py-6 mr-md-1 rounded"onClick={handleuserClick} style={{marginTop:'3px'}}>
                  <span className="ion-logo-facebook mr-2"></span> S'inscrire</a>
              <div className="w-20 text-md-right">
                        <a href="" style={{color: '#fff'}}>Forgot Password</a>
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
export default Login;