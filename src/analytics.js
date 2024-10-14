import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-8DVL6S5VM9');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
