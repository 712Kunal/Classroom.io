import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '@/Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import {
  ReceiptText,
  FileUser,
  MessageCircleHeart,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  BriefcaseBusiness,
  GraduationCap,
} from 'lucide-react';
import { Input } from '@/Components/ui/input2';
import { Label } from '@/Components/ui/label2';
import Languages from '@/Components/originUi/languages-known';
import { addProfile } from '@/Firebase/services/userDetails.servies';

function Usersetting({ user }) {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [learningStyles, setLearningStyles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [interest, setInterest] = useState([]);
  const [emailNotification, setEmailNotification] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setLoggedInUser(authUser);
        fetchUserDetails(authUser);
      } else {
        console.log('No user found, redirecting to signup...');
        navigate('/signup'); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserDetails = async (authUser) => {
    try {
      if (authUser) {

        const userData = await getUserData(authUser.uid);
        setUserDetails(userData);
        setLanguagesKnown(userData.background.languagesKnown || []);
        setLearningStyles(userData.background.learningStyles || []);
        setSkills(userData.background.skills || []);
        setHobbies(userData.background.hobies || []);
        setInterest(userData.background.interest || []);
        setEmailNotification(userData.preferences.emailNotification);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUserAddDetails = async (userDetails) => {
    try {
      const userId = auth.currentUser.uid;
      const addUserData = await addProfile(userDetails, userId);
      if (addUserData.success === true) {
        console.log('User updated successfully');
        navigate('/app');
      }
    } catch (error) {
      console.error('Error adding user details:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullName = formData.get('name');
    const contact = formData.get('contact');
    const location = formData.get('location');
    const bio = formData.get('bio');
    const dob = formData.get('dob');
    const gender = formData.get('gender');
    const insta = formData.get('insta');
    const git = formData.get('git');
    const linkedin = formData.get('linkedin');
    const twitter = formData.get('twitter');
    const portfolio = formData.get('portfolio');
    const study = formData.get('study');
    const degree = formData.get('degree');
    const experience = formData.get('experience');
    const occupation = formData.get('occupation');

    const userData = {
      personalInfo: {
        fullName,
        contact,
        location,
        bio,
        dob,
        gender,
      },
      socialLinks: {
        insta,
        git,
        linkedin,
        twitter,
        portfolio,
      },
      background: {
        study,
        degree,
        experience,
        occupation,
        languagesKnown,
        learningStyles,
        skills,
        hobbies,
        interest,
      },
      preferences: {
        emailNotification,
      },
    };
    handleUserAddDetails(userData);
  };

  return (
    <div className="w-full h-full py-4 px-4">
      <div className="header w-full flex flex-col gap-1">
        <h1 className="text-3xl font-bold flex items-center gap-1">
          <ReceiptText className="text-3xl text-black dark:text-blue-500" /> User Details Form
        </h1>
        <p className="text-sm text-slate-800 dark:text-gray-400">
          Please provide your details to personalize your experience.
        </p>
        <p className="text-lg text-gray-500 font-medium mt-2 p-2 rounded-md text-center">
          Email: {auth.currentUser?.email}
        </p>
      </div>

      <div className="formContainer w-full p-2 mt-4">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="outer-container w-full flex flex-wrap"
          >
            {/* Left Section */}
            <div className="w-full lg:w-1/2 rounded-md flex flex-col gap-4">
              <div className="Personal-details rounded-md p-4 flex flex-col gap-4 border">
                <h2 className="text-xl dark:text-green-500 flex items-center">
                  <FileUser />
                  Personal Details:
                </h2>
                <div>
                  <Label htmlFor="fullname">Enter your full name: </Label>
                  <Input name="name" placeholder="Eg: John Doe" type="text" defaultValue={userDetails?.personalInfo?.fullName} />
                </div>
                <div>
                  <Label htmlFor="contact">Enter your contact number: </Label>
                  <Input name="contact" placeholder="Eg: +91-1234567890" type="number" maxLength="12" defaultValue={userDetails?.personalInfo?.contact} />
                </div>
                <div>
                  <Label htmlFor="location">Enter your location: </Label>
                  <Input name="location" placeholder="Eg: Pune" type="text" defaultValue={userDetails?.personalInfo?.location} />
                </div>
                <div>
                  <Label htmlFor="bio">Enter your bio: </Label>
                  <textarea
                    name="bio"
                    id="bio"
                    placeholder="Eg: I am a student"
                    cols="80"
                    rows="10"
                    className="w-full h-32 dark:bg-zinc-800 p-3 rounded-md border-2 border-gray-300 dark:border-gray-600 text-lg font-medium resize-none"
                    defaultValue={userDetails?.personalInfo?.bio}
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Enter your date of birth: </Label>
                  <input
                    type="date"
                    name="dob"
                    className="w-full sm:w-auto dark:bg-zinc-800 dark:text-white bg-white text-gray-900 p-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                  />

                </div>
                <div>
                  <Label htmlFor="gender">Enter your gender: </Label>
                  <select
                    name="gender"
                    id="gender"
                    className="w-full dark:bg-zinc-800 p-3 rounded-md border-2 border-gray-300 dark:border-gray-600 text-sm font-semibold"
                    defaultValue={userDetails?.personalInfo?.gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                </div>
              </div>

              <div className="social-links rounded-md p-4 flex flex-col gap-4 border">
                <h2 className="text-xl dark:text-pink-500 flex items-center">
                  <MessageCircleHeart />
                  Social Links:
                </h2>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <div className="flex items-center gap-1">
                    <Instagram className="text-red-400" />
                    <Input name="insta" placeholder="https://www.instagram.com/" type="url" defaultValue={userDetails?.socialLinks?.insta} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Github className="text-slate-400" />
                    <Input name="git" placeholder="https://github.com/" type="url" defaultValue={userDetails?.socialLinks?.git} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Linkedin className="text-blue-400" />
                    <Input name="linkedin" placeholder="https://linkedin.com/" type="url" defaultValue={userDetails?.socialLinks?.linkedin} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Twitter className="text-orange-400" />
                    <Input name="twitter" placeholder="https://twitter.com/" type="url" defaultValue={userDetails?.socialLinks?.twitter} />
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseBusiness className="text-cyan-200" />
                    <Input name="portfolio" placeholder="https://portfolio.com/" type="url" defaultValue={userDetails?.socialLinks?.portfolio} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="background w-full lg:w-1/2 rounded-md p-4 flex flex-col gap-4">
              <div className="background rounded-md p-4 flex flex-col gap-4 border">
                <h2 className="text-xl dark:text-yellow-400 flex items-center">
                  <GraduationCap /> Background:
                </h2>
                <div>
                  <Label htmlFor="study">Field of study: </Label>
                  <Input name="study" placeholder="Eg: Computer Science" type="text" defaultValue={userDetails?.background?.study} />
                </div>
                <div>
                  <Label htmlFor="degree">Degree: </Label>
                  <Input name="degree" placeholder="Eg: B.Tech" type="text" defaultValue={userDetails?.background?.degree} />
                </div>
                <div>
                  <Label htmlFor="experience">Years of experience: </Label>
                  <Input name="experience" placeholder="Eg: 10" type="number" defaultValue={userDetails?.background?.experience} />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation: </Label>
                  <Input name="occupation" placeholder="Eg: Software Developer" type="text" defaultValue={userDetails?.background?.occupation} />
                </div>
                <div>
                  <Label htmlFor="languages">Languages known: </Label>
                  <Languages
                    tags={languagesKnown}
                    setTags={setLanguagesKnown}
                    placeholder="Eg: Hindi, English, Marathi"
                  />
                </div>
                <div>
                  <Label htmlFor="learningStyles">Preferred learning styles: </Label>
                  <Languages
                    tags={learningStyles}
                    setTags={setLearningStyles}
                    placeholder="Eg: Video Tutorials, Written Guides, Interactive Exercises"
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Technical Skills: </Label>
                  <Languages
                    tags={skills}
                    setTags={setSkills}
                    placeholder="Eg: React, JavaScript, Node.js"
                  />
                </div>
                <div>
                  <Label htmlFor="hobies">Hobbies: </Label>
                  <Languages
                    tags={hobbies}
                    setTags={setHobbies}
                    placeholder="Eg: Drawing, Gymming, Cooking"
                  />
                </div>
                <div>
                  <Label htmlFor="interest">Interests: </Label>
                  <Languages
                    tags={interest}
                    setTags={setInterest}
                    placeholder="Eg: Devops, Cloud Computing, AI"
                  />
                </div>
              </div>

              {/* Email Notification Toggle */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={() => setEmailNotification(!emailNotification)}
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <Label htmlFor="emailNotification" className="text-sm text-gray-700">
                  Email Notification
                </Label>
              </div>

              <button
                className="text-xl relative group/btn hover:shadow-md hover:shadow-orange-500 bg-primary w-full flex justify-center items-center gap-2 text-primary-foreground rounded-md h-10"
                type="submit"
              >
                Submit Details
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

export default Usersetting;