// import { WebSocketLink } from 'apollo-link-ws';

// const wsLink = new WebSocketLink({
//   uri: `ws://gambilife.com/`,
//   options: {
//     reconnect: true
//   }
// });
import gql from 'graphql-tag';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { useSubscription } from '@apollo/react-hooks'

// Create an http link:
const httpLink = new HttpLink({
    uri: 'http://gambilife.com/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://gambilife.com/`,
    options: {
        reconnect: true
    }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const BETS_SUBSCRIPTION = gql`
  subscription betAdded {
    betAdded {
      id
      time
      bet
      profit
      payout
    }
  }
`;

export function DontReadTheComments() {
    const { data: { betAdded }, loading } = useSubscription(
        BETS_SUBSCRIPTION
    );
    return !loading && betAdded;
}
