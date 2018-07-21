import React, { Component } from 'react'


class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { value, onIncrement, onDecrement,action } = this.props
        console.log(value,action,'value')
        return (
            <p>
                Clicked: {value}
                {' '}
                <button onClick={onIncrement}>
                    +
                </button>
                {' '}
                <button onClick={onDecrement}>
                    -
                </button>

            </p>
        )
    }
}
//
// Counter.propTypes = {
//     value: PropTypes.number.isRequired,
//     onIncrement: PropTypes.func.isRequired,
//     onDecrement: PropTypes.func.isRequired
// }

export default Counter