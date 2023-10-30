import ReactDOM from 'react-dom/client';
import './index.css';
import App from './CardDealer';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const gqlClient = new ApolloClient({
  // This port must be the same as in server/src/index.ts
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={gqlClient}>
    <App />
  </ApolloProvider>
);
