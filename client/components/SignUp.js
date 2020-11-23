import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Input,
  Center,
  InputGroup,
  InputLeftAddon,
  ButtonGroup,
  Container,
  Header,
  useToast,
  CloseButton,
  Select,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function SignUp({ signedUp }) {
  const defaultState = {
    firstname: '',
    lastname: '',
    addressnumber: '',
    streetaddress: '',
    zipcode: '',
    username: '',
    password: '',
    type: '',
  };

  const [state, setState] = useState(defaultState);

  function firstnameChange(field) {
    setState({
      ...state,
      firstname: field.target.value,
    });
  }

  function lastnameChange(field) {
    setState({
      ...state,
      lastname: field.target.value,
    });
  }

  function addressnumberChange(field) {
    setState({
      ...state,
      addressnumber: field.target.value,
    });
  }

  function streetaddressChange(field) {
    setState({
      ...state,
      streetaddress: field.target.value,
    });
  }

  function zipcodeChange(field) {
    setState({
      ...state,
      zipcode: field.target.value,
    });
  }

  function usernameChange(field) {
    setState({
      ...state,
      username: field.target.value,
    });
  }

  function passwordChange(field) {
    setState({
      ...state,
      password: field.target.value,
    });
  }

  function typeChange(field) {
    setState({
      ...state,
      type: field.target.value,
    });
  }

  function clicked() {
    signedUp(
      state.firstname,
      state.lastname,
      state.addressnumber,
      state.streetaddress,
      state.zipcode,
      state.username,
      state.password,
      state.type
    );
  }

  const toast = useToast();
  return (
    <Container maxW="max" maxH="max">
      <Center pt="40px" pb="800px">
        <Flex
          direction="column"
          align="center"
          bg="#e8e8e8"
          color="black"
          width="450px"
          borderRadius="8px"
          padding="30px"
        >
          <Link to={'/'}>
            <CloseButton className="right" />
          </Link>
          <img
            src="https://i.pinimg.com/originals/13/96/e3/1396e3af2ef86850c7e4cf64540d54ea.png"
            width="225px"
            height="225px"
            margin="15px"
          />
          <InputGroup>
            <Select onChange={typeChange} placeholder="Select Type:">
              <option value="Farmer">Farmer</option>
              <option value="Consumer">Consumer</option>
            </Select>
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="First Name:" />
            <Input variant="filled" onChange={firstnameChange} />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Last Name:" />
            <Input variant="filled" onChange={lastnameChange} />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Address #:" />
            <Input variant="filled" onChange={addressnumberChange} />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Street Address:" />
            <Input variant="filled" onChange={streetaddressChange} />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Zipcode:" />
            <Input variant="filled" onChange={zipcodeChange} />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Username:" />
            <Input variant="filled" onChange={usernameChange} />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Password:" pr="20px" />
            <Input variant="filled" onChange={passwordChange} />
          </InputGroup>
          <Link to={'/'}>
            <Button
              mt="30px"
              mb="30px"
              width="sm"
              onClick={() => {
                clicked();
                toast({
                  title: 'Signed up.',
                  description: "We've created a new account for you.",
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Center>
    </Container>
  );
}
