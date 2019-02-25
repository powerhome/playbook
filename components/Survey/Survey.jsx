/* @flow */

import React from 'react'

import classnames from 'classnames'
import styles from './survey.scss'

import {
  Errors,
  Spinner,
} from '..'

import { SurveyQuestions } from '../types'

import {
  Button,
  Icon,
  Panel,
} from '../index'

type Props = {
  canSubmit?: boolean,
  dismissable?: boolean,
  errors: Array<string>,
  loading?: boolean,
  onChange: () => mixed,
  onDismiss: () => mixed,
  onSubmit: () => mixed,
  questions: SurveyQuestions,
  submitting: boolean,
}

export default class Survey extends React.Component<Props> {
  static defaultProps = {
    canSubmit: true,
    dismissable: true,
    errors: [],
    loading: false,
    modal: false,
    onChange: function(){},
    onDismiss: function(){},
    onSubmit: function(){},
    questions: [],
    submitting: false,
  }
  props: Props

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  }

  handleOnChange(qaIdx) {
    this.props.onChange(...qaIdx)
  }

  renderHeader() {
    const {
      errors,
    } = this.props
    return (
      <div>
        <If condition={errors && errors.length}>
          <Errors messages={errors} />
        </If>
      </div>
    )
  }
  renderBody() {
    const {
      questions,
      submitting,
    } = this.props
    const css = classnames([
      'panel-default',
      styles.surveyQuestion,
    ])

    if(!questions.length) return null

    return (
      <ol className={styles['survey-question-list']}>
        {questions.map((q, i) =>
          (
            <li
                className={styles['survey-question']}
                key={`question-li-${i}`}
            >
              <Panel
                  className={css}
                  flush
                  key={`question-${i}`}
                  title={q.question}
              >
                <ul className={styles['survey-question-answer-list']}>
                  {q.answers.map((answer, x) => {
                    let otherProps = {
                      onChange: this.handleOnChange.bind(this, [i, x]),
                    }
                    if(submitting) otherProps.disabled = true
                    if(answer.selected) otherProps.checked = true

                    return (
                      <li
                          className={styles['survey-question-answer']}
                          key={`question-${i}-answer-${x}-li`}
                      >
                        <label>
                            <input
                                name={`question-${i}-answer`}
                                type="radio"
                                defaultValue={answer.value}
                                {...otherProps}
                            />
                            <span>
                              {answer.label}
                            </span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </Panel>
            </li>
          )
        )}
      </ol>
    )
  }
  renderFooter() {
    const {
      canSubmit,
      submitting,
    } = this.props

    let props = {
      text: submitting ? "Submitting Answers" : "Submit Answers",
      type: submitting ? "" : "submit",
    }
    if(!canSubmit || submitting) props.disabled = true
    props.className = classnames([
      "btn-primary",
      styles.submit,
    ])
    if(submitting) {
      props.icon = (
        <Icon
            className="mr-3 fa-spin"
            name="spinner"
            spin
        />
      )
    }

    return (
      <Button {...props} />
    )
  }
  renderLoading() {
    return (
      <div className={styles.overlay}>
        <Spinner
            position="centered"
        />
      </div>
    )
  }
  render() {
    const {
      loading,
      questions,
    } = this.props

    return (
      <form
          className={styles.survey}
          onSubmit={this.handleOnSubmit}
      >
        <div>
          <If condition={loading}>{this.renderLoading()}</If>
          {this.renderHeader()}
          <If condition={questions.length > 0}>
            {this.renderBody()}
            {this.renderFooter()}
          </If>
        </div>
      </form>
    )
  }
}