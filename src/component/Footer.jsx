import { DarkModeContext } from './DarkModeContext.jsx';
import { useContext, useRef, useState } from "react"; // أضفنا useState
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast'; // استيراد الـ Toast

const Footer = () => {
  const { darkMode, language } = useContext(DarkModeContext);
  const form = useRef();
  const [loading, setLoading] = useState(false); // حالة التحميل أثناء الإرسال

  const isEn = language === "en";

  const validateForm = (formData) => {
    const name = formData.get('to_name');
    const email = formData.get('from_name');
    const message = formData.get('message');

    if (!name || name.length < 3) {
      toast.error(isEn ? "Name must be at least 3 characters" : "يجب أن يكون الاسم 3 أحرف على الأقل");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(isEn ? "Please enter a valid email" : "يرجى إدخال بريد إلكتروني صحيح");
      return false;
    }

    if (!message || message.length < 10) {
      toast.error(isEn ? "Message is too short" : "الرسالة قصيرة جداً");
      return false;
    }

    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    // الحصول على البيانات للتحقق منها
    const formData = new FormData(form.current);
    if (!validateForm(formData)) return;

    setLoading(true);
    const toastId = toast.loading(isEn ? "Sending..." : "جاري الإرسال...");

    emailjs
      .sendForm('service_1zdg2m3', 'template_4dubolq', form.current, {
        publicKey: '8mShCUbjwrB7wfbgb',
      })
      .then(
        () => {
          setLoading(false);
          form.current.reset();
          toast.success(isEn ? "Sent Successfully!" : "تم الإرسال بنجاح!", { id: toastId });
        },
        (error) => {
          setLoading(false);
          toast.error(isEn ? "Failed to send!" : "فشل في الإرسال!", { id: toastId });
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <footer className={`w-full py-16 transition-all duration-300 ${!darkMode ? 'bg-blue-800' : 'bg-white'}`}>
      {/* مكون الـ Toaster لوضع التنبيهات في الصفحة */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className={`font-black text-4xl md:text-5xl uppercase tracking-tight ${!darkMode ? "text-white" : "text-black"}`}>
            {isEn ? "Contact" : "التواصل"}
          </h2>
          <div className={`h-1.5 w-16 mt-2 rounded-full ${!darkMode ? 'bg-white' : 'bg-blue-800'}`}></div>
        </div>

        <div className={`w-full rounded-[2rem] overflow-hidden shadow-2xl border ${!darkMode ? 'bg-blue-800 border-blue-700' : 'bg-white border-gray-100'}`}>
<div className={`flex flex-col ${isEn ? 'md:flex-row' : 'md:flex-row-reverse'}`}>            
            {/* Left Side: Info */}
          <div className={`hidden md:flex md:w-1/3 p-10 flex-col justify-center 
      ${!darkMode ? 'bg-blue-900 text-white' : 'bg-gray-100 text-black'} 
      ${isEn ? 'text-left' : 'text-right'}`} 
      dir={isEn ? "ltr" : "rtl"}
    >
        <h3 className="text-2xl font-bold mb-4">
          {isEn ? "Let's Talk" : "نتحدث؟"}
        </h3>
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
                      name="to_name"
                      placeholder={isEn ? "Your Name" : "أدخل اسمك"}
                      className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all ${
                        !darkMode ? 'bg-white text-blue-800 border-transparent focus:border-blue-400' : 'bg-gray-50 text-black border-gray-200 focus:border-blue-800'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`}>
                      {isEn ? "Email" : "البريد الألكتروني"}
                    </label>
                    <input
                      type="email"
                      name="from_name"
                      placeholder="email@example.com"
                      className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all ${
                        !darkMode ? 'bg-white text-blue-800 border-transparent focus:border-blue-400' : 'bg-gray-50 text-black border-gray-200 focus:border-blue-800'
                      }`}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`}>
                    {isEn ? "Message" : "الرسالة"}
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder={isEn ? "Your message here..." : "اكتب رسالتك هنا..."}
                    className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all resize-none ${
                      !darkMode ? 'bg-white text-blue-800 border-transparent focus:border-blue-400' : 'bg-gray-50 text-black border-gray-200 focus:border-blue-800'
                    }`}
                  />
                </div>

                {/* Button */}
                <div className={`flex ${isEn ? 'justify-start' : 'justify-end'} mt-8`}>
                  <button
                    disabled={loading}
                    type="submit"
                    className={`px-12 py-4 rounded-full font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      !darkMode ? 'bg-white text-blue-800 hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {loading ? (isEn ? "..." : "...") : (isEn ? "Send" : "أرسال")}
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