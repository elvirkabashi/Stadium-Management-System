import { useState } from 'react';
import './css/sidebar.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from "../pages/dashboard/Dashboard"
import NotFound from "../components/NotFound/NotFound"
import ContactMessages from '../pages/ContactMessages/ContactMessages';
import Subscribe from '../pages/Subscribe/Subscribe';



function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='wrapper'>
            <aside id="sidebar" className={`${isExpanded ? 'expand' : ''}`}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                        <i className="lni lni-menu"></i>
                    </button>
                    <div className="sidebar-logo">
                        <a href="/">Admin Panel</a>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <a href="/" className="sidebar-link">
                            <i className="lni lni-grid-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className="lni lni-user"></i>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className="lni lni-agenda"></i>
                            <span>Task</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                            <i className="lni lni-protection"></i>
                            <span>Auth</span>
                        </a>
                        <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Login</a>
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Register</a>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                            <i className="lni lni-layout"></i>
                            <span>Multi Level</span>
                        </a>
                        <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                                    data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                    Two Links
                                </a>
                                <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                    <li className="sidebar-item">
                                        <a href="#" className="sidebar-link">Link 1</a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a href="#" className="sidebar-link">Link 2</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <a href="/contact" className="sidebar-link">
                            <i className="lni lni-popup"></i>
                            <span>Contact Messages</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="/subscribes" className="sidebar-link">
                        <i className="bi bi-envelope"></i>
                            <span>Subscribes</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className="lni lni-cog"></i>
                            <span>Setting</span>
                        </a>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <a href="#" className="sidebar-link">
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
            <div className="main p-3" style={{backgroundColor:'#e9e9e9'}}>
            <BrowserRouter>
              <div className="app-container">
                
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/contact" element={<ContactMessages/>} />
                  <Route path="/subscribes" element={<Subscribe/>} />
                  <Route path="*" element={<NotFound/>} />
                </Routes>
              </div>
            </BrowserRouter>
            </div>
        </div>
    );
}

export default Sidebar;
