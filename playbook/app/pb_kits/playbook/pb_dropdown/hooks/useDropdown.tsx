import {useState} from 'react';


const useDropdown = (initial=true) => {
    
const [isDropDownClosed, setIsDropDownClosed] = useState(initial);

const toggleDropdown = () => setIsDropDownClosed(!isDropDownClosed);

return [
    isDropDownClosed,
    setIsDropDownClosed as any,
    toggleDropdown
]
}

export default useDropdown