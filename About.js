import React from 'react'
import Collapsible from 'react-collapsible';


//import logo from './C:\Users\Ghazal\Desktop\react_crash_todo\FB_IMG_1568893821632.jpg'
//const logo = require('./C:\Users\Ghazal\Desktop\react_crash_todo\FB_IMG_1568893821632.jpg');
function About()  {
    return (
        <React.Fragment >
           
            <h1>About Us</h1>
            <Collapsible trigger="Our mission" transitionTime ={100}  triggerStyle={TrStyle}>
        <p style={desStyle}>Incubator is a scientific club that aims to remove the gap between students from deffirent majors and backgrounds 
            by making them work together as a team on one of our various project in order to make them able to work with 
            people from deffirent majors thus making there future work life much easier.</p>
        
      </Collapsible>
      <Collapsible trigger="Our board" transitionTime ={100}  triggerStyle={TrStyle}>
      <img src='http://placekitten.com/500/500' title="Our board" alt="Our board" style={{ justifyContent : 'center',
    alignItems: 'center'} }>
        </img>
        </Collapsible>
        <Collapsible trigger="Our Facebook page"transitionTime ={100}  triggerStyle={TrStyle}  >
            <a href='https://www.facebook.com/IncubatorGUC' target='_blank' >
                Click here
                </a>
            </Collapsible>
            <Collapsible trigger='Our comittes'transitionTime ={100} triggerStyle={TrStyle} >
            <Collapsible trigger = 'Organizing' triggerStyle={TrStyle} transitionTime ={100}>
                <Collapsible trigger = 'Fundraising' transitionTime ={100} triggerStyle={desStyle}>
                    <p style={desStyle}>
                     Fundraising discription
                    </p>
                </Collapsible>
                <Collapsible trigger ='Events & cordination' triggerStyle={desStyle} transitionTime ={100}>
                    <Collapsible trigger = 'Events'triggerStyle={desStyle}  transitionTime ={100}>
                        <p style={desStyle}>
                            Events description
                        </p>
                        </Collapsible>
                    <Collapsible triggerStyle={desStyle} trigger='Logistics' transitionTime ={100}>
                        <p style={desStyle}>
                            Logistics discription
                        </p>
                    </Collapsible>
            </Collapsible>
            <Collapsible trigger='Marketing' triggerStyle={desStyle}  transitionTime ={100}>
                <Collapsible trigger ='Design' triggerStyle={desStyle} transitionTime ={100}>
                    <p style={desStyle}>
                        Design description
                    </p>
                </Collapsible>
                <Collapsible trigger='SocialMedia' triggerStyle={desStyle} transitionTime ={100} >
                    <p style={desStyle}>
                        SocialMedia description
                    </p>
                </Collapsible>
                <Collapsible triggerStyle={desStyle} trigger='Marketing' transitionTime ={100}>
                    <p style={desStyle}>
                        marketing description
                    </p>
                </Collapsible>
            </Collapsible>
            </Collapsible>
            <Collapsible trigger = 'Projects'  triggerStyle={TrStyle} transitionTime ={100}>
                <Collapsible trigger="Affective Computing" triggerStyle={desStyle} transitionTime ={100}>
                    <p style={desStyle}>
                        Affective Computing description
                    </p>
                </Collapsible>
                <Collapsible triggerStyle={desStyle} trigger='SPS' transitionTime ={100}>
                    <p style={desStyle}>
                        SPS description
                    </p>
                </Collapsible>
                <Collapsible triggerStyle={desStyle} trigger='Lab on Chip' transitionTime ={100} >
                    <p style={desStyle}>
                        Lab on chip description
                    </p>
                </Collapsible>
                <Collapsible triggerStyle={desStyle} trigger = 'Bioinformatics'transitionTime ={100}>
                    <p style={desStyle}>
                        Bioinformatics description
                    </p>

                </Collapsible>
            </Collapsible>
            </Collapsible>
            
        </React.Fragment>
    )
}
const TrStyle ={
    fontFamily: "Helvetica",
    fontSize : '2em',
    color :'#8B828F'
}
const desStyle ={
    fontFamily: "Helvetica",
    fontSize : '1.5em',
    
}
export default About;