import React, { useState, useEffect } from 'react';
import './App.css';
import CreateInvoice from './components/CreateInvoice';
// import Estimatemake from './components/Estimatemake';
import ProductView from './components/ProductView';
import Signin from './components/Signin';
import Layout from './components/Layout';
import { ApolloClient, InMemoryCache, ApolloProvider , createHttpLink} from '@apollo/client';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

// const router = createBrowserRouter(
//   createRoutesFromElements([
//     <Route path='/' element={<Layout />}>
//       {/* <Route path='' element={<Signin />} /> */}
//       {/* <Route path='' element={<CreateInvoice />} /> */}
//       <Route index element={<CreateInvoice />} />
//       <Route path='ProductView' element={<ProductView />} />
//       <Route path='CreateInvoice/:id' element={<CreateInvoice />} />
//       {/* <Route path="*" element={<Signin />} /> */}
//     </Route>, 
//     <Route path="/signin" element={<Signin />} />
//   ]
//   ) 
// )   



const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout />}>
      <Route index element={<CreateInvoice />} />
      <Route path="productview" element={<ProductView />} />
      <Route path="createinvoice/:id" element={<CreateInvoice />} />
    </Route>,
    <Route path="/signin" element={<Signin />} />
  ])
);


// localStorage.removeItem('token');

function App() {
const [token] = useState(localStorage.getItem('token'));


// const TOKEN = token;

// const client = new ApolloClient({
// uri: 'http://localhost:3000/graphql',
// // uri: 'https://cyclewalay.com/graphql',
// cache: new InMemoryCache(),
//    headers: {
//     authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}
// })


// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

const httpLink = createHttpLink({
 uri: 'https://cyclewalay.com',

});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
   authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}
  }
});

// const client = new ApolloClient({
//  uri: 'https://cyclewalay.com',
// //  uri: 'http://localhost:3000/',
//   // link: httpLink,
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});





// setToken(localStorage.getItem('token'))

useEffect(() => {
  if (token) {
    // Redirect to layout page if token exists
    router.navigate('/');
  } else {
    // Redirect to sign-in page if no token
    router.navigate('/signin');
  }
}, [token]);






  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        <div>
          {/* Your components will be rendered here */}
        </div>
      </RouterProvider>
    </ApolloProvider>
  );
}

export default App;
