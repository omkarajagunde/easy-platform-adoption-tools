import { Button, ClickableTile, ExpandableTile, Link, RadioTile, TileBelowTheFoldContent, TileAboveTheFoldContent, Tile, CodeSnippet, FormLabel } from 'carbon-components-react'
import React, { useState } from 'react'
import { PlayOutline24, Download24, ArrowRight16, IbmDataReplication32, Devices32, Money32, DashboardReference32 } from "@carbon/icons-react"

function index() {

    const [state, setState] = useState({
        selectedTileIndex: 1
    })

    const handleTileChange = (tileIdx) => {
        setState(prevState => ({ ...prevState, selectedTileIndex: tileIdx }))
        let elem = document.getElementById("section-" + tileIdx)
        elem.scrollIntoView({ behavior: "smooth" })
    }

    const renderCorrectSection = () => {
        console.log(state.selectedTileIndex);
        return (
            <>
                <div className='bx--row section' id="section-1">
                    <div className="section-leftSide section-title">
                        BeeGuide features
                    </div>
                    <div className="section-rightSide">
                        <div className="section-features">
                            <div className="section-feature">
                                <div><IbmDataReplication32 /></div>
                                <div>some feature</div>
                            </div>
                            <div className="section-feature">
                                <div><IbmDataReplication32 /></div>
                                <div>End-to-end product tours</div>
                            </div>
                            <div className="section-feature">
                                <div><Money32 /></div>
                                <div>Not so expensive</div>
                            </div>
                        </div>
                        <div className="section-features">
                            <div className="section-feature">
                                <div><Devices32 /></div>
                                <div>Responsive accross all browsers and screen sizes</div>
                            </div>
                            <div className="section-feature">
                                <div><DashboardReference32 /></div>
                                <div>Feature wise guides</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bx--row section' id="section-2" style={{ backgroundColor: "#f2f4f8" }}>
                    <div className="section-leftSide section-title">
                        How to install?</div>
                    <div className="section-rightSide">
                        <div className="section-2-title">
                            Choose any of the below installation option
                        </div>
                        <div className="section-2-tiles">
                            <ExpandableTile className="section-2-tile">
                                <TileAboveTheFoldContent>
                                    <div style={{ height: '64px'}}>
                                        Install from chrome store
                                    </div>
                                </TileAboveTheFoldContent>
                                <TileBelowTheFoldContent>
                                    <div style={{ height: '64px'}}>
                                        Install instructions
                                    </div>
                                </TileBelowTheFoldContent>
                            </ExpandableTile>
                            <ExpandableTile className="section-2-tile">
                                <TileAboveTheFoldContent>
                                    <div style={{ height: '64px'}}>
                                        Download and load manually
                                    </div>
                                </TileAboveTheFoldContent>
                                <TileBelowTheFoldContent>
                                    <div style={{ height: '64px'}}>
                                        Download and load unpacked extention guide
                                    </div>
                                </TileBelowTheFoldContent>
                            </ExpandableTile>
                        </div>
                    </div>
                </div>
                <div className='bx--row section' id="section-3">
                    <div className="section-leftSide section-title">
                        How to create tours?
                    </div>
                    <div className="section-rightSide">
                        Content of creation
                        1. Press 'c' then hover over required element on page then Press 'd' to capture hovered element
                    </div>
                </div>
                <div className='bx--row section' id="section-4">
                    <div className="section-leftSide section-title">
                        How to intergrate tours?
                    </div>
                    <div className="section-rightSide">
                        Content for tour integration
                    </div>
                </div>
                <div className='bx--row section' id="section-4" style={{ backgroundColor: "#f2f4f8", height: "max-content", display: state.userProfileData !== null? "flex": "none" }}>
                    <div className="section-leftSide section-title">
                        How to integrate created tours in my app?
                    </div>
                    <div className="section-rightSide">
                        <div className="section-2-title" style={{ lineHeight: "2.2rem", fontSize: "1rem" }}>
                            1. To to <Link href='/generateToken'>Genrate Token page</Link> Signup/Sign in with your IBMid then a token will be generated for you <br/>
                            2. Place this token in below script and to integrate tours just copy paste below  <CodeSnippet type="inline">{"<script/>"}</CodeSnippet> tag in your root index.html or js file<br />
                            3. Call <CodeSnippet type="inline">{"window.beeTour(<tourId>)"}</CodeSnippet> to initialise particular tour on particular web page/ route<br/>
                            4. Call <CodeSnippet type="inline">{"window.beeSpot(<tourId>, <screenIndex>)"}</CodeSnippet> to show hotspot for a feature.
                        </div>
                        <div className="section-generateToken-btn">
                            <FormLabel>Click to copy to clipboard</FormLabel>
                            <CodeSnippet type="inline" feedback="Copied to clipboard" style={{ width: "max-content", padding: "15px", "background": "white" }}>{ `<script src="https://localhost:9001/beeGuide.js" data-token="YOUR TOKEN HERE"> </script>`}</CodeSnippet>
                        </div>
                        
                    </div>
                </div>
            </>
        )
        
    }
  return (
    <div className='mainHeader'>
        <div class="bx--grid">
            <div class="bx--row">
                <div class="bx--col mainHeader-leftPanel" >
                    <div className='mainHeader-title'> 
                        Let's create,
                    </div>
                    <div className='mainHeader-subtitle'>beautiful product tours & accurate feature tours</div>
                    <div className='mainHeader-btns'>
                        <Button kind="primary" renderIcon={Download24}>Download extention</Button>
                        <Button sty kind="tertiary" renderIcon={PlayOutline24}>Watch the video (05:18)</Button>
                    </div>
                    <Link href="#2" renderIcon={ArrowRight16} className='mainHeader-link'>
                        Learn more
                    </Link>
                </div>
                <div class="bx--col mainHeader-rightPanel">
                    <video preload="none" autoPlay muted loop>
                        <source src="/back-video.mov" type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className='bx--row content'>
                <div  className='bx--row content-bar'>
                    <RadioTile checked={state.selectedTileIndex === 1} id="tile-1"  onClick={() => handleTileChange(1)}>
                        <div className='content-titleNum'>01</div>
                        <div>Features</div>
                    </RadioTile>
                    <RadioTile checked={state.selectedTileIndex === 2} id="tile-2"  onClick={() => handleTileChange(2)}>
                        <div className='content-titleNum'>02</div>
                        <div>How to install?</div>
                    </RadioTile>
                    <RadioTile checked={state.selectedTileIndex === 3} id="tile-3"  onClick={() => handleTileChange(3)}>
                        <div className='content-titleNum'>03</div>
                        <div>How to create?</div>
                    </RadioTile>
                    <RadioTile checked={state.selectedTileIndex === 4} id="tile-4"  onClick={() => handleTileChange(4)}>
                        <div className='content-titleNum'>04</div>
                        <div>How to integrate?</div>
                    </RadioTile>
                </div>
            </div>
            <div>
                {renderCorrectSection()}
            </div>
        </div>
    </div>
  )
}

export default index