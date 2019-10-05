import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, Group, Info } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Button from "../CustomButtons/Button.js";

// redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from 'actions/authActions'

import styles from "assets/jss/components/headerLinksStyle";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  const { isAuthenticated } = props;

  const dropDownItems = (
    isAuthenticated ?
      [
        <Link to="/profile/" className={classes.dropdownLink}>
          My Profile
            </Link>,
            <Link to="/users/" className={classes.dropdownLink}>
            All Applicants
              </Link>,
        <a
          onClick={props.logout}
          className={classes.dropdownLink}>
          Logout
          </a>

      ]
      :
      [
        <Link to="/register/" className={classes.dropdownLink}>
          Register
        </Link>,
        <Link to="/login/" className={classes.dropdownLink}>
          Login
      </Link>
      ]
  )
  
  return (
    <List className={classes.list}>

      <ListItem className={classes.listItem}>
        <Button
          href="/committees/"
          color="transparent"
          // target="_blank"
          className={classes.navLink}
        >
          <Group className={classes.icons} /> Committees
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          href="/about/"
          color="transparent"
          // target="_blank"
          className={classes.navLink}
        >
          <Info className={classes.icons} /> About
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="More"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={dropDownItems}
        />
      </ListItem>

      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem> */}

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/pg/IncubatorGUC"
            // target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/incubator_guc/"
            // target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(HeaderLinks)

// export default HeaderLinks
