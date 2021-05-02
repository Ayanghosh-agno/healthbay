/* import React from 'react'
import SectionTitle from './SectionTitle'
import ModuleContent from './ModuleContent'
import { mockups } from '../utils/mockups'
import { device } from '../styles/theme'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ThirdSectionContainer = styled.section`
  width: 90%;
  max-width: 150rem;
  position: relative;
  margin: ${({ theme }) => theme.spacingXXXL} auto 0 auto;

  .sectionTitle {
    text-align: center;
  }

  .modules-grid {
    margin-top: ${({ theme }) => theme.spacingXL};
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 12rem;
    max-width: 185rem;
    padding: 0 30rem 0 9rem;

    @media ${device.laptop} {
      grid-gap: 9rem 12rem;
    }

    @media ${device.laptopXS} {
      padding: 0 18rem 0 9rem;
    }
  }

  img {
    position: absolute;
    right: -13vw;
    bottom: -25rem;
    width: 40rem;

    @media ${device.laptop} {
      width: 30rem;
      bottom: -26rem;
    }

    @media ${device.laptopXS} {
      right: -17vw;
    }
  }

  @media ${device.tablet} {
    .modules-grid {
      padding: 0;
      width: 90%;
      margin: ${({ theme }) => theme.spacingXL} auto 0 auto;
    }

    img {
      display: none;
    }
  }

  @media ${device.mobileL} {
    .modules-grid {
      grid-template-columns: 1fr;
      grid-gap: 9rem;
    }
  }
`

const ThirdSection = ({ theme }) => (
  <ThirdSectionContainer>
    <SectionTitle>
      Track it <span className="accent-color">all</span>
    </SectionTitle>

    <div className="modules-grid">
      <ModuleContent title={'Notes'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat.
      </ModuleContent>

      <ModuleContent title={'Tasks'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat.
      </ModuleContent>

      <ModuleContent title={'Habits'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat.
      </ModuleContent>

      <ModuleContent title={'Expenses'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat.
      </ModuleContent>
    </div>
    <img src={mockups.thirdSection[theme]} alt="Habits Stats page" />
  </ThirdSectionContainer>
)

ThirdSection.propTypes = {
  theme: PropTypes.string.isRequired
}

export default ThirdSection
 */