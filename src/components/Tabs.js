import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Tabs1 = () => {
  return (
   
    

      

    <Nav variant="tabs" style={{ opacity: 0.90 }} defaultActiveKey="/" className="justify-content-center my-4">
      <LinkContainer to="/">
        <Nav.Link>Swap</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/deposit">
        <Nav.Link>Deposit</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/withdraw">
        <Nav.Link>Withdraw</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/charts">
        <Nav.Link>Charts</Nav.Link>
      </LinkContainer>
    </Nav>

   
  );
}

export default Tabs1;
