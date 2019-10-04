import React, { Component } from 'react'

// nodejs library that concatenates classes
import classNames from "classnames";

import Card from "components/theme/Card/Card.js";
import CardHeader from "components/theme/Card/CardHeader.js";
import CardBody from "components/theme/Card/CardBody.js";
import Button from "components/theme/CustomButtons/Button.js";
import GridItem from "components/theme/Grid/GridItem.js";

import styles from "assets/jss/Typography/typographyStyle.js";
import { withStyles } from '@material-ui/core';

class CommitteCard extends Component {
  state = {
    title: this.props.item.name,
    text: this.props.item.description,
    image: this.props.item.image,
    committee: this.props.item

  }
  render() {
    const { classes, ...rest } = this.props;
    return (

      <Card>

        <CardHeader>
          <h1>{this.state.title}</h1>
        </CardHeader>
        <CardBody className={classNames(classes.allignCenter)}>
          <GridItem xs={12} sm={12} md={8} className={classNames(classes.marginAuto, classes.textCenter)}>
            <img
              src={this.state.image} alt="Card image cap"
              className="center"
            />
          </GridItem>
          <p>
            {this.state.text}
          </p>
          <Button color='primary' onClick={() => this.props.choose(this.state.committee)}>
            More about {this.state.title}
          </Button>
        </CardBody>
      </Card>
    )
  }
}

export default withStyles(styles)(CommitteCard)
