import styled from "styled-components";

export const TransactionsContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 2rem auto 0;
  padding: 0 1.5rem 2rem 1.5rem; 

  div {
    margin-top: 1.5rem;
  }
  
  @media (max-width:375px) {
    margin: 2rem auto 0;

    div {
      margin-top: 0;
    }
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 25vh;
  color: ${props => props.theme["gray-400"]};
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {

  }

  td {
    padding: 1.25rem 0.5rem;
    background: ${props => props.theme["gray-700"]};

    &:first-child {
      padding: 0 2rem;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      padding: 0 0.5rem;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    &:nth-child(2) {
      width: 20%;
    }

    &:nth-child(3) {
      width: 20%;
    }
  }  

  @media (max-width: 375px) {
    display: none;
  }
`

interface ButtonHighLightProps {
  variant: 'editar' | 'excluir'
}

export const ButtonIcon = styled.button<ButtonHighLightProps>`
  background: transparent;
  border: 0;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme["gray-100"]};
  padding: 0.3rem;
  border-radius: 6px;

  &:hover {
    color: ${props => props.theme["gray-700"]};
    background: ${props => props.variant === 'editar' 
      ? props.theme["green-300"] : props.theme["red-300"]
    };
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${props => props.variant === 'income'
    ? props.theme["green-300"] : props.theme["red-300"]
  };  
`

export const TransactionsDescription = styled.div` 
  display: flex;
  justify-content: space-between;

  span {
    color: ${props => props.theme["gray-300"]};
  }

  p {
    color: ${props => props.theme["gray-500"]};
  }

  @media (min-width: 376px) {
    justify-content: flex-start;
    gap: 0.5em;
  }
`

export const TransactionsCard = styled.div`  
  > div {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border-radius: 6px;
    margin-top: 1rem;
    background: ${props => props.theme["gray-700"]};

    strong {
      font-size: 1.25rem;
      font-weight: 700;
    }
  }

  @media (min-width: 376px) {
    display: none;
  }
`

export const TopContentCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${props => props.theme["gray-300"]};
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`

export const BottomContentCard = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  color: ${props => props.theme["gray-500"]};
  
  span {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`

export const TransactionsNotFound = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  gap: 0.5rem;
  color: ${props => props.theme["gray-500"]};

  @media (max-width: 376px) {
    display: none;
  }
`

export const FilterSelected = styled.div`
  color: ${props => props.theme["gray-400"]}; 
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  span {
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    background: ${props => props.theme["gray-700"]};
  } 
  
  @media (max-width: 376px) {
    div {
      margin: 1rem 0;
      display: flex;
      flex-wrap: wrap;
    }
  } 
`

export const ButtonResetFilter = styled.button`
  padding: 0.5rem; 
  border-radius: 4px;
  border: 0;
  background: ${props => props.theme["green-500"]};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  font-size: 0.875rem;
  color: ${props => props.theme["gray-100"]};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme["green-700"]};
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
`