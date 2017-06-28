import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import StartIcon from 'material-ui/svg-icons/av/play-circle-filled'


class AskQuestionButton extends PureComponent {
  static propTypes = {
    batch: PropTypes.object
  }

  randomStudent = () => {
    const { batch } = this.props

    const randomNumber = () => {
      return Math.floor(Math.random()*(batch.students.length))
    }

    const algorithm = () => {
      let redStudents = batch.students.filter((student) => {
        return student.evaluation[student.evaluation.length-1].color === "Red" })
      let yellowStudents = batch.students.filter((student) => {
        return student.evaluation[student.evaluation.length-1].color === "Yellow" })
      let greenStudents = batch.students.filter((student) => {
        return student.evaluation[student.evaluation.length-1].color === "Green" })

      if (Math.floor(Math.random()*6) === 0 || 1 || 2) {
        return window.alert(redStudents[randomNumber()].name)
      }

      if (Math.floor(Math.random()*6) === 3 || 4) {
        return window.alert(yellowStudents[randomNumber()].name)
      }

      if (Math.floor(Math.random()*6) === 5) {
        return window.alert(greenStudents[randomNumber()].name)
      }
    }
    algorithm()
  }

  render() {
      return (
        <RaisedButton onClick={ this.randomStudent.bind(this) } icon={<StartIcon/>} label="Ask a question"/>
      )
  }
}

const mapStateToProps = ({ currentBatch }) => ({
  batch: currentBatch,
})

export default connect(mapStateToProps)(AskQuestionButton)
