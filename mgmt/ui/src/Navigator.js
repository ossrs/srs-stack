import React from 'react';
import Container from "react-bootstrap/Container";
import './App.css'
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import logo from './logo.svg';

export default function Navigator({initialized, token}) {
  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            width="64"
            height="30"
            className="d-inline-block align-top"
            alt="SRS Terraform"
          />
        </Navbar.Brand>
        {
          initialized &&
          <Nav className="me-auto">
            {token && <>
              <Nav.Link as={Link} to='/dashboard'>首页</Nav.Link>
              <Nav.Link as={Link} to='/system'>组件管理</Nav.Link>
            </>}
            {!token && <Nav.Link as={Link} to='/login'>登录</Nav.Link>}
            {token && <Nav.Link as={Link} to='/logout'>退出</Nav.Link>}
          </Nav>
        }
      </Container>
    </Navbar>
  );
}

