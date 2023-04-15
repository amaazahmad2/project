import React from "react";

interface WordViewerProps {
    word: string;
    clickedLetters: string[];
}

const WordViewer = (props: WordViewerProps) => {
    const splitWord = props.word.split("");

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {splitWord.map((letter, index) => {
                if (props.clickedLetters.includes(letter)) {
                    return (
                        <span
                            key={index}
                            style={{
                                fontSize: "30px",
                                marginLeft: "4px",
                                marginRight: "4px",
                            }}
                        >
                            {letter}
                        </span>
                    );
                } else {
                    return (
                        <span
                            key={index}
                            style={{
                                fontSize: "30px",
                                marginLeft: "4px",
                                marginRight: "4px",
                            }}
                        >
                            _
                        </span>
                    );
                }
            })}
        </div>
    );
};

export default WordViewer;
