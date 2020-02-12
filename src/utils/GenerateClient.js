import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

// Instantiate required constructor fields
const cache = new InMemoryCache();
const httpLink  = new HttpLink({
  uri: "http://gambilife.com/graphql", //process.env.REACT_JS_ENDPOINT,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://gambilife.com/graphql`,
    options: {
        reconnect: true,
        // connectionParams: {
        //     authToken: 'anyToken',
        // },
    }
});
const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,
  // Provide some optional constructor fields
//   name: 'react-web-client',
//   version: '1.3',
//   queryDeduplication: false,
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-and-network',
//     },
//   },
});

export default client