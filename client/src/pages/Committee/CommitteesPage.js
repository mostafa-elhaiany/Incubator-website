import React, { Component } from 'react'
import axios from 'axios'
import CommitteeCard from './components/CommitteeCard'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SessionsModal from './components/SessionsModal'
import SessionCard from './components/SessionCard'

class CommitteesPage extends Component{
    state={
        loaded:false,
        items:[],
        chosen:"",
        didChoose:false,
        sessions:[],
        sessionLoaded:false,

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
    getSession= ()=>{
        const id=this.state.chosen._id
        axios.get(`/api/sessions/withCommittee/${id}`)
        .then(res=>{this.setState({
            sessions:res.data.data,
            sessionLoaded:true
        })})
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
                <div className="container">
                    <h1>{this.state.chosen.name}</h1>
                    {(this.props.isAuthenticated && (this.props.type==='highboard' || this.props.type==='admin'))?
                        (<div>
                            <SessionsModal committee={this.state.chosen.name}/>
                        </div>)
                        :
                        (<div>
                           
                        </div>)
                    }
                     {this.state.sessionLoaded?
                         this.state.sessions.map(session=>{
                                return (<div className='jumbotron'>
                                       <SessionCard session={session}/> 
                                </div>)
                            })
                        :<div>sessions loading please wait</div>}
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