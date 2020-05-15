import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import VConsole from 'vconsole';
import {Provider} from 'react-redux'
import {ConfigProvider} from "antd";
import zhCn from 'antd/es/locale/zh_CN'
import moment from "moment";
import 'moment/locale/zh-cn'


import The_Layout from './views/layout'

import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./store";
import {BrowserRouter as Router} from "react-router-dom";
moment.locale('zh-cn')

if (process.env.OUR_NODE_ENV !== 'prod') {
    new VConsole();
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router basename={'/appoint/'}>
            <The_Layout>
                <ConfigProvider locale={zhCn}>
                    <App/>
                </ConfigProvider>
            </The_Layout>
            </Router>
        </PersistGate>
    </Provider>
    ,
    document.getElementById('root')
);

