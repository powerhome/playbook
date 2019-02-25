import React, {Component} from 'react'

import Select from 'react-select'

type Props = {
  multi?: boolean,
  autosize?: boolean,
  autoload?: boolean,
  async?: boolean,
  disabled?: boolean,
}

export default class SearchCollectionSelect extends Component<Props> {
  static defaultProps = {
    multi: true,
    autosize: true,
    autoload: true,
    async: true,
    disabled: false,
  }
  props: Props
  render() {
    if(this.props.async) {
      return <Select.Async {...this.props}/>;
    } else {
      return <Select {...this.props}/>;
    }
  }
}