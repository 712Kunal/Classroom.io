import { useState, useEffect } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';

const ResetPass = ({ user }) => {
  const [userid, setUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    if (user && user.id) {
      setUserId(user.id);
    } else if (currentUser && currentUser.uid) {
      setUserId(currentUser.uid);
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser && newPassword) {
      try {
        await updatePassword(currentUser, newPassword);
        setSuccess('Password updated successfully!');
        setError('');
        setNewPassword('');
      } catch (err) {
        setError('Error updating password: ' + err.message);
        setSuccess('');
      }
    } else {
      setError('Please enter a new password.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-sm mx-auto border shadow-md">
      <div className="w-full mb-4">
        <label className="text-base font-medium dark:text-gray-100">New Password</label>
        <input
          className="w-full h-10 p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-opacity-50 text-xs sm:text-sm md:text-Base lg:text-lg"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={handlePasswordChange}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
      <button
        className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600/80 to-indigo-600/40 text-white rounded-full hover:from-green-700/60 hover:to-yellow-300 focus:outline-none focus:ring-4 focus:ring-pink-500/50 dark:focus:ring-blue-400 hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-sm md:text-Base lg:text-lg transition duration-300 ease-in-out"
        onClick={handleSubmit}
      >
        Update
      </button>
    </div>
  );
};

export default ResetPass;
