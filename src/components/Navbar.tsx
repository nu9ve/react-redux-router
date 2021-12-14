import { useEffect } from 'react';
import { rootStore } from '../store';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


export const Navbar = () => {
  const userState = useSelector((state: rootStore) => state.user);

  useEffect(() => {
    
  }, [])

  // const handleClick = (event: MouseEvent) => {
  // }

  return <div className="menu-bar-wrapper">
          <div className="menu-bar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
              <li> 
                { 
                  (userState.id &&
                  <Link to="/profile">Profile</Link>) ||
                  <Link to="/user">User</Link>
                }
              </li>
            </ul>
          </div>
        </div>
}
