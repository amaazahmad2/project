import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hangman from "../../Components/Hangman/Hangman";
import Keyboard from "../../Components/Keyboard/Keyboard";
import WordViewer from "../../Components/WordViewer/WordViewer";

const Game = () => {
    const [clickedLetters, setClickedLetters] = useState<string[]>([]);
    const [wordToGuess, setWordToGuess] = useState<string>("react");
    const [wrongCount, setWrongCount] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (wrongCount === 7) {
            alert("7 wrong guesses. Word Proposer Wins!");
            navigate("/");
        }
    }, [wrongCount, navigate]);

    const letterClickHandler = (letterChosen: string) => {
        setClickedLetters([...clickedLetters, letterChosen]);

        const splitWord = wordToGuess.split("");
        if (!splitWord.includes(letterChosen)) {
            setWrongCount((prevState) => prevState + 1);
        }
    };

    return (
        <div
            style={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Hangman wrongCount={wrongCount} />
            <WordViewer word={wordToGuess} clickedLetters={clickedLetters} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "space-evenly",
                    marginTop: "40px",
                }}
            >
                <p style={{ fontSize: "20px" }}>{`Last guess by the user: ${
                    clickedLetters.length
                        ? clickedLetters[clickedLetters.length - 1]
                        : "none"
                }`}</p>
                <p
                    style={{ fontSize: "20px" }}
                >{`Wrong count: ${wrongCount}`}</p>
            </div>

            <Keyboard
                word={wordToGuess}
                clickedLetters={clickedLetters}
                letterClickHandler={letterClickHandler}
            />
        </div>
    );
};

export default Game;
