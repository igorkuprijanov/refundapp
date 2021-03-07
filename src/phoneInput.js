import React, {useState} from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import './App.css'

function Phone() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState()
  return (
    <PhoneInput
      placeholder="558844423"
      value={value}
      onChange={setValue}
       flags={flags}
       defaultCountry="NL"
       id='phoneNumber'/>
  )
}

export default Phone