import React, {useState} from 'react';
import './App.css';

type LampState = "OFF" | "TURNING-ON" | "ON";

function App() {
  let [lampState, setLampState] = useState<LampState>("OFF");

    let src: string;
    switch (lampState) {
        case "ON":
            src = 'img/lamp-on.png';
            break;
        case "OFF":
            src = 'img/lamp-off.png';
            break;
        case "TURNING-ON":
            src = 'img/lamp-turning-on.gif';
            break;
    }

  const changeLamp = () => {
      if (lampState === 'OFF') {
          setLampState('TURNING-ON');
          setTimeout(() => {
              setLampState("ON");
              setTimeout(() => {
                  setLampState("OFF");
              }, 4000);
          }, 2000);
      }
  };
  return (
      <>
        <h4>Du brauchst Aufmerksamkeit von Jonesi?</h4>
        <h3>Klick die Glühbirne!</h3>
        <img alt={'lamp ' + lampState.toLowerCase()} src={src} onClick={changeLamp}/>
      </>
  );
}

export default App;
