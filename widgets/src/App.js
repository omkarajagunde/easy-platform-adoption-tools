import { useState, useEffect } from "react"
import './App.scss';
import ProductTour from './components/ProductTour';

function App(props) {
  const [state, setState] = useState({
    tours: null,
    selectedTourArr: null,
    selectedFeatureSpotIndex: 0,
  })

  useEffect(() => {
    console.log("BeeGuide :: ", state);
  }, [state.tours])

  useEffect(() => {
    // check if token is passed and get the tours for attached token account
    let scriptElem = document.getElementById("beeguide-tools")
    if (!scriptElem) {
      console.log("[BeeGuide logs] :: Included script is not having id : beeguide-tools, please pass this id to the included script tag");
      return
    }

    let token = scriptElem.dataset.token
    if (!token) {
      console.log("[BeeGuide logs] :: Included script is not having correct data-token attribute : please pass your token in data-token attribute");
      return
    }

    fetch("http://localhost:9001/v1/api/tour?token=" + token)
      .then(response => response.json())
      .then(response => {
        console.log("[BeeGuide logs] :: Response for GET method :: ", response.data);
        setState((prevState) => ({ ...prevState, tours: response.data }))
        window.tours = response.data
      })
      .catch(error => console.log('[BeeGuide logs] :: Error for GET method :: ', error))
    
    window.triggerBeeTour = handleTriggerBeeTour
    window.triggerBeeSpot = handleTriggerBeeSpot
  }, [])

  const handleTriggerBeeTour = (tourId) => {
    window.tours.forEach(tour => {
      if (tourId === tour.id) {
        setState(prevState => ({ ...prevState, selectedTourArr: tour.arr }))
      }
    })
  }

  const handleTriggerBeeSpot = (tourId, screenIdx) => {
    window.tours.forEach(tour => {
      if (tourId === tour.id) {
        setState(prevState => ({ ...prevState, selectedTourArr: tour.arr, selectedFeatureSpotIndex: screenIdx }))
      }
    })
  }

  return (
    <div className="platformAdoptionApp" id="windowFrame">
      {
        state.tours !== null ?
          <ProductTour
            tours={state.tours}
            selectedTourArr={state.selectedTourArr}
            selectedFeatureSpotIndex={state.selectedFeatureSpotIndex} />
        : ""  
      }
    </div>
  );
}

export default App;
