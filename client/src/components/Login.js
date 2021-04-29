import React, {useRef} from "react";
import { Container, Form, Button } from "react-bootstrap";
import {v4 as uuidV4} from 'uuid';

export default function Login({onIdSubmit}) {
    const idRef = useRef()

    function handleSubmit(e){
        e.preventDefault();
        onIdSubmit(idRef.current.value);
    }
    function creatNewId(){
      onIdSubmit(uuidV4())   // create random id
    }
  return (
    <Container className="align-items-center d-flex" style={{ height:'100vh'}}>
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Enter Your Id</Form.Label>
          <Form.Control type="text" ref ={idRef} required></Form.Control>
        </Form.Group>
        <Button type="submit" className="m-2">Login</Button>
        <Button variant="secondary" onClick={creatNewId}>Create a New Id</Button>
      </Form>
    </Container>
  );
}
