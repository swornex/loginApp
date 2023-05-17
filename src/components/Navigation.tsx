import { Link } from "react-router-dom";
import { signout } from "../firebase/userFirebase";
import { useQueryClient } from "@tanstack/react-query";

const Navigation = () => {
    const queryClient = useQueryClient();

    const handleSignOut = async () => {
        await signout();
        queryClient.clear();
    };
    return (
        <div className="nav-wrapper">
            <div className="nav-container">
                <Link to="/home" className="nav-link">
                    Home
                </Link>
                <Link to="/about" className="nav-link">
                    About
                </Link>
                <Link to="/contact" className="nav-link">
                    Contact
                </Link>
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
