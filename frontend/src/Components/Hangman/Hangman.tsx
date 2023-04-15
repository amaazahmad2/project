import React from "react";
import "./hangman_given.css";

interface HangmanProps {
    wrongCount: number;
}

// you will have to conditionally render the divs accordingly,
// and change “class” to “className”

const Hangman = (props: HangmanProps) => {
    return (
        <>
            <h1>Hangman</h1>;
            <div id="game">
                <div id="game">
                    <div className="player">
                        <div className="playerModel">
                            <div className="head" data-value={false}></div>
                            <div className="body" data-value={false}></div>
                            <div className="foot" data-value={false}></div>
                        </div>
                    </div>
                    <div className="stang3"></div>
                    <div className="stang2"></div>
                    <div className="stang"></div>
                    <div className="ground"></div>
                </div>
            </div>
        </>
    );
};

export default Hangman;
