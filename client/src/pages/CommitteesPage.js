import React, { Component } from 'react';
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import axios from 'axios'
class CommitteesPage extends Component{
    state={
        loaded:false,
        items:[]
    }
    componentDidMount(){
        axios.get('/api/committees')
        .then(res=>this.setState({
            items:res.data.data,
            loaded:true
        }))
    }
    render()
    {
        console.log(this.state.items)
        return this.state.loaded?
        (
            <div>
                <p>loaded</p>
                
            </div>
        )
        :
        (
            <div>
                <p>not loaded</p>
            </div>
        )
    }
}

export default CommitteesPage