export const paddingLeft = (str, lenght) => {
  if (str.length >= lenght) return str
  else return paddingLeft('0' + str, lenght)
}

export const transToKeyCode = str => {
  return str.charCodeAt(0)
}

export const englishChecker = str => {
  const keyCode = transToKeyCode(str.toUpperCase())
  return !(keyCode >= 65 && keyCode <= 90)
}

export default {
  paddingLeft,
  transToKeyCode,
  englishChecker
}
