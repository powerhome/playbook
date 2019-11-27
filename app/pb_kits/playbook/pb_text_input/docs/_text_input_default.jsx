import React from "react"
import {
  Caption,
  TextInput,
  Title,
} from "../../"

class TextInputDefault extends React.Component {
  state = {
    firstName: ""
  }

  render() {
    const handleOnChange = ({target}) => this.setState({firstName: target.value})

    const {
      firstName,
    } = this.state

    return (
      <div>
        <TextInput
            label="First Name"
            placeholder="Enter first name"
            value="Timothy Wenhold"
        />
        <TextInput
            label="Last Name"
            placeholder="Enter last name"
        />
        <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            type="phone"
        />
        <TextInput
            label="Email Address"
            placeholder="Enter email address"
            type="email"
        />
        <TextInput
            label="Zip Code"
            placeholder="Enter zip code"
            type="number"
        />

        <br/>
        <br/>

        <Title>{`Event Handler Props`}</Title>

        <br/>
        <Caption>{`onChange`}</Caption>

        <br/>

        <TextInput
            label="First Name"
            onChange={handleOnChange}
            placeholder="Enter first name"
            value={firstName}
        />

        <If condition={firstName !== ""}>
          {`First name is: ${firstName}`}
        </If>
      </div>
    )
  }
}

export default TextInputDefault
