import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.css';
import { App as AntdApp } from 'antd';
import MainApp from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.tsx';

const theme = {
   token: {
      colorPrimary: '#c24641',
   },
};

createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <ConfigProvider theme={theme}>
         <BrowserRouter>
            <AntdApp>
               <MainApp />
            </AntdApp>
         </BrowserRouter>
      </ConfigProvider>
   </Provider>
);
