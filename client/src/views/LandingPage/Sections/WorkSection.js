import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import styles from "assets/jss/views/LandingPage/Sections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            register as an applicant and start your journy as a young researcher,
            even if researching isn't the thing for you, we have other committees too,
            join us and incubate your passion
          </h4>
        </GridItem>
      </GridContainer>
    </div>
  );
}
