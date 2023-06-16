// App.js
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home2 from "./pages/home/Home2";

import List2 from "./pages/list/List2";

import New from "./pages/new/New";

import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";

import { DarkModeContext } from "./context/darkModeContext";
import { hotelColumns, userColumns,roomColumns } from "./datatablesource";
import LoginHost from "./pages/login/LoginHost";
import RegisterHost from "./pages/Register/RegisterHost";
import NewHotel from "./pages/newHotel/NewHotel";
import { AuthContextHost } from "./context/AuthContextHost";
import NewRoom from "./pages/newRoom/NewRoom";

import ViewRooms from "./pages/views/ViewRooms";
import ViewReservations from "./pages/views/ViewReservations";
import Rooms from "./pages/views/Rooms";
import DeleteHotel from "./pages/views/DeleteHotel";
import DeleteRoom from "./pages/views/DeleteRoom";
import ModifyHotel from "./pages/views/ModifyHotel";
import ModifyRoom from "./pages/views/ModifyRoom";
import VoirUneRoom from "./pages/views/VoirUneRoom";
import ReservationPage from "./components/ReservationPage";
import Facture from "./components/Facture";
import ForgotPassword from "./pages/login/ForgotPassword";
import HostPage from "./components/HostPage";
import UserPage from "./components/UserPage";
import UserReservations from "./components/UserReservations";
import RoomHost from "./pages/views/RoomHost";
import NewPassword from "./components/NewPassword";
import ReservationDetails from "./components/ReservationDetails";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const user = sessionStorage.getItem('userId');
    
    if (!user) {
      return <Navigate to="/login" />;
    }
   
    return children;
  };
  const ProtectedRouteHost = ({ children }) => {
  const host = sessionStorage.getItem('adminId');
  
 if (!host) {
      return <Navigate to="/loginHost" />;
    }
    return children;
  };

  return (
    <BrowserRouter className={darkMode ? "dark" : ""}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
      
        <Route path="/hotels/:id" element={<Hotel />} />

       
        <Route path="/loginHost" element={<LoginHost />} />
        <Route path="/registerHost" element={<RegisterHost />} />
        <Route path="/create-room" element={<ProtectedRouteHost><NewRoom /></ProtectedRouteHost>} />
       
        <Route path="/view-rooms" element={ <ProtectedRouteHost> <ViewRooms /> </ProtectedRouteHost>} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/delete-hotel" element={ <ProtectedRouteHost><DeleteHotel /></ProtectedRouteHost>} />
        <Route path="/modify-hotel" element={<ProtectedRouteHost><ModifyHotel /></ProtectedRouteHost>} />
        <Route path="/delete-room" element={<ProtectedRouteHost><DeleteRoom /></ProtectedRouteHost>} />
        <Route path="/modify-room" element={ <ProtectedRouteHost><ModifyRoom /></ProtectedRouteHost>} />
        <Route path="/voirUneRoom" element={<VoirUneRoom />} />
        <Route path="/reservationPage" element={<ProtectedRoute><ReservationPage /></ProtectedRoute>} />
        <Route path="/facture" element={<ProtectedRoute><Facture /></ProtectedRoute>} />
        <Route path="/view-reservations" element={<ProtectedRouteHost><ViewReservations /></ProtectedRouteHost>} />
        <Route  path="/forgotPassword" element={<ForgotPassword/>} />
        <Route  path="/hostPage" element={<HostPage/>} />
        <Route  path="/userPage" element={<ProtectedRoute><UserPage/></ProtectedRoute>} />
        <Route  path="/userReservations" element={<ProtectedRoute><UserReservations/></ProtectedRoute>} />
        <Route  path="/roomHost" element={<RoomHost/>} />
        <Route  path="/newPassword" element={<NewPassword/>} />
        <Route path="/reservation/:reservationId" element={<ProtectedRoute><ReservationDetails /></ProtectedRoute>} />
      
        
      
            
        <Route path="/Home2" element={
          < ProtectedRouteHost>
         <Home2 />   
        </ProtectedRouteHost>
        
        } />
        <Route path="hostels">
          <Route
            index
            element={
             
           
                <List2 columns={hotelColumns} />
            }
          />
        
          <Route
            path="new"
            element={
             
                <NewHotel />
             
            }
          />
        </Route>
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


