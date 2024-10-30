import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTable, FaFileAlt, FaImage, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../Media/logo512.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutToggle, setIsLogoutToggle] = useState(false);
  const logoutRef = useRef(null);

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');
  const photo = localStorage.getItem('photo');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Close logout toggle when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setIsLogoutToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative z-20 w-full py-2 px-6 flex items-center justify-between bg-gradient-to-r from-neutral-100 via-neutral-200 to-blue-300 text-white shadow-lg"
    >
      {/* Logo / Brand */}
      <NavLink to="/" className="flex items-center space-x-3">
        <motion.img
          src={logo}
          alt="logo"
          width={100}
          height={60}
          className="rounded-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </NavLink>

      <div className="flex gap-4 items-center">
        <div onClick={() => setIsLogoutToggle(!isLogoutToggle)} className="relative cursor-pointer flex flex-col items-center">
          <img className="h-10 w-10 rounded-full object-cover" src={`http://192.168.1.68:8000${photo}`} alt="User" />
          <h4 className="text-sm text-gray-900">{name}</h4>
          {isLogoutToggle && (
            <div ref={logoutRef} className="absolute top-full mt-2 w-32 bg-white text-gray-800 rounded-md shadow-lg p-2 text-center z-10">
              <button
                onClick={logOut}
                className="w-full py-2 hover:bg-gray-200 rounded-md font-semibold text-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </div>
      </div>

      {/* Navigation Links */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-col md:flex-row md:hidden md:space-x-8 absolute md:static top-16 md:top-0 left-0 w-full md:w-auto bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-800 md:bg-transparent shadow-lg rounded-xl md:rounded-none md:shadow-none px-4 py-4 md:p-0"
          >
            {isOpen && (
              <div className="flex justify-end md:hidden p-2">
                <FaTimes className="text-white cursor-pointer" onClick={closeMenu} />
              </div>
            )}

            <NavLink to="/" onClick={closeMenu} className="nav-link md:text-white">
              <motion.div
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-600 md:hover:bg-transparent rounded-md transition duration-200"
              >
                <FaHome className="text-xl" />
                <span>HomePage</span>
              </motion.div>
            </NavLink>

            <NavLink to="/table-extension" onClick={closeMenu} className="nav-link md:text-white">
              <motion.div
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-600 md:hover:bg-transparent rounded-md transition duration-200"
              >
                <FaTable className="text-xl" />
                <span>Table Extraction</span>
              </motion.div>
            </NavLink>

            <NavLink to="/pdf-to-doc" onClick={closeMenu} className="nav-link md:text-white">
              <motion.div
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-600 md:hover:bg-transparent rounded-md transition duration-200"
              >
                <FaFileAlt className="text-xl" />
                <span>PDF to DOC</span>
              </motion.div>
            </NavLink>

            <NavLink to="/img-to-doc" onClick={closeMenu} className="nav-link md:text-white">
              <motion.div
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-600 md:hover:bg-transparent rounded-md transition duration-200"
              >
                <FaFileAlt className="text-xl" />
                <span>Image to DOC</span>
              </motion.div>
            </NavLink>

            <NavLink to="/pdf-to-img" onClick={closeMenu} className="nav-link md:text-white">
              <motion.div
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-600 md:hover:bg-transparent rounded-md transition duration-200"
              >
                <FaImage className="text-xl" />
                <span>PDF to Image</span>
              </motion.div>
            </NavLink>

            <NavLink to="/ocr" onClick={closeMenu} className="nav-link md:text-white">
              <motion.div
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-600 md:hover:bg-transparent rounded-md transition duration-200"
              >
                <FaImage className="text-xl" />
                <span>OCR</span>
              </motion.div>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
