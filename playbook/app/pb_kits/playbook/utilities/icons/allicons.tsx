import React from "react";

const spinner = (
    <svg 
        fill="none" 
        height="25" 
        viewBox="0 0 31 25" 
        width="31" 
        xmlns="http://www.w3.org/2000/svg"
    >
         <path d="M17.4043 1.85547C17.4043 2.69922 16.7012 3.35547 15.9043 3.35547C15.0605 3.35547 14.4043 2.69922 14.4043 1.85547C14.4043 1.05859 15.0605 0.355469 15.9043 0.355469C16.7012 0.355469 17.4043 1.05859 17.4043 1.85547ZM17.4043 22.8555C17.4043 23.6992 16.7012 24.3555 15.9043 24.3555C15.0605 24.3555 14.4043 23.6992 14.4043 22.8555C14.4043 22.0586 15.0605 21.3555 15.9043 21.3555C16.7012 21.3555 17.4043 22.0586 17.4043 22.8555ZM24.9043 12.3555C24.9043 11.5586 25.5605 10.8555 26.4043 10.8555C27.2012 10.8555 27.9043 11.5586 27.9043 12.3555C27.9043 13.1992 27.2012 13.8555 26.4043 13.8555C25.5605 13.8555 24.9043 13.1992 24.9043 12.3555ZM5.4043 13.8555C4.56055 13.8555 3.9043 13.1992 3.9043 12.3555C3.9043 11.5586 4.56055 10.8555 5.4043 10.8555C6.20117 10.8555 6.9043 11.5586 6.9043 12.3555C6.9043 13.1992 6.20117 13.8555 5.4043 13.8555ZM7.41992 20.8398C6.81055 20.2773 6.81055 19.3398 7.41992 18.7305C7.98242 18.168 8.91992 18.168 9.5293 18.7305C10.0918 19.3398 10.0918 20.2773 9.5293 20.8398C8.91992 21.4492 7.98242 21.4492 7.41992 20.8398ZM22.2324 20.8398C21.8574 20.5117 21.6699 19.9023 21.8105 19.3867C21.9512 18.8711 22.373 18.4492 22.8887 18.3086C23.4043 18.168 24.0137 18.3555 24.3887 18.7305C24.7637 19.1055 24.9512 19.668 24.8105 20.2305C24.6699 20.7461 24.248 21.168 23.7324 21.3086C23.1699 21.4492 22.6074 21.2617 22.2324 20.8398ZM7.41992 3.87109C7.98242 3.30859 8.91992 3.30859 9.5293 3.87109C10.0918 4.48047 10.0918 5.41797 9.5293 6.02734C8.91992 6.58984 7.98242 6.58984 7.41992 6.02734C6.81055 5.41797 6.81055 4.48047 7.41992 3.87109Z" 
             fill="#242B42"
         />
    </svg>
)

const clock = (
    <svg  
        fill="none" 
        height="25" 
        viewBox="0 0 31 25" 
        width="31"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M25.1221 12C25.1221 8.53125 23.2471 5.34375 20.2471 3.5625C17.2002 1.82812 13.4971 1.82812 10.4971 3.5625C7.4502 5.34375 5.62207 8.53125 5.62207 12C5.62207 15.5156 7.4502 18.7031 10.4971 20.4844C13.4971 22.2188 17.2002 22.2188 20.2471 20.4844C23.2471 18.7031 25.1221 15.5156 25.1221 12ZM3.37207 12C3.37207 7.73438 5.62207 3.79688 9.37207 1.64062C13.0752 -0.515625 17.6221 -0.515625 21.3721 1.64062C25.0752 3.79688 27.3721 7.73438 27.3721 12C27.3721 16.3125 25.0752 20.25 21.3721 22.4062C17.6221 24.5625 13.0752 24.5625 9.37207 22.4062C5.62207 20.25 3.37207 16.3125 3.37207 12ZM14.2471 5.625C14.2471 5.01562 14.7158 4.5 15.3721 4.5C15.9814 4.5 16.4971 5.01562 16.4971 5.625V11.4375L20.4814 14.0625C20.9971 14.4375 21.1377 15.1406 20.8096 15.6562C20.4346 16.1719 19.7314 16.3125 19.2158 15.9375L14.7158 12.9375C14.4346 12.75 14.2471 12.375 14.2471 12V5.625Z" 
            fill="#242B42"
        />
    </svg>
)

