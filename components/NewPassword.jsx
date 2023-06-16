import { PersonCircle } from 'react-bootstrap-icons';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NewPassword = () => {
  const [host, setHost] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hostId = searchParams.get('hostId');


  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

 const handleAdminClick = () => {
      navigate('/hostels');
    };
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }
   
    if (!validatePassword(newPassword)) {
      alert("Le nouveau mot de passe ne respecte pas les critères requis !");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4001/api/auth/${hostId}/newPassword`, {
        newPassword,
      });
      alert("Le mot de passe a été changé avec succès !");
      
      sessionStorage.setItem("adminId", hostId);
      navigate('/hostels')
    } catch (error) {
      alert("Ancien mot de passe incorrect");
    }
  };

 

  return (
    <html lang="en">
      <head>
        <title>Profile</title>
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
      <body className="img js-fullheight" style={{ backgroundImage: 'url(../../images2/slider-7.jpg)' }}>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section"><PersonCircle size={128} /></h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="login-wrap p-0">
                  <h3 className="mb-4 text-center">Profile</h3>
                  <form action="" className="signin-form">
                  
                   
                      <div className="form-group">
                       
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nouveau password"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirmer password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <button
                          onClick={changePassword}
                          className="form-control btn btn-primary submit px-3"
                        >
                          Enregistrer
                        </button>
                       
                      </div>
                 
                        <>
                          
                          <button style={{ marginTop: '10px' }} className="form-control btn btn-primary submit px-3" onClick={handleAdminClick}>Annuler</button>
                        </>
                   
                    <div className="form-group d-md-flex">
                  
                      <div className="w-50"></div>
                    </div>
                  </form>

                  <div className="social d-flex text-center"></div>
                </div>

                <div className="w-20 text-md-right">

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

export default NewPassword;
