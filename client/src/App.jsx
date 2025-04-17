import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./Pages/RegisterPage";
import { LoginPages } from "./Pages/LoginPages";
import { AuthProvider } from "./Context/Auth.context";
import { TaskPage } from "./Pages/TaskPage";
import { TaskFormPage } from "./Pages/TaskFormPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { HomePage } from "./Pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { TaskProvider } from "./Context/TasksContext";
import  {NavBar}  from "./Components/NavBar";


export const App = () => {
  return (



    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPages />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>

              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
