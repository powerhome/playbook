import SantaFrogSVG from '../../images/ghostfrogfestivehat.svg'
import {Image} from "playbook-ui"


const SantaFrog = () => {
  return (
    <div className="santa-frogs-container">
      <span className="santa-frog santa-frog-1"><Image height="30px" url={SantaFrogSVG} alt="Santa Frog" /></span>
      <span className="santa-frog santa-frog-2"><Image height="30px" url={SantaFrogSVG} alt="Santa Frog" /></span>
      <span className="santa-frog santa-frog-3"><Image height="30px" url={SantaFrogSVG} alt="Santa Frog" /></span>
      <span className="santa-frog santa-frog-4"><Image height="30px" url={SantaFrogSVG} alt="Santa Frog" /></span>
      <span className="santa-frog santa-frog-5"><Image height="30px" url={SantaFrogSVG} alt="Santa Frog" /></span>
    </div>
  );
};

export default SantaFrog;
