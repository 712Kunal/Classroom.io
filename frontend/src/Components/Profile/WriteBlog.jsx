import { useState, useEffect } from 'react';
import { FaPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import { auth, db } from '@/Firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const WriteBlog = ({ user }) => {
  const [dateTime, setDateTime] = useState('');
  const [userid, setUserId] = useState(null);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    console.log('Auth user: ', currentUser);
    if (user && user.id) {
      setUserId(user.id);
    } else if (currentUser && currentUser.uid) {
      setUserId(currentUser.uid);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      setDateTime(formattedDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);
  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting blog...', topic, description, userid);

    if (!topic || !description || !userid) {
      console.error('Missing required fields');
      return;
    }

    try {
      const blogsRef = collection(db, 'Users', userid, 'Blogs');

      const newBlog = await addDoc(blogsRef, {
        topic,
        description,
        createdAt: serverTimestamp(),
        userId: userid
      });

      console.log('Blog submitted successfully with ID: ', newBlog.id);

      setTopic('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <div>
      {/* Display the date */}
      <div className="text-right text-gray-600 dark:text-gray-300 mb-4 flex justify-end items-center">
        <FaCalendarAlt className="mr-2 text-sm sm:text-sm md:text-Base lg:text-lg text-gray-600 dark:text-gray-300" />
        <span className="text-sm sm:text-sm md:text-Base lg:text-lg">{dateTime}</span>
      </div>

      <form className="space-y-6 max-w-full sm:max-w-2xl mx-auto" onSubmit={handleBlogSubmit}>
        {/* Topic Input */}
        <div>
          <label
            htmlFor="topic"
            className="block text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            className="w-full h-10 p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-opacity-50 text-xs sm:text-sm md:text-Base lg:text-lg"
            placeholder="Enter your blog topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label
            htmlFor="description"
            className="block text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="6"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-opacity-50 text-sm sm:text-sm md:text-Base lg:text-lg"
            placeholder="Write your blog content here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Publish Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600/80 to-indigo-600/40 text-white rounded-full hover:from-green-700/60 hover:to-yellow-300 focus:outline-none focus:ring-4 focus:ring-pink-500/50 dark:focus:ring-blue-400 hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-sm md:text-Base lg:text-lg transition duration-300 ease-in-out"
          >
            <FaPaperPlane className="mr-2" />
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
