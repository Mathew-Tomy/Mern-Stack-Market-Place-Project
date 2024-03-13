import React, { useContext,useEffect } from 'react';
import { Context} from '../../ContextAdminStore';
import { useHistory } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

function Header() {
  
   
    const { adminData, setAdminData } = useContext( Context); // Use the context object provided by AdminProvider
    console.log('Context value:', adminData, setAdminData);


  

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top border-bottom">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown notifications">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bell"></i></a>
                            <NavLink
                                    className="dropdown-item"
                                    to="/admin/logout"
                                    onClick={() => {
                                        setAdminData(null);
                                    }}
                                >
                                    <IoLogOut />
                                    Log out
                                </NavLink>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#!">Action</a>
                                <a className="dropdown-item" href="#!">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#!">Something else here</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;