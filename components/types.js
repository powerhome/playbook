/* @flow */

export type SurveyQuestions = [
  {
    question: string,
    answers: [{
      label: string,
      value: string | number | Object,
    }],
  }
]

export type IconType = {
  className: string,
  name: string,
  label: string,
  onClick: () => mixed,
  size: string,
  spin: boolean,
  title: string,
}