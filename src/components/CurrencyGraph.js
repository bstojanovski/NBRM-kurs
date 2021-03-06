import React from 'react'
import { Chart } from 'react-charts'
 
class CurrencyGraph extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: this.props.graphData,
            axes: [
                { primary: true, type: 'utc', position: 'bottom' },
                { type: 'linear', position: 'left' }
            ]
        };

    }

    render() {
        return (
            <div className="chart">
                <Chart data={this.state.data} axes={this.state.axes} tooltip dark />
            </div>
        )
    }
}

export default CurrencyGraph;