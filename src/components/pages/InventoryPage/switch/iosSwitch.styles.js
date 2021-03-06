import { withTheme } from "@emotion/react";
import transitions from "@material-ui/core/styles/transitions";

const pxToRem = (px, oneRemPx = 16) => `${px / oneRemPx}rem`;

export default theme => {
  const spacing = 8;
  const size = pxToRem(18);
  const width = pxToRem(40 + 2 * spacing);
  const borderWidth = 2;
  const height = `calc(${size} + ${borderWidth * 2}px + ${pxToRem(
    2 * spacing
  )})`;
  return {
    root: {
      width,
      height,
      padding: pxToRem(spacing),
      margin: 0,
    },
    switchBase: {
      padding: borderWidth,
      top: pxToRem(spacing),
      left: pxToRem(spacing),
      '&$checked': {
        transform: `translateX(calc(${width} - ${size} - ${borderWidth * 2}px - ${pxToRem(2 * spacing)}))`,
        color: `#fff`,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: size,
      height: size,
      boxShadow:
        '0 3px 8px 0 rgba(0,0,0,0.15), 0 1px 1px 0 rgba(0,0,0,0.16), 0 3px 1px 0 rgba(0,0,0,0.1)',
    },
    track: {
      backgroundColor: '#4c4c4c',
      borderRadius: 40,
          opacity: 1,
          border: 'none',
      transition: transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  };
};