import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import React, { Component } from 'react';
import ResolutionForm from './ResolutionForm';
import EditResolution from './EditResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Goal from './resolutions/Goal';

class App extends Component {
    constructor(props){
        super(props);
        this.state = { editing: '' };
    }
    onEnableEdition = (e, id) => { 
        e.preventDefault();
        this.setState({ editing: id });
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
    onClickLogout = () => {
        Meteor.logout();
        this.props.client.resetStore();
    }
    render(){
        // extract values
        const { loading, resolutions, client, user } = this.props;
        // when loading
        if(loading){ 
            return <div>Loading...</div>;
        }
        // if editing show the edit form
        return ( // when loaded
            <div className="container">                
                <h1>Resolutions</h1>
                {user._id ? (
                    <div className="authenticated">
                        <button onClick={this.onClickLogout} className="btn btn-default">Logout</button><br />
                        <br />
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <ResolutionForm onSaved={this.onSaved} onCancelUpdate={this.onCancelUpdate} />
                            </div>
                        </div>
                        <hr />
                        <div className="col-xs-12">
                            <div className="row">
                                <ul className="resolutions-list">{resolutions.map(({ _id, name, goals, completed }) => (
                                    <li key={_id}>
                                        {this.state.editing != _id ? (
                                            <a href="/" onClick={e => this.onEnableEdition(e,_id)} style={{textDecoration:completed ? 'line-through' : 'none'}}>
                                                {name || '...'}
                                            </a>
                                        ) : (
                                            <EditResolution resolutionId={_id} name={name} onUpdated={this.onUpdated} 
                                                onCancelUpdate={this.onCancelUpdate} />
                                        )}
                                        {goals.map(goal => <Goal {...goal} key={goal._id} />)}
                                    </li>
                                ))}</ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="guest">
                        <div className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
                            <RegisterForm client={client} />
                            <LoginForm client={client} />
                        </div>
                    </div>
                ) } 
            </div>
        )
    }
}

const resolutionsQuery = gql`
    query Resolutions {
        resolutions {
            _id
            name
            completed
            goals {
                _id
                name
                completed
            }
        }
        user {
            _id
        }
    }
`;

export default graphql(resolutionsQuery, {
    props: ({ data }) => ({ ...data })
})(withApollo(App));