import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import styled from 'styled-components';

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0; // igual a ( top: 0, right: 0, bottom: 0, left: 0 )
  background: rgba(0,0,0,0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme['gray-800']};
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width:425px) {
    min-width: 90%;
    border-radius: 1.25rem;
    padding: 2.5rem 1.5rem;

    left: 0;
    right: 0;
    top: none;
    transform: translate(0, -50%); 
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;    
    margin-top: 2rem;  

    strong {
      color: ${props => props.theme['gray-400']}
    }
    
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      p {
        width: 25%;
      }

      > div {
        flex: 1;
        display: flex;
        gap: 2rem;
      }

      @media (max-width:425px) {
        p {
          width: 30%;
        }
      }
    }

    button[type="submit"] {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 58px;
      border: 0;
      background: ${props => props.theme['green-500']};
      color: ${props => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${props => props.theme['green-700']};
        transition: background-color 0.2s;

      }

      @media (max-width: 425px) {
        height: 48px;
      }
    }    

    button[type="reset"] {
      display: flex;
      align-items: center;
      justify-content: center;

      height:58px;
      border: 0;
      background:  ${props => props.theme['gray-600']};
      color: ${props => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 0.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${props => props.theme['gray-700']};
        transition: background-color 0.2s;
      }

      @media (max-width: 425px) {
        height: 48px;
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme['gray-500']};

  @media (max-width: 425px) {
    top: 1.8rem;
  }
`;

export const Separator = styled.span`
  height: 1px;
  background: ${props => props.theme.white};
`;

export const CheckboxContainer = styled.div`
  display: flex;  
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  label {
    color: ${props => props.theme.white};
    font-size: 1rem;
    user-select: 'none';
  }
`

export const CheckboxRoot = styled(Checkbox.Root)` 
  all: unset;
  width: 24px;
  height: 24px;
  background-color: ${props => props.theme.white};
  border-radius: 4px;
`;

export const CheckboxIndicator  = styled(Checkbox.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  :focus {
    outline: 0;
    box-shadow: none;
  }
  
  &[data-state="checked"] {
    border-radius: 3px;
    color: ${props => props.theme.white};
    background: ${props =>props.theme['green-500']};
  }
`;




