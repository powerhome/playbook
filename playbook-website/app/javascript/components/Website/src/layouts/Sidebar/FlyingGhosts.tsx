const FlyingGhosts = () => {
  const GhostSVG = () => (
    <svg width="32" height="32" viewBox="0 0 64 64" role="img" aria-label="Floating ghost" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`.float { animation: f 3.2s ease-in-out infinite; }
        @keyframes f { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } }
        .blink { animation: b 4s ease-in-out infinite; transform-origin: center; }
        @keyframes b { 0%,92%,100%{ r:3.5 } 95%{ r:1 } }`}
      </style>
      <g className="float">
        <path fill="white" stroke="black" strokeWidth="2" d="M32 6c-11 0-20 9-20 20v23c0 3 3 4 5 2 3-3 6-3 9 0 1 1 3 1 4 0 3-3 6-3 9 0 1 1 3 1 4 0 3-3 6-3 9 0 2 2 5 1 5-2V26C57 15 43 6 32 6z"/>
        <circle className="blink" cx="24" cy="26" r="3.5" fill="#0a0a0a"/>
        <circle className="blink" cx="40" cy="26" r="3.5" fill="#0a0a0a"/>
        <path d="M26 36c3 3 9 3 12 0" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round"/>
      </g>
    </svg>
  );

  return (
    <div className="ghosts-container">
      <span className="ghost ghost-1"><GhostSVG /></span>
      <span className="ghost ghost-2"><GhostSVG /></span>
      <span className="ghost ghost-3"><GhostSVG /></span>
      <span className="ghost ghost-4"><GhostSVG /></span>
      <span className="ghost ghost-5"><GhostSVG /></span>
    </div>
  );
};

export default FlyingGhosts;
