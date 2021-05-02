import React from 'react'
import { device } from '../styles/theme'
import styled from 'styled-components/macro'

const ToggleContainer = styled.div`
  position: relative;
`
const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 6.6rem;
  height: 2.9rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${props => props.theme.white};
  border-radius: 34px;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    content: '';
    position: absolute;
    height: 1.8rem;
    width: 1.8rem;
    left: 6px;
    bottom: 5px;
    background-color: ${props => props.theme.alwaysWhite};
    border-radius: 50%;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  &.checked {
    background-color: ${props => props.theme.accent};

    &:before {
      transform: translateX(3rem);
    }
  }

  @media ${device.mobile} {
    &:before {
      bottom: 4px;
    }
  }

  @media ${device.mobileS} {
    &:before {
      bottom: 3px;
    }
  }
`

export const ToggleButton = ({ isChecked, setIsChecked }) => {
  return (
    <ToggleContainer className="toggle-button">
      <Toggle>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
        <Slider className={isChecked ? 'slider checked' : 'slider'} />
      </Toggle>
    </ToggleContainer>
  )
}
