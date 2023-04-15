import React from "react";

type KeyboardProps = {
    word: string;
    clickedLetters: string[];
    letterClickHandler: (letterChosen: string) => void;
};

const Keyboard: React.FC<KeyboardProps> = ({
    word,
    clickedLetters,
    letterClickHandler,
}) => {
    // const [clickedLetters, setClickedLetters] = useState<string[]>([]);

    const handleLetterClick = (letter: string) => {
        // setClickedLetters([...clickedLetters, letter]);
        letterClickHandler(letter);
    };

    const isLetterDisabled = (letter: string) => {
        return clickedLetters.includes(letter);
    };

    const getButtonColor = (letter: string) => {
        if (word.toLowerCase().includes(letter)) {
            return "lightgreen";
        } else {
            return "red";
        }
    };

    const letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
            }}
        >
            {letters.map((letter) => (
                <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    disabled={isLetterDisabled(letter)}
                    style={{
                        backgroundColor: isLetterDisabled(letter)
                            ? getButtonColor(letter)
                            : "",
                        fontSize: "30px",
                    }}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default Keyboard;
