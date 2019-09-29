import React, { Component } from 'react';
//import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap'
//import {CSSTransition, TransitionGroup} from 'react-transition-group'
import axios from 'axios'
import CommitteeCard from './components/CommitteeCard'
class CommitteesPage extends Component{
    state={
        loaded:false,
        items:[],
        chosen:"",
        didChoose:false

    }
    componentDidMount(){
        axios.get('/api/committees')
        .then(res=>this.setState({
            items:res.data.data,
            loaded:true
        }))
    }
    choose = (committee)=>{
            this.setState({
                chosen:committee,
                didChoose:true
            })
    }
    render()
    {
        return this.state.loaded?
        (
            this.state.didChoose?
            (
                <div>
                    <p>you chose {this.state.chosen}</p>
                    <a href="/committees/" className="btn btn-primary">Back</a>
                </div>
            )
            :
            (
                <div className="container">
                {this.state.items.map(item=>{
                    return (
                        <div>
                        <CommitteeCard choose={this.choose} item={item}  />
                        </div>
                    )
                })}
                </div>
            )
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