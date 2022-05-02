import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <h1>Welcome to the Market Making Simulator!</h1>
            <NavLink className='navlink' to="/play">
                <button>Play</button>
            </NavLink>
        </>
    );
}