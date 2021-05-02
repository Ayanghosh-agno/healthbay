import React from 'react'
import styled from 'styled-components/macro'

const LogoWrapper = styled.a`
  font-size: 3.5rem;
  font-weight: ${({ theme }) => theme.fontExtraBold};
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
`

export const Logo = () => (
  <LogoWrapper href="#">
    Health<span className="accent-color">bay</span>
  </LogoWrapper>
)
