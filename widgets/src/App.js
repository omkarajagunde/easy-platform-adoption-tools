import './App.scss';
import ProductTour from './components/ProductTour';

function App(props) {
  return (
    <div className="platformAdoptionApp" id="windowFrame">
        <ProductTour {...props}/>
    </div>
  );
}

export default App;
