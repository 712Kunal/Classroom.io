import React from 'react';

// Component for searching activities
export function SearchActivity() {
    return (
<div className="text-center mb-6">
    <input
        type="text"
        placeholder="Search..."
        className="
            px-4 py-2 text-lg border rounded-full
            w-full max-w-md
            border-gray-300 bg-white text-gray-900
            focus:ring-4 focus:outline-none
            focus:ring-orange-500 focus:ring-opacity-50
            dark:border-gray-600 dark:bg-gray-800 dark:text-white
            dark:focus:ring-red-400 dark:focus:ring-opacity-50
            transition-all duration-300
            hover:ring-2 hover:ring-teal-500 hover:ring-opacity-50
        "
    />
</div>


    );
}

// Component displaying courses
export function Mycoursestaks() {
    return (
        <div className=" rounded-lg shadow-lg shadow-gray-700 p-6 max-w-3xl mx-auto my-6">
            <h1 className="text-2xl font-bold  mb-4">Hello, these are my courses!</h1>
            <p className="text-lg text-gray-600">Here you can see all the courses you are currently enrolled in.</p>
        </div>

    );
}

// Main component that combines SearchActivity and Mycoursestaks
export default function Mycourses() {
    return (
        <div className="flex flex-col justif min-h-screen p-6">
            <SearchActivity />
            <Mycoursestaks />
        </div>
    );
}
