import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/help'
import Dialog from 'material-ui/Dialog';


class AskQuestionButton extends PureComponent {
  static propTypes = {
    batch: PropTypes.object
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  }

  randomStudent = () => {
    const { batch } = this.props

    const redStudents = batch.students.filter((student) => {
      if (student.evaluation[0] === undefined ) { return [] }
      else {
        return student.evaluation[student.evaluation.length-1].color === "Red" }
      })
    const yellowStudents = batch.students.filter((student) => {
      if (student.evaluation[0] === undefined ) { return [] }
      else {
        return student.evaluation[student.evaluation.length-1].color === "Yellow" }
      })
    const greenStudents = batch.students.filter((student) => {
      if (student.evaluation[0] === undefined ) { return [] }
      else {
        return student.evaluation[student.evaluation.length-1].color === "Green" }
      })

    const redrandomNumber = Math.floor(Math.random()*(redStudents.length))

    const yellowrandomNumber = Math.floor(Math.random()*(yellowStudents.length))

    const greenrandomNumber = Math.floor(Math.random()*(greenStudents.length))

    const num = Math.floor(Math.random()*6)

    const whattodo = [
      <RaisedButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]

    const algorithm = () => {

      if ((redStudents.length > 0) && (yellowStudents.length > 0) && (greenStudents.length > 0)) {

        if (num === 0 || num === 1 || num === 2) {
          return window.alert(redStudents[redrandomNumber].name)
        }
        else if (num === 3 || num === 4) {
          return window.alert(yellowStudents[yellowrandomNumber].name)
        }
        else if (num === 5) {
          return window.alert(greenStudents[greenrandomNumber].name)
        }
      }

      else if ((redStudents.length === 0) && (yellowStudents.length > 0) && (greenStudents.length > 0)) {

        if (num === 3 || num === 0 || num === 1 || num === 2) {
          return window.alert(yellowStudents[yellowrandomNumber].name)
        }
        else if (num === 5 || num === 4) {
          return window.alert(greenStudents[greenrandomNumber].name)
        }
      }

      else if ((redStudents.length > 0) && (yellowStudents.length === 0) && (greenStudents.length > 0)) {

        if (num === 3 || num === 0 || num === 1 || num === 2 || num === 4) {
          return window.alert(redStudents[redrandomNumber].name)
        }
        else if (num === 5) {
          return window.alert(greenStudents[greenrandomNumber].name)
        }
      }

      else if ((redStudents.length > 0) && (yellowStudents.length > 0) && (greenStudents.length === 0)) {

        if (num === 3 || num === 0 || num === 1 || num === 2) {
          return window.alert(redStudents[redrandomNumber].name)
        }
        else if (num === 5 || num === 4) {
          return window.alert(yellowStudents[yellowrandomNumber].name)
        }
      }

      else if ((redStudents.length > 0) && (yellowStudents.length === 0) && (greenStudents.length === 0)) {
        return window.alert(redStudents[redrandomNumber].name)
      }

      else if ((redStudents.length === 0) && (yellowStudents.length > 0) && (greenStudents.length === 0)) {
        return window.alert(yellowStudents[yellowrandomNumber].name)
      }

      else if ((redStudents.length === 0) && (yellowStudents.length === 0) && (greenStudents.length > 0)) {
        return window.alert(greenStudents[greenrandomNumber].name)
      }

      else if ((redStudents.length === 0) && (yellowStudents.length === 0) && (greenStudents.length === 0)) {
        return window.alert("There are no students in this batch, add students first!")
      }


    }
    algorithm()
  }

  render() {
      return (
        <div>
          <StarIcon primary={true} onClick={ this.randomStudent.bind(this) } onTouchTap={this.handleOpen} />
       </div>
      )
  }
}

const mapStateToProps = ({ currentBatch }) => ({
  batch: currentBatch,
})

export default connect(mapStateToProps)(AskQuestionButton)
