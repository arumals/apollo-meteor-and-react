import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React from 'react';

const App = ({ data }) => {
    if(data.loading){ // when loading
        return <div>Loading...</div>;
    }
    return ( // when loaded
        <div>
            <h1>{data.hi}</h1>
            <ul>{data.resolutions.map(({ _id, name }) => <li key={_id}>{name}</li>)}</ul>
        </div>
    )
};

const hiQuery = gql`{
    hi
    resolutions {
        _id
        name
    }
}`;

export default graphql(hiQuery)(App);