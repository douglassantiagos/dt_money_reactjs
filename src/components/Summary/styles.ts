import styled, { css } from "styled-components";

export const SummaryContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;

  @media (max-width:375px) {
    gap: 1rem;
    overflow-y: scroll
  }
`

interface SummaryCardProps {
  variant?: "green";
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${props => props.theme["gray-600"]};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme["gray-300"]};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  p {
    margin-top: 0.5rem;
    color: ${props => props.theme["gray-500"]};
    font-size: 1rem;
  }

  ${props => props.variant === 'green' && css`
    background: ${props.theme["green-700"]};
  `}

  @media (max-width:768px) {
    strong {
      font-size: 1.5rem;
    }
  }

  @media (max-width:375px) {
    min-width: 280px;
    padding: 1.5rem 1.8rem;

    p {
      font-size: 0.875rem;
    }

    
  }


`