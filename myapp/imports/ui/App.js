import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { Component } from 'react';

import ResolutionForm from './ResolutionForm';
import EditResolution from './EditResolutionForm';

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
        this.props.data.refetch();
    }
    onUpdated = () => {
        this.props.data.refetch();
        this.setState({ editing: '' });
    }
    onCancelUpdate = () => {
        this.setState({ editing: '' });
    }
    render(){
        // destructure
        const { data } = this.props;
        // when loading
        if(data.loading){ 
            return <div>Loading...</div>;
        }
        // if editing show the edit form
        return ( // when loaded
            <div>
                <h1>{data.hi}</h1>
                <ResolutionForm onSaved={this.onSaved} onCancelUpdate={this.onCancelUpdate} />
                <ul>{data.resolutions.map(({ _id, name }) => (
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

const hiQuery = gql`{
    hi
    resolutions {
        _id
        name
    }
}`;

export default graphql(hiQuery)(App);