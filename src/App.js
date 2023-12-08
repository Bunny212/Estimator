// import './App.css';
// import CreateInvoice from './components/CreateInvoice';
// import Estimatemake from './components/Estimatemake';
// import ProductView from './components/ProductView';
// import Signin from './components/Signin';
// import Layout from './components/Layout'
// import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } 
// from 'react-router-dom'




// // const router = createBrowserRouter(
// //   createRoutesFromElements([
// //     <Route path='/' element={<Layout />}>
// //       {/* <Route path='' element={<Signin />} /> */}
// //       <Route path='' element={<ProductView />} />
// //       <Route path='CreateInvoice' element={<CreateInvoice />} />
// //       <Route path='CreateInvoice/:id' element={<CreateInvoice />} />
// //     </Route>, 
// //     <Route path="/signin" element={<Signin />} />
// //   ]
// //   ) 
// // )   


// // const router = createBrowserRouter(
// //   createRoutesFromElements(
// //     <Route path="/" element={<Layout />}>
// //       <Route path="CreateInvoice" element={<CreateInvoice />} />
// //       <Route path="CreateInvoice/:id" element={<CreateInvoice />} />
// //       <Route path="Estimatemake" element={<Estimatemake />} />
// //       <Route path="ProductView" element={<ProductView />} />
// //     </Route>
// //   //  <Route path="/signin" element={<Signin />} />
  
// // )
// // )
// function App() {
//     const TOKEN = localStorage.getItem('token');
//     const client = new ApolloClient({
//     uri: 'http://localhost:3000/graphql',
//     cache: new InMemoryCache(),
//     headers: {
//       authorization: TOKEN ? `Bearer ${TOKEN}` : '',
//     },
//     // defaultOptions: {
//     //   watchQuery: {
//     //     fetchPolicy: 'network-only',
//     //   },
//     // }
//   });

//   return (

//     <ApolloProvider client={client}>
//     <div>
//        <RouterProvider router={router} />
//        {/* <Signin/> */}
//          </div>
//     </ApolloProvider>

//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import './App.css';
// import CreateInvoice from './components/CreateInvoice';
// import Estimatemake from './components/Estimatemake';
// import ProductView from './components/ProductView';
// import Signin from './components/Signin';
// import Layout from './components/Layout';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// // import { useNavigate } from 'react-router-dom';
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } 
// from 'react-router-dom'



// const client = new ApolloClient({
//   uri: 'http://localhost:3000/graphql',

//   cache: new InMemoryCache(),
//   headers: {
//     authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
//   },
// });

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="CreateInvoice" element={<CreateInvoice />} />
//       <Route path="CreateInvoice/:id" element={<CreateInvoice />} />
//       <Route path="Estimatemake" element={<Estimatemake />} />
//       <Route path="ProductView" element={<ProductView />} />
//       <Route path="/signin" element={<Signin />} />
//     </Route>
//   )
// );

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       navigate('/'); // Redirect to layout page if token exists
//     } else {
//       navigate('/signin'); // Redirect to sign-in page if no token
//     }
//   }, [token]);

//   return (
//     <ApolloProvider client={client}>
//       <div>
//         <RouterProvider router={router} />
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;





import React, { useState, useEffect } from 'react';
import './App.css';
import CreateInvoice from './components/CreateInvoice';
// import Estimatemake from './components/Estimatemake';
import ProductView from './components/ProductView';
import Signin from './components/Signin';
import Layout from './components/Layout';
// import { ApolloClient, InMemoryCache, ApolloProvider , createHttpLink} from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// import { setContext } from '@apollo/client/link/context';

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

const client = new ApolloClient({
// uri: 'http://localhost:3000/graphql',
uri: 'https://cyclewalay.com/graphql',
cache: new InMemoryCache(),
   headers: {
    authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}
})


// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       // authorization: token ? `Bearer ${token}` : "",
//    authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}

    
//   }
// });

// const client = new ApolloClient({
//  uri: 'http://localhost:3000/',
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });




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


console.log("this is state", token)


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
