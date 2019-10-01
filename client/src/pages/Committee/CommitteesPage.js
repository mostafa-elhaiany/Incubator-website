import React, { Component } from 'react'
import axios from 'axios'
import CommitteeCard from './components/CommitteeCard'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class CommitteesPage extends Component{
    state={
        loaded:false,
        items:[],
        chosen:"",
        didChoose:false,
        sessions:[]

    }
    static propTypes = {
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        user:PropTypes.object.isRequired
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
    select= (item)=>{
        console.log('test ',item)
    }
    getSession= ()=>{
        const id=this.state.chosen._id
        axios.get(`/api/sessions/withCommittee/${id}`)
        .then(res=>console.log(res.data.data))
        .catch(err=> console.log(err))   
    }

    render()
    {
        var x;
        if(this.state.didChoose)
        { 
            this.getSession()
        }
        return this.state.loaded?
        (
            this.state.didChoose?
            (
                <div>
                    <h1>{this.state.chosen}</h1>
                    
                    <a href="/committees/" className="btn btn-primary">Back</a>
                </div>
            )
            :
            (
                <div className="container">
                {this.state.items.map(item=>{
                    return (
                        <div>
                            <CommitteeCard choose={this.choose} item={item} />
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
const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error,
    user:state.auth.user,
    type:state.auth.type
  })
  
  
export default connect(
mapStateToProps,
{}
)(CommitteesPage)