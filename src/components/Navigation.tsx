const Navigation = () => {
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
            <div>
                <button className="button">Signout </button>
            </div>
        </div>
    );
};

export default Navigation;
