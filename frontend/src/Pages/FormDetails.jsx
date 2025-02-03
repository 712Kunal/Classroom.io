import React from 'react';
import { motion } from 'framer-motion';

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
import BirthDate from '../Components/originUi/birth-date';
import Languages from '../Components/originUi/languages-known';

function FormDetails() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
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
      </div>

      <div className="formContainder w-full p-2 mt-4">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="outer-container w-full flex flex-wrap">
            {/* left Section */}
            <div className="Personal-details w-full lg:w-1/2 rounded-md p-4 flex flex-col gap-4">
              <h2 className="text-xl dark:text-green-500 flex items-center">
                <FileUser />
                Personal Details :
              </h2>
              <div>
                <Label htmlFor="fullname">Enter your full name: </Label>
                <Input id="name" placeholder="Eg: John Doe" type="text" />
              </div>
              <div>
                <Label htmlFor="contact">Enter your contact number: </Label>
                <Input id="contact" placeholder="Eg: +91-1234567890" type="number" maxLength="12" />
              </div>
              <div>
                <Label htmlFor="bio" className="block">
                  Enter your bio:
                </Label>
                <textarea
                  name="bio"
                  id="bio"
                  placeholder="Eg: I am a student"
                  cols="80"
                  rows="10"
                  className="w-full text-white bg-gray-50 dark:bg-zinc-800 p-2 rounded-md mt-1"></textarea>
              </div>
              <div>
                <Label htmlFor="dob">Enter your date of birth: </Label>
                <BirthDate />
              </div>
              <div>
                <Label htmlFor="gender">Enter your gender: </Label>
                <select
                  name="gender"
                  id="gender"
                  className="w-full dark:bg-zinc-800 p-2 rounded-md border-none">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="social-links rounded-md p-4 flex flex-col gap-4">
                <h2 className="text-xl dark:text-pink-500 flex items-center">
                  <MessageCircleHeart />
                  Social Links :
                </h2>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <div className="flex items-center gap-1">
                    <Instagram className="text-red-400" />
                    <Input id="insta" placeholder="https://www.instagram.com/" type="text" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Github className="text-slate-400" />
                    <Input id="git" placeholder="https://github.com/" type="text" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Linkedin className="text-blue-400" />
                    <Input id="git" placeholder="https://linkedin.com/" type="text" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Twitter className="text-orange-400" />
                    <Input id="twitter" placeholder="https://twitter.com/" type="text" />
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseBusiness className="text-cyan-200" />
                    <Input id="portfolio" placeholder="https://portfolio.com/" type="text" />
                  </div>
                </div>
              </div>
            </div>
            {/*  Right Section */}
            <div className="background w-full lg:w-1/2 rounded-md p-4 flex flex-col gap-4">
              <div className="background rounded-md p-4 flex flex-col gap-4">
                <h2 className="text-xl dark:text-yellow-400 flex items-center">
                  <GraduationCap /> Background :
                </h2>
                <div>
                  <Label htmlFor="study">Field of study: </Label>
                  <Input id="study" placeholder="Eg: Computer Science" type="text" />
                </div>
                <div>
                  <Label htmlFor="degree">Degree: </Label>
                  <Input id="degree" placeholder="Eg: B.tech" type="text" />
                </div>
                <div>
                  <Label htmlFor="experience">Year's of experience: </Label>
                  <Input id="experience" placeholder="Eg: 10" type="number" />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation: </Label>
                  <Input id="occupation" placeholder="Eg: Software Developer" type="text" />
                </div>
                <div>
                  <Label htmlFor="languages">Language's known: </Label>
                  <Languages placeholder="Eg: Hindi, English, Marathi" />
                </div>
                <div>
                  <Label htmlFor="learningStyes">Preffered learning Styles: </Label>
                  <Languages placeholder="Eg: Video Tutorials, Written Guides, Interactive Exercises" />
                </div>
                <div>
                  <Label htmlFor="skills">Technical Skills: </Label>
                  <Languages placeholder="Eg: React, JavaScript, Node.js" />
                </div>
                <div>
                  <Label htmlFor="hobies">Hobies: </Label>
                  <Languages placeholder="Eg: Drawing, Gyming, Cooking" />
                </div>
                <div>
                  <Label htmlFor="skills">Interest: </Label>
                  <Languages placeholder="Eg: Devops, Cloud computing, AI" />
                </div>
              </div>
              <button
                className="relative group/btn hover:shadow-md hover:shadow-blue-500 bg-primary w-full flex justify-center items-center gap-2 text-primary-foreground rounded-md h-10 font-medium"
                type="submit">
                Submit Details <ShipWheel />
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

export default FormDetails;
