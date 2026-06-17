import { DarkModeContext } from './DarkModeContext.jsx';
import { useContext, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import AnimatedContent from './AnimatedContent.jsx';
import ScrollFloat from './ScrollFloat.jsx';

const arFont = { fontFamily: "'Cairo', sans-serif" };
const enFont = { fontFamily: "'Inter', sans-serif" };

const Footer = () => {
  const { darkMode, language } = useContext(DarkModeContext);
  const { t } = useTranslation();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isAr = language === "ar";
  const f = (key) => t(`contact.${key}`);

  const validateForm = (formData) => {
    const name    = formData.get('to_name');
    const email   = formData.get('from_name');
    const message = formData.get('message');

    if (!name || name.length < 3) { toast.error(f('validName'));    return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error(f('validEmail')); return false; }
    if (!message || message.length < 10) { toast.error(f('validMessage')); return false; }
    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm(new FormData(form.current))) return;

    setLoading(true);
    const toastId = toast.loading(f('sending'));

    emailjs
      .sendForm('service_1zdg2m3', 'template_4dubolq', form.current, { publicKey: '8mShCUbjwrB7wfbgb' })
      .then(
        () => { setLoading(false); form.current.reset(); toast.success(f('successMsg'), { id: toastId }); },
        (err) => { setLoading(false); toast.error(f('failMsg'), { id: toastId }); console.log(err.text); }
      );
  };

  const inputCls = (field) => `
    w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all duration-300
    ${!darkMode
      ? `bg-white text-blue-800 ${focusedField === field ? 'border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.3)]' : 'border-transparent'}`
      : `bg-gray-50 text-black ${focusedField === field ? 'border-blue-800 shadow-[0_0_20px_rgba(30,64,175,0.2)]' : 'border-gray-200'}`
    }
  `;

  const textStyle = isAr ? { ...arFont, lineHeight: 1.9 } : enFont;

  return (
    <footer
      className={`w-full py-20 transition-all duration-300 ${!darkMode ? 'bg-blue-800' : 'bg-white'}`}
      style={textStyle}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}
        <AnimatedContent distance={50} direction="vertical" delay={0} className="flex flex-col items-center mb-14">
          <ScrollFloat
            containerClassName={`font-black text-4xl md:text-5xl uppercase ${!darkMode ? "text-white" : "text-black"}`}
            stagger={0.05}
            animationDuration={1}
          >
            {t('contact.title')}
          </ScrollFloat>
          <motion.div
            className={`h-1.5 w-16 mt-3 rounded-full ${!darkMode ? 'bg-white' : 'bg-blue-800'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </AnimatedContent>

        {/* Card */}
        <AnimatedContent distance={60} direction="vertical" delay={0.1}>
          <motion.div
            className={`w-full rounded-[2rem] overflow-hidden shadow-2xl border
              ${!darkMode ? 'bg-blue-800 border-blue-700' : 'bg-white border-gray-100'}`}
            whileHover={{ boxShadow: !darkMode ? "0 30px 60px rgba(0,0,0,0.3)" : "0 30px 60px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex flex-col ${isAr ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

              {/* Info panel */}
              <motion.div
                className={`hidden md:flex md:w-1/3 p-10 flex-col justify-center
                  ${!darkMode ? 'bg-blue-900 text-white' : 'bg-gray-100 text-black'}
                  ${isAr ? 'text-right' : 'text-left'}`}
                dir={isAr ? "rtl" : "ltr"}
                initial={{ opacity: 0, x: isAr ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative mb-8">
                  <motion.div
                    className={`w-16 h-16 rounded-full border-2 ${!darkMode ? 'border-blue-400/40' : 'border-blue-800/30'}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className={`absolute top-2 left-2 w-12 h-12 rounded-full border ${!darkMode ? 'border-blue-300/30' : 'border-blue-600/20'}`}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <div className={`absolute top-4 left-4 w-8 h-8 rounded-full ${!darkMode ? 'bg-blue-400/20' : 'bg-blue-800/10'}`} />
                </div>

                <h3 className="text-2xl font-bold mb-4" style={textStyle}>{f('letsTalk')}</h3>
                <p className="opacity-80 text-sm" style={textStyle}>{f('letsTalkDesc')}</p>

                <div className="flex gap-2 mt-8">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${!darkMode ? 'bg-blue-400' : 'bg-blue-800'}`}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Form */}
              <div className="flex-1 p-8 md:p-12">
                <form ref={form} onSubmit={sendEmail} dir={isAr ? "rtl" : "ltr"} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <motion.div className="space-y-2"
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }} transition={{ delay: 0.3 }}>
                      <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`} style={textStyle}>
                        {f('name')}
                      </label>
                      <input name="to_name" placeholder={f('namePlaceholder')}
                        className={inputCls('name')} style={textStyle}
                        onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
                    </motion.div>

                    {/* Email */}
                    <motion.div className="space-y-2"
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }} transition={{ delay: 0.4 }}>
                      <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`} style={textStyle}>
                        {f('email')}
                      </label>
                      <input type="email" name="from_name" placeholder="email@example.com"
                        className={inputCls('email')} style={enFont}
                        onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div className="space-y-2"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }} transition={{ delay: 0.5 }}>
                    <label className={`block font-bold text-lg ${!darkMode ? 'text-white' : 'text-black'}`} style={textStyle}>
                      {f('message')}
                    </label>
                    <textarea name="message" rows="4" placeholder={f('messagePlaceholder')}
                      className={`${inputCls('message')} resize-none`} style={textStyle}
                      onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} />
                  </motion.div>

                  {/* Submit */}
                  <motion.div className={`flex ${isAr ? 'justify-end' : 'justify-start'} mt-6`}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }} transition={{ delay: 0.6 }}>
                    <motion.button
                      disabled={loading} type="submit"
                      className={`px-12 py-4 rounded-full font-black text-xl shadow-xl relative overflow-hidden
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                        ${!darkMode ? 'bg-white text-blue-800' : 'bg-black text-white'}`}
                      style={textStyle}
                      whileHover={!loading ? { scale: 1.05, y: -3 } : {}}
                      whileTap={!loading ? { scale: 0.95 } : {}}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10">
                        {loading ? f('sending') : f('send')}
                      </span>
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </AnimatedContent>

        {/* Footer bottom */}
        <motion.div
          className={`text-center mt-12 text-sm opacity-60 ${!darkMode ? 'text-white' : 'text-black'}`}
          style={textStyle}
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }}
          viewport={{ once: false }} transition={{ delay: 0.5 }}
        >
          {t('footer.copy')}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
