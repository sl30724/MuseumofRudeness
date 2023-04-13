// import { Html } from "@react-three/drei";
import { useState, useEffect, MouseEvent } from 'react';
import {Vector3} from "@react-three/fiber";

interface Expo {
    orbitAbled: boolean;
}

export default function ExpoDetails(props: Expo) {
    const [shown, setShown] = useState(false);
    const [answer, setAnswer] = useState("");
    const handleSelected = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAnswer(event.currentTarget.name);
    }

    useEffect(() => {
        if (props.orbitAbled) {
            setShown(false)
        };
        function onTimeout() {
            if (!props.orbitAbled) {
                setShown(true)
            }
        };
        const timeoutId = setTimeout(onTimeout, 1000);

        return () => {
            clearTimeout(timeoutId);
            console.log(shown);
        }
    }, [props.orbitAbled]);

    return (
            <div className={`popup-${shown ? "shown" : "hidden"}`}>
                <div className="expoInfo">
                    <h1>Sniff or Blow</h1>
                    <p>While in some cultures blowing your nose is considered more acceptable than sniffing, it is commonly considered rude in some cultures to blow your nose loudly in public.</p>
                    <h4>It is rude in...</h4>
                    <div className="guess">
                        <button className='guess-but' onClick={handleSelected} name="Japan"> Japan </button>
                        <button className='guess-but' onClick={handleSelected} name="United Kingdoms"> United Kingdoms </button>
                        <button className='guess-but' onClick={handleSelected} name="Norway"> Norway </button>
                        <button className='guess-but' onClick={handleSelected} name="Turkey"> Turkey </button>
                    </div>
                    {answer && <button className='answer-show'> You selected {answer}. See Answer </button>}
                </div>

            </div>
    )
}