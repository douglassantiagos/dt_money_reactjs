import styled from "styled-components";
import * as Checkbox from '@radix-ui/react-checkbox';

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

