import React, { Component } from 'react'
import {
    Card,
    CardText,
    CardBody,
    CardTitle
} from 'reactstrap'
import Fade from 'react-reveal/Fade'


class SessionCard extends Component {
    state={
        show:false
        
    }
    handleClick() {
        this.setState({ show: !this.state.show });
      }
    render()
    {
        return (<Card>
            <CardBody>
             <CardTitle><h3>{this.props.session.title}</h3></CardTitle>
             <CardText>{this.props.session.contentDescription}</CardText>
                <Fade bottom collapse when={this.state.show}>
                <a href={`${this.props.session.content}`}>session link</a>
                </Fade>
                <button
                    className="btn btn-success my-5"
                    type="button"
                    onClick={()=>this.handleClick()}
                    >
                    { this.state.show ? 'Hide' : 'Show' } link
                </button>
            </CardBody>
        </Card>)
    }
}

export default SessionCard

