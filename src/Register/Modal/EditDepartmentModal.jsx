import React, { useState, useEffect } from 'react';
import { updateDepartment } from '../../Services/department';

function EditDepartmentModal({ isOpen, onClose, department, refreshDepartments }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        degrees: []
    });

    useEffect(() => {
        console.log('Department prop:', department);
        if (department) {
            setFormData({
                name: department.name || '',
                degrees: department.degrees || []
            });
            console.log('FormData set to:', {
                name: department.name || '',
                degrees: department.degrees || []
            });
        }
    }, [department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'degrees') {
            const degreesArray = value.split(',').map(deg => deg.trim());
            setFormData(prev => ({
                ...prev,
                degrees: degreesArray
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateDepartment(department.name, formData.degrees);
            refreshDepartments();
            onClose();
        } catch (error) {
            console.error('Error updating department:', error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-[600px]">
                <h2 className="text-xl font-semibold mb-4">Edit Department</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                readOnly
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Degrees (comma-separated)</label>
                            <input
                                type="text"
                                name="degrees"
                                value={formData.degrees.join(', ')}
                                onChange={handleChange}
                                placeholder="e.g., BS, MS, PhD"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditDepartmentModal;