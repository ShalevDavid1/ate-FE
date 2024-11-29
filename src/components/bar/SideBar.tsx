import "./Sidebar.css";

import { useNavigate } from "react-router-dom";


const Sidebar = () => {

    const navigate = useNavigate();

    const handleAboutClick = () => {
        navigate("/about")
    }

    const handleOptionClick = (option: string) => {
        console.log(`${option} clicked`);
        // Add navigation logic here if needed
    };

    return (
        <div className="sidebar">
            <div className="sidebar-title">ATE</div>
            <ul className="sidebar-options">
                <li onClick={() => handleOptionClick("Friends")}>Friends</li>
                <li onClick={handleAboutClick}>About</li>
            </ul>
        </div>
    );
};

export default Sidebar;
