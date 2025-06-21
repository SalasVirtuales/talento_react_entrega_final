import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../TopBar/TopBar';
import NavigationBar from '../NavigationBar/NavigationBar';
import Footer from '../Footer/Footer';
import './Layout.css';

function Layout({ children }) {
  return (
    <>
      <TopBar />
      <NavigationBar />
      <main className="main-content"> {}
        {children}
      </main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
