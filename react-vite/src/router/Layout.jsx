import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { loadAllUsers } from '../redux/users'
import { loadAllCourses } from '../redux/courses'
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const loadState = async () => {
    await dispatch(loadAllUsers())
    await dispatch(loadAllCourses())
  }
  useEffect(() => {
    
    dispatch(thunkAuthenticate()).then(loadState()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
