import React from "react"
import {
  Caption,
  TextInput,
  Title,
} from "../../"

class TextInputDark extends React.Component {
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
                    dark
                />
                <TextInput
                    label="Last Name" 
                    placeholder="Enter last name" 
                    dark  
                />
                <TextInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    type="phone"
                    dark
                />
                <TextInput
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    dark
                />
                <TextInput
                    label="Zip Code"
                    placeholder="Enter zip code"
                    type="number"
                    dark
                />

                <br/>
                <br/>

                <Title dark>{`Event Handler Props`}</Title>

                <br/>
                <Caption>{`onChange`}</Caption>

                <br/>

                <TextInput
                    label="First Name"
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                    value={firstName}
                    dark
                />

                <If condition={firstName !== ""}>
                {`First name is: ${firstName}`}
                </If>
            </div>
        )
    }
}
  
export default TextInputDark