const times = (
    <svg
        fill="none" 
        height="25" 
        viewBox="0 0 31 25" 
        width="31" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M23.0762 6.77734L17.4512 12.4023L23.0293 17.9805C23.498 18.4023 23.498 19.1055 23.0293 19.5273C22.6074 19.9961 21.9043 19.9961 21.4824 19.5273L15.8574 13.9492L10.2793 19.5273C9.85742 19.9961 9.1543 19.9961 8.73242 19.5273C8.26367 19.1055 8.26367 18.4023 8.73242 17.9336L14.3105 12.3555L8.73242 6.77734C8.26367 6.35547 8.26367 5.65234 8.73242 5.18359C9.1543 4.76172 9.85742 4.76172 10.3262 5.18359L15.9043 10.8086L21.4824 5.23047C21.9043 4.76172 22.6074 4.76172 23.0762 5.23047C23.498 5.65234 23.498 6.35547 23.0762 6.77734Z" 
            fill="#242B42"
        />
    </svg>
)

const shieldCheck = (
     <svg 
         fill="none" 
         height="25" 
         viewBox="0 0 30 25" 
         width="30" 
         xmlns="http://www.w3.org/2000/svg"
     >
         <g clipPath="url(#clip0_3501_2627)">
         <path 
             d="M23.613 6.22616C19.2319 5.05738 16.2038 3.57683 14.9994 2.93168C13.795 3.57684 10.7668 5.05738 6.38579 6.22616C6.49648 10.1825 7.36742 13.3152 8.82039 15.769C10.2812 18.2361 12.3678 20.0807 14.9994 21.3944C17.6301 20.0812 19.7161 18.2374 21.1769 15.7716C22.6308 13.3174 23.5022 10.1839 23.613 6.22616ZM14.2526 0.775118C14.7176 0.512911 15.2824 0.51361 15.7463 0.775204C16.4986 1.19938 19.7418 2.92765 24.7399 4.19445C25.4023 4.36236 25.8799 4.96401 25.8736 5.66282C25.8329 10.1987 24.8831 13.9298 23.1127 16.9184C21.3379 19.9142 18.7794 22.0943 15.64 23.5849C15.235 23.7772 14.7638 23.7773 14.3587 23.5849C11.2184 22.0938 8.65916 19.9128 6.88434 16.9154C5.11385 13.9254 4.16463 10.1924 4.12506 5.65388C4.11862 4.91506 4.64477 4.35024 5.26787 4.19218C10.2611 2.92549 13.5011 1.19889 14.2526 0.775118ZM11.685 11.1425C11.2467 10.7022 10.5344 10.7006 10.094 11.139C9.65373 11.5774 9.65215 12.2897 10.0905 12.73L12.7278 15.379C13.3123 15.9661 14.2621 15.9682 14.8491 15.3837L19.8781 10.377C20.3184 9.93866 20.32 9.22635 19.8816 8.78604C19.4432 8.34573 18.7309 8.34415 18.2906 8.78251L13.7932 13.26L11.685 11.1425Z" 
             fill="#242B42"
         />
         </g>
         <defs>
         <clipPath id="clip0_3501_2627">
         <rect 
             fill="white" 
             height="24" 
             transform="translate(0 0.142883)"
             width="30" 
         />
         </clipPath>
         </defs>
     </svg>
) 

const eye = (
    <svg
        fill="none"
        height="1.5em"
        viewBox="0 0 30 24"
        width="1.5em"
        xmlns="http://www.w3.org/2000/svg"
    >
      <path
          clipRule="evenodd"
          d="M15.063 1.393c-4.268 0-7.06 1.76-9.073 3.89C5.002 6.33 4.206 7.46 3.522 8.475l-.395.589c-.526.787-.97 1.454-1.424 1.994a1.521 1.521 0 00-.045 1.902c.303.396.634.893 1.005 1.45 2.092 3.136 5.466 8.197 12.4 8.197 7.192 0 10.277-4.932 12.237-8.066.385-.615.727-1.161 1.047-1.587a1.524 1.524 0 00-.049-1.895c-.459-.548-.906-1.23-1.436-2.037l-.001-.001-.354-.539c-.672-1.014-1.453-2.145-2.425-3.192-1.984-2.135-4.75-3.897-9.02-3.897zM4.703 13.376c-.313-.46-.616-.906-.917-1.323a35.29 35.29 0 001.245-1.788l.357-.533c.67-.995 1.383-1.998 2.238-2.904C9.3 5.056 11.53 3.643 15.063 3.643c3.53 0 5.728 1.41 7.37 3.178.84.905 1.538 1.907 2.197 2.903l.324.492v.001c.417.635.837 1.276 1.265 1.84a43.715 43.715 0 00-1.021 1.551c-1.99 3.115-4.311 6.749-10.135 6.749-5.613 0-8.22-3.833-10.36-6.981zm10.35 2.638a3.946 3.946 0 10-.243-7.885c.168.23.243.602.243 1.204a3.187 3.187 0 01-3.188 3.188 3.83 3.83 0 01-.739-.056 3.947 3.947 0 003.927 3.549zm0 2.25a6.196 6.196 0 100-12.393 6.196 6.196 0 000 12.393z"
          fill="#242B42"
      />
    </svg>
)

