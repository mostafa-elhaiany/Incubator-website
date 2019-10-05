import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import EventNoteIcon from '@material-ui/icons/EventNote'
// core components
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import InfoArea from "components/theme/InfoArea/InfoArea.js";

import styles from "assets/jss/views/LandingPage/Sections/productStyle.js"

const useStyles = makeStyles(styles);

export default function OrganizingSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let's talk about our organizing committees</h2>
          <h5 className={classes.description}>
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="FundRaising"
              description="fundraisers are incharge of handeling the club's funds, contacting sponsors and getting them to visit the guc to sponsor our club"
              icon={AddShoppingCartIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Events Coordination"
              description="these people are incharge of making sure people are having fun. from getting well known speakers to organizing small fundays for the club members"
              icon={EventNoteIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Marketing"
              description="in this committee you'll be getting the club's name out there. Photography, Media & Design and social media is what this committee does, making us amazing logos to banner and flyers desing to posting about our events on social media"
              icon={AddAPhotoIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
