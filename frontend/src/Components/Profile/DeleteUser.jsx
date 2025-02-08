import { useState, useEffect } from 'react';
import { auth, db } from "@/Firebase/firebase";
import { deleteUser } from "firebase/auth"; 
import { doc, deleteDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';

const DeleteUser = ({ user }) => {
  const [userid, setUserId] = useState(null);
  const [useremail, setEmail] = useState(null);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setEmail(user.email);

    if (user && user.id) {
      setUserId(user.id);
    } else if (currentUser && currentUser.uid) {
      setUserId(currentUser.uid);
    }
  }, [user]);

  const handleDelete = async () => {
    if (!userid) return; 

    setLoading(true);
    setError(null);

    try {
      await deleteDoc(doc(db, 'Users', userid));
      await deleteDoc(doc(db, 'UserProfiles', userid)); 

      const userToDelete = auth.currentUser;
      if (userToDelete && userToDelete.uid === userid) {
        await deleteUser(userToDelete); 
      }

      setLoading(false);
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete the user. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div>
      <p className='text-sm'>
        Are you sure you want to delete user Account : {useremail}?
      </p>
      <button
        className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default DeleteUser;
