import { ThemeConsumer } from "../context/ThemeContext"
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
 
const ToggleTheme = () => {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return  <button className="toggle-theme" onClick={()=> {toggleTheme();
                    document.documentElement.setAttribute('data-theme', theme);}}> 
                    {theme === 'light' ? <RiSunLine /> : <RiMoonLine />}            
                </button>
      }}
    </ThemeConsumer>
  );
}
 
export default ToggleTheme;