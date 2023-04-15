


// Import necessary libraries and models
import { Server, Socket } from 'socket.io';
import GameModel from '../models/gameModel';
import UserModel from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';

// import { WordAPI } from './word-api';
import { io as socket } from '../app'
// Set up global state variables
let waitingQueue: { user: string; socket: Socket }[] = [];
let ongoingGames: { gameId: string; wordProposer: string; hangman: string }[] = [];

// Set up socket event listeners
export const gameLogic = (user: string) => {
    let game: any;
    let opponent: string;
    let revealedWord: string;
    let isWordProposer: boolean;

    // Helper function to emit events to the current user
    const emitToSelf = (event: string, data?: any) => {
        socket.emit(event, data);
    };

    // Helper function to emit events to the opponent user
    const emitToOpponent = (event: string, data?: any) => {
        const opponentSocket = waitingQueue.find((queueItem) => queueItem.user === opponent)?.socket;
        if (opponentSocket) {
            opponentSocket.emit(event, data);
        }
    };

    // Helper function to handle a correct guess
    const handleCorrectGuess = (letter: string) => {
        // Update the revealed word and check if the game has been won
        game.matches.push(letter);
        revealedWord = game.word
            .split('')
            .map((char:string) => (game.matches.includes(char) ? char : '_'))
            .join('');
        if (revealedWord === game.word) {
            endGame(user);
        } else {
            emitToSelf('correctGuess', { letter, revealedWord });
            emitToOpponent('opponentGuess', letter);
        }
    };

    // Helper function to handle an incorrect guess
    const handleIncorrectGuess = (letter: string) => {
        // Update the hangman diagram and check if the game has been lost
        game.mismatches.push(letter);
        const numMismatches = game.mismatches.length;
        if (numMismatches < 7) {
            emitToSelf(`incorrectGuess${numMismatches}`, { letter });
            emitToOpponent('opponentGuess', letter);
        } else {
            endGame(game.wordProposer);
        }
    };

    // Helper function to end the game and update the database
    const endGame = async (winner: string) => {
        // Update game status in the database
        game.status = 'ended';
        game.winner = winner;
        await GameModel.findByIdAndUpdate(game._id, game);

        // Remove game from ongoing games list and emit endGame event to both users
        ongoingGames = ongoingGames.filter((ongoingGame) => ongoingGame.gameId !== game.gameId);
        emitToSelf('endGame', { revealedWord, winner });
        emitToOpponent('endGame', { revealedWord, winner });
    };

    // Handle request to start a new game
    socket.on('startGame', async () => {
        // Add user to waiting queue and wait for an opponent to be found
        waitingQueue.push({ user, socket} as any);
        emitToSelf('waitingForOpponent');

        // Check if there is an opponent available
        const opponentQueueItem = waitingQueue.find((queueItem) => queueItem.user !== user);
        if (!opponentQueueItem) {
            return;
        }

        // Assign opponent and remove both users from waiting queue
        opponent = opponentQueueItem.user;
        waitingQueue = waitingQueue.filter((queueItem) => ![user, opponent].includes(queueItem.user));

        // Generate new game ID and assign roles
        const gameId =  uuidv4();
        isWordProposer = Math.random() >= 0.5;
        const wordProposer = isWordProposer ? user : opponent;
        const hangman = isWordProposer ? opponent : user;

        // Prompt word proposer to suggest a word
        emitToSelf('suggestWord');

        // Wait for word proposer to suggest a valid word
        let isValidWord = false;
        while (!isValidWord) {
            const { suggestedWord } :any= await new Promise((resolve) => {
                socket.on('suggestedWord', async (suggestedWord: string) => {
                    //   const isValid = await WordAPI.isValidWord(suggestedWord);
                    const isValid = true
                    if (isValid) {
                        isValidWord = true;
                        resolve({ suggestedWord });
                    } else {
                        emitToSelf('invalidWord');
                    }
                });
            });

            // Save game to database and assign relevant properties
            game = await GameModel.create({
                gameId,
                wordProposer,
                hangman,
                status: 'ongoing',
                word: suggestedWord,
                matches: [],
                mismatches: [],
                winner: '',
            });
            revealedWord = suggestedWord.split('').map(() => '_').join('');
        }

        // Remove users from waiting queue and add game to ongoing games list
        waitingQueue = waitingQueue.filter((queueItem) => ![user, opponent].includes(queueItem.user));
        ongoingGames.push({ gameId, wordProposer, hangman });

        // Notify both users that the game has started and assign roles
        emitToSelf('startGame', { gameId, isWordProposer, revealedWord });
        emitToOpponent('startGame', { gameId, isWordProposer: !isWordProposer });
    });

    // Handle guess from hangman user
    socket.on('guess', async (letter: string) => {
        // Check if the guessed letter is valid
        if (game.matches.includes(letter) || game.mismatches.includes(letter)) {
            return;
        }

        // Check if the guessed letter is in the word
        if (game.word.includes(letter)) {
            handleCorrectGuess(letter);
        } else {
            handleIncorrectGuess(letter);
        }
    });

    // Handle use of points to obtain a hint
    socket.on('usePoints', async () => {
        if (game.status !== 'ongoing') {
            return;
        }


        // Check if the user has enough points
        const userDoc = await UserModel.findOne({ username: user });
        if (!userDoc) {
            return;
        }
        const { points } = userDoc;
        if (points < 10) {
            return;
        }

        // Deduct points and emit hint event to word proposer
        await UserModel.updateOne({ username: user }, { $inc: { points: -10 } });
        const availableHints = game.word
            .split('')
            .filter((char:string) => !game.matches.includes(char) && !game.mismatches.includes(char));
        if (availableHints.length > 0) {
            const hint = availableHints[Math.floor(Math.random() * availableHints.length)];
            game.matches.push(hint);
            revealedWord = game.word
                .split('')
                .map((char:string) => (game.matches.includes(char) ? char : '_'))
                .join('');
            emitToSelf('hint', { hint, revealedWord });
        }
    });

}
