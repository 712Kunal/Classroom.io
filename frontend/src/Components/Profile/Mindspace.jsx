import { useState, useEffect } from 'react'; 
import { FaEye, FaPen } from 'react-icons/fa';
import WriteBlog from './WriteBlog';
import ViewBlog from './ViewBlog';

import { auth } from "@/Firebase/firebase"; 

const Mindspace = ({ user }) => {
    const [activeTab, setActiveTab] = useState("view");
    const [userid, setUserId] = useState(null);

    useEffect(() => {
      const currentUser = auth.currentUser; 
      if (user && user.id) {
        setUserId(user.id);
      } else if (currentUser && currentUser.uid) {
        setUserId(currentUser.uid); 
      }
    }, [user]); 

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            {/* Tab buttons */}
            <div className="flex justify-center mb-8 space-x-4 sm:space-x-6">
                <div className="flex justify-center mb-8 space-x-4 sm:space-x-6 border-2 border-blue-500 rounded-full hover:border-red-500 dark:border-gray-700">
                    <button
                        onClick={() => handleTabChange("view")}
                        className={`py-2 px-4 flex items-center border-2 rounded-full transition-colors duration-300
            ${activeTab === "view" ? "bg-gray-600 text-white" : "text-gray-700 border-transparent"} 
            hover:bg-gray-500 focus:outline-none focus:ring-2`}
                    >
                        <FaEye className="mr-2 text-lg sm:text-xl" />
                        <span className="text-sm sm:text-sm font-medium">View</span>
                    </button>

                    <button
                        onClick={() => handleTabChange("write")}
                        className={`py-2 px-4 flex items-center border-2 rounded-full transition-colors duration-300
            ${activeTab === "write" ? "bg-gray-600 text-white" : "text-gray-700 border-transparent"} 
            hover:bg-gray-500 focus:outline-none focus:ring-2`}
                    >
                        <FaPen className="mr-2 text-lg sm:text-xl" />
                        <span className="text-sm sm:text-sm font-medium">Write</span>
                    </button>
                </div>
            </div>

            <div className="transition-all duration-500">
                {activeTab === "view" && (
                    <div className="p-6 rounded-xl shadow-lg opacity-100 shadow-blue-500/50 hover:shadow-gray-500/50 active:shadow-red-500/50">
                        <ViewBlog userId={userid} />
                    </div>
                )}

                {activeTab === "write" && (
                    <div className="p-6 xs:p-0 rounded-xl shadow-lg xs:shadow-none opacity-100 shadow-blue-500/50 hover:shadow-green-500/50 active:shadow-red-500/50">
                        <WriteBlog user={user} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mindspace;
