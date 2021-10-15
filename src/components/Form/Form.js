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
    setBgBlack(true);
    handleMoveIcon();
    setTimeout(() => {
      emailjs.sendForm(EmailKeysMailRu.SERVICE_ID, EmailKeysMailRu.TEMPLATE_ID, formRef.current, EmailKeysMailRu.USER_ID)
          .then((result) => {
            setFormSent(true);
          }, (error) => {
            console.log(error.text);
       });
    }, 4000)
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
        <h1>ZAMÓW COŚ</h1>
        <h1><a href="https://wydawnictwo.krytykapolityczna.pl/" target="_blank">WEJDŹ TU I WYBIERZ SWOJE TOWARY</a></h1>
        <h1>WYPEŁNIJ FORMULARZ</h1>
        <h1>PO WERYFIKACJI PRZEZ AUTORYZOWANEGO CZŁOWIEKA TWOJE ZAMÓWIENIE ZOSTANIE ZREALIZOWANE</h1>
        <h1>UWAGA!!! JEŻELI PRZEKROCZYSZ KWOTĘ <span className="main-form__price-info">150</span> PLN, TWOJE ZAMÓWIENIE ZOSTANIE ODRZUCONE</h1>

        <div className="main-form__container">
          <form className="main-form__send-form" ref={formRef}>
            {formLines.map((line) => {
              return (
                  <div className="main-form__input-line" id={line.id}>
                    <span className="main-form__input-number">{line.id}.</span>
                    <input name={`author${line.id}`} className="main-form__input" type="text" placeholder={"AUTOR"} value={line.author} onChange={e => handleChangeLine(e.target.value, 'author', line.id)} />
                    <input name={`title${line.id}`}className="main-form__input" type="text" placeholder={"TYTUŁ"} value={line.title} onChange={e => handleChangeLine(e.target.value, 'title', line.id)} />
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
              <input name={'user_email'} className="main-form__input main-form__input--name" type="text" placeholder={"TWÓJ EMAIL"} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            </div>
          </form>
          <div className="main-form__button" onClick={() => setFormLines(formLines.concat({ id: formLines.length + 1, author: "", title: ""}))}>DODAJ POZYCJĘ</div>
          <div className="main-form__submit">
            <div className="main-form__button main-form__button--accept main-form__button-send-form" onClick={(e) => handleSendForm(e)}>WYŚLIJ FORMULARZ !!!!</div>
          </div>
        </div>

      </div>
        <div className={`main-form__modal ${formSent ? 'main-form__modal--show' : ''}`}>
          <h1>JUŻ ZAŁATWIONE</h1>
          <h1>WIRUS DO CIEBIE JEDZIE</h1>
        </div>
        <div className={`main-form__loader ${isBgBlack ? 'main-form__loader--show' : ''}`} ref={iconRef}>
          <MainIcon />
        </div>
      </>
  );
}
