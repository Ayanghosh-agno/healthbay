import React from 'react'
import { Logo } from './Logo'
import { ToggleButton } from './ToggleButton'
import { device } from '../styles/theme'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export const TopbarContainer = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.backgroundBlack};
  z-index: 11;

  .wrapper {
    margin: 0 auto;
    max-width: 200rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacingS};

    .buttons {
      display: flex;
      align-items: center;

      .toggle-button {
        margin-right: ${({ theme }) => theme.spacingM};
      }
    }

    @media ${device.mobileS} {
      .buttons .toggle-button {
        margin-right: ${({ theme }) => theme.spacingS};
      }
    }
  }
`

const Topbar = ({ theme, setTheme }) => {
  const handleCheck = checked => setTheme(checked ? 'dark' : 'light')

  return (
    <TopbarContainer>
      <div className="wrapper">
        <Logo />
        <div className="buttons">
          <ToggleButton
            isChecked={theme === 'dark'}
            setIsChecked={handleCheck}
          />
          <a href="https://github.com/sandipndev/healthbay">
            <img src="https://icons-for-free.com/iconfiles/png/512/code+collaboration+github+network+round+social+icon-1320086084536018107.png" 
            alt="GitHub" width="40" height="40"/>
          </a>
        </div>
      </div>
    </TopbarContainer>
  )
}

Topbar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired
}

export default Topbar
