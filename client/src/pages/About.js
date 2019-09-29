import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import Axios from 'axios';


class About extends Component {
  state={
    loaded:false,
    committees:[]
  }


  componentDidMount(){
    Axios.get('/api/committees/')
    .then(res=>this.setState({committees:res.data.data,loaded:true}))
    .catch(err=>console.log(err))
  }

render () {
    return (
        <div className="container">
            
        <h1>Our Mission</h1>
        <div className="jumbotron">
            <Fade left opposite cascade>
            <div>
            <h5>
                Incubator is a scientific club that aims to remove the gap between students from deffirent majors and backgrounds 
            by making them work together as a team on one of our various project in order to make them able to work with 
            people from deffirent majors thus making there future work life much easier.
            </h5>
          </div>
        </Fade>
      </div>
            
      <h1>Our board</h1>
            <div className="jumbotron">
                <Fade left opposite cascade>
                <div>
                <img src='http://placekitten.com/500/500' title="Our board" alt="Our board" style={{ justifyContent : 'center',
                    alignItems: 'center'} }>
                </img>
              </div>
            </Fade>
        </div>
        
        <Fade bottom>
        <h1>Our Facebook page</h1>
            <div className="jumbotron">
            <Fade left opposite cascade>
                <div>
                <a href='https://www.facebook.com/IncubatorGUC' >
                Incubator GUC
                </a>
              </div>
            </Fade>
        </div>
        </Fade>

        <Fade bottom>
        <h1>Our comittes</h1>
           <br/>
           <h3>Organizing</h3>
            <div className="jumbotron">
            <Fade left opposite cascade>
                <div>
                {this.state.committees.map(
                 committee=>{
                   if(committee.type==='organizing')
                    return <p>{committee.name}</p>
                   return <p></p>
                 }
               )}
              </div>
            </Fade>
             </div>
           <h3>projects</h3>
            <div className="jumbotron">
            <Fade left opposite cascade>
                <div>
               {this.state.committees.map(
                 committee=>{
                   if(committee.type==='projects')
                      return <p>{committee.name}</p>
                   return   <p></p>
                 }
               )}
              </div>
            </Fade>
             </div>
            </Fade>
    </div>
    )
  }
}

export default About
