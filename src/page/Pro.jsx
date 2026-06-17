import { useContext } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import tic  from '../assets/math.png';
import aln  from '../assets/aln.png';
import maz  from '../assets/maz.png';
import kee  from '../assets/keeto.png';
import todo from '../assets/food.png';
import cruds from '../assets/voo.png';
import kidd from '../assets/kidd.png';
import may  from '../assets/may.png';
import sea  from '../assets/sea.png';
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import AnimatedContent from '../component/AnimatedContent.jsx';
import ScrollFloat from '../component/ScrollFloat.jsx';
import TiltedCard from '../component/TiltedCard.jsx';

const arFont = { fontFamily: "'Cairo', sans-serif" };
const enFont = { fontFamily: "'Inter', sans-serif" };

const Pro = () => {
  const { darkMode, language } = useContext(DarkModeContext);
  const { t } = useTranslation();
  const isAr = language === 'ar';

const projects = [
  {
    id: 1,
    title: "MathHouse",
    img: tic,
    link: "https://mathshouse.net/",
    type: "Production",
    color: "#2563eb", // Blue
  },
  {
    id: 4,
    title: "Voo",
    img: cruds,
    link: "https://voo-hub.com/",
    type: "Production",
    color: "#7c3aed", // Violet
  },
  {
    id: 5,
    title: "15may Club",
    img: may,
    link: "https://15may.club/admin/home",
    type: "Production",
    color: "#06b6d4", // Cyan
  },
  {
    id: 6,
    title: "Sea Go",
    img: sea,
    link: "https://sea-go.org/",
    type: "Production",
    color: "#0ea5e9", // Sky Blue
  },
  {
    id: 7,
    title: "Kidsero",
    img: kidd,
    link: "https://kidsero.com/",
    type: "Production",
    color: "#f59e0b", // Amber
  },
  {
    id: 3,
    title: "Food2go",
    img: todo,
    link: "https://food2go.online/",
    type: "Production",
    color: "#ef4444", // Red
  },
  {
    id: 8,
    title: "Mazoom",
    img: maz,
    link: "https://www.mazoominvitations.com/",
    type: "Production",
    color: "#10b981", // Emerald
  },
  {
    id: 9,
    title: "keeto",
    img: kee,
    link: "https://orderfood.keeto.org/",
    type: "Production",
    color: "#A78BFA", // Emerald
  },
  {
    id: 10,
    title: "alnatech",
    img: aln,
    link: "https://alnatech.de/en",
    type: "Production",
    color:   "#7C3AED",
 // Emerald
  },
];

  return (
    <div className="w-full py-20 px-4">

      {/* Title */}
      <AnimatedContent distance={60} direction="vertical" delay={0} className="text-center mb-16">
        <ScrollFloat
          containerClassName={`text-5xl md:text-6xl font-black ${darkMode ? 'text-white' : 'text-blue-900'}`}
          stagger={0.05}
          animationDuration={1.2}
        >
          {t('projects.title')}
        </ScrollFloat>
        <motion.div
          className={`h-1.5 w-16 mx-auto mt-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.p
          className={`mt-4 text-base ${darkMode ? 'text-gray-400' : 'text-blue-700/70'}`}
          style={isAr ? { ...arFont, fontSize: '1rem' } : enFont}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
          {t('projects.hint')}
        </motion.p>
      </AnimatedContent>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {projects.map((project, index) => (
          <AnimatedContent key={project.id} distance={60} direction="vertical" delay={index * 0.08}>
            <ProjectCard project={project} darkMode={darkMode} visitLabel={t('projects.visitSite')} />
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, darkMode, visitLabel }) => (
  <TiltedCard
    containerWidth="240px"
    containerHeight="320px"
    scaleOnHover={1.06}
    rotateAmplitude={14}
    showTooltip={false}
    displayOverlayContent={true}
    overlayContent={
      <div className="absolute inset-0 flex flex-col rounded-xl overflow-hidden">
        {/* Image */}
        <div className="relative flex-1 overflow-hidden">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t
            ${darkMode ? 'from-zinc-900 via-zinc-900/40 to-transparent' : 'from-blue-900 via-blue-900/30 to-transparent'}`} />
        </div>

        {/* Footer */}
        <div className={`p-4 ${darkMode ? 'bg-zinc-900' : 'bg-blue-900'}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-black text-base uppercase tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              {project.title}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                background: `${project.color}25`,
                color: project.color,
                border: `1px solid ${project.color}50`,
                fontFamily: "'Inter', sans-serif",
              }}>
              {project.type}
            </span>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center py-2 rounded-lg text-sm font-bold text-white
              hover:opacity-90 active:scale-95 transition-all"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.color}99)`,
              boxShadow: `0 4px 15px ${project.color}40`,
              fontFamily: "'Cairo', 'Inter', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {visitLabel}
          </a>
        </div>
      </div>
    }
  >
    <div className="w-full h-full rounded-xl overflow-hidden"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #18181b, #27272a)'
          : 'linear-gradient(135deg, #1e3a8a, #2563eb)',
        boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${project.color}20`,
      }}
    />
  </TiltedCard>
);

export default Pro;
