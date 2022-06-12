import React from 'react'

function HelpToolBox(props) {
  return (
    <div>
        <div onClick={props.handleHelpToolBoxClick} className="epat-toolbox-title">
            Help?
        </div>
        {
            props.state.expandHelpToolbar &&
            <div>
                <div>
                    <div className="epat-toolbox-fulltour" >
                        Full Tour?
                    </div>
                    <div>
                        <button className="epat-toolbox-launchBtn" onClick={props.handleFullTourCheckbox}>
                            Launch
                        </button>
                    </div>
                </div>
                <div>
                    <div style={{ margin: "8px 0px 8px 0px" }}>Feature spots?</div>
                    <div>
                        <label className="switch">
                            <input type="checkbox" checked={props.state.hotspotsActivated} onChange={props.handleHotspots}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default HelpToolBox