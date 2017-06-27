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
      let redStudents = batch.students.filter((student) => {
        return student.evaluation[0].color === "Red" })
      let yellowStudents = batch.students.filter((student) => {
        return student.evaluation[0].color === "Yellow" })
      let greenStudents = batch.students.filter((student) => {
        return student.evaluation[0].color === "Green" })
      console.log(redStudents)
      console.log(yellowStudents)
      console.log(greenStudents)
      return Math.floor(Math.random()*(batch.students.length))
    }
    window.alert(batch.students[randomNumber()].name)
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
