import React from 'react'
import CTA from './CTA'
import SectionTitle from './SectionTitle'
import SectionText from './SectionText'
import { mockups } from '../utils/mockups'
import { device } from '../styles/theme'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FirstSectionContainer = styled.section`
  width: 90%;
  margin: ${({ theme }) => theme.spacingXXL} auto 0 auto;
  max-width: 150rem;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: ${({ theme }) => theme.spacingXL};
  align-items: center;

  .text {
    .sectionText {
      margin-top: ${({ theme }) => theme.spacingS};
    }

    .cta {
      display: inline-block;
      margin-top: ${({ theme }) => theme.spacingM};
    }
  }

  .desktop-only {
    display: block;
  }

  .mobile-only {
    display: none;
  }

  .cta {
    font-size: 2rem;
    padding: 2rem 4rem;
  }

  img {
    max-width: 100%;

    @media ${device.laptopXS} {
      width: 60rem;
    }
  }

  @media ${device.tabletXL} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 6rem;
  }

  @media ${device.tablet} {
    margin: 24rem auto 0 auto;
    grid-template-columns: 1fr;
    grid-gap: 9rem;

    img {
      margin: 0 auto;
    }

    .text {
      text-align: center;
      margin: 0 auto;
    }

    .text .desktop-only {
      display: none;
    }

    .mobile-only {
      display: block;
      text-align: center;
      margin-top: ${({ theme }) => theme.spacingM};
    }
  }
`

const FirstSection = ({ theme }) => (
  <FirstSectionContainer>
    <div className="text">
      <SectionTitle>
        Healthcare <br className="desktop-only" />
        made <span className="accent-color">easy</span>.
      </SectionTitle>
      <SectionText>
        Keeping track of everything doesn't have to be hard. Find out how.
      </SectionText>
      <CTA text={'Download Now!'} className="desktop-only" />
    </div>
    <img src={mockups.firstSection[theme]} alt="Home and habits page" />
    <div className="mobile-only">
      <CTA text={'Download Now!'} />
    </div>
  </FirstSectionContainer>
)

FirstSection.propTypes = {
  theme: PropTypes.string.isRequired
}

export default FirstSection
