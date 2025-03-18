import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getstudents, deleteStudent } from "../Services/student";
import EditStudentModal from '../Register/Modal/EditStudent';

function StudentList() {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const admin = localStorage.getItem("admin");
  const adminData = JSON.parse(admin);

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    try {
      deleteStudent(selectedStudent.email);
      setIsDeleteModalOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const fetchStudents = async () => {
    const data = await getstudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg transform transition-all duration-300">
        <div className="p-6 text-center border-b border-blue-800">
         <img
  src="https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/NCBA%26E.png?raw=true"
  alt="NCBA&E Logo"
  className="mx-auto h-30 w-30 transition-transform duration-300 hover:scale-105"
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
      <main className="flex-1 p-6 overflow-y-auto"
       style={{
  backgroundImage: `url('https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/background_image.png?raw=true')`,
  backgroundSize: "cover",
  backgroundPosition: "center right",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "overlay",
  backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
}}
>
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">
            {adminData.name}
          </h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={() => navigate("/addStudent")}>
              + Add New Student
            </button>
          </div>
        </header>
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Students List</h2>
          <div className="space-y-4">
            {students.length === 0 ? (
              <p className="text-gray-500">No students found</p>
            ) : (
              students.map((student, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded shadow hover:shadow-lg transition mb-4"
                >
                  {/* Header Row with Keys */}
                  <div className="grid grid-cols-6 gap-4 mb-2">
                    <div className="font-semibold text-gray-700">Name</div>
                    <div className="font-semibold text-gray-700">Semester</div>
                    <div className="font-semibold text-gray-700">Fee</div>
                    <div className="font-semibold text-gray-700">Shift</div>
                    <div className="font-semibold text-gray-700">Email</div>
                    <div className="font-semibold text-gray-700">Actions</div>
                  </div>

                  {/* Values Row with Student Data */}
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="text-gray-800">{student.name}</div>
                    <div className="text-gray-600">{student.semester}</div>
                    <div className="text-gray-600">{student.feeStatus}</div>
                    <div className="text-gray-600">{student.shift}</div>
                    <div className="text-gray-600">{student.email}</div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => handleEditClick(student)}>
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => handleDeleteClick(student)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <EditStudentModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            student={selectedStudent}
            refreshStudents={fetchStudents}
          />

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-6">Are you sure you want to delete {selectedStudent?.name}?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default StudentList
