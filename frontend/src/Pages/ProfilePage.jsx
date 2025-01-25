// ProfilePage.jsx
import Navbar from '@/Components/Profile/Navbar';
import React from 'react';

function ProfilePage() {
  const user = {
    username: 'JohnDoe08',
    avatar: 'https://avatar.iran.liara.run/public/48',
    email: 'johndoe08@gmail.com',
    FullName: 'John Doe',
    Contact_No: '+1234567890',
    Bio: 'A passionate developer who loves coding and learning new technologies.A bio on social media refers to a short description of a user. It is typically displayed on a users profile page and can include information such as the user s name, location, interests, website links, and contact information.',
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
      Skills: ['JavaScript', 'React', 'Node.js','Express.js','HTML','Java'],
      Hobbies: ['Coding', 'Reading', 'Gaming'],
      Interests: ['AI', 'Blockchain', 'Web Development']
    },
    pointsAwarded: 1500,
    // badgesAwarded: ['Top Contributor', 'Best Learner','Best Learner','Best Learner'],
    badgesAwarded: [
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
    ],
    badgesAwardedDates: ['2023-01-01', '2023-12-01']
  };

  return (
    <div className="text-4xl w-full h-full p-2 rounded-lg">
      <Navbar user={user} />
    </div>
  );
}

export default ProfilePage;
