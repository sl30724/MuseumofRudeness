import { useState, useEffect, MouseEvent } from 'react';
import { Icon } from '@iconify/react';

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
    desc: string;
    expl: string;
}

export default function ExpoDetails(props: Expo) {
    const details = [{
        name: "TissuePaper",
        heading: "Sniff or Blow",
        content: "While in some cultures blowing your nose is considered more acceptable than sniffing, it is commonly considered bad manners in some cultures to blow your nose loudly in public.",
        options: ["Japan", "United Kingdoms", "Norway", "Turkey"],
        correctAnswer: "Japan",
        desc: "Blowing your nose loudly in public can be considered bad manners in ",
        expl: "In Japan, blowing your nose loudly is considered to be unhygienic and disruptive. Instead, people sniffle to avoid making noise. While this belief has been challenged in recent years, you’d still receive some startled stares if you blow your nose in public."
    }, {
        name: "Hand",
        heading: "Ten Fingers",
        content: "The OK hand gesture is often used as an expression of approval, but it is considered offensive in some cultures.",
        options: ["India", "Brazil", "Mongolia", "Korea"],
        correctAnswer: "Brazil",
        desc: "The OK hand gesture is considered offensive in ",
        expl: "In Brazil and some middle east countries, the OK sign does not represent the letters “O” and “K”. It is considered rather a vulgar gesture, especially when used to mean “up yours.” (Yes, because it looks like an anus.)"
    }, {
        name: "Head",
        heading: "Don't Touch My Head",
        content: "Touching one's head could be seeen as a way of showing affection in some cultures, but it can be considered rude in others.",
        options: ["Israel", "Thailand", "Egypt", "France"],
        correctAnswer: "Thailand",
        desc: "Touching one's head can be considered rude in ",
        expl: "In Thailand, the head is considered the most sacred part of the body. Touching someone’s head, including that of a child, can be considered rude."
    }, {
        name: "Seat",
        heading: "Shotgun?",
        content: "Sitting in the backseats on a taxi ride is considered normal in some countries, but it could be seen disrespectful in others.",
        options: ["Australia", "Canada", "Colombia", "Nepal"],
        correctAnswer: "Australia",
        desc: "Sitting in the backseats on a taxi ride can be seen disrespectful in ",
        expl: "In Australia, it is considered rude to sit in the backseat of a taxi. It is seen as a sign of distrust towards the driver."
    }
];


    const [selectedDetails, setSelectedDetails] = useState<Details[]>([{
        name: "",
        heading: "",
        content: "",
        options: [],
        correctAnswer: "",
        desc: "",
        expl: "",
    }]);
    const [shown, setShown] = useState(false);
    const [answer, setAnswer] = useState("");
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);


    const handleSelected = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAnswer(event.currentTarget.name);
    }

    useEffect(() => {
        if (props.orbitAbled) {
            setShown(false);
            resetAnswer();
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

    useEffect(() => {
        if (answer === selectedDetails[0].correctAnswer) {
            setScore(score + 1);
        }
    }, [answer]);

    const buttonItems = selectedDetails[0].options.map((option) =>
        <button className='guess-but' onClick={handleSelected} name={option}>
            {option}
        </button>);
    

    const showAnswer = (event: MouseEvent<HTMLButtonElement>) => {
        setAnswered(true);
    }

    const resetAnswer = () => {
        setAnswered(false);
        setAnswer("");
    }

    return (
        <div className={`popup-${shown ? "shown" : "hidden"}`}>
            <div className={`expoInfo-${answered ? "hidden" : "shown"}`}>
                <h3>{selectedDetails[0].heading}</h3>
                <div className="prompt">
                <p>{selectedDetails[0].content}</p>
                </div>
                <br></br>
                <h4>It is rude in...</h4>
                <div className="guess">
                    {buttonItems}
                </div>
                {answer && <button className='answer-but' onClick={showAnswer}> See Answer <Icon icon="material-symbols:arrow-outward-rounded" className="answer-arrow"/></button>}
            </div>
            <div className={`answerInfo-${answered ? "shown" : "hidden"}`}>
                {answer === selectedDetails[0].correctAnswer ? <h2 className='h2-correct'>Correct!</h2> : <h2 className='h2-wrong'>Wrong!</h2>}
                <h6>{selectedDetails[0].desc}...</h6>
                <br></br>
                <p><span className='correct-answer'>{selectedDetails[0].correctAnswer}</span></p>
                <br></br>
                <p>{selectedDetails[0].expl}</p>
            </div>
        </div>
    )
}