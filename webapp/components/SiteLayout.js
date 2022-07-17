import React, { useState, useEffect } from "react";
import { Footer } from "@carbon/ibmdotcom-react";
import Image from "next/image"
import Link from 'next/link'
import { Bee16 } from "@carbon/icons-react"
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderMenu, SideNav } from 'carbon-components-react' 

// Icons
import IBMGrayLogo from "../resources/icons/ibm.svg";
import Bee from "../resources/icons/bee.svg";

const SiteLayout = ({ children }) => {

  const [ state, setState ] = useState({
    currentTab: 0
  })

  const handleTabChange = (tabIdx) => {
    setState(prevState => ({ ...prevState, currentTab: tabIdx }))
  }

  useEffect(() => {
    let path = window.location.pathname
    if (path === "/overview") {
      setState(prevState => ({ ...prevState, currentTab: 0 }))
    }
    if (path === "/pricing") {
      setState(prevState => ({ ...prevState, currentTab: 1 }))
    }
    if (path === "/about") {
      setState(prevState => ({ ...prevState, currentTab: 2 }))
    }
    if (path === "/generateToken") {
      setState(prevState => ({ ...prevState, currentTab: 3 }))
    }
  }, [])

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
          <HeaderMenuItem isCurrentPage={state.currentTab === 0} onClick={() => handleTabChange(0)}>
            <Link className="navLink" href="/">Overview</Link>
          </HeaderMenuItem>
          <HeaderMenuItem isCurrentPage={state.currentTab === 1} onClick={() => handleTabChange(1)}>
            <Link className="navLink"  href="/pricing">Pricing</Link>
          </HeaderMenuItem>
          <HeaderMenuItem isCurrentPage={state.currentTab === 2} onClick={() => handleTabChange(2)}>
            <Link className="navLink"  href="/about">About</Link>
          </HeaderMenuItem>
          <HeaderMenuItem isCurrentPage={state.currentTab === 3} onClick={() => handleTabChange(3)}>
            <Link className="navLink"  href="/generateToken">Generate Token</Link>
          </HeaderMenuItem>
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
