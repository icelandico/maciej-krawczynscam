import './index.css';
import BgImg from './../../img/bg.jpg'

export const WelcomePage = () => {
  return (
      <div className="main-welcome">
        <div className="main-welcome__container">
          <img className="main-welcome__hero" src={BgImg} />
        </div>
        <div className="main-welcome__info">
          <p className="main-welcome__info-text">Wróć i odbierz nagrodę za:</p>
        </div>
      </div>
  );
}
