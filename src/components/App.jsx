import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../assets/app.css";
import { AuthProvider } from "../contexts/AuthContexts";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route
              index
              path="/signup"
              element={
                <PublicRoute redirectTo={"/"}>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              index
              path="/login"
              element={
                <PublicRoute redirectTo={"/"}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              index
              path="/quiz/:id"
              element={
                <PrivateRoute redirectTo={"/login"}>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              index
              path="/result/:id"
              element={
                <PrivateRoute redirectTo={"/login"}>
                  <Result />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
