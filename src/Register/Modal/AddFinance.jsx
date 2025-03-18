import { useState } from 'react';
import { addFinanceUser } from '../../Services/admin';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, Lock, X } from 'lucide-react';

export default function AddFinanceModal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        userType: 'finance',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            tempErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.mobile.trim()) {
            tempErrors.mobile = 'Mobile number is required';
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await addFinanceUser(formData);
                navigate("/f-staff");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    mobile: '',
                    userType: 'finance',
                });
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                <header className="mb-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-3xl font-bold text-gray-800 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                            Add Finance Staff
                        </h1>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            Finance Department
                        </span>
                    </div>
                    <button
                        onClick={() => navigate("/f-staff")}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full 
                        transition-all duration-200"
                    >
                        <X size={24} />
                    </button>
                </header>

                <section className="max-w-2xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                                        <User size={16} className="mr-2 text-blue-600" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        placeholder="Enter staff member's name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 font-medium flex items-center">
                                            <X size={14} className="mr-1" /> {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                                        <Mail size={16} className="mr-2 text-blue-600" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        placeholder="name@ncbae.edu.pk"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 font-medium flex items-center">
                                            <X size={14} className="mr-1" /> {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                                        <Lock size={16} className="mr-2 text-blue-600" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                            focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 pr-10"
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} className="text-gray-500 hover:text-gray-700" />
                                            ) : (
                                                <Eye size={18} className="text-gray-500 hover:text-gray-700" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 font-medium flex items-center">
                                            <X size={14} className="mr-1" /> {errors.password}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">Minimum 6 characters required</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                                        <Phone size={16} className="mr-2 text-blue-600" />
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                        placeholder="03XX-XXXXXXX"
                                    />
                                    {errors.mobile && (
                                        <p className="mt-1 text-sm text-red-600 font-medium flex items-center">
                                            <X size={14} className="mr-1" /> {errors.mobile}
                                        </p>
                                    )}
                                </div>

                                <div className="hidden">
                                    <input type="text" name="userType" value={formData.userType} readOnly />
                                </div>
                            </div>

                            {errors.submit && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600 font-medium flex items-center">
                                        <X size={16} className="mr-2" /> {errors.submit}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end space-x-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/f-staff")}
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
                                    Add Finance Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}