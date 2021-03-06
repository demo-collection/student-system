import * as React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import pageRouteConfig from './pageRouteConfig';
import RouterContainer from '@src/routers/RouterContainer';

const routes = (
  <Router>
    <ConfigProvider locale={zhCN}>
      <Switch>
        {pageRouteConfig.map((route, index) => {
          const { path, exact, component, title } = route;
          return <RouterContainer key={index} exact={exact} path={path} component={component} title={title} />;
        })}
      </Switch>
    </ConfigProvider>
  </Router>
);

export default routes;
