import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0; // igual a ( top: 0, right: 0, bottom: 0, left: 0 )
  background: rgba(0,0,0,0.15);  
`;

export const Content = styled(Dialog.Content)`
  @media (max-width: 376px) {
    min-width: 95vw; 
    padding: 2.5rem 2rem;    
  }

  min-width: 50rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
  
  div {
    @media (max-width: 376px) {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;      
  }
`;


interface ButtonHighLightProps {
  variant: 'excluir' | 'cancelar'
}

export const ButtonAction = styled.button<ButtonHighLightProps>`
  @media (max-width: 376px) {
    width: 100%;
    height: 3.2rem; 
  }

  display: flex;
  align-items: center;
  justify-content: center;

  width: 15rem;
  height: 3.625rem;
  border: 0;
  background: ${props => props.variant === 'excluir' 
    ? props.theme["red-500"] 
    : props.theme["gray-600"]
  };
  color: ${props => props.theme.white};
  font-weight: bold;
  border-radius: 6px;
  margin-top: 1.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:not(:disabled):hover {
    background: ${props => props.variant === 'excluir' 
      ? props.theme["red-700"] 
      : props.theme["gray-700"]
    };
    transition: background-color 0.2s;  
  }    
`

export const Title = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme["gray-100"]};

  @media (max-width: 376px) {
    text-align: center;
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

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
  font-size: 1rem;

  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme["gray-700"]};

    &:first-child {
      flex: 1;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    &:nth-child(2) {
      width: 25%;
    }

    &:nth-child(3) {
      width: 20%;
    }
  }

  @media (max-width: 375px) {
    display: none;
  }
`

export const TransactionsCard = styled.div`
  div {
    @media (min-width: 376px) {
      display: none;
    }

    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    padding: 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    background: ${props => props.theme["gray-700"]};

    strong {
      font-size: 1.25rem;
      font-weight: 700;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      color: ${props => props.theme["gray-500"]};

      > span {
        display: flex;
        align-items: center;
        gap: 0.2rem;
      }
    }
  }
`