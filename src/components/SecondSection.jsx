import React from 'react'
import SectionTitle from './SectionTitle'
import SectionText from './SectionText'
import styled from 'styled-components'

const SecondSectionContainer = styled.section`
  width: 90%;
  margin: ${({ theme }) => theme.spacingXXXL} auto 0 auto;

  .sectionTitle,
  .sectionText {
    text-align: center;
  }

  .sectionText {
    line-height: 5.5rem;
  }
`

const SecondSection = () => (
  <SecondSectionContainer>
    <SectionTitle>
      Every care <span className="accent-color">you</span> need
    </SectionTitle>
    <SectionText limitWidth>
    The <b>COVID-19</b> pandemic has turned all of our lives upsides down, 
    putting some health systems under immense pressure and stretched 
    others beyond their capacity. Failure to protect health care in 
    this rapidly changing context is exposing health systems to critical 
    gaps in services when they are most needed, and can have a long-lasting 
    impact on the health and wellbeing of populations. That's why we 
    made <b>Healthbay ― Your complete healthcare solution!</b>
    </SectionText>
  </SecondSectionContainer>
)

export default SecondSection
