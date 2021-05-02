import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import AmbulanceIcon from '../images/svg/ambulance.svg'
import TasksIcon from '../images/svg/tasks.svg'
import HabitsIcon from '../images/svg/habits.svg'
import ExpensesIcon from '../images/svg/expenses.svg'
import { device } from '../styles/theme'

const ModuleWrapper = styled.div`
  .header {
    display: flex;
    align-items: flex-end;

    .glow {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.5rem;
      height: 5.5rem;
      background: ${({ theme }) => theme.pinkGradient};
      border-radius: 8px;

      &:before {
        content: '';
        width: 82%;
        height: 93%;
        position: absolute;
        top: 12%;
        left: 0px;
        right: 0px;
        margin: 0px auto;
        filter: blur(31px);
        opacity: 0.7;
        border-radius: 8px;
        background: ${({ theme }) => theme.pinkGradient};
        z-index: -1;
      }

      &.tasks,
      &.tasks:before {
        background: ${({ theme }) => theme.purpleGradient};
      }

      &.habits,
      &.habits:before {
        background: ${({ theme }) => theme.greenGradient};
      }

      &.expenses,
      &.expenses:before {
        background: ${({ theme }) => theme.blueGradient};
      }

      svg {
        width: 4rem;
        fill: ${({ theme }) => theme.alwaysWhite};
      }
    }

    h4 {
      color: ${({ theme }) => theme.white};
      font-size: 3rem;
      font-weight: ${({ theme }) => theme.fontExtraBold};
      margin-left: ${({ theme }) => theme.spacingS};
    }
  }

  p {
    max-width: 40rem;
    font-size: 1.6rem;
    line-height: 3.2rem;
    font-weight: ${({ theme }) => theme.fontLight};
    margin-top: ${({ theme }) => theme.spacingS};
  }

  @media ${device.mobileL} {
    margin: 0 auto;
  }
`

const ModuleContent = ({ title, children }) => {
  let icon

  switch (title) {
    case 'Ambulance':
      icon = <AmbulanceIcon />
      break

    case 'Tasks':
      icon = <TasksIcon />
      break

    case 'Expenses':
      icon = <ExpensesIcon />
      break

    default:
      icon = <HabitsIcon />
  }

  return (
    <ModuleWrapper>
      <div className="header">
        <div className={`glow ${title.toLowerCase()}`}>{icon}</div>
        <h4>{title}</h4>
      </div>
      <p>{children}</p>
    </ModuleWrapper>
  )
}

ModuleContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default ModuleContent
