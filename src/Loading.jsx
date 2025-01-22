import { ScaleLoader } from 'react-spinners';
import './Loading.css';

function Loading() {
  return (
    <div className="loading">
        <ScaleLoader height={60} width={5} margin={5} color={"#52C3C2"} loading={true} />
    </div>
  );
}   

export default Loading;