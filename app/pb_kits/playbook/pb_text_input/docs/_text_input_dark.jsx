import React from 'react'
import {
  Caption,
  TextInput,
  Title,
} from '../../'

class TextInputDark extends React.Component {
    state = {
      firstName: '',
    }

    render() {
      const handleOnChange = ({ target }) => this.setState({ firstName: target.value })

      const {
        firstName,
      } = this.state

      return (
        <div>
          <TextInput
              dark
              label="First Name"
              placeholder="Enter first name"
              value="Timothy Wenhold"
          />
          <TextInput
              dark
              label="Last Name"
              placeholder="Enter last name"
          />
          <TextInput
              dark
              label="Phone Number"
              placeholder="Enter phone number"
              type="phone"
          />
          <TextInput
              dark
              label="Email Address"
              placeholder="Enter email address"
              type="email"
          />
          <TextInput
              dark
              label="Zip Code"
              placeholder="Enter zip code"
              type="number"
          />

          <br />
          <br />

          <Title dark>{'Event Handler Props'}</Title>

          <br />
          <Caption>{'onChange'}</Caption>

          <br />

          <TextInput
              dark
              label="First Name"
              onChange={handleOnChange}
              placeholder="Enter first name"
              value={firstName}
          />

          <If condition={firstName !== ''}>
            {`First name is: ${firstName}`}
          </If>
        </div>
      )
    }
}

export default TextInputDark
