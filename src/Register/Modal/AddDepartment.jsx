import { useState } from 'react';
import { addDepartment } from '../../Services/department';
import { useNavigate } from "react-router-dom";

export default function AddDepartmentModal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        degrees: []
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Department name is required';
        if (formData.degrees.length === 0) tempErrors.degrees = 'At least one degree is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const result = await addDepartment(formData.name, formData.degrees);
                if (result === null) {
                    setErrors({ submit: 'Department already exists' });
                } else {
                    navigate("/department");
                    setFormData({ name: '', degrees: [] });
                }
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDegreeChange = (degree) => {
        setFormData(prev => ({
            ...prev,
            degrees: prev.degrees.includes(degree)
                ? prev.degrees.filter(d => d !== degree)
                : [...prev.degrees, degree]
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

            <main className="flex-1 p-8 overflow-y-auto"
            style={{
                  backgroundImage: `url('https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/background_image.png?raw=true')`,
 
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 bg-white/80 px-4 py-2 rounded-lg 
                    inline-block shadow-sm">Add New Department</h1>
                </header>

                <section className="max-w-2xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    transition-all duration-200 bg-gray-50/50"
                                    placeholder="Enter department name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 font-medium animate-in fade-in">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Degrees Offered
                                </label>
                                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg">
                                    {['BS', 'MS', 'PhD', 'BBA', 'MBA'].map((degree) => (
                                        <label key={degree} className="flex items-center space-x-2 
                                        cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                                            <input
                                                type="checkbox"
                                                id={degree}
                                                checked={formData.degrees.includes(degree)}
                                                onChange={() => handleDegreeChange(degree)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded 
                                                focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{degree}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.degrees && (
                                    <p className="mt-1 text-sm text-red-600 font-medium animate-in fade-in">
                                        {errors.degrees}
                                    </p>
                                )}
                            </div>

                            {errors.submit && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600 font-medium">{errors.submit}</p>
                                </div>
                            )}

                            <div className="flex justify-end space-x-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/department")}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 
                                    rounded-lg hover:bg-gray-200 transition-all duration-200 
                                    hover:shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 
                                    rounded-lg hover:bg-blue-700 transition-all duration-200 
                                    shadow-md hover:shadow-lg"
                                >
                                    Add Department
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}