export const theme = {
  spacingXS: '1.5rem',
  spacingS: '3rem',
  spacingM: '6rem',
  spacingL: '9rem',
  spacingXL: '12rem',
  spacingXXL: '18rem',
  spacingXXXL: '33rem',
  fontFamily: '"Jost", sans-serif',
  fontLight: 300,
  fontRegular: 400,
  fontBold: 700,
  fontExtraBold: 800,
  borderRadius: '50px',
  alwaysWhite: '#ffffff',
  blueGradient: `linear-gradient(210deg, #08b0fd 0%, #81d1f5 100%);`,
  purpleGradient: `linear-gradient(210deg, #8925fd 0%, #be88fa 100%);`,
  pinkGradient: `linear-gradient(210deg, #fd0853 0%, #ef91ae 100%);`,
  greenGradient: `linear-gradient(210deg, #1db74d 0%, #5dffba 100%);`,
  accent: '#3B82F6'
}

export const darkTheme = {
  ...theme,
  white: '#fff',
  offWhite: '#dedede',
  black: '#1A1B1F',
  backgroundBlack: '#1F2128',
  hoverBlack: '#1d1f25',
  darkenAccent: '#3e2377',
  grey: '#757575',
  surfacesBlack: '#222733',
  activeBackground: '#30323a'
}

export const lightTheme = {
  ...theme,
  white: '#333333',
  offWhite: '#444444',
  black: '#eaeaea',
  backgroundBlack: '#ffffff',
  hoverBlack: '#d5d6d6',
  darkenAccent: '#3e2377',
  grey: '#9e9e9e',
  surfacesBlack: '#eaeaea',
  activeBackground: '#cecece'
}

const size = {
  mobileXS: '320px',
  mobileS: '380px',
  mobile: '430px',
  mobileL: '550px',
  tabletXS: '800px',
  tablet: '1050px',
  tabletXL: '1200px',
  laptopXS: '1350px',
  laptop: '1600px',
  laptopL: '1792px',
  desktop: '1920px',
  desktopL: '2200px',
  desktopXL: '2560px'
}

export const device = {
  mobileXS: `(max-width: ${size.mobileXS})`,
  mobileS: `(max-width: ${size.mobileS})`,
  mobile: `(max-width: ${size.mobile})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletXS: `(max-width: ${size.tabletXS})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletXL: `(max-width: ${size.tabletXL})`,
  laptopXS: `(max-width: ${size.laptopXS})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktopL})`,
  desktopXL: `(max-width: ${size.desktopXL})`
}
