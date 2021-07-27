import React from 'react';
import { Page } from 'react-sketchapp';
import { Box, Text, LayoutProvider } from 'elemental-react';
import { SketchRouter, Switch, Route, Link, withRouter } from 'react-sketchapp-router';

import * as Routes from './routes';
import staticRoutes from './routes/routes';
// import NavOverlay from '../../components/lib/overlays/NavOverlay';

const routes = staticRoutes.map((route) => ({
  ...route,
  component: withRouter(Routes[route.name]),
}));
// const routes = [];

const screens = [{
  name: 'Mobile', width: 360, height: 640,
}, {
  name: 'Tablet', width: 1024, height: 768,
}, {
  name: 'Desktop', width: 1280, height: 1024,
}];

const Home = () => (
  <Box bg="white">
    <Text color="black">Hello World</Text>
  </Box>
);

const components = [
  {
    name: 'NavOverlay',
    path: '/navigation',
    component: withRouter(NavOverlay),
  }
];

// const routes = []

const screensTotalWidth = screens.reduce((acc, { width }) => {
  // eslint-disable-next-line no-param-reassign
  acc += width + 70;

  return acc;
}, 0);

const App = () => {

  return (
    <Page name="App" style={{ flex: 1, display: 'flex', alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', width: screensTotalWidth }}>
      <Home />
      {/* <SketchRouter locations={['/profile/a']} viewport={screens}>
        <Switch>
          {components.concat(routes).map(({ name: routeName, component: Component, path, exact }) => (
            <Route path={path} render={({ match: { params }, viewport, breakpoint }) => {

              return (
                <LayoutProvider breakpoint={breakpoint}>
                  <Component {...params} />
                </LayoutProvider>
              );
            }} exact={exact} />
          ))}
        </Switch>
      </SketchRouter> */}
    </Page>
  );
};

export default App;