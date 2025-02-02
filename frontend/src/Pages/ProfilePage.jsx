import Navbar from '@/Components/Profile/Navbar.jsx';
import React, { useEffect, useState } from "react";
import { auth, db } from "@/Firebase/firebase"; // Assuming you have your firebase config
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; 
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user is logged in");
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
        FullName: 'John Doe',
        Contact_No: '+1234567890',
        Bio: 'A passionate developer who loves coding and learning new technologies.',
        DOB: '1990-01-01',
        Gender: 'M',
        SocialLinks: {
          Instagram: 'https://instagram.com/johndoe08',
          Github: 'https://github.com/johndoe08',
          LinkedIn: 'https://linkedin.com/in/johndoe08',
          Twitter: 'https://twitter.com/johndoe08',
          Portfolio: 'https://johndoe08.dev'
        },
        Background: {
          Field_Of_Study: 'Computer Science',
          Degree: 'BSc',
          Years_Experience: 5,
          Location: 'New York, USA',
          Occupation: 'Software Engineer',
          LanguagesKnown: ['English', 'Spanish'],
          preferredLearningStyle: ['Interactive Exercises', 'Video Tutorials'],
          Skills: ['JavaScript', 'React', 'Node.js', 'Express.js', 'HTML', 'Java'],
          Hobbies: ['Coding', 'Reading', 'Gaming'],
          Interests: ['AI', 'Blockchain', 'Web Development']
        },
        pointsAwarded: 1500,
        badgesAwarded: [
          'https://picsum.photos/200',
          'https://picsum.photos/200',
          'https://picsum.photos/200',
          'https://picsum.photos/200',
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
        <p className="text-center text-xl">Loading...</p>
      )}
    </>
  );
}

export default ProfilePage;
