import {useState} from 'react';


const useDropdown = (initial= true) => {
    
const [isDropDownClosed, setIsDropDownClosed] = useState(initial);

const toggleDropdown = () => setIsDropDownClosed((prev) => !prev);

return [
    isDropDownClosed,
    setIsDropDownClosed as any,
    toggleDropdown
]
}

export default useDropdown