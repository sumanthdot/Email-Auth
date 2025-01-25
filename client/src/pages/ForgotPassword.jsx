// import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { AppContent } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const ForgotPassword = () => {

//     const {backendURL} = useContext(AppContent)
//     axios.defaults.withCredentials=true


//     const navigate= useNavigate()
//     const [email,setEmail]=useState('')
//     const [newPassword,setNewPassword]=useState('')
//    const [otp, setOtp] = useState(Array(6).fill(''));

//     const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password


//      const inputRefs = React.useRef([])
    
//       const handleInput= (e,index)=>{
//           if (e.target.value.length > 0 && index< inputRefs.current.length -1) {
//             inputRefs.current[index + 1].focus();
//           }
//       }
    
//       const handleKeyDown = (e,index)=>{
//         if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
//           inputRefs.current[index-1].focus();
//         }
//       }
    
//       const handlePaste= (e)=>{
//           const paste=e.clipboardData.getData('text')
//           const pasteArray = paste.split('');
//           pasteArray.forEach((char,index)=>{
//               if (inputRefs.current[index]) {
//                 inputRefs.current[index].value= char;
//               }
//           })
//       }


//       const onSubmitEmail=async(e)=>{
//         e.preventDefault();
//         try {
//             const {data}= await axios.post(backendURL+`/api/auth/send-reset-otp`,{email})
//             data ? toast.success(data.message) : toast.error(data.message)
//              setStep(2)
//         } catch (error) {
//             toast.error(error.message)
//         }
//       }

//       const onSubmitOtp=async(e)=>{
//         e.preventDefault();
//         // const otpArray= inputRefs.current.map(e=>e.value);
//         const otpArray=otp.join()
//          setOtp(otpArray)
//         setStep(3)
//       }

//       const onSubmitNewPassword = async(e)=>{
//           e.preventDefault();
//           try {
//             const {data}= await axios.post(backendURL+`/api/auth/reset-password`,{email,otp:otp.join(''),newPassword});
//             data ? toast.success(data.message) : toast.error(data.message)
//                     data.success  && navigate('/login')

//           } catch (error) {
//               toast.error(error.message)            
//           }
//       }



//   return (
//     <div className='flex justify-center items-center min-h-screen px-6 sm-px-0 bg-gradient-to-br from-red-700 to-orange-500'>
//          <img onClick={()=>navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' alt="" />
      
// <form >

// {/* Email for OTP */}
//   {step ===1 && (
//     <div className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
//             <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
//             <p className='text-center mb-6 text-indigo-300'>Enter your registered email address</p>
        
//             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//             <img src={assets.mail_icon} alt="" className='w-3 h-3' />
//             <input type="email"
//             placeholder='Email Id'
//             className='bg-transparent outline-none text-white'
//             value={email}
//             onChange={e=>setEmail(e.target.value)}
//             required
//             />
//             </div>

//             <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'  onClick={onSubmitEmail}>Send OTP</button>
//       </div>
//   )
// } 

// {/* Enter Otp form */}
     
// {step === 2 &&

//   (
//      <div  className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
//      <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
//         <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>
        
//         <div className='flex justify-between mb-8' onPaste={handlePaste}>
//           {Array(6).fill(0).map((_,index)=>(
//               <input type="text" required
//                maxLength='1' key={index}
//                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md  '
//                 ref={e=>inputRefs.current[index] = e}
//                 onInput={(e)=>handleInput(e,index)}
//                 onKeyDown={(e)=>handleKeyDown(e,index)}
//                />              
//           ))}
//         </div>
//         <button type='submit' className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900  text-white rounded-full' onClick={onSubmitOtp}>Submit</button>
//         </div>  
        
//         ) 
//     }


// {/* New Password  */}
//     {step === 3 && 

//     (
//           <div className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
//             <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
//             <p className='text-center mb-6 text-indigo-300'>Enter the new password below</p>
        
//             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//             <img src={assets.lock_icon} alt="" className='w-3 h-3' />
//             <input type="password"
//             placeholder='New Password'
//             className='bg-transparent outline-none text-white'
//             value={newPassword}
//             onChange={e=>setNewPassword(e.target.value)}
//             required
//             />
//             </div>

//             <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3' onClick={onSubmitNewPassword}>Submit</button>
//          </div>
//        )
// }
     

// </form>

//     </div>
//   )
// }

// export default ForgotPassword
