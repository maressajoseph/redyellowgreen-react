import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const green        = '#00AA86'
export const red          = '#D32F2F'
export const yes          = '#18BC97'
export const yess         = '#ffb400'
export const darkRed      = '#C1272D'
export const white        = '#ffffff'
export const black        = '#000000'
export const darkGrey     = '#757575'
export const grey         = '#DEDEDE'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

// Palette
export const palette = {
  primary1Color: yes,
  primary2Color: yess,
  primary3Color: green,
  accent1Color: green,
  textColor: black,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey,
  disabledColor: grey30
}

export default getMuiTheme({ palette })
