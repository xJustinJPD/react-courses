import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/courses' element={<Index/>}/>
      <Route path='/courses/:id' element={<Show/>}/>
      <Route path='/courses/:id/edit' element={<Edit/>}/>
      <Route path='/courses/create' element={<Create/>}/>

      <Route path='/lecturers' element={<LecturersIndex/>}/>
      <Route path='/lecturers/:id/edit' element={<LecturersEdit/>}/>
      <Route path='/lecturers/create' element={<LecturersCreate/>}/>

      <Route path='/enrolments' element={<EnrolmentsIndex/>}/>
    </Routes>
  </Router>
  );
}

export default App;
