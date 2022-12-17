import React, { Component } from 'react'
import loading from './loading.gif'

export class spinner extends Component {
    render() {
        return (
            <div>
                <div className="text-center">
                     <img src={loading} alt="" />
                </div>
            </div>
        )
    }
}

export default spinner
