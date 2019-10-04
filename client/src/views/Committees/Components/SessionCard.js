import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

import Card from "components/theme/Card/Card.js";
import CardHeader from "components/theme/Card/CardHeader.js";
import CardBody from "components/theme/Card/CardBody.js";
import Button from "components/theme/CustomButtons/Button.js";

import styles from "assets/jss/Typography/typographyStyle.js";
import { withStyles } from '@material-ui/core';


class SessionCard extends Component {
    state = {
        show: false

    }
    handleClick() {
        this.setState({ show: !this.state.show });
    }
    render() {
        return (
            <Card>
                <CardHeader>
                    <h3>{this.props.session.title}</h3>
                </CardHeader>
                <CardBody>
                    <p>
                        {this.props.session.contentDescription}
                    </p>
                    <Fade bottom collapse when={this.state.show}>
                        <a href={`${this.props.session.content}`}>session link</a>
                    </Fade>
                    <Button
                        color="info"
                        onClick={() => this.handleClick()}
                    >
                        {this.state.show ? 'Hide' : 'Show'} link
                </Button>
                </CardBody>
            </Card>)
    }
}

export default withStyles(styles)(SessionCard)
