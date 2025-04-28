import React from 'react'
import PhoneNumberInput from '../_phone_number_input'

const PhoneNumberInputCountrySearch = (props) => (
    <>
        <PhoneNumberInput
            countrySearch
            id='country-search'
            {...props} 
        />
        <PhoneNumberInput
            countrySearch
            id='country-search-limited'
            onlyCountries={["br", "us", "ph", "gb"]}
            {...props} 
        />
    </>
)

export default PhoneNumberInputCountrySearch
