import React, { Component } from 'react';
import './App.css';
import TestPage from 'containers/TestPage';
import { ApolloProvider } from '@apollo/react-hooks';
import client from 'utils/GenerateClient.js';

function App() {
  return (
    <ApolloProvider client={client}>
      <TestPage />
    </ApolloProvider>
  );
}

export default App;
