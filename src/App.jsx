import { useEffect } from "react";
import { openDb } from './api/IndexedDb';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Setting from './pages/Setting';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Content from "./templates/Content";

const App = () => {

  // ** Define Your Navigation Route Here
  const routeList = [
    {
      path: "/", component: <Content><Home /></Content>
    },
    {
      path: "/setting", component: <Content><Setting /></Content>
    },
    {
      path: "/register", component: <Register />
    },
    {
      path: "/login", component: <Login />
    }
  ]

  useEffect(() => {
    openDb().then(database => {
      return database
    }).catch(error => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <Routes>
      {routeList.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default App;
