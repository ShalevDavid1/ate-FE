import "./Sidebar.css";


const Sidebar = () => {
    const handleOptionClick = (option: string) => {
        console.log(`${option} clicked`);
        // Add navigation logic here if needed
    };

    return (
        <div className="sidebar">
            <div className="sidebar-title">ATE</div>
            <ul className="sidebar-options">
                <li onClick={() => handleOptionClick("Friends")}>Friends</li>
                <li onClick={() => handleOptionClick("About")}>About</li>
            </ul>
        </div>
    );
};

export default Sidebar;
