/**
 * @format
 */
import { TamaguiProvider } from 'tamagui'

import config from './tamagui.config'

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';


export default function TamaguiApp() {
    return (
      <TamaguiProvider config={config}>
        <App />
      </TamaguiProvider>
    )
  }

AppRegistry.registerComponent(appName, () => TamaguiApp);
