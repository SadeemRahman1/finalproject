import React from "react";
import { useNavigate } from "react-router-dom";
import { getstudents } from "../Services/student";
import { getAdmin, getFinanceUsers } from "../Services/admin";
import { getDepartment } from "../Services/department";
import { getFaculity } from "../Services/faculity";
import { FaUsers, FaChalkboardTeacher, FaBuilding, FaMoneyBillWave, FaBullhorn } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  const adminData = JSON.parse(admin);
  const students = getstudents();
  const departments = getDepartment();
  const financestaff = getFinanceUsers();
  const faculity = getFaculity();

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg transform transition-all duration-300">
        <div className="p-6 text-center border-b border-blue-800">
          <img
            src="src/assets/NCBA&E.png"
            alt="NCBA&E Logo"
            className="mx-auto h-20 w-20 transition-transform duration-300 hover:scale-105"
          />
          <h2 className="mt-2 text-xl font-bold tracking-wide">Admin Portal</h2>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-3">
            {[
              { href: "/admindashboard", label: "Dashboard" },
              { href: "/studentlist", label: "Students" },
              { href: "/facultylist", label: "Faculty" },
              { href: "/department", label: "Departments" },
              { href: "/f-staff", label: "Finance Staff" },
              { href: "/profile", label: "Settings" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-3 px-5 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6">
          <button
            className="w-full py-3 bg-red-500 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
            onClick={() => {
              localStorage.removeItem("admin");
              navigate("/adminsignin");
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-8 relative"
        style={{
          backgroundImage: `url(/src/assets/background_image.png)`, // Adjust path as needed
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
        }}
      >
        <header className="mb-8 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {adminData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {adminData.name}
              </h1>
              <p className="text-sm text-white">Admin Dashboard</p>
            </div>
          </div>
        </header>

        {/* Enhanced Dashboard Cards */}
        <section className="relative z-10 grid grid-cols-1 gap-6">
          {/* First Row: 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Total Students",
                count: students.length,
                icon: <FaUsers className="text-3xl" />,
                gradient: "from-blue-500 to-blue-700",
                path: "/studentlist",
              },
              {
                title: "Total Faculty",
                count: faculity.length,
                icon: <FaChalkboardTeacher className="text-3xl" />,
                gradient: "from-green-500 to-green-700",
                path: "/facultylist",
              },
              {
                title: "Total Departments",
                count: departments.length,
                icon: <FaBuilding className="text-3xl" />,
                gradient: "from-purple-500 to-purple-700",
                path: "/department",
              },
            ].map((card) => (
              <div
                key={card.title}
                onClick={() => card.path && navigate(card.path)}
                className={`p-6 bg-gradient-to-r ${card.gradient} text-white rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-center`}
              >
                <div className="mb-4 opacity-80">{card.icon}</div>
                <h2 className="text-md font-semibold tracking-wide text-center">
                  {card.title}
                </h2>
                <p className="mt-2 text-4xl font-extrabold">{card.count}</p>
              </div>
            ))}
          </div>

          {/* Second Row: 2 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Finance Staff",
                count: financestaff.length,
                icon: <FaMoneyBillWave className="text-3xl" />,
                gradient: "from-yellow-500 to-yellow-700",
                path: "/f-staff",
              },
              {
                title: "New Announcements",
                count: 3,
                icon: <FaBullhorn className="text-3xl" />,
                gradient: "from-red-500 to-red-700",
                path: null,
              },
            ].map((card) => (
              <div
                key={card.title}
                onClick={() => card.path && navigate(card.path)}
                className={`p-6 bg-gradient-to-r ${card.gradient} text-white rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-center`}
              >
                <div className="mb-4 opacity-80">{card.icon}</div>
                <h2 className="text-md font-semibold tracking-wide text-center">
                  {card.title}
                </h2>
                <p className="mt-2 text-4xl font-extrabold">{card.count}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;