import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react';
import { Navigator } from './src/routes/Navigator'
import { ThemeContext, ThemeProvider } from './src/context/themeContext/ThemeContext';
import { AuthProvider } from './src/context/authContext/authContext';

const App = () => {

  const { theme } = useContext(ThemeContext);

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