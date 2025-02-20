import React from "react";
import { useNavigate } from "react-router-dom";
import { getstudents } from "../Services/student";
import { getAdmin, getFinanceUsers } from "../Services/admin";
import { getDepartment } from "../Services/department";
import {getFaculity} from '../Services/faculity'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  const adminData = JSON.parse(admin);
  const students = getstudents();
  const departments = getDepartment();
  const financestaff = getFinanceUsers()
  const faculity = getFaculity()

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="px-4 py-6 text-center">
        <img
              src="src/assets/NCBA&E.png"
              alt="NCBA&E Logo"
              className="mx-auto h-25 w-20"
            />
        </div>
        <nav className="flex-1 px-4">
          <ul>
            <li className="my-2">
              <a
                href="/admindashboard"
                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
              >
                Dashboard
              </a>
            </li>
            <li className="my-2">
              <a
                href="/studentlist"
                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
              >
                Students
              </a>
            </li>
            <li className="my-2">
              <a
                href="/facultylist"
                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
              >
                Faculity
              </a>
            </li>
            <li className="my-2">
              <a
                href="/department"
                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
              >
                Departments
              </a>
            </li>
            <li className="my-2">
              <a
                href="/f-staff"
                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
              >
                Finance Staff
              </a>
            </li>
            <li className="my-2">
              <a
                href="/profile"
                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
              >
                Setting
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button className="w-full bg-blue-500 py-2 rounded hover:bg-red-400 transition"
          onClick={() => {
            localStorage.removeItem("admin"); 
            navigate("/adminsignin");
          }}>
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            {adminData.name}
          </h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
              Profile
            </button>
          </div>
        </header>

        {/* Content Area */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow cursor-pointer"
           onClick={() => {navigate("/studentlist")}}>
            <h2 className="text-lg font-semibold text-gray-800">Total Students</h2>
            <p className="mt-2 text-2xl text-blue-600">{students.length}</p>
          </div>

          {/* Card 2 - Total Courses */}

          <div className="bg-white p-4 rounded shadow cursor-pointer" 
          onClick={() => {navigate("/facultylist")}}>
            <h2 className="text-lg font-semibold text-gray-800">Total Faculity</h2>
            <p className="mt-2 text-2xl text-green-600">{faculity.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow cursor-pointer"
          onClick={() => {navigate("/department")}}>
            <h2 className="text-lg font-semibold text-gray-800">Total Department</h2>
            <p className="mt-2 text-2xl text-green-600">{departments.length}</p>
          </div>

          {/* Card 3 - Upcoming Assignments */}
          <div className="bg-white p-4 rounded shadow cursor-pointer" 
          onClick={() => {navigate("/f-staff")}}>
            <h2 className="text-lg font-semibold text-gray-800">Finance Staff</h2>
            <p className="mt-2 text-2xl text-yellow-600">{financestaff.length}</p>
          </div>

          {/* Card 4 - Announcements */}
          <div className="bg-white p-4 rounded shadow cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-800">New Announcements</h2>
            <p className="mt-2 text-2xl text-red-600">3</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
