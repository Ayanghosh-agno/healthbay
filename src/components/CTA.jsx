import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CTAWrapper = styled.a`
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.alwaysWhite};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontExtraBold};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacingXS} ${({ theme }) => theme.spacingS};
  letter-spacing: 0.09rem;
  box-shadow: 0 10px 26px rgb(125, 65, 255, 0.46);
  transition: all 0.25s linear;

  &:hover,
  &:active {
    box-shadow: 0 15px 35px rgb(125, 65, 255, 0.66);
    filter: hue-rotate(5deg);
  }

  &.inverse {
    background-color: ${({ theme }) => theme.alwaysWhite};
    color: ${({ theme }) => theme.accent};
    box-shadow: none;
  }

  &.ghost {
    background-color: transparent;
    box-shadow: none;
    border: 4px solid transparent;

    &:hover,
    &:active {
      background: #5c2ac7;
    }
  }

  &.ghost-white {
    color: ${({ theme }) => theme.white};
    border: 4px solid ${({ theme }) => theme.white};
    padding: 1rem 3rem;
    box-shadow: none;

    &:hover,
    &:active {
      color: ${({ theme }) => theme.backgroundBlack};
      background-color: ${({ theme }) => theme.white};
    }
  }
`
const CTA = ({ text, className, isApp }) => (
  <CTAWrapper
    href={
      isApp
        ? 'https://app.healthbay.us'
        : 'https://github.com/sandipndev/healthbay'
    }
    target="_blank"
    rel="noopener noreferrer"
    className={className ? `${className} cta` : 'cta'}
  >
    {text}
  </CTAWrapper>
)

CTA.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  isApp: PropTypes.bool
}

export default CTA
