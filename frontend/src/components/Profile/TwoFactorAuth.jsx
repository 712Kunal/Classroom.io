'use client';

import { useEffect, useRef, useState } from 'react';
import { MdOutlineSecurity } from 'react-icons/md';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { verifyOtp } from '@/Firebase/services/otpVerify';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/Firebase/firebase';

function TwoFactorAuth() {
  const navigate = useNavigate();
  const userId = auth.currentUser.uid; // get the user id
  console.log(userId);

  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const InputHandle = (value, index) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== '' && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1].focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const onVerify = async (fullCode) => {
    try {
      // send axios request to backend
      const result = await verifyOtp(userId, fullCode);
      if (result) {
        navigate('/app/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    try {
      if (fullCode.length === 4) {
        await onVerify(fullCode);
        // userid, otp =>  send axios request to backend
        // userid and otp
        console.log('Verifying code:', fullCode);
      }
      setCode(['', '', '', '']);
      setError('');
    } catch (error) {
      setError('Please enter the valid 4 digit code');
      console.log(error);
      setCode(['', '', '', '']);
    }
  };

  return (
    <Card className="shadow-md rounded-lg shadow-black bg-white/85 dark:shadow-blue-500 backdrop-blur-md dark:bg-black/80 w-3/4 relative md:w-1/2">
      <CardHeader>
        <span className="flex items-center gap-2">
          <MdOutlineSecurity className="text-5xl text-green-400" />
          <CardTitle className="font-sans text-5xl">Email Verification</CardTitle>
        </span>
        <CardDescription className="font-exo tracking-wide text-xl font-extralight mt-10">
          We've sent a 4-digit code to your email. Please enter it below to verify your identity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-8 mt-5">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-20 h-20 bg-zinc-800 text-center text-white text-xl border-2 rounded-lg border-cyan-300 shadow-md shadow-slate-500"
              onChange={(e) => InputHandle(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={handleFocus}
            />
          ))}
        </div>
        <Button
          type="submit"
          className="w-full mt-5 tracking-wide font-sans text-xl text-white p-2 rounded-lg bg-blue-700 hover:bg-blue-900"
          onClick={handleVerify}>
          Verify
        </Button>
        {error && (
          <p className="text-red-400 text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20 mt-4">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default TwoFactorAuth;
