import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// Function Component
// const App = () => {
//     window.navigator.geolocation.getCurrentPosition(
//         (position) => console.log(position),
//         (err) => console.log(err)
//     );

//     return <div>Latitude: </div>
// };


// Class Component
class App extends React.Component {

    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    // Helper function/method 
    renderContent() {
        // Conditional rendering
        if( this.state.errorMessage && !this.state.lat) {
            return <div>Error: { this.state.errorMessage }</div>
        }

        if( !this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={ this.state.lat } />
        }

        return <Spinner message="Please accept location request" />;
    }

    // React says we have to define render
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
        
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);