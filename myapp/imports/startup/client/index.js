import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './../../ui/App';

const httpLink = new HttpLink({
    uri: Meteor.absoluteUrl('graphql')
});

const authLink = new ApolloLink((opperation, forward) => {
    const token = Accounts._storedLoginToken();
    opperation.setContext(() => ({ headers: { 'meteor-login-token': token } }))
    return forward(opperation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
});

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

Meteor.startup(() => {
    render(<ApolloApp />, document.querySelector('#app'));
})
