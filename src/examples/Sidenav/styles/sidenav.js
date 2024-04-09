/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// const { palette, boxShadows, functions, transitions, breakpoints, borders } = theme;

export default function sidenavLogoLabel(theme, ownerState) {
  const { functions, transitions, typography, breakpoints, palette } = theme;
  const { miniSidenav, transparentNavbar, absolute, light, darkMode } = ownerState;
  const { dark, white, text, transparent, background } = palette;

  // const { pxToRem } = functions;
  const { rgba, pxToRem } = functions;

  const { fontWeightMedium } = typography;

  return {
    // ml: 0.5,
    fontWeight: fontWeightMedium,
    // backgroundColor: rgba(darkMode ? background.default : white.main, 0.8),

    wordSpacing: pxToRem(-1),
    transition: transitions.create("opacity", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav ? 0 : 1,
    },
  };
}
