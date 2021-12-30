import React from "react";
//import MenuItem from "../../components/menu-items/menu-item.component";
import Directory from "../../components/directory/directory.component";
//import './homepage.styles.scss';

import { HomePageContainer } from "./homepage.styles";

const HomePage = () => (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );

export default HomePage;