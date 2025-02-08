import { useState, useEffect } from 'react';
import { auth } from "@/Firebase/firebase";

const ResetPass = ({ user }) => {
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (user && user.id) {
      setUserId(user.id);
    } else if (currentUser && currentUser.uid) {
      setUserId(currentUser.uid);
    }
  }, [user]);

  return (
    <div>
      <p className='text-sm'>
         ID: {userid}?
      </p>
    </div>
  );
};

export default ResetPass;
