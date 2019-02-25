import React from "react"
import Wip from '../Wip/Wip'
import Survey from './Survey'

import { boolean } from "@storybook/addon-knobs"

class SurveyContainer extends React.Component {
  state = {
    loading: false,
    questions: [
      {
        question: 'Do you like food?',
        answers: [
          {
            label: 'Yes, I do!',
            selected: true,
            value: 1,
          },
          {
            label: 'No, I don\'t!',
            selected: false,
            value: 0,
          },
          {
            label: 'Kinda..',
            selected: false,
            value: 2,
          }
        ],
      },
      {
        question: 'Do you like work?',
        answers: [
          {
            label: 'Yes, I do!',
            selected: true,
            value: 1,
          },
          {
            label: 'No, I don\'t!',
            selected: false,
            value: 0,
          },
          {
            label: 'Kinda..',
            selected: false,
            value: 2,
          }
        ],
      }
    ],
    submitting: false,
  }
  componentWillMount() {
    this.setState({
      canSubmit: false,
      loading: true,
    })
    setTimeout(() => {
      this.setState({
        canSubmit: true,
        loading: false,
      })
    }, 1500)
  }
  handleOnChange = (qIdx, aIdx) => {
    const { questions } = this.state
    for(let answer of questions[qIdx].answers) {
      answer.selected = false
    }
    questions[qIdx].answers[aIdx].selected = true
    this.setState({ questions })
  }
  handleOnSubmit = () => {
    this.setState({
      showErrors: false,
      submitting: true,
    })
    setTimeout(() => {
      this.setState({
        showErrors: true,
        submitting: false,
      })
    }, 1500)
  }
  render() {
    const {
      canSubmit,
      loading,
      questions,
      submitting,
    } = this.state

    const showErrors = boolean("show errors", this.state.showErrors || false)

    const props = {
      canSubmit: boolean("canSubmit", canSubmit || true),
      errors: showErrors ? ["Something wrong", "Something else not right"] : [],
      loading: boolean("loading", loading || false),
      onChange: this.handleOnChange,
      onSubmit: this.handleOnSubmit,
      questions,
      submitting: boolean("submitting", submitting || false),
    }
    const child = React.cloneElement(this.props.children, props)
    return (
      <Wip
          branch="feature/survey-modal"
          prNumber={7}
      >
      {child}
    </Wip>
    )
  }
}

export default function SurveyStory(stories) {
  stories.add("Survey", () => {
    return (
      <SurveyContainer>
        <Survey />
      </SurveyContainer>
    )
  })
}
