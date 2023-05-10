import { Link } from "react-router-dom";
import { signout } from "../firebase/UserFirebase";

const Navigation = () => {
    const handleSignOut = async () => {
        await signout();
    };
    return (
        <div className="nav-wrapper">
            <div className="nav-container">
                <a className="nav-link" href="/home">
                    Home
                </a>
                <a className="nav-link" href="/about">
                    About
                </a>
                <a className="nav-link" href="/contact">
                    Contact
                </a>
            </div>
            <Link to="/profile">
                <img
                    className="image"
                    src="https://cdn.onlinewebfonts.com/svg/img_568656.png"
                />
            </Link>
            <div>
                <button className="button" onClick={handleSignOut}>
                    Signout
                </button>
            </div>
        </div>
    );
};

export default Navigation;
