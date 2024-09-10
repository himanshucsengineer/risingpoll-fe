import Link from 'next/link';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Topbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className='navbar-main'>
      <Container>
        <Navbar.Brand  className='nav-brand'><Link href={'/'} className='header-links'>Risingpoll</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto"> 
            <Link href={'create-poll'} className='header-links mr-2'>Create Poll</Link>
            <Link href={'blogs'} className='header-links'>Blog</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
