import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="px-4 py-6 text-center">
          <h2 className="text-2xl font-bold">NCBA&E Dashboard</h2>
        </div>
        <nav className="flex-1 px-4">
          <ul>
            <li className="my-2">
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-blue-500 transition"
              >
                Dashboard
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-blue-500 transition"
              >
                Courses
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-blue-500 transition"
              >
                Assignments
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-blue-500 transition"
              >
                Grades
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-blue-500 transition"
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button className="w-full bg-red-500 py-2 rounded hover:bg-red-400 transition"
          onClick={() => navigate("/studentsignin")}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome Back, [Student Name]!
          </h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
              Notifications
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
              Profile
            </button>
          </div>
        </header>

        {/* Content Area */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Total Students */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">Total Students</h2>
            <p className="mt-2 text-2xl text-blue-600">1,245</p>
          </div>

          {/* Card 2 - Total Courses */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">Total Courses</h2>
            <p className="mt-2 text-2xl text-green-600">15</p>
          </div>

          {/* Card 3 - Upcoming Assignments */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">Assignments Due</h2>
            <p className="mt-2 text-2xl text-yellow-600">5</p>
          </div>

          {/* Card 4 - Announcements */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">New Announcements</h2>
            <p className="mt-2 text-2xl text-red-600">3</p>
          </div>

          {/* Card 5 - Upcoming Exams */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Exams</h2>
            <p className="mt-2 text-2xl text-purple-600">2</p>
          </div>

          {/* Card 6 - Overall Grades */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">Overall Grades</h2>
            <p className="mt-2 text-2xl text-green-600">B+</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
