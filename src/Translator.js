import React, { Component } from 'react'
import { paddingLeft, transToKeyCode, englishChecker } from './utility'

class Translator extends Component {
  state = {
    userInput: ''
  }
  userInputOnChange = ({ target: { value } }) => {
    this.setState({ userInput: value })
  }
  get transToResult() {
    const { userInput } = this.state
    const eachKeys = userInput.split('')
    if (eachKeys.length === 0) return '請輸入字元'
    if (englishChecker(eachKeys[0]) || eachKeys.length !== 10)
      return '請輸入有效身分證'

    const firstKey = eachKeys[0]
    eachKeys.splice(0, 1)

    return `26660${this.transEnglishToNumber(firstKey)}${eachKeys.join('')}`
  }
  transEnglishToNumber = str => {
    const result = transToKeyCode(str)
    return paddingLeft(result - 64, 2)
  }
  render() {
    const { userInput } = this.state
    return pug`
      div
        input(
          type="text"
          className="new-todo"
          placeholder="請輸入身分證字號"
          value=userInput
          onChange=this.userInputOnChange
        )
        h2 結果: ${this.transToResult}
    `
  }
}

export default Translator
