import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './index.css';
import { EmailKeysMailRu } from "../../emailkey";
import { ReactComponent as MainIcon } from './../../img/MUCHA SVG.svg';

export const Form = () => {
  const formRef = useRef();
  const iconRef = useRef();
  const [formSent, setFormSent] = useState(false);
  const [isBgBlack, setBgBlack] = useState(false);
  const [formLines, setFormLines] = useState([{
    id: 1,
    author: "",
    title: ""
  }]);
  const [userEmail, setUserEmail] = useState('')

  const handleSendForm = (e) => {
    if (!userEmail) {
      alert("HOLA! PODAJ MAILA")
      return
    }
    setBgBlack(true);
    handleMoveIcon();
    setTimeout(() => {
      emailjs.sendForm(EmailKeysMailRu.SERVICE_ID, EmailKeysMailRu.TEMPLATE_ID, formRef.current, EmailKeysMailRu.USER_ID)
          .then((result) => {
            setFormSent(true);
          }, (error) => {
            console.log(error.text);
       });
    }, 3000)
  }

  const createPosition = () => {
    let h = window.innerHeight - 50;
    let w = window.innerWidth - 50;

    let nh = Math.floor(Math.random() * h);
    let nw = Math.floor(Math.random() * w);
    return [nh,nw];
  }

  const handleMoveIcon = () => {
    const posInterval = setInterval(() => {
      const position = createPosition();
      iconRef.current.style.left = position[1] + 'px'
      iconRef.current.style.top = position[0] + 'px'
    }, 400)
  }

  const handleRemoveLine = id => {
    const removedIndex = formLines.findIndex(line => line.id === id);
    let newArr = [...formLines];
    newArr.splice(removedIndex, 1);
    newArr = newArr.map((line, idx) => ({...line, id: idx + 1}));
    setFormLines(newArr)
  }

  const handleChangeLine = (value, input, id) => {
    const changedIndex = formLines.findIndex(line => line.id === id);
    const newArray = [...formLines];
    if (input === 'author') {
      newArray[changedIndex] = {...newArray[changedIndex], author: value}
    }
    if (input === 'title') {
      newArray[changedIndex] = {...newArray[changedIndex], title: value}
    }
    setFormLines(newArray)
  }

  return (
      <>
      <div className={`main-form ${isBgBlack ? 'main-form--sent' : ''}`}>
        <h1>ZAM??W CO??</h1>
        <h1><a href="https://wydawnictwo.krytykapolityczna.pl/" target="_blank">WEJD?? TU I WYBIERZ SWOJE TOWARY</a></h1>
        <h1>WYPE??NIJ FORMULARZ</h1>
        <h1>PO WERYFIKACJI PRZEZ AUTORYZOWANEGO CZ??OWIEKA TWOJE ZAM??WIENIE ZOSTANIE ZREALIZOWANE</h1>
        <h1>UWAGA!!! JE??ELI PRZEKROCZYSZ KWOT?? <span className="main-form__price-info">150</span> PLN, TWOJE ZAM??WIENIE ZOSTANIE ODRZUCONE</h1>

        <div className="main-form__container">
          <form className="main-form__send-form" ref={formRef}>
            {formLines.map((line) => {
              return (
                  <div className="main-form__input-line" id={line.id}>
                    <span className="main-form__input-number">{line.id}.</span>
                    <input name={`author${line.id}`} className="main-form__input" type="text" placeholder={"AUTOR"} value={line.author} onChange={e => handleChangeLine(e.target.value, 'author', line.id)} />
                    <input name={`title${line.id}`}className="main-form__input" type="text" placeholder={"TYTU??"} value={line.title} onChange={e => handleChangeLine(e.target.value, 'title', line.id)} />
                    <div
                        className={`main-form__button main-form__button--remove ${line.id === 1 ? 'main-form__button--hidden' : ''}`}
                        onClick={() => handleRemoveLine(line.id)}
                    >
                      WYJEB
                    </div>
                  </div>
              )
            })}
            <div className="main-form__input-line main-form__input-line--name" >
              <input name={'user_email'} className="main-form__input main-form__input--name" type="text" placeholder={"TW??J EMAIL"} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            </div>
          </form>
          <div className="main-form__button" onClick={() => setFormLines(formLines.concat({ id: formLines.length + 1, author: "", title: ""}))}>DODAJ POZYCJ??</div>
          <div className="main-form__submit">
            <div className="main-form__button main-form__button--accept main-form__button-send-form" onClick={(e) => handleSendForm(e)}>WY??LIJ FORMULARZ !!!!</div>
          </div>
          <div className="main-form__contact">
            <p>POMOC TECHNICZNA: </p>
            <p>VASYL: 603 556 132</p>
            <p>??ONA VASYLA: 602 502 150</p>
          </div>
        </div>

      </div>
        <div className={`main-form__modal ${formSent ? 'main-form__modal--show' : ''}`}>
          <h1>JU?? ZA??ATWIONE</h1>
          <h1>WIRUS DO CIEBIE JEDZIE</h1>
        </div>
        <div className={`main-form__loader ${isBgBlack ? 'main-form__loader--show' : ''}`} ref={iconRef}>
          <MainIcon />
        </div>
      </>
  );
}
