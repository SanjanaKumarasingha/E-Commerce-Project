import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import {LoginValidation} from '../../Validations/LoginValidation';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

function AuthenticationPageTemplate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const validateUser = () => {
    Axios.post('http://localhost:3005/user/validateLogin',{
      email : email,
      password : password
    }).then(()=> {
      console.log("Success");
      navigate("/");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });
    
  // Function to handle the sign-up button click
  function validation() {
    const loginErrors = LoginValidation(email, password);
    setErrors(loginErrors);
    
    // Check if there are no errors for any field
    if (!Object.values(loginErrors).some((fieldErrors) => fieldErrors.length > 0)) {
      validateUser();
    }
  }

  return (
    <section id="LogIn" className='block block-login'>
      <Container fluid>
        <Row>&nbsp;</Row>
        <Row>&nbsp;</Row>
        <Row>
          <Col md={{span:4, offset:4}}>
            <h2 className="h2" align="center">WELCOME  BACK!</h2>
          </Col>
        </Row>
        <Row>&nbsp;</Row>
        <Row>
          <Col md={{span:4, offset:4}}>
            <h4 className="h4">Sign into Account</h4>
          </Col>
        </Row>
        <Row>&nbsp;</Row>
        <Row>
          <Col md={{span:4, offset:4}}>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail" style={{color: 'black'}}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <span className='text-danger'>{errors.email}</span>}
              </Form.Group>

              <Row>&nbsp;</Row>

              <Form.Group className="mb-3" controlId="formGroupPassword" style={{color: 'black'}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && <span className='text-danger'>{errors.password}</span>}
              </Form.Group>
            </Form>
            <Row>&nbsp;</Row>
            <Row>
              <Button variant='secondary' size="sm" onClick={validation}>Login</Button>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
              <p>
                Haven't got an account yet? 
                <Link to="../pages/SignUpPage" className="mb-3" style={{color: 'black'}}>
                  Sign Up
                </Link>
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AuthenticationPageTemplate
