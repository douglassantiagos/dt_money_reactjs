import {  CircleNotch } from "phosphor-react";
import { LoadingPageMainContainer } from "./styles";

export function LoadingPageMain() {
  return (
    <LoadingPageMainContainer>
      <CircleNotch weight="bold" size={40}>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        />
      </CircleNotch>
    </LoadingPageMainContainer>
  )
}