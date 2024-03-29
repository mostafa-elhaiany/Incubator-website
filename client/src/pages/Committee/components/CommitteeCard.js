import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';
  
class CommitteCard extends Component {
    state={
        title:this.props.item.name,
        text:this.props.item.description,
        image:this.props.item.image,
        committee:this.props.item
        
    }
  render () {
    return (
        <div>
        <Card>
          <CardImg top width="100%"   height='400px' src={this.state.image} alt="Card image cap" />
          <CardBody>
            <CardTitle><h3>{this.state.title}</h3></CardTitle>
            <CardText>{this.state.text}</CardText>
            <Button onClick={()=>this.props.choose(this.state.committee)}>More about {this.state.title}</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default CommitteCard