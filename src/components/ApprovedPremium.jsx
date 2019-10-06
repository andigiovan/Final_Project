import React, { Component } from 'react'
import {connect} from 'react-redux'

export class ApprovedPremium extends Component {
    render() {
        return (
            <div>
                Sudah Berlangganan
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      user_name: state.auth.username,
      role: state.auth.role  
    }
  }

  export default connect(mapStateToProps)(ApprovedPremium)
