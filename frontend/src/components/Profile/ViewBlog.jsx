import { useState, useEffect } from 'react';
import { db } from "@/Firebase/firebase";
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import Loader1 from '../ui/Loader1';

const ViewBlog = ({ userId }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const [modalBlogData, setModalBlogData] = useState(null); 

    useEffect(() => {
        const fetchBlogs = async () => {
            if (!userId) {
                console.log("No userId found");
                return;
            }

            try {
                const blogsRef = collection(db, 'Users', userId, 'Blogs');
                const q = query(blogsRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const blogsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [userId]);


    if (loading) {
        return <div className='text-xs text-center justify-center'><Loader1/></div>;
    }


    const handleBlogClick = (blog) => {
        setModalBlogData(blog);
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
        setModalBlogData(null); 
    };

    const handleDeleteBlog = async () => {
        try {
            if (modalBlogData) {
                const blogRef = doc(db, 'Users', userId, 'Blogs', modalBlogData.id);

                await deleteDoc(blogRef);
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== modalBlogData.id));

                console.log("Blog deleted successfully");
                handleCloseModal(); 
            }
        } catch (error) {
            console.error("Error deleting blog: ", error);
        }
    };

    return (
        <div className="max-w-full sm:max-w-2xl mx-auto p-4">
            {blogs.length === 0 ? (
                <p className='text-sm text-center justify-center'>No blogs available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 "> 
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="w-full h-42 p-6 rounded-lg shadow-md shadow-red-400 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                            onClick={() => handleBlogClick(blog)} 
                        >
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 truncate"> {/* Truncate title if it's too long */}
                                {blog.topic}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                               
                                {blog.createdAt && blog.createdAt.toDate().toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && modalBlogData && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="dark:bg-gray-800 p-8 rounded-lg w-full sm:w-80 md:w-96 lg:w-128 xl:w-160 max-w-lg shadow-xl relative">

                  
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 p-2 rounded-full transition duration-300 ease-in-out"
                        >
                            <span className="text-xl font-bold">&times;</span>
                        </button><br />

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            {modalBlogData.topic}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {modalBlogData.createdAt && modalBlogData.createdAt.toDate().toLocaleDateString()}
                        </p>
                        <p className="mt-4 text-sm sm:text-base text-gray-800 dark:text-gray-100">
                            {modalBlogData.description}
                        </p>

             
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                onClick={handleDeleteBlog} 
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600/80 to-indigo-600/40 text-white rounded-full hover:from-green-700/60 hover:to-yellow-300 focus:outline-none focus:ring-4 focus:ring-pink-500/50 dark:focus:ring-blue-400 hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-sm md:text-Base lg:text-lg transition duration-300 ease-in-out"

                            >
                                <FaTrash className="text-white" />
                                <span>Delete Blog</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBlog;
