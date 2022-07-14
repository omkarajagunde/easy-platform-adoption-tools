import { useEffect, useState } from "react"
import axios from 'axios'
import { Button, CodeSnippet, FormLabel } from "carbon-components-react";
import { Login24, UserIdentification32 } from '@carbon/icons-react'
import crypto from "crypto"


const GenerateToken = () => {
    const [ state, setState ] = useState({ 
        userProfileLoading: true,
        userProfileData: null,
        hash: ""
     })

    // API call to load meter charts
    useEffect(() => {
        axios.get("/get/profile").then((response) => {
			console.log( response.data.data);
			if (response.data.status === 200){
                setState((prevState) => ({ ...prevState, 
					userProfileData: response.data.data.profile,
                    hash: response.data.data.hashedToken,
					userProfileLoading: false}))
			}else {
				setState((prevState) => ({ ...prevState, 
					userProfileData: null,
					userProfileLoading: false}))
			}
		})
    }, []) 

    const handleLogin = () => {
        window.location.href = "/loginWithRedirect"
    }

  return (
    <div class="bx--grid" style={{ width: "100%" }}>
        <div className='bx--row section' id="section-2" style={{ backgroundColor: "#f2f4f8", height: state.userProfileData !== null? "50vh": "100vh" }}>
            <div className="section-leftSide section-title">
                How to generate token?
            </div>
            {
                state.userProfileData === null &&
                <div className="section-rightSide">
                    <div className="section-2-title">
                        Please sign in using your IBMid to generate token!
                    </div>
                    <div className="section-generateToken-btn">
                        <Button kind="primary" renderIcon={Login24} onClick={handleLogin}>Login</Button>
                    </div>
                </div>
            }
            {
                state.userProfileData !== null &&
                <div className="section-rightSide">
                    <div className="section-2-title" style={{ lineHeight: "2.2rem" }}>
                        Hooray! here is your Token, copy this token <br/> and insert into BeeGuide extention settings
                    </div>
                    <div className="section-generateToken-btn">
                        <FormLabel>Click to copy to clipboard</FormLabel>
                        <CodeSnippet type="inline" feedback="Copied to clipboard" style={{ width: "max-content", padding: "15px", "background": "white" }}>{state.hash}</CodeSnippet>
                    </div>
                </div>
            }
        </div>
        <div className='bx--row section' id="section-2" style={{ backgroundColor: "#f2f4f8", height: "max-content", display: state.userProfileData !== null? "flex": "none" }}>
            <div className="section-leftSide section-title">
                How to integrate created tours in my app?
            </div>
            <div className="section-rightSide">
                <div className="section-2-title" style={{ lineHeight: "2.2rem", fontSize: "1.2rem" }}>
                      To integrate tours just copy paste below  <CodeSnippet type="inline">{ "<script/>" }</CodeSnippet> tag in your root index.html or js file, then call<br />
                    1. <CodeSnippet type="inline">{ "window.initBee()" }</CodeSnippet> to initialise all tours in your website<br />
                    2. <CodeSnippet type="inline">{"window.triggerBeeTour(<tourId>)"}</CodeSnippet> to initialise particular tour on particular web page/ route<br/>
                    3. <CodeSnippet type="inline">{"window.triggerBeeSpot(<tourId>, <screenIndex>)"}</CodeSnippet> to show hotspot for a feature.
                </div>
                <div className="section-generateToken-btn">
                    <FormLabel>Click to copy to clipboard</FormLabel>
                    <CodeSnippet type="inline" feedback="Copied to clipboard" style={{ width: "max-content", padding: "15px", "background": "white" }}>{ `<script src="https://localhost:9001/beeGuide.js" token="${state.hash}"> </script>`}</CodeSnippet>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default GenerateToken;