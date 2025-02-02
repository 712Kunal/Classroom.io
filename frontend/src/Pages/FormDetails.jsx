import React from 'react';
import {
  ReceiptText,
  FileUser,
  MessageCircleHeart,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  BriefcaseBusiness,
  GraduationCap
} from 'lucide-react';
import { Input } from '../Components/ui/input2';
import { Label } from '../Components/ui/label2';
import BirthDate from '../Components/originUi/birth-date';

function FormDetails() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
  };

  return (
    <div className="w-full h-full border-2 border-yellow-200 py-4 px-4">
      <div className="header w-full flex flex-col gap-1">
        <h1 className="text-3xl font-bold flex items-center gap-1">
          <ReceiptText className="text-3xl text-black dark:text-blue-500" /> User Details Form
        </h1>
        <p className="text-sm text-slate-800 dark:text-gray-400">
          Please provide your details to personalize your experience.
        </p>
      </div>

      <div className="formContainder w-full p-2 border mt-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="outer-container w-full lg:w-1/2 flex flex-col gap-2">
            <div className="Personal-details border-2 rounded-md p-4 flex flex-col gap-4">
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
            </div>
            <div className="social-links border-2 rounded-md p-4 flex flex-col gap-4">
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
            <div className="background border-2 rounded-md p-4 flex flex-col gap-4">
              <h2 className="text-xl dark:text-yellow-400 flex items-center">
                <GraduationCap /> Background :
              </h2>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormDetails;
