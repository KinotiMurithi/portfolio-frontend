import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
            <div>
                <Link to="/" className="mr-4 hover:underline">Home</Link>
                <Link to="/projects" className="mr-4 hover:underline">Projects</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
            </div>
            {/* Your dark mode toggle here */}
        </nav>
    );
}

export default Navbar;
