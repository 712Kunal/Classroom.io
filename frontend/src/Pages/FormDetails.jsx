import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { addProfile } from '../Firebase/services/userDetails.servies.js';

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
  ShipWheel
} from 'lucide-react';
import { Input } from '../Components/ui/input2';
import { Label } from '../Components/ui/label2';
import Languages from '../Components/originUi/languages-known';
import { toast } from 'react-toastify';

function FormDetails() {
  const navigate = useNavigate();

  // const [userDetails, setUserDetails] = useState(null);

  const [languagesKnown, setlanguagesKnown] = useState([]);
  const [learningStyles, setlearningStyles] = useState([]);
  const [skills, setskills] = useState([]);
  const [hobies, setHobies] = useState([]);
  const [interest, setinterest] = useState([]);

  const awardRegisteredUserBadge = async (userId) => {
    const badgeType = "verified";
    const isBatchAlreadyAwarded = await checkIfBadgeIsPresent(userId, badgeType);
    console.log("Is batch already awarded:", isBatchAlreadyAwarded);
    if (!isBatchAlreadyAwarded) {
      console.log("Badge award called");
      await awardBadge(userId, badgeType);
      console.log("Badge awarded successfully");
    }
  }

  // Add state for the email notification toggle
  const [emailNotification, setEmailNotification] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user);
      } else {
        toast.success('User Not found ', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: 'dark'
        });
        navigate('/signup');
        console.log('no user');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUseraddDetails = async (userDetails) => {
    try {
      const userId = auth.currentUser.uid;
      const adduserData = await addProfile(userDetails, userId);
      console.log(adduserData);
      if (adduserData.success === true) {
        console.log('User added successfully');
        toast.success('User profile created successfully', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: 'dark'
        });

        // 🔹 Send request to Spring Boot API for 2FA verification
        const response = await fetch(
          `http://localhost:8080/api/user/${userId}/codeVerification`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
          }
        );

        if (response.ok) {
          await awardRegisteredUserBadge(userId);
          navigate('/twofactorauth');
        } else {
          toast.error('Failed to send verification code!', {
            position: 'top-right',
            autoClose: 5000,
            theme: 'dark'
          });
        }
      }
    } catch (error) {
      console.error('Error adding user details:', error);
      toast.success('Error User details not Added', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: 'dark'
      });
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
        gender
      },
      socialLinks: {
        insta,
        git,
        linkedin,
        twitter,
        portfolio
      },
      background: {
        study,
        degree,
        experience,
        occupation,
        languagesKnown,
        learningStyles,
        skills,
        hobies,
        interest
      },
      preferences: {
        emailNotification
      }
    };
    handleUseraddDetails(userData);
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
        <p className="text-lg text-gray-500 font-medium mt-2 p-2 rounded-md  text-center">
          Email: {auth.currentUser?.email}
        </p>
      </div>

      <div className="formContainder w-full p-2 mt-4">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="outer-container w-full flex flex-wrap">
            {/* left Section */}
            <div className="w-full lg:w-1/2 rounded-md  flex flex-col gap-4 ">
              <div className="Personal-details rounded-md p-4 flex flex-col gap-4 border">
                <h2 className="text-xl dark:text-green-500 flex items-center">
                  <FileUser />
                  Personal Details :
                </h2>
                <div>
                  <Label htmlFor="fullname">Enter your full name: </Label>
                  <Input name="name" placeholder="Eg: John Doe" type="text" required />
                </div>
                <div>
                  <Label htmlFor="contact">Enter your contact number: </Label>
                  <Input
                    name="contact"
                    placeholder="Eg: +91-1234567890"
                    type="number"
                    maxLength="12"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Enter your location: </Label>
                  <Input name="location" placeholder="Eg: Pune" type="text" required />
                </div>
                <div>
                  <Label htmlFor="bio" className="block">
                    Enter your bio:
                  </Label>
                  <textarea
                    name="bio"
                    id="bio"
                    required
                    placeholder="Eg: I am a student"
                    cols="80"
                    rows="10"
                    className="w-full text-white bg-gray-50 dark:bg-zinc-800 p-2 rounded-md mt-1"></textarea>
                </div>
                <div>
                  <Label htmlFor="dob">Enter your date of birth: </Label>
                  <input
                    type="date"
                    name="dob"
                    required
                    className="w-full dark:bg-zinc-800 p-2 rounded-md border-none focus:border-none"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Enter your gender: </Label>
                  <select
                    name="gender"
                    id="gender"
                    required
                    className="w-full dark:bg-zinc-800 p-2 rounded-md border-none">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="social-links rounded-md p-4 flex flex-col gap-4 border">
                <h2 className="text-xl dark:text-pink-500 flex items-center">
                  <MessageCircleHeart />
                  Social Links :
                </h2>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <div className="flex items-center gap-1">
                    <Instagram className="text-red-400" />
                    <Input
                      name="insta"
                      placeholder="https://www.instagram.com/"
                      type="url"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Github className="text-slate-400" />
                    <Input name="git" placeholder="https://github.com/" type="url" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Linkedin className="text-blue-400" />
                    <Input
                      name="linkedin"
                      placeholder="https://linkedin.com/"
                      type="url"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Twitter className="text-orange-400" />
                    <Input name="twitter" placeholder="https://twitter.com/" type="url" />
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseBusiness className="text-cyan-200" />
                    <Input
                      name="portfolio"
                      placeholder="https://portfolio.com/"
                      type="url"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*  Right Section */}
            <div className="background w-full lg:w-1/2 rounded-md p-4 flex flex-col gap-4">
              <div className="background rounded-md p-4 flex flex-col gap-4 border">
                <h2 className="text-xl dark:text-yellow-400 flex items-center">
                  <GraduationCap /> Background :
                </h2>
                <div>
                  <Label htmlFor="study">Field of study: </Label>
                  <Input name="study" placeholder="Eg: Computer Science" type="text" required />
                </div>
                <div>
                  <Label htmlFor="degree">Degree: </Label>
                  <Input name="degree" placeholder="Eg: B.tech" type="text" required />
                </div>
                <div>
                  <Label htmlFor="experience">Year's of experience: </Label>
                  <Input name="experience" placeholder="Eg: 10" type="number" required />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation: </Label>
                  <Input
                    name="occupation"
                    placeholder="Eg: Software Developer"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="languages">Language's known: </Label>
                  <Languages
                    tags={languagesKnown}
                    setTags={setlanguagesKnown}
                    placeholder="Eg: Hindi, English, Marathi"
                    required
                  />
                  <p className="text-xs text-slate-400 ml-2">Hit enter to add more languages</p>
                </div>
                <div>
                  <Label htmlFor="learningStyes">Preffered learning Styles: </Label>
                  <Languages
                    tags={learningStyles}
                    setTags={setlearningStyles}
                    placeholder="Eg: Video Tutorials, Written Guides, Interactive Exercises"
                    required
                  />
                  <p className="text-xs text-slate-400 ml-2">
                    Hit enter to add more learning styles
                  </p>
                </div>
                <div>
                  <Label htmlFor="skills">Technical Skills: </Label>
                  <Languages
                    tags={skills}
                    setTags={setskills}
                    placeholder="Eg: React, JavaScript, Node.js"
                    required
                  />
                  <p className="text-xs text-slate-400 ml-2">Hit enter to add more skills</p>
                </div>

                <div>
                  <Label htmlFor="hobies">Hobbies: </Label>
                  <Languages
                    tags={hobies}
                    setTags={setHobies}
                    placeholder="Eg: Drawing, Gyming, Cooking"
                    required
                  />
                  <p className="text-xs text-slate-400 ml-2">Hit enter to add more hobbies</p>
                </div>
                <div>
                  <Label htmlFor="skills">Interest: </Label>
                  <Languages
                    tags={interest}
                    setTags={setinterest}
                    placeholder="Eg: Devops, Cloud computing, AI"
                    required
                  />
                  <p className="text-xs text-slate-400 ml-2">Hit enter to add more interests</p>
                </div>
              </div>
              <div className="flex items-center justify-center border-gray-300 space-x-3">
                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={() => setEmailNotification(!emailNotification)}
                  className="h-5 w-5 border-gray-300 rounded-sm focus:ring-2 focus:ring-indigo-500 text-indigo-600 transition duration-200 ease-in-out"
                />
                <Label
                  htmlFor="emailNotification"
                  className="text-sm font-medium text-gray-800 dark:text-gray-300">
                  Email Notification
                </Label>
              </div>
              <button
                className="relative group/btn hover:shadow-md hover:shadow-blue-500 bg-primary w-full flex justify-center items-center gap-2 text-primary-foreground rounded-md h-10 font-medium"
                type="submit">
                Submit Details{' '}
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, ease: 'easeIn', repeat: Infinity }}>
                  <ShipWheel />
                </motion.span>
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
export default FormDetails;
