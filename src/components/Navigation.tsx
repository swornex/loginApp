import { Link } from "react-router-dom";
import { signout } from "../firebase/userFirebase";
import { useQueryClient } from "@tanstack/react-query";
import profile from "../assets/images/profile.png";

const Navigation = () => {
    const queryClient = useQueryClient();

    const handleSignOut = async () => {
        await signout();
        queryClient.clear();
    };
    return (
        <div className="flex items-center bg-nightRider-500">
            <div className="flex space-x-4 items-center ml-28 w-full">
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
                <img className="w-14 cursor-pointer" src={profile} />
            </Link>
            <div>
                <button className="button-m" onClick={handleSignOut}>
                    Signout
                </button>
            </div>
        </div>
    );
};

export default Navigation;
