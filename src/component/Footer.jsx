import { DarkModeContext } from './DarkModeContext.jsx';
import { useContext, useRef } from "react";
import emailjs from '@emailjs/browser';

const Footer = () => {
  const { darkMode, language } = useContext(DarkModeContext);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_1zdg2m3', 'template_4dubolq', form.current, {
        publicKey: '8mShCUbjwrB7wfbgb',
      })
      .then(
        () => {
          form.current.reset();
          alert(language === "en" ? "Sent!" : "تم الإرسال!");
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const isEn = language === "en";

  return (
    <footer className={`w-full py-16 transition-all duration-300 ${!darkMode ? 'bg-blue-800' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <h2 className={`font-black text-4xl md:text-5xl uppercase tracking-tight ${!darkMode ? "text-white" : "text-black"}`}>
            {isEn ? "Contact" : "التواصل"}
          </h2>
          <div className={`h-1.5 w-16 mt-2 rounded-full ${!darkMode ? 'bg-white' : 'bg-blue-800'}`}></div>
        </div>

        {/* Main Card */}
        <div className={`w-full rounded-[2rem] overflow-hidden shadow-2xl border ${!darkMode ? 'bg-blue-800 border-blue-700' : 'bg-white border-gray-100'}`}>
          <div className="flex flex-col md:flex-row">
            
            {/* Left Side: Info (Visible on Desktop) */}
            <div className={`hidden md:flex md:w-1/3 p-10 flex-col justify-center ${!darkMode ? 'bg-blue-900 text-white' : 'bg-gray-100 text-black'}`}>
                <h3 className="text-2xl font-bold mb-4">{isEn ? "Let's Talk" : "نتحدث؟"}</h3>
                <p className="opacity-80 leading-relaxed">
                    {isEn ? "Feel free to drop a message, I will respond as soon as possible." : "لا تتردد في ترك رسالة، سأقوم بالرد في أقرب وقت ممكن."}
                </p>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 p-8 md:p-12">
              <form ref={form} onSubmit={sendEmail} dir={isEn ? "ltr" : "rtl"} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`}>
                      {isEn ? "Name" : "الأسم"}
                    </label>
                    <input
                      required
                      name="to_name"
                      placeholder={isEn ? "Your Name" : "أدخل اسمك"}
                      className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all ${
                        !darkMode 
                        ? 'bg-white text-blue-800 border-transparent focus:border-blue-400' 
                        : 'bg-gray-50 text-black border-gray-200 focus:border-blue-800'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`}>
                      {isEn ? "Email" : "البريد الألكتروني"}
                    </label>
                    <input
                      required
                      type="email"
                      name="from_name"
                      placeholder="email@example.com"
                      className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all ${
                        !darkMode 
                        ? 'bg-white text-blue-800 border-transparent focus:border-blue-400' 
                        : 'bg-gray-50 text-black border-gray-200 focus:border-blue-800'
                      }`}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`}>
                    {isEn ? "Message" : "المطلوب"}
                  </label>
                  <textarea
                    required
                    name="message"
                    rows="3"
                    placeholder={isEn ? "Your message here..." : "اكتب رسالتك هنا..."}
                    className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all resize-none ${
                      !darkMode 
                      ? 'bg-white text-blue-800 border-transparent focus:border-blue-400' 
                      : 'bg-gray-50 text-black border-gray-200 focus:border-blue-800'
                    }`}
                  />
                </div>

                {/* Button */}
                <div className={`flex ${isEn ? 'justify-start' : 'justify-end'} mt-8`}>
                  <button
                    type="submit"
                    className={`px-12 py-4 rounded-full font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl ${
                      !darkMode 
                      ? 'bg-white text-blue-800 hover:bg-gray-100' 
                      : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {isEn ? "Send" : "أرسال"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;