import Navbar from '@/components/Profile/Navbar.jsx';
import React, { useEffect, useState } from "react";
import { auth, db } from "@/Firebase/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader1 from '@/components/ui/Loader1';

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; 
        if (user) {
          const userRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userRef);
          const profileRef = doc(db, "UserProfiles", user.uid); 
          const profileSnap = await getDoc(profileRef);
   

          if (userSnap.exists() && profileSnap.exists()) {
            const userData = userSnap.data(); 
            const profileData = profileSnap.data();

      
            setUserDetails({
              username: userData.username,
              email: userData.email,
              ...profileData,
            });

          } else {
            console.log("No such document!");
            navigate('/detailsForm');
          }
        } else {
          console.log("No user is logged in");
          navigate('/login'); 
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        navigate('/login'); 
      }
    };

    fetchUserData();
  }, []);

  

  useEffect(() => {
    if (userDetails) {
      const user = {
        username: userDetails.username,
        avatar: 'https://avatar.iran.liara.run/public/48',
        email: userDetails.email,
        FullName: userDetails.personalInfo?.fullName || 'John Doe',  
        Contact_No: userDetails.personalInfo?.contact || '+1234567890',
        Bio: userDetails.personalInfo?.bio || 'A passionate developer who loves coding and learning new technologies.',
        DOB: userDetails.personalInfo?.dob || '1990-01-01',
        Gender: userDetails.personalInfo?.gender || 'M',
        SocialLinks: {
          Instagram: userDetails.socialLinks?.insta || 'https://instagram.com/johndoe08',
          Github: userDetails.socialLinks?.git || 'https://github.com/johndoe08',
          LinkedIn: userDetails.socialLinks?.linkedin || 'https://linkedin.com/in/johndoe08',
          Twitter: userDetails.socialLinks?.twitter || 'https://twitter.com/johndoe08',
          Portfolio: userDetails.socialLinks?.portfolio || 'https://johndoe08.dev'
        },
        Background: {
          Field_Of_Study: userDetails.background?.study || 'Computer Science',
          Degree: userDetails.background?.degree || 'BSc',
          Years_Experience: userDetails.background?.experience || 5,
          Location: userDetails.personalInfo?.location || 'New York, USA',
          Occupation: userDetails.background?.occupation || 'Software Engineer',
          LanguagesKnown: userDetails.background?.languagesKnown || ['English', 'Spanish'],
          preferredLearningStyle: userDetails.background?.learningStyles || ['Interactive Exercises', 'Video Tutorials'],
          Skills: userDetails.background?.skills || ['JavaScript', 'React', 'Node.js', 'Express.js', 'HTML', 'Java'],
          Hobbies: userDetails.background?.hobbies || ['Coding', 'Reading', 'Gaming'],
          Interests: userDetails.background?.interest || ['AI', 'Blockchain', 'Web Development']
        },
        pointsAwarded: 1500, 
        
        badgesAwarded: [
          'verified.png', 
          'newbie.png',
          'learner.png',
          'Legend.png',
        ],
        badgesAwardedDates: ['2023-01-01', '2023-12-01'] 
      };
      setUser(user); 
    }
  }, [userDetails]); 

  return (
    <>
      {user ? (
        <div className="text-4xl w-full h-full p-2 rounded-lg">
          <Navbar user={user} />
        </div>
      ) : (
        <div className="text-center text-xl w-full h-full grid place-items-center"><Loader1/></div>
      )}
    </>
  );
}

export default ProfilePage;
