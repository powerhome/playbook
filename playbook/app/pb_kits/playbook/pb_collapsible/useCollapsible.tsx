import {useState} from 'react';

const useCollapsible = (initial= true) => {
    const [collapsed, setCollapsed] = useState(initial)

    const toggle = () => setCollapsed((prev) => !prev)
      return [
      collapsed,
      toggle,
      setCollapsed as any,
    ]
  }

  export default useCollapsible