import React from 'react'
import CTA from './CTA'
import { mockups } from '../utils/mockups'
import { device } from '../styles/theme'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BannerContainer = styled.div`
  width: 90%;
  min-height: 60rem;
  max-width: 175rem;
  margin: ${({ theme }) => theme.spacingXXXL} auto 0 auto;
  background-color: ${({ theme }) => theme.accent};
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 50px;
  overflow: hidden;

  .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .wrapper {
      transform: translateY(-1rem);

      h3 {
        color: ${({ theme }) => theme.alwaysWhite};
        font-size: 4.6rem;
        line-height: 7.2rem;
        font-weight: ${({ theme }) => theme.fontBold};
      }

      .buttons {
        margin-top: ${({ theme }) => theme.spacingL};

        .cta:nth-child(2) {
          margin-left: ${({ theme }) => theme.spacingS};
        }
      }
    }
  }

  .mockup {
    height: 100%;
    position: relative;

    img {
      width: 40rem;
      position: absolute;
      bottom: -13rem;
      left: 20%;
    }
  }

  @media ${device.laptopXS} {
    min-height: 50rem;
    grid-template-columns: 3fr 2fr;

    .content {
      padding-left: ${({ theme }) => theme.spacingS};
    }

    .mockup img {
      width: 35rem;
      left: 5%;
    }
  }

  @media ${device.tablet} {
    min-height: 82rem;
    max-width: 60rem;
    grid-template-columns: 1fr;

    .content {
      align-items: flex-start;
      padding-top: ${({ theme }) => theme.spacingL};
      padding-left: 0;
      flex-direction: unset;

      .wrapper h3 {
        font-size: 4rem;
        line-height: 6.4rem;
      }

      .wrapper .buttons {
        margin-top: ${({ theme }) => theme.spacingM};
        text-align: center;
      }
    }

    .mockup img {
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }

  @media ${device.mobileL} {
    max-width: unset;
    width: 100%;

    .content {
      padding-left: ${({ theme }) => theme.spacingS};
      padding-right: ${({ theme }) => theme.spacingS};

      .wrapper h3 {
        font-size: 3.8rem;
        line-height: 5.9rem;
      }
    }
  }

  @media ${device.mobile} {
    .content {
      .wrapper h3 {
        font-size: 3.4rem;
        line-height: 5.4rem;
      }

      .wrapper .buttons .cta:nth-child(2) {
        display: block;
        margin: ${({ theme }) => theme.spacingS}; 0 0 0;
      }
    }
  }
`

const Banner = ({ theme }) => (
  <BannerContainer>
    <div className="content">
      <div className="wrapper">
        <h3>
          Everything you need 
          <br />
          at a single place!
        </h3>
        <div className="buttons">
          <CTA text={'Explore!'} className={'inverse'} isApp />
          <CTA text={'View Source'} className={'ghost'} />
        </div>
      </div>
    </div>
    <div className="mockup">
      <img src={mockups.banner[theme]} alt="Signup page" />
    </div>
  </BannerContainer>
)

Banner.propTypes = {
  theme: PropTypes.string.isRequired
}

export default Banner
