import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudentSignIn from './Register/StudentSignIn.jsx'
import AdminSignIn from './Register/AdminSignIn.jsx'
import Dashboard from './Register/Dashboard.jsx'
import ResetPassword from './Register/Modal/ResetPassword.jsx'
import AdminDashboard from './Register/AdminDashboard.jsx'
import StudentList from './Users/Student.jsx'
import FacultyList from './Users/Faculty.jsx'
import FinanceList from './Users/Finance.jsx'
import DepartmentList from './Users/Department.jsx'
import Setting from './Users/Profile.jsx'
import AddStudent from './Register/Modal/AddStudent.jsx'
import AddFaculity from './Register/Modal/AddFaculity.jsx'
import AddFinanceModal from './Register/Modal/AddFinance.jsx'
import AddDepartmentModal from './Register/Modal/AddDepartment.jsx'
import StudentDashboard from './Register/StudentDashboard.jsx'
import Student_Courses from './Student_Data/Courese.jsx'
import Student_Assignments from './Student_Data/Assignments.jsx'
import Student_Schedule from './Student_Data/Schedule.jsx'
import Student_Announcements from './Student_Data/Announcements.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/studentsignin',
    element: <StudentSignIn />,
  },
  {
    path: '/adminsignin',
    element: <AdminSignIn />,
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
  },
  {
    path: '/admindashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/resetpassword',
    element: <ResetPassword/>,
  },
  {
    path: '/studentlist',
    element: <StudentList/>,
  },
  {
    path: '/facultylist',
    element: <FacultyList/>,
  },
  {
    path: '/f-staff',
    element: <FinanceList/>,
  },
  {
    path: '/department',
    element: <DepartmentList/>,
  },
  {
    path: '/profile',
    element: <Setting/>,
  },
  {
    path: '/addStudent',
    element: <AddStudent/>,
  },
  {
    path: '/addFaculity',
    element: <AddFaculity/>,
  },
  {
    path: '/addFinance',
    element: <AddFinanceModal/>,
  },
  {
    path: '/addDepartment',
    element: <AddDepartmentModal/>,
  },
    {
      path: '/studentdashboard',
      element: <StudentDashboard/>,
    },
    {
      path: '/studentcourses',
      element: <Student_Courses/>,
    },
    {
      path: '/studentassignments',
      element: <Student_Assignments/>,
    },
    {
      path: '/studentschedule',
      element: <Student_Schedule/>,
    },
    {
      path: '/studentannouncements',
      element: <Student_Announcements/>,
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
