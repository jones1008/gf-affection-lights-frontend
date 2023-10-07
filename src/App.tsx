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

    let [errorMessage, setErrorMessage] = useState<string>("");
    let [successMessage, setSuccessMessage] = useState<string>("");

    const sendSms = () => {
        const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/send-affection-sms`);
        url.searchParams.set('message', 'affection please!');
        let headers;
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'production') {
            headers = {
                "Access-Control-Allow-Origin": "*"
            }
        }
        return fetch(url, { headers });
    };

    const changeLamp = () => {
        if (lampState === 'OFF') {
            setLampState('TURNING-ON');
            sendSms().then((res) => {
                if (res.ok) {
                    setLampState("ON");

                    setSuccessMessage('Affection Light leuchtet <3');
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 8000);

                    setTimeout(() => {
                        setLampState("OFF");
                    }, 10000);
                } else {
                    setLampState("OFF");
                    setErrorMessage('Bitte warte 2 Minuten...');
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                }
            }).catch(() => {
                setErrorMessage('Etwas ist schiefgelaufen :(');
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            });
        }
    };

    return (
        <>
            <h4>Du brauchst Aufmerksamkeit von Jonesi?</h4>
            <h3>Klick die Glühbirne!</h3>
            <img alt={'lamp ' + lampState.toLowerCase()} src={src} onClick={changeLamp}/>
            {errorMessage &&
                <div className='snackbar error-message'>
                    {errorMessage}
                </div>
            }
            {successMessage &&
                <div className='snackbar success-message'>
                    {successMessage}
                </div>
            }
        </>
    );
}

export default App;
