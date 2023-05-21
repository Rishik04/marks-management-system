import "./App.css";
import TeacherDashboard from "./Pages/Teachers/TeacherDashboard";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TeacherSubjects from "./Pages/Teachers/TeacherSubjects";
import SingleSubjectPage from "./Pages/Teachers/SingleSubjectPage";
import StudentDashboard from "./Pages/Students/StudentDashboard";
import Marks from "./Pages/Students/Marks";
import { HomePage } from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/teacher" element={<TeacherDashboard/>} />
          <Route path="/teacher/subjects/" element={<TeacherSubjects/>} />
          <Route path="/teacher/subjects/:id/*" element={<SingleSubjectPage/>} />
          <Route path="/student" element={<StudentDashboard/>} />
          <Route path="/student/marks" element={<Marks/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
