import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import Button from "components/theme/CustomButtons/Button.js";
import Card from "components/theme/Card/Card.js";
import CardBody from "components/theme/Card/CardBody.js";
import CardFooter from "components/theme/Card/CardFooter.js";

import styles from "assets/jss/views/LandingPage/Sections/teamStyle.js";

// import team1 from "assets/img/faces/avatar.jpg";
// import team2 from "assets/img/faces/christian.jpg";
// import team3 from "assets/img/faces/kendall.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img 
                  src='https://res.cloudinary.com/dexmoiznt/image/upload/v1570311440/yassmin_uyfxzl.jpg' 
                  alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Yassmin Sobhy
                <br />
                <small className={classes.smallTitle}>Organizing Director</small>
              </h4>
              <CardBody>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img 
                  // src={team1} 
                  alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Samar Abdelaty
                <br />
                <small className={classes.smallTitle}>President</small>
              </h4>
              <CardBody>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img 
                  src='https://res.cloudinary.com/dexmoiznt/image/upload/v1570311440/me_uuxs76.jpg' 
                  alt="..." className={imageClasses}
                  height="100px;"
                  width="100px;" />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Mostafa Osama
                <br />
                <small className={classes.smallTitle}>Vice President</small>
              </h4>
              <CardBody>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img 
                // src={team3} 
                alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Yomna Hamad
                <br />
                <small className={classes.smallTitle}>Project Director</small>
              </h4>
              <CardBody>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
