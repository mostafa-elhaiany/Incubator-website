import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import {logout} from '../../actions/authActions'

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  static propTypes={
    auth: PropTypes.object.isRequired,
    logout:PropTypes.func.isRequired
}
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    var x = (<div></div>)
    if(this.props.isAuthenticated)
    {
       x=(
        <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                      <a href="/profile/">My Profile</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a onClick={this.props.logout} href="/" >Logout</a>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Cancel
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
      )
    }
    else {
       x= (
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              More
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                  <a href="/register/">register</a>
              </DropdownItem>
              <DropdownItem>
                <a href="/login/">login</a>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Cancel
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
            )
    }
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Incubator</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/committees/">Committees</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about/">about</NavLink>
              </NavItem>
              {x}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error,
  auth:state.auth
})

export default connect(
  mapStateToProps,
  { logout}
)(AppNavbar)