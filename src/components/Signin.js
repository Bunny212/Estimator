import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { GENERATE_TOKEN } from './GraphQlApi/mutations';
import logo from '../Assets/cycleWaalylogo.png'
import { useNavigate } from "react-router-dom";



const Signin = () => {
  const navigate = useNavigate();
  const [generateCustomerToken] = useMutation(GENERATE_TOKEN);
  const handleSubmit = (values, setSubmitting) => {

    generateCustomerToken({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        setSubmitting(false);
        console.log("login response ::::", response.data.generateCustomerToken.token)
       
        if(response.data.generateCustomerToken.token){
        localStorage.setItem('token', response.data.generateCustomerToken.token);
        navigate('/');
        }
      })
      .catch((error) => {
        console.error('Mutation error:', error);
        alert(error.ErrorMessage)
        setSubmitting(false);
      });
  };

  return (
    <div className='sm-shadow-md mx-6 px-6 py-6 my-6'>
      <div className="flex min-h-full  flex-col justify-center  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {

              handleSubmit(values, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <Field type="email" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">password</label>
                <div className="mt-2">
                  <Field type="password" name="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <div className="mt-4" >
                  <button type="submit" onChange={(e)=>  navigate('/Layout')}  disabled={isSubmitting} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signin;
