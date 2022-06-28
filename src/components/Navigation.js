import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='profile'>
                        {Boolean(userObj.displayName) ? `${userObj.displayName}의` : '내'} Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navigation;