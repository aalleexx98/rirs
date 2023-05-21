import React from 'react'
import 'react-native-gesture-handler'
import { Navigator } from './src/routes/Navigator'
import { ThemeProvider } from './src/context/themeContext/ThemeContext';
import { AuthProvider } from './src/context/authContext/authContext';

const App = () => {

  return (
    <AppState>
      <Navigator />
    </AppState>
  )
}

const AppState = ({ children }: any) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        { children }
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;