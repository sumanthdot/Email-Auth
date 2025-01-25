import React, { useContext,    useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const ResetPassword = () => {
  const { backendURL } = useContext(AppContent);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));

    const inputRefs = React.useRef([])
  

  const handleOTPChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only the last character
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
    }
  };
  
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const pasteArray = pasteData.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        otp[index] = char;
      }
    });
    setOtp([...otp]);
  };
  
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendURL}/api/auth/send-reset-otp`, { email });
      toast.success(data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Error sending OTP');
    }
  };
  
  const handleSubmitOTP = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter all 6 digits of the OTP');
      return;
    }
    setStep(3);
  };
  
  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendURL}/api/auth/reset-password`, {
        email,
        otp: otp.join(''),
        newPassword,
      });
     data ? toast.success(data.message) : toast.error(data.message);
       data.success && navigate('/login') ;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Error resetting password');
    }
  };
  

  return (
    <div className='flex justify-center items-center min-h-screen px-6 sm-px-0 bg-gradient-to-br from-red-700 to-orange-500'>
        <img onClick={()=>navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' alt="" />

      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        {step === 1 && (
          <>
            <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
            <p className="text-center mb-6 text-indigo-300">Enter your registered email address.</p>
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <input
                type="email"
                placeholder="Email"
                className='bg-transparent outline-none' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900  text-white rounded-full' onClick={handleSubmitEmail}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-white text-2xl font-semibold text-center mb-4">Verify OTP</h1>
            <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email.</p>
            <div className="flex justify-between mb-8" onPaste={handlePaste}>
              {otp.map((_, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleOTPChange(e.target.value, index)}
                  ref={e=>inputRefs.current[index] = e}
                  onInput={(e)=>handleInput(e,index)}
                  onKeyDown={(e)=>handleKeyDown(e,index)}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center rounded"
                />
              ))}
            </div>
            <button type="submit" className="w-full py-2.5 bg-indigo-700 text-white rounded" onClick={handleSubmitOTP}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-white text-2xl font-semibold text-center mb-4">Set New Password</h1>
            <p className="text-center mb-6 text-indigo-300">Enter your new password below.</p>
            <div className="mb-10">
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2.5 rounded bg-[#333A5C] text-white outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-indigo-700 text-white rounded" onClick={handleSubmitNewPassword}>
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
