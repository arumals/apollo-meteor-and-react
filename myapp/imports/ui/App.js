import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import ResolutionForm from './ResolutionForm';
import EditResolution from './EditResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class App extends Component {
    constructor(props){
        super(props);
        this.state = { editing: '' };
    }
    onEnableEdition = (e, id) => {
        e.preventDefault();
        this.setState({ editing: id });
        console.log(e.target);
    }
    onSaved = () => {
        // this.props.data.refetch();
    }
    onUpdated = () => {
        this.setState({ editing: '' });
    }
    onCancelUpdate = () => {
        this.setState({ editing: '' });
    }
    render(){
        // extract values
        const { loading, resolutions } = this.props;
        // when loading
        if(loading){ 
            return <div>Loading...</div>;
        }
        // if editing show the edit form
        return ( // when loaded
            <div>
                <h1>Resolutions</h1>
                <RegisterForm />
                <LoginForm />
                <ResolutionForm onSaved={this.onSaved} onCancelUpdate={this.onCancelUpdate} />
                <ul>{resolutions.map(({ _id, name }) => (
                    <li key={_id}>
                        {this.state.editing != _id ? 
                            <a href="/" onClick={e => this.onEnableEdition(e,_id)}>{name || '...'}</a> :
                            <EditResolution
                                {...{_id, name}}
                                onUpdated={this.onUpdated}
                                onCancelUpdate={this.onCancelUpdate} 
                            />}
                    </li>
                ))}</ul>
            </div>
        )
    }
}

const resolutionsQuery = gql`
    query Resolutions {
        resolutions {
            _id
            name
        }
    }
`;

export default graphql(resolutionsQuery, {
    props: ({ data }) => ({ ...data })
})(App);