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
      <aside className="w-64 bg-blue-600 text-white flex flex-col fixed h-full">
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
      <main className="flex-1 p-6 ml-64 overflow-y-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Students List</h2>
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
