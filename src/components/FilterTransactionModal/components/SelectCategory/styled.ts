import styled from "styled-components";
import * as Select from '@radix-ui/react-select';

export const SelectTrigger = styled(Select.Trigger)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 6px;
  padding: 0 1rem;
  font-size: 0.875rem;
  line-height: 1;
  height: 2.75rem;
  gap: 0.5rem;
  border: solid 1px ${props => props.theme["gray-900"]};
  cursor: pointer;
  background: ${props => props.theme["gray-900"]};
  color: ${props => props.theme.white};
`

export const SelectIcon = styled(Select.Icon)`
  color: white;
`

export const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: ${props => props.theme.white};
  border-radius: 4px;
  margin-left: 13px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

export const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
`

export const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const SelectScrollDownButton = styled(Select.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme["green-500"]};
  cursor: default;
`
