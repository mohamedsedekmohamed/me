import cruds from '../assets/voo.png';
import tic from '../assets/math.png';
import mov from '../assets/mov.png';
import todo from '../assets/food.png';
import styled from 'styled-components';
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { useContext } from 'react';
const Pro = () => {
  const {darkMode, language } = useContext(DarkModeContext);

  return (
    <StyledWrapper>
                <h3 className={`   ${darkMode?"text-white":"text-yellow-500"} text-center font-bold text-4xl mb-10 `}>{language=='en'?" Projects":"المشاريع  "}</h3>

        <div className='flex w-screen flex-wrap justify-center gap-5  my-4 '>
        <div className="book w-[30%] flex-col gap-3">
    <a href='https://github.com/mohamedsedekmohamed/frontvoo' className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black t   hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>github</a>
    <a href='https://voo-hub.com/' className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black t   hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>Production</a>
        <div className={`cover  ${darkMode?"bg-gradient-to-r  from-black to-white":"bg-gradient-to-r from-yellow-800 to-white"}`}>
          <img src={cruds} className='absolute top-0 h-[80%] rounded-2xl'/>
          <p className={`text-white font-bold m-2 rounded-full px-2 py-1 ${darkMode?" bg-black vv":"bg-yellow-800"}`}>Voo</p>
        </div>
      </div>

      <div className="book w-[30%] flex-col gap-3">
    <a href="https://github.com/mohamedsedekmohamed/Math-House-" className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black    hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>github</a>
    <a href='https://mathshouse.net/' className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black t   hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>Production</a>
        <div className={`cover  ${darkMode?"bg-gradient-to-r  from-black to-white":"bg-gradient-to-r from-yellow-800 to-white"}`}>
        <img src={tic} className='absolute top-0 h-[80%] pt-8 rounded-2xl object-cover'/>
        <p className={`text-white font-bold m-2 rounded-full px-2 py-1 ${darkMode?" bg-black vv":"bg-yellow-800"}`}>MathHouse</p>
        </div>
      </div>

      <div className="book w-[30%] flex-col gap-3">
    <a href="https://github.com/mohamedsedekmohamed/Movies" className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black    hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>github</a>
    <a href='https://movies-drab-phi.vercel.app/' className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black t   hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>Demo</a>
        <div className={`cover  ${darkMode?"bg-gradient-to-r  from-black to-white":"bg-gradient-to-r from-yellow-800 to-white"}`}>
        <img src={mov} className='absolute top-0 h-[80%] pt-8 rounded-2xl object-cover'/>
        <p className={`text-white font-bold m-2 rounded-full px-2 py-1 ${darkMode?" bg-black vv":"bg-yellow-800"}`}>Moives</p>
        </div>
      </div>

      <div className="book w-[30%] flex-col gap-3">
    <a href='https://github.com/mohamedsedekmohamed/landpageFood2Go' className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black t   hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>github</a>
    <a href='https://food2go.online/' className={`px-2 py-1  rounded-l-4xl text-white  
    ${darkMode?" bg-black t   hover:bg-black/50":" bg-yellow-800   hover:bg-yellow-800/50"}`}>Production</a>
        <div className={`cover ${darkMode?"bg-gradient-to-r  from-black to-white":"bg-gradient-to-r from-yellow-800 to-white"}`}>
        <img src={todo} className='absolute top-0 h-[80%] rounded-2xl  object-cover pt-6'/>
        <p className={`text-white font-bold m-2 rounded-full px-2 py-1 ${darkMode?" bg-black vv":"bg-yellow-800"}`}>Food2go</p>
        </div>
      </div>
      
</div>
      
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .book {
    position: relative;
    border-radius: 10px;
    width: 220px;
    height: 300px;
    background-color: whitesmoke;
    -webkit-box-shadow: 1px 1px 12px #000;
    box-shadow: 1px 1px 12px #000;
    -webkit-transform: preserve-3d;
    -ms-transform: preserve-3d;
    transform: preserve-3d;
    -webkit-perspective: 2000px;
    perspective: 2000px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #000;
  }

  .cover {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform-origin: 0;
    -ms-transform-origin: 0;
    transform-origin: 0;
    -webkit-box-shadow: 1px 1px 12px #000;
    box-shadow: 1px 1px 12px #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: end;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: end;
  }

  .book:hover .cover {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform: rotatey(-80deg);
    -ms-transform: rotatey(-80deg);
    transform: rotatey(-80deg);
  }

  p {
    font-size: 20px;
    font-weight: bolder;
  }`;

export default Pro;
