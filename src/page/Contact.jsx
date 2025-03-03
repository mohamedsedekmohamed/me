import { useRef } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
     
      emailjs 
        .sendForm('service_9fdki0d', 'template_z0zx0jf', form.current, {
          publicKey:'8mShCUbjwrB7wfbgb',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };
  return (
    <div className=" w-[90%] mx-auto my-6   bg-gray-200">
      <div className=" flex flex-col gap-6 bg-white m-4 p-4 ">
    <form ref={form} onSubmit={sendEmail}>
        <div className="flex flex-col gap-2">
     <label  className="text-2xl md:text-3xl text-one font-bold   " >  الأسم</label>
            <input  placeholder=" أدخال الأسم"    name="from_name" className="w-[100%] bg-gray-200 p-3"/>
        </div>
        <div className="flex flex-col gap-2">
     <label  className=" text-2xl md:text-3xl text-one font-bold  ">  العمر</label>
            <input type="number" 
            style={{
                WebkitAppearance: "none",  // لإخفاء الأزرار في Chrome و Safari
                MozAppearance: "textfield", // لإخفاء الأزرار في Firefox
              }}
               placeholder=" أدخال العمر"  name="to_age"  className="w-[100%] bg-gray-200 p-3"/>
        </div>
        <div className="flex flex-col gap-2">
     <label  className="text-2xl md:text-3xl text-one font-bold  ">  البريد الألكتروني </label>
            <input  type="email" placeholder=" أدخال البريد الألكتروني "  name="reply_to" className="w-[100%] bg-gray-200 p-3"/>
        </div>
        <div className="flex flex-col gap-2">
     <label  className="text-2xl md:text-3xl text-one font-bold  " >  المشكلة </label>
            <input  placeholder="وصف المشكلة "    name="message" className="w-[100%] bg-gray-200 p-3"/>
        </div>
        <div className="flex justify-center items-center mt-5"> 
      <button type="submit" value="Send"
       className=" text-2xl md:text-3xl bg-gray-200 p-3 text- amber-200 w-[50%] md:w-[20%]  transform ease-in-out delay-150 rounded-full font-bold hover:bg-one hover:text-white ">أرسال </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
