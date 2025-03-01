import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { loadAllUsers } from '../redux/users'
import Navigation from "../components/Navigation/Navigation";
import FooterImg from "../components/FooterImg";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    
    dispatch(thunkAuthenticate()).then(dispatch(loadAllUsers())).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
        <FooterImg />
      </ModalProvider>
    </>
  );
}
