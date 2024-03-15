import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddNewProjetTextMutation } from '../notesApiSlice';

const CreateProjectForm = () => {
    const [addNewProjetText] = useAddNewProjetTextMutation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        teacherName: '',
        module: '',
        studentId: '',
        pdfFile: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, pdfFile: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, teacherName, module, studentId, pdfFile } = formData;

        // Create FormData object
        const projectData = new FormData();
        projectData.append('title', title);
        projectData.append('teacherName', teacherName);
        projectData.append('module', module);
        projectData.append('studentId', studentId);
        if (pdfFile) {
            projectData.append('pdfFile', pdfFile);
        }

        dispatch(addNewProjetText(projectData));
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    placeholder="Teacher Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="module"
                    value={formData.module}
                    onChange={handleChange}
                    placeholder="Module"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Student ID"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoading ? 'Creating...' : 'Create Project'}
                </button>
                {isError && (
                    <p className="text-red-500">Error: {error ? error.message : 'Something went wrong'}</p>
                )}
            </form>
        </div>
    );
};

export default CreateProjectForm;
