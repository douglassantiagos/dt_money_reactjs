import styled from "styled-components";
import * as RadioGroup from '@radix-ui/react-radio-group';

export const RadioContainer = styled.div`
  display: flex;  
  align-items: center;
  justify-content: flex-start;
  
  label {
    color: ${props => props.theme.white};
    font-size: 0.94rem;
    user-select: 'none';
    margin-left: 0.4rem;
  }
`

export const RadioRoot = styled(RadioGroup.Root)` 
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:focus {
    outline: 0;
    box-shadow: none;
  } 

  div {
    display: flex;
    align-items: center;
  }
`;

export const RadioItem = styled(RadioGroup.Item)`
  background-color: ${props => props.theme["gray-900"]};
  width: 1.562rem;
  height: 1.562rem;
  border-radius: 100%;
  border: 0;
  
  &:hover {
    background-color: ${props => props.theme["gray-900"]};
  }

  &:focus {
    box-shadow: none;
  }

  @media (max-width: 375px) {
    width: 2.2rem;
    height: 1.55rem;
  }
`;

export const RadioIndicator = styled(RadioGroup.Indicator)` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  border: solid 2px ${props => props.theme["green-500"]};

  &::after {
    content: '';
    display: block;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background-color: ${props => props.theme["green-500"]};

    @media (max-width: 375px) {
      width: 70%;
      height: 70%;
    }
  }
`

