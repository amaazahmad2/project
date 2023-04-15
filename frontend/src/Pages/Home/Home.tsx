import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const startClickHandler = () => {
        navigate("game");
    };

    return (
        <>
            <h2>Home Page</h2>
            <button onClick={startClickHandler}>Start Game</button>
        </>
    );
};

export default Home;
