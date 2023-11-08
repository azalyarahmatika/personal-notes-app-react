import { LocaleConsumer } from "../context/LocaleContext";
import { MdGTranslate } from "react-icons/md"
 
const ToggleLocale = () => {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return  <button className="toggle-locale" onClick={()=> {toggleLocale();}}> 
                    <MdGTranslate/>
                </button>
      }}
    </LocaleConsumer>
  );
}
 
export default ToggleLocale;