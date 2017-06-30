import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { history } from '../store'

const style = {
  marginTop: 20,
}


class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  addBatch = () => {
    history.push('/create-batch')
  }


  render() {
    const { onChange, signedIn } = this.props
    if (signedIn)
      return (
        <FloatingActionButton mini={true} style={style}>
          <ContentAdd onClick={this.addBatch}/>
        </FloatingActionButton>
      )
      else {
        return null
      }

  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(CreateBatchButton)
