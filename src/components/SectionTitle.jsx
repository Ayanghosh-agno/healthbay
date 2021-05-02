import React from 'react'
import { device } from '../styles/theme'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SectionTitleWrapper = styled.h2`
  color: ${({ theme }) => theme.white};
  font-size: 7rem;
  line-height: 9rem;
  font-weight: ${({ theme }) => theme.fontBold};

  @media ${device.tablet} {
    font-size: 6rem;
    line-height: 7.5rem;
  }
`
const SectionTitle = ({ children }) => (
  <SectionTitleWrapper className="sectionTitle">{children}</SectionTitleWrapper>
)

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
}

export default SectionTitle
