import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  GraduationCap,
  Settings,
  Book,
  Clock,
  Calendar as CalendarIcon,
  Bell,
  User,
  ChevronDown,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const Student_Assignments = () => {
  const navigate = useNavigate();
  const student = localStorage.getItem("student");
  const studentData = JSON.parse(student);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const courseNames = Array.isArray(studentData?.courses)
    ? studentData.courses
    : [];

  const courses = courseNames.map((course, index) => ({
    id: index + 1,
    name: typeof course === 'string' ? course : course.name || 'Unknown Course',
    instructor: typeof course === 'object' ? course.instructor || 'TBD' : 'TBD',
    progress: typeof course === 'object' ? course.progress || 0 : 0,
  }));

  // Generate sample assignments with more realistic data
  const assignments = [
    {
      id: 1,
      title: "Research Project Proposal",
      course: courses[0]?.name || "Computer Science",
      dueDate: "March 15, 2025",
      status: "pending",
      description: "Submit a 3-page proposal for your final research project",
    },
    {
      id: 2,
      title: "Midterm Programming Exercise",
      course: courses[1]?.name || "Advanced Programming",
      dueDate: "February 22, 2025",
      status: "submitted",
      description: "Complete the programming assignment in the online lab",
    },
    {
      id: 3,
      title: "Group Project Presentation",
      course: courses[2]?.name || "Software Engineering",
      dueDate: "March 5, 2025",
      status: "graded",
      grade: "A",
      description: "Prepare a 15-minute presentation on your term project",
    },
    {
      id: 4,
      title: "Weekly Problem Set",
      course: courses[0]?.name || "Data Structures",
      dueDate: "February 20, 2025",
      status: "pending",
      description: "Complete problems 3.1-3.10 from the textbook",
    },
    {
      id: 5,
      title: "Final Project Milestone",
      course: courses[1]?.name || "Web Development",
      dueDate: "March 1, 2025",
      status: "submitted",
      description: "Submit your project's front-end implementation",
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Helper function to determine status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'submitted':
        return { color: 'text-green-600 bg-green-50', icon: <CheckCircle className="w-4 h-4 text-green-600" /> };
      case 'graded':
        return { color: 'text-blue-600 bg-blue-50', icon: <ClipboardList className="w-4 h-4 text-blue-600" /> };
      case 'pending':
        return { color: 'text-amber-600 bg-amber-50', icon: <AlertCircle className="w-4 h-4 text-amber-600" /> };
      default:
        return { color: 'text-gray-600 bg-gray-50', icon: <XCircle className="w-4 h-4 text-gray-600" /> };
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col shadow-xl">
        <div className="px-4 py-6 text-center bg-blue-800">
          <img
            src="src/assets/<img
  src="https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/NCBA%26E.png?raw=true"
  alt="NCBA&E Logo"            alt="NCBA&E Logo"
            className="mx-auto h-20 w-20 mb-2 transition-all duration-300 hover:scale-105"
          />
          <h1 className="text-xl font-bold tracking-wider">NCBA&E LMS</h1>
        </div>
        <nav className="flex-1 px-4 mt-6">
          <ul>
            <li className="my-2">
              <a
                href="/studentdashboard"
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentdashboard') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </a>
            </li>
            <li className="my-2">
              <a
                href="/studentcourses"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
              >
                <BookOpen className="w-5 h-5" />
                Courses
              </a>
            </li>
            <li className="my-2">
              <a
                href="/studentassignments"
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentassignments') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
              >
                <Calendar className="w-5 h-5" />
                Assignments
              </a>
            </li>
            <li className="my-2">
              <a
                href="/studentschedule"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
              >
                <CalendarIcon className="w-5 h-5" />
                Class Schedule
              </a>
            </li>
            <li className="my-2">
              <a
                href="/studentannouncements"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
              >
                <Bell className="w-5 h-5" />
                Announcements
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 mt-auto">
          <button className="w-full bg-red-600 py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-95 shadow-md flex items-center justify-center gap-2"
            onClick={() => {
              localStorage.removeItem("student");
              navigate("/studentsignin");
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-auto"
       style={{
  backgroundImage: `url('https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/background_image.png?raw=true')`,
  backgroundSize: "cover",
  backgroundPosition: "center right",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "overlay",
  backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
}}
>
        <header className="mb-8 bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              Welcome, {studentData.name}
            </h1>
            <p className="text-gray-600 mt-1">Have a productive day!</p>
          </div>
          <div className="text-right bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700">Department: <span className="font-semibold text-blue-700">{studentData.department}</span></p>
            <p className="text-sm text-gray-700">Semester: <span className="font-semibold text-blue-700">{studentData.semester}</span></p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{assignments.filter(a => a.status === 'pending').length}</h3>
                  <p className="text-sm text-gray-600">Pending Assignments</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{assignments.filter(a => a.status === 'submitted').length}</h3>
                  <p className="text-sm text-gray-600">Submitted Assignments</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{assignments.filter(a => a.status === 'graded').length}</h3>
                  <p className="text-sm text-gray-600">Graded Assignments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assignments Cards */}
          <h2 className="text-xl font-semibold text-white mb-6">All Assignments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => {
              const statusInfo = getStatusInfo(assignment.status);
              return (
                <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{assignment.title}</h3>
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700 line-clamp-2">{assignment.description}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Course</span>
                      <span className="text-sm font-medium text-gray-900">{assignment.course}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Due Date</span>
                      <span className="text-sm font-medium text-gray-900">{assignment.dueDate}</span>
                    </div>

                    <div className="pt-3 border-t mt-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Status</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          {assignment.grade && ` (${assignment.grade})`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Call-to-action button */}
                  <button
                    className={`w-full mt-5 py-2 rounded-md text-sm font-medium transition 
                      ${assignment.status === 'pending'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : assignment.status === 'submitted'
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {assignment.status === 'pending'
                      ? 'Submit Assignment'
                      : assignment.status === 'submitted'
                        ? 'View Submission'
                        : 'View Feedback'
                    }
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student_Assignments;