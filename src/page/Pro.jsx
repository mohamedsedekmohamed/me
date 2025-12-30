import cruds from '../assets/voo.png';
import tic from '../assets/math.png';
import mov from '../assets/mov.png';
import todo from '../assets/food.png';
import tick from '../assets/tick.png';
import ee from '../assets/ee.png';
import may from '../assets/may.png';
import styled from 'styled-components';
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { useContext } from 'react';

const Pro = () => {
  const { darkMode, language } = useContext(DarkModeContext);

  const projects = [
    { id: 7, title: "ECOTECH", img: ee, github: "https://github.com/mohamedsedekmohamed/ECOTECH-", link: "https://ecotech.systego.net/", type: "Production" },
    { id: 2, title: "MathHouse", img: tic, github: "https://github.com/mohamedsedekmohamed/Math-House-", link: "https://mathshouse.net/", type: "Production" },
    { id: 3, title: "Movies", img: mov, github: "https://github.com/mohamedsedekmohamed/Movies", link: "https://movies-drab-phi.vercel.app/", type: "Demo" },
    { id: 4, title: "Food2go", img: todo, github: "https://github.com/mohamedsedekmohamed/landpageFood2Go", link: "https://food2go.online/", type: "Production" },
    { id: 1, title: "Voo", img: cruds, github: "https://github.com/mohamedsedekmohamed/frontvoo", link: "https://voo-hub.com/", type: "Production" },
    { id: 5, title: "Tickethub", img: tick, github: "https://github.com/mohamedsedekmohamed/TicketTours", link: "https://tickethub-tours.com/", type: "Production" },
    { id: 6, title: "15may Club", img: may, github: "https://github.com/mohamedsedekmohamed/15-May-club", link: "https://15may.club/admin/home", type: "Production" },
  ];

  return (
    <StyledWrapper darkMode={darkMode}>
      {/* أنميشن العنوان: يظهر من الأعلى */}
      <h3 
        data-aos="fade-down"
        className={`text-center font-bold text-4xl mb-10 ${darkMode ? "text-white" : "text-blue-800"}`}
      >
        {language === 'en' ? "Projects" : "المشاريع"}
      </h3>

      <div className='flex w-full flex-wrap justify-center gap-x-12 gap-y-16 my-4'>
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="book"
            // أنميشن الكروت: تظهر للأعلى مع تأخير متزايد (Stagger)
            data-aos="fade-up"
            data-aos-delay={index * 100} 
            data-aos-duration="800"
          >
            
            {/* الأزرار الخلفية */}
            <div className="content-inner">
              <div className="flex flex-col gap-3 w-full px-4">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`py-2 px-4 rounded-lg text-center font-bold transition-all hover:scale-105 shadow-md ${darkMode ? "bg-black text-white" : "bg-blue-800 text-white"}`}
                >
                  GitHub
                </a>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`py-2 px-4 rounded-lg text-center font-bold transition-all hover:scale-105 shadow-md ${darkMode ? "bg-zinc-700 text-white" : "bg-blue-600 text-white"}`}
                >
                  {project.type}
                </a>
              </div>
            </div>

            {/* الغلاف الخارجي */}
            <div className={`cover ${darkMode ? "bg-gradient-to-r from-zinc-900 to-zinc-700" : "bg-gradient-to-r from-blue-800 to-blue-600"}`}>
              <div className="relative h-full w-full flex flex-col items-center justify-between py-6">
                <img src={project.img} alt={project.title} className='h-[65%] w-[85%] rounded-lg object-cover shadow-lg border border-white/20'/>
                <p className={`text-white font-black text-lg uppercase px-3 py-1 rounded-md bg-black/30 backdrop-blur-sm`}>
                  {project.title}
                </p>
                <div className="absolute left-0 top-0 w-3 h-full bg-black/20 rounded-l-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  padding: 4rem 0; /* زيادة الـ Padding ليعمل الـ AOS بشكل أفضل عند السكرول */

  .book {
    position: relative;
    width: 230px;
    height: 310px;
    background-color: #f5f5f5;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 2000px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  .content-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: #fff;
    z-index: 1;
  }

  .cover {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.6s ease-in-out;
    transform-origin: left;
    z-index: 2;
    box-shadow: 2px 0 10px rgba(0,0,0,0.3);
  }

  .book:hover .cover {
    transform: rotateY(-115deg);
    box-shadow: 15px 0 30px rgba(0,0,0,0.4);
  }

  .book::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ccc;
    border-radius: 10px;
    transform: translateZ(-1px);
    z-index: 0;
  }
`;

export default Pro;