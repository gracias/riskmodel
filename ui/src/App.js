import { ConfigProvider } from 'antd';
import './App.css';
import AppLanding from './pages/AppLanding/AppLanding.js';



function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{

          components: {
            Table: {
              headerColor: '#EDEDED',
              rowHoverBg: 'transparent',
              headerBg: '#2D2C32',
              footerBg: '#EDEDED'
            },
            Input: {
              activeBorderColor: '#EDEDED',
              activeBg: '#07060E',
              hoverBg: '#07060E',
              hoverBorderColor: '#EDEDED'

            },
            Button: {
              defaultHoverBg: '#7A46F3'
            },
            Steps: {
              navArrowColor: 'red'
            }
          }
          ,
          token: {
            // Seed Token
            colorPrimary: '#7A46F3',
            // borderRadius: 2,
            colorBgBase: ' #07060E',
            // Alias Token
            // colorBgContainer: '#f6ffed',
            colorTextBase: '#EDEDED',
            colorBorder: '#B48DFF',
            colorBorderSecondary: 'linear-gradeint(#393842, #3B3A40)',
            colorBgContainer: '#07060E',
            // colorBorder: '#EDEDED'

          },
        }}
      >
        <AppLanding />
      </ConfigProvider>
    </div>
  );
}

export default App;
