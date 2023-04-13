// import { Html } from "@react-three/drei";
import { useState, useEffect, MouseEvent } from 'react';
import { Vector3, useThree } from "@react-three/fiber";

interface Expo {
    orbitAbled: boolean;
    selectedObj: string | undefined;
}

interface Details {
    name: string;
    heading: string;
    content: string;
    options: Array<string>;
    correctAnswer: string;
}

export default function ExpoDetails(props: Expo) {
    const [shown, setShown] = useState(false);
    const [answer, setAnswer] = useState("");
    const details = [{
        name: "TissuePaper",
        heading: "Sniff or Blow",
        content: "While in some cultures blowing your nose is considered more acceptable than sniffing, it is commonly considered rude in some cultures to blow your nose loudly in public.",
        options: ["Japan", "United Kingdoms", "Norway", "Turkey"],
        correctAnswer: "Japan",
    }, {
        name: "Hand",
        heading: "Ten Fingers",
        content: "The Corona hand gesture or 'sign of the horns' has been used widely in pop cultures as an expression of approval and enjoyment, but it is considered offensive in some cultures.",
        options: ["India", "Sweden", "China", "Italy"],
        correctAnswer: "Italy",
    }];

    // const [selectedDetails, setSelectedDetails] = useState();
    const tissuepaper = details.filter((detail) => detail.name === "TissuePaper");
    const [selectedDetails, setSelectedDetails] = useState<Details[]>([{
        name: "",
        heading: "",
        content: "",
        options: [],
        correctAnswer: "",
    }]);


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
        const timeoutId = setTimeout(onTimeout, 1500);

        return () => {
            clearTimeout(timeoutId);
            console.log(shown);
        }
    }, [props.orbitAbled]);

    useEffect(() => {
        if (props.selectedObj !== undefined) {
            setSelectedDetails(details.filter((detail) => detail.name === props.selectedObj));
            console.log(selectedDetails);
        }
    }, [props.selectedObj]);

    const buttonItems = selectedDetails[0].options.map((option) => 
    <button className='guess-but' onClick={handleSelected} name={option}>
        {option}
    </button>);

    return (
        <div className={`popup-${shown ? "shown" : "hidden"}`}>
            <div className="expoInfo">
                <h1>{selectedDetails[0].heading}</h1>
                <p>{selectedDetails[0].content}</p>
                <h4>It is rude in...</h4>
                <div className="guess">
                    {buttonItems}
                </div>
                {answer && <button className='answer-show'> You selected {answer}. See Answer. </button>}
            </div>

        </div>
    )
}