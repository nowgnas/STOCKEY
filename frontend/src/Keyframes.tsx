import { keyframes } from "styled-components"

export const shimmer = (shadowColor: string) => keyframes`
  from {
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
  }
  to {
    box-shadow: 0px 0px 30px ${shadowColor}, 0px 4px 8px 3px rgba(0, 0, 0, 0.15);;
  }
`
export const shake = keyframes`
0% {
  transform: rotate(-10deg);
}
25% {
  transform: rotate(10deg);
}
50% {
  transform: rotate(-10deg);
}
75% {
  transform: rotate(10deg);
}

100% {
  transform: rotate(-10deg);
}
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
