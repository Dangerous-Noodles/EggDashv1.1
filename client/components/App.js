import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import { useCookies } from 'react-cookie';

import { Box, Text, Image, Center, Heading, Badge } from '@chakra-ui/react';
import Navbar from './Navbar';
import NavbarL from './NavbarL';
import NavbarC from './NavbarC';
import SignUp from './SignUp';
import Login from './Login';
import Markets from './Markets';
import axios from 'axios';

// GENERAL REFACTOR NOTE:
/*
  Try to break all these callbacks like 'logOut' 'removeCartItem' 'signedUp' into different files.
  EX: Put all the functions related to authentication into an auth.js, all the market related functions into a market.js
*/

function App() {
  // REFACTOR OPPURTUNITY: Break the state into multiple `useState` calls. (maybe one for auth, user, and market info)
  //                       One of the differences between hooks vs. class components
  //                       is that class components have their state in one object,
  //                       but functional components and hooks let you split it up into more
  //                       granular bits.
  const defaultState = {
    verified: false,
    cart: [],
    address_number: '',
    address_street: '',
    address_zip: '',
    total: 0,
    id: '',
    email: '',
    user: {},
    type: '',
  };
  // TODO: instead of trying to fetch the auth route, just check for the existence of the session cookie.

  /**
   //moved Jiaxin's useEffect function to bottom
   // http://localhost:8080/cust/google/redirect
 
 */
  const [state, setState] = useState(defaultState);

  const [cookies, setCookie, removeCookie] = useCookies();
  const [map, setMap] = useState({
    toggled: false,
  });

  useEffect(() => {
    setState({ ...state, verified: cookies.success });
  }, []);
  //update verify state
  //

  function instantiateCart(cartObj) {
    const currentCart = state.cart;
    const newcartItem = [];
    newcartItem.push(
      1,
      cartObj.name,
      cartObj.price,
      cartObj.description,
      cartObj.productId,
    );
    currentCart.push(newcartItem);
    console.log('this is current cart ',currentCart);
    setState({
      ...state,
      cart: currentCart,
    });
  }

  function unAuth() {
    setState({
      ...state,
      verified: false,
    });
  }

  function removeCartItem(productName) {
    let newTotal = state.total;
    const newCart = [];
    // loop through all items in array
    // if its not the product, we push into our new array
    // else
    // if the amount is 0, we simply don't add it to the new array
    // if its not 0 then we decrement the amount and then add it
    console.log('removeCartItem invoked');
    let removedOne = false;
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i][1] !== productName) {
        newCart.push(state.cart[i]);
      } else {
        if (removedOne) {
          newCart.push(state.cart[i]);
        } else {
          console.log('newTotal', newTotal);
          console.log('state.cart[i][2]', state.cart[i][2]);
          newTotal -= state.cart[i][2];
          console.log('should be 0', newTotal);
          if (newTotal < 0.01) newTotal = 0;
          if (state.cart[i][0] !== 1) {
            let currentQuant = state.cart[i][0];
            currentQuant -= 1;
            state.cart[i][0] = currentQuant;
            newCart.push(state.cart[i]);
          }
          removedOne = true;
        }
      }
    }
    console.log(JSON.stringify(newCart));
    console.log(state.total);
    setState({
      ...state,
      cart: newCart,
      total: newTotal,
    });
  }

  function emptyCart() {
    setState({
      ...state,
      cart: [],
      total: 0,
    });
    // const request = {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: username, password: password }),
    // };
    // const response = await fetch("/cust/login", request);
    // const data = await response.json();
  }

  async function logOut() {
    for (let i = 0; i < cart.length; i++) {
      let quant = cart[i][0];
      let product = cart[i][1];
      let userId = state.id;
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, quant, userId }),
      };
      const response = await fetch('/', request);
      const data = await response.json();
    }
  }

  function toggled() {
    let checker = !map.toggled;
    setMap({ toggled: checker });
  }

  function addToCart(quantity, product, price, description, productId) {
    let current = state.cart;
    // Check if product is already in cart
    let alreadyInCart=false;
    for(let item of current){
      if(product === item[1]){
        item[0] += quantity;
        alreadyInCart = true;
      }
    }

    if(!alreadyInCart){current.push([quantity, product, price, description, productId]);}
    let newTotal = 0;

    for (let i = 0; i < current.length; i++) {
      newTotal += current[i][0] * current[i][2];
      console.log('quant:', current[i][0]);
      console.log('price:', current[i][2]);
    }
    setState({
      ...state,
      cart: current,
      total: newTotal,
    });
  }

  // This will be async.
  async function loggedIn(username, password) {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password: password }),
    };
    const response = await fetch('/cust/login', request);
    const data = await response.json();
    console.log('this is data:', data);
    let toReturn = false;

    if (data) {
      setState({
        ...state,
        verified: true,
        id: data.custInfo[0].id,
        email: username,
      });
      toReturn = true;
    }
    return toReturn;
  }
  //   async function googled(
  //     window.location.href = '/cust/google'
  // )

  // This will be async.
  async function signedUp(
    name,
    lastName,
    addNum,
    addSt,
    addZip,
    username,
    password,
    type
  ) {
    name = String(name);
    lastName = String(lastName);
    addNum = Number(addNum);
    addSt = String(addSt);
    addZip = Number(addZip);
    username = String(username);
    password = String(password);
    type = String(type);

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: name,
        last_name: lastName,
        email: username,
        password: password,
        address_number: addNum,
        address_street: addSt,
        address_zip: addZip,
        type: type,
      }),
    };
    const response = await fetch('/cust/signup', request);
    const data = await response.json();

    // TODO: restructure this router. get rid of the conditional rendering of 2 separate '/' Routes
    setState({
      ...state,
      verified: true,
      address_number: addNum,
      address_street: addSt,
      address_zip: addZip,
      email: username,
      type: type,
    });
  }

  return (
    <div>
      {state.verified ? (
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div>
                  {map.toggled ? (
                    <div>
                      <NavbarL
                        toggled={toggled}
                        cart={state.cart}
                        total={state.total}
                        emptyCart={emptyCart}
                        removeCartItem={removeCartItem}
                        unAuth={unAuth}
                      />
                      <Markets
                        version={true}
                        addToCart={addToCart}
                        email={state.email}
                        instantiateCart={instantiateCart}
                      />
                    </div>
                  ) : (
                    <div>
                      <NavbarL
                        toggled={toggled}
                        cart={state.cart}
                        total={state.total}
                        emptyCart={emptyCart}
                        removeCartItem={removeCartItem}
                        unAuth={unAuth}
                      />
                      <Markets
                        version={false}
                        addToCart={addToCart}
                        email={state.email}
                        instantiateCart={instantiateCart}
                      />
                    </div>
                  )}
                </div>
              );
            }}
          />


          <Route
            path="/checkout"
            exact
            render={() => {
              return (
                <div>
                  <NavbarC cart={state.cart} />
                  This is where our checkout page will go.
                </div>
              );
            }}
          />
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div>
                  <Navbar />
                  <br />

                  <Center>
                    <Heading>Welcome to Egg Dash!</Heading>
                  </Center>
                  <br />
                  <Center>
                    <Image
                      width="80%"
                      borderRadius="15px"
                      src="https://www.wegmans.com/wp-content/uploads/1097052-hero-wegmans-organic-farm-1-2048x1032.jpg"
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text>
                      We deliver organic, farm-fresh family meats and produce to
                      any address, anytime.
                    </Text>
                  </Center>
                  <Center>
                    <Text>
                      Press <Badge>Users</Badge> to sign up or log in.
                    </Text>
                  </Center>
                </div>
              );
            }}
          />
          <Route
            path="/login"
            exact
            render={() => (
              <div>
                <Navbar />
                <Login loggedIn={loggedIn} />
              </div>
            )}
          />
          <Route
            path="/signup"
            exact
            render={() => (
              <div>
                <Navbar />
                <SignUp signedUp={signedUp} />
              </div>
            )}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;

//logged out function invoked {
//   loop through our cart
//   for every item in our cart it will make a request to the server with the cart item in the body
// }
// req.body
/*
useEffect(() => {
    console.log('in the component did mount')
    fetch("http://localhost:8080/cust/google/redirect", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": true
      },
      mode: "no-cors",
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log(responseJson)
        setState({
          ...state,
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
       setState({
         ...state,
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }, []);
  */