const envelope = (
  <svg
      fill="none"
      height="1.5em"
      viewBox="0 0 30 25"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
          d="M5.625 6.286c0-.207.168-.375.375-.375h18c.207 0 .375.168.375.375v1.636L15 13.95 5.625 7.922V6.286zm-2.25 2.232V18.286A2.625 2.625 0 006 20.91h18a2.625 2.625 0 002.625-2.625V8.553 6.286A2.625 2.625 0 0024 3.66H6a2.625 2.625 0 00-2.625 2.625v2.232zm21 2.079v7.689a.375.375 0 01-.375.375H6a.375.375 0 01-.375-.375v-7.69l8.564 5.508a1.5 1.5 0 001.622 0l8.564-5.507z"
          fill="#242B42"
      />
    </svg>
)

const arrowUpShortWide = (
  <svg
      fill="none"
      height="1.5em"
      viewBox="0 0 30 25"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
          d="M3.44 8.724a1.125 1.125 0 11-1.59-1.59l4.235-4.236a1.5 1.5 0 012.12 0l4.236 4.235a1.125 1.125 0 01-1.591 1.591l-2.58-2.58V21.43a1.125 1.125 0 01-2.25 0V6.145l-2.58 2.58zM14.25 20.68c0-.622.504-1.125 1.125-1.125h12a1.125 1.125 0 110 2.25h-12a1.125 1.125 0 01-1.125-1.125zm1.125-6.63a1.125 1.125 0 000 2.25h9a1.125 1.125 0 100-2.25h-9zm-1.125-4.37c0-.622.504-1.125 1.125-1.125h6a1.125 1.125 0 110 2.25h-6a1.125 1.125 0 01-1.125-1.125zm1.125-6.625a1.125 1.125 0 000 2.25h3a1.125 1.125 0 100-2.25h-3z"
          fill="#242B42"
      />
    </svg>
)

const arrowDownShortWide = (
  <svg
      fill="none"
      height="1.5em"
      viewBox="0 0 30 25"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
  >
    <path
        d="M8.27 3.857a1.125 1.125 0 00-2.25 0v15.284l-2.58-2.58a1.125 1.125 0 10-1.59 1.592l4.235 4.235a1.5 1.5 0 002.12 0l4.236-4.235a1.125 1.125 0 10-1.591-1.591l-2.58 2.58V3.856zm5.98 17.25c0-.621.504-1.125 1.125-1.125h12a1.125 1.125 0 110 2.25h-12a1.125 1.125 0 01-1.125-1.125zm1.125-6.63a1.125 1.125 0 000 2.25h8.25a1.125 1.125 0 100-2.25h-8.25zm-1.125-4.37c0-.621.504-1.125 1.125-1.125h5.25a1.125 1.125 0 110 2.25h-5.25a1.125 1.125 0 01-1.125-1.125zm1.125-6.625a1.125 1.125 0 000 2.25h1.5a1.125 1.125 0 100-2.25h-1.5z"
        fill="#242B42"
    />
  </svg>
)

const angleDown = (
  <svg
      fill="none"
      height="1.5em"
      viewBox="0 0 30 24"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
    <path
        d="M6.543 7.69a1.125 1.125 0 011.59.034L15 14.884l6.866-7.16A1.125 1.125 0 1123.49 9.28l-7.407 7.725a1.5 1.5 0 01-2.166 0L6.51 9.281a1.125 1.125 0 01.033-1.59z"
        fill="#242B42"
    />
  </svg>
)

export const getAllIcons = () => {

    return {
        clock: {
            icon: clock
        },
        spinner: {
            icon: spinner
        },
        times: {
            icon: times
        },
        shieldCheck: {
            icon: shieldCheck
        },
        eye: {
            icon: eye
        },
        envelope: {
            icon: envelope
        },
        arrowUpShortWide: {
            icon: arrowUpShortWide
        },
        arrowDownShortWide: {
            icon: arrowDownShortWide
        },
        angleDown: {
            icon: angleDown
        }
    }
}