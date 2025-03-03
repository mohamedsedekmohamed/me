
import { DarkModeContext } from './DarkModeContext.jsx';
import { useContext,useRef } from "react";
import emailjs from '@emailjs/browser';

const Footer = () => {

  const { darkMode, language } = useContext(DarkModeContext);
 const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
     
      emailjs 
        .sendForm('service_1zdg2m3', 'template_4dubolq', form.current, {
          publicKey:'8mShCUbjwrB7wfbgb',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            form.current.reset();

          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };
  return (
    <div className={`w-full relative h-screen ${!darkMode ? 'bg-yellow-800' : 'bg-white'}`}>
      <h2 className={`${!darkMode?" text-white":"text-black"} font-bold text-center uppercase text-4xl mt-5`}>{language==="en"?"contact":"التواصل"}</h2>
     
      <div className="w-[90%] h-fit my-4 rounded-4xl shadow-2xl mx-auto">
        <div className="flex flex-col gap-4 p-4">
        <form ref={form} onSubmit={sendEmail}>
        <div className="flex flex-col gap-2">
              <label className={`text-2xl md:text-3xl text-one font-bold  text-right ${!darkMode ? 'text-white' : 'text-black'}`}>
                {language === "en" ? "Name" : "الأسم"}
              </label>
              <input
                placeholder={language === "en" ? "Enter your name" : "أدخال الأسم"}
                name="to_name"
                className={`w-[100%] rounded-full  text-right p-3 ${!darkMode ? 'bg-white text-yellow-800' : 'bg-black text-white'}`}
              />
            </div>

            <div className="flex flex-col gap-2">
            <label className={`text-2xl md:text-3xl text-one font-bold  text-right ${!darkMode ? 'text-white' : 'text-black'}`}>
            {language === "en" ? "Email" : "البريد الألكتروني"}
              </label>
              <input
                type="email"
                placeholder={language === "en" ? "Enter your email" : "أدخال البريد الألكتروني"}
                name="from_name"
                className={`w-[100%] rounded-full  text-right p-3 ${!darkMode ? 'bg-white text-yellow-800' : 'bg-black text-white'}`}
              />
            </div>

            <div className="flex flex-col gap-2">
            <label className={`text-2xl md:text-3xl text-one font-bold  text-right ${!darkMode ? 'text-white' : 'text-black'}`}>
            {language === "en" ? "Message" : "المطلوب"}
              </label>
              <input
                placeholder={language === "en" ? "Your message" : ""}
                name="message"
                className={`w-[100%] rounded-full  text-right p-3 ${!darkMode ? 'bg-white text-yellow-800' : 'bg-black text-white'}`}
              />
            </div>

            <div className="flex justify-center items-center mt-5">
              <button
                type="submit"
                value="Send"
                className={`text-2xl md:text-3xl ${!darkMode ? 'text-yellow-800 bg-white ' : 'text-white bg-black hover:bg-black/90'} p-3  w-[50%] md:w-[20%] 
                  rounded-2xl transform ease-in font-bold hover:rounded-full  hover:scale-90`}
              >
                {language === "en" ? "Send" : "أرسال"}
              </button>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
