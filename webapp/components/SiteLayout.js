import React from "react";
import { Footer } from "@carbon/ibmdotcom-react";
import Image from "next/image"
import { Bee16 } from "@carbon/icons-react"
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderMenu, SideNav } from 'carbon-components-react' 

// Icons
import IBMGrayLogo from "../resources/icons/ibm.svg";
import Bee from "../resources/icons/bee.svg";

const SiteLayout = ({ children }) => {
  return (
    <div className="App">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="">
          <Image
            src={IBMGrayLogo.src}
            width={53}
            height={23}
            className="header-logoImage"
            alt="ibm-logo"
          /> 
        </HeaderName>
      </Header>
      <Header className="subHeader" aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="">
        Bee<Image
            src={Bee.src}
            width={29}
            height={29}
            className="header-logoImage"
            alt="ibm-logo"
          />Guide
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem href="#" isCurrentPage>Overview</HeaderMenuItem>
          <HeaderMenuItem href="#">Pricing</HeaderMenuItem>
          <HeaderMenuItem href="#">About</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
      <div className="bx--grid mainGrid">
        <div className="bx--row mainGrid-row">
          {children}
        </div>
      </div>
      <Footer type="micro" />
    </div>
  );
};

export default SiteLayout;
