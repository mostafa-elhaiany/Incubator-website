import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Code from "@material-ui/icons/Code";
import Fingerprint from "@material-ui/icons/Fingerprint";
import SdCard from "@material-ui/icons/SdCard";
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
// core components
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import InfoArea from "components/theme/InfoArea/InfoArea.js";

import styles from "assets/jss/views/LandingPage/Sections/productStyle.js"

const useStyles = makeStyles(styles);

export default function ProjectSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let's talk about our Projects</h2>
          <h5 className={classes.description}>
            We offer a multitude of interesting cross major projects. Choose the one that suits you!
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Affective Computing"
              description="Affective computing is the use of machine learning to build model or programs able to identify human emotions and act upon them"
              icon={Code}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Smart Problem Solvers"
              description="sps are a group of people who wanna help solve all sort of problems on campus or even outside using smart techniques"
              icon={ImportantDevicesIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Bioinformatics"
              description="Bioinformatics combines biology, computer science, information engineering, mathematics and statistics to analyze and interpret biological data. here you'll learn more about the field and how you can research further in it"
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Lab on Chip"
              icon={SdCard}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
