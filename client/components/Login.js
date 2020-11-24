import React, { useState } from "react";
//import 
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function LogIn({ loggedIn }) {
  const defaultState = {
    name: "",
    username: "",
    password: "",
  };

  const [state, setState] = useState(defaultState);

  function usernameChange(field) {
    setState({
      ...state,
      username: field.target.value,
    });
    console.log(state.username);
  }

  function passwordChange(field) {
    setState({
      ...state,
      password: field.target.value,
    });
    console.log(state.password);
  }

  function clicked() {
    let toReturn = loggedIn(state.username, state.password);
    console.log(toReturn);
    return toReturn;
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
          <Link to={"/"}>
            <CloseButton className="right" />
          </Link>
          <img
            src="https://i.pinimg.com/originals/13/96/e3/1396e3af2ef86850c7e4cf64540d54ea.png"
            width="225px"
            height="225px"
            margin="15px"
          />
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Username:" />
            <Input variant="filled" onChange={usernameChange} />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Password:" pr="20px" />
            <Input variant="filled" onChange={passwordChange} />
          </InputGroup>
          <Link to={"/"}>
            <Button
              mt="30px"
              mb="30px"
              width="sm"
              onClick={async () => {
                let result = await clicked();
                if (result) {
                  toast({
                    title: "Logged in.",
                    description: "You are now signed in!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Unsuccessful log in attempt.",
                    description: "Invalid username or password.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              Sign In
            </Button>
          
            <Button mt="30px"
              mb="30px"
              width="sm"
              onClick={() => { window.location.href = '/cust/google' } }>Google </Button>
          
              </Link>
        </Flex>
      </Center>
    </Container>
  );
}
