import React from 'react'
import Topbar from '../components/Topbar'
import FirstSection from '../components/FirstSection'
import SecondSection from '../components/SecondSection'
import ThirdSection from '../components/ThirdSection'
import FourthSection from '../components/FourthSection'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import SEO from '../components/SEO'
import { useLocalStorage } from '../utils/useLocalStorage'
import { darkTheme, lightTheme } from '../styles/theme'
import { GlobalStyle } from '../styles/globalStyles'
import { ThemeProvider } from 'styled-components'

const IndexPage = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <main>
        <SEO />
        <Topbar theme={theme} setTheme={setTheme} />
        <FirstSection theme={theme} />
        <SecondSection />
        <Banner theme={theme} />
        <ThirdSection theme={theme} />
        <FourthSection theme={theme} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default IndexPage
