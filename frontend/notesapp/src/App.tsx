import { useState } from "react";
import NotesApp from "./components/NotesApp";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
} from '@chakra-ui/react';

function App() {
  let [loggedIn, setLogIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogIn(true);
  };

  return (
    <div className={`bg-gradient-to-r from-purple-500 to-pink-500 w-screen h-fit flex items-center justify-center flex-col`}>
      {/* <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-screen h-56"></div> */}
      {loggedIn ? <NotesApp setLogIn={setLogIn}/> : <div className="h-screen w-screen flex items-center justify-center">
      <Flex flexDir='column' pb={['5%', '3%']} align='center' gap={6} w={['95%', '90%', '80%', '70%', '60%']} margin="auto" bg='white' boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' borderRadius={10} p={4}>
      <Heading as="h1" size="3xl"  color='black' textShadow='2px 2px pink'>
        Login
      </Heading>
      <Flex w={['100%', '40%']} justify='center'>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <FormControl>
            <FormLabel my='10px' fontSize={[14, 18]}>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} w={'100%'} p={5} fontSize={[14, 18]} focusBorderColor="pink" borderRadius={10} />
          </FormControl>
          <FormControl>
            <FormLabel my='10px' fontSize={[14, 18]}>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} w={'100%'} p={5} focusBorderColor="pink" fontSize={[14, 18]} borderRadius={10} />
          </FormControl>
          <Button mt={35} _hover={{ color: 'black', bg: 'white', border: '1px solid black' }} w={'100%'} bg='black' color='white' boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' border='1px solid white' type="submit">LOGIN</Button>
        </form>
      </Flex>
    </Flex>
        </div>}
    </div>
  );
}

export default App;

// <button className="hover:bg-white hover:text-black hover:border-black border-solid bg-black py-4 px-16 rounded-md text-white text-xl border-white border" onClick={() => setLogIn(true)}>Login With Google</button>