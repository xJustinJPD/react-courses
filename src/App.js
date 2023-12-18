import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Navbar
import Navbar from "./Navbar";

// Courses
import Index from"./courses/Index";
import Show from "./courses/Show";
import Create from "./courses/Create";
import Edit from "./courses/Edit";

// Lecturers
import LecturersIndex from "./lecturers/Index";
import LecturersEdit from "./lecturers/Edit";
import LecturersCreate from "./lecturers/Create";

// Enrolments
import EnrolmentsIndex from "./enrollments/Index";
import EnrolmentsEdit from "./enrollments/Edit";
import EnrolmentsCreate from "./enrollments/Create";

// Auth
import { useAuth } from "./contexts/AuthContexts";
import LoginPage from "./LoginPage";
import PageNotFound from "./PageNotFound";
import RegisterPage from "./RegisterPage";

function App() {
  const { authenticated, onAuthenticated } = useAuth();

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      onAuthenticated(true);
    }
  }, []);

  if(authenticated){
    protectedRoutes = (
      <>
      <Route path='/' element={<Index/>}/>
      <Route path='/courses' element={<Index/>}/>
      <Route path='/courses/:id' element={<Show/>}/>
      <Route path='/courses/:id/edit' element={<Edit/>}/>
      <Route path='/courses/create' element={<Create/>}/>

      <Route path='/lecturers' element={<LecturersIndex/>}/>
      <Route path='/lecturers/:id/edit' element={<LecturersEdit/>}/>
      <Route path='/lecturers/create' element={<LecturersCreate/>}/>

      <Route path='/enrolments' element={<EnrolmentsIndex/>}/>
      <Route path='/enrolments/:id/edit' element={<EnrolmentsEdit/>}/>
      <Route path='/enrolments/create' element={<EnrolmentsCreate/>}/>
      </>
    );
  }

  return (
    <Router>
    <Navbar/>
    <Routes>
    {protectedRoutes}
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </Router>
  );
}

export default App;
