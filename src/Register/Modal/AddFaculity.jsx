import { useState } from 'react';
import { addFaculity } from '../../Services/faculity';
import { useNavigate } from "react-router-dom";

export default function FaculityModal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
        shift: 'Morning',
        salary: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.position.trim()) tempErrors.position = 'Position is required';
        if (!formData.department.trim()) tempErrors.department = 'Department is required';
        if (!formData.salary) tempErrors.salary = 'Salary is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await addFaculity(formData);
                navigate("/facultylist");
                setFormData({
                    name: '',
                    email: '',
                    position: '',
                    department: '',
                    shift: 'Morning',
                    salary: ''
                });
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'salary' ? Number(value) : value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside className="w-72 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-2xl">
                <div className="p-6 border-b border-blue-700">
                    <img 
  src="https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/NCBA%26E.png?raw=true" 
  alt="NCBA&E Logo"
                        className="mx-auto h-20 w-20 transform hover:scale-110 transition-transform duration-300"
                    />
                    <h2 className="mt-3 text-xl font-bold text-center tracking-tight">Admin Portal</h2>
                </div>
                <nav className="py-6 px-3">
                    <ul className="space-y-2">
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
                                    className="block py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 
                                    transition-all duration-200 hover:pl-6"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-6">
                    <button
                        className="w-full py-2.5 bg-red-600 rounded-lg text-sm font-semibold hover:bg-red-700 
                        transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={() => {
                            localStorage.removeItem("admin");
                            navigate("/adminsignin");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto" style={{
                      backgroundImage: `url('https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/background_image.png?raw=true')`,

                    backgroundSize: "cover",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    backgroundBlendMode: "overlay",
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
                }}>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 bg-white/80 px-4 py-2 rounded-lg 
                    inline-block shadow-sm">Add New Faculty</h1>
                </header>

                <section className="max-w-2xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        placeholder="Enter faculty name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        placeholder="faculty@example.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Salary</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        placeholder="Enter salary amount"
                                    />
                                    {errors.salary && <p className="mt-1 text-sm text-red-600 font-medium">{errors.salary}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Position</label>
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                            focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        >
                                            <option value="">Select Position</option>
                                            <option value="HOD">HOD</option>
                                            <option value="Permanent">Permanent</option>
                                            <option value="Visiting">Visiting</option>
                                        </select>
                                        {errors.position && <p className="mt-1 text-sm text-red-600 font-medium">{errors.position}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Shift</label>
                                        <select
                                            name="shift"
                                            value={formData.shift}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                            focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        >
                                            <option value="Morning">Morning</option>
                                            <option value="Evening">Evening</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department</label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Bs-Cs">BS Computer Science</option>
                                        <option value="Bs-SE">BS Software Engineering</option>
                                        <option value="Bs-IT">BS Information Technology</option>
                                    </select>
                                    {errors.department && <p className="mt-1 text-sm text-red-600 font-medium">{errors.department}</p>}
                                </div>
                            </div>

                            {errors.submit && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600 font-medium">{errors.submit}</p>
                                </div>
                            )}

                            <div className="flex justify-end space-x-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/facultylist")}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 
                                    rounded-lg hover:bg-gray-200 transition-all duration-200 hover:shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 
                                    rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Add Faculty
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}