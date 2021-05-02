import React from 'react'
import CTA from './CTA'
import { device } from '../styles/theme'
import styled from 'styled-components'

const FooterContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.black};
  margin-top: 30rem;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 20rem;
    top: -20rem;
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.black},
      rgba(0, 0, 0, 0)
    );
  }

  h3 {
    color: ${({ theme }) => theme.white};
    font-weight: ${({ theme }) => theme.fontBold};
    font-size: 4.4rem;
    line-height: 6.7rem;
    margin-right: ${({ theme }) => theme.spacingXL};
  }

  .buttons {
    .cta:nth-child(2) {
      margin-left: ${({ theme }) => theme.spacingS};
    }
  }

  .footer {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    color: ${({ theme }) => theme.offWhite};
    font-size: 1.3rem;
    text-align: center;
  }

  @media ${device.tablet} {
    flex-direction: column;

    h3 {
      margin-right: 0;
    }

    .buttons {
      margin-top: ${({ theme }) => theme.spacingL};
    }
  }
`

const Footer = () => (
  <FooterContainer>
    <h3>
      Delve deep to explore <br />
      <span className="accent-color">more</span> today. Try it!
    </h3>
    <div className="buttons">
      <CTA text="Explore" isApp />
      <CTA text="Source" className="ghost ghost-white" />
    </div>
    <p className="footer">©SharnoxZ 2021</p>
  </FooterContainer>
)

export default Footer
