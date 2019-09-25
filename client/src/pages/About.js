import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';


class About extends Component {
  
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
                <p>Fundraising</p>
                <p>Marketing</p>
                <p>Events Coordination</p>
              </div>
            </Fade>
             </div>
           <h3>projects</h3>
            <div className="jumbotron">
            <Fade left opposite cascade>
                <div>
                <p>Smart Problem Solvers</p>
                <p>Affective Computing</p>
                <p>Lab On Chip</p>
                <p>BioInformatics</p>
              </div>
            </Fade>
             </div>
            </Fade>
    </div>

  
        // <div className="container">
        // <h3>About Us!</h3>

        //     <p> 
        //         Incubator is the first scientifice club in the GUC, in this club we aim to decrease the gap between different majors
        //     </p>
        //     <p>
        //         imagine wanting to apply in a certain field, but you cant apply bc its different majors or that you dont have the right qualifications
        //         what we do is that we teach you about certain prosspering fields and tell you how you
        //         can research in those fields and any other field you wanna be a research in
        //         even if it isn't your major, even if it isn't something you know
        //         if you're ready to learn, and you're dedicated enough, come join us
        //         we'll show you the right path <br/>
                
        //         <bold>INCUBATE YOUR PASSION</bold>  </p>

        //         <a href="/committees/" className="btn btn-primary">go to comittees</a>
        // </div>
    )
  }
}

export default About
