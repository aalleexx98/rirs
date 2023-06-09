import React from 'react'
import 'react-native-gesture-handler'
import { Navigator } from './src/routes/Navigator'
import { ThemeProvider } from './src/context/themeContext/ThemeContext';
import { AuthProvider } from './src/context/authContext/authContext';
import { RoutineProvider } from './src/context/routineContext/routineContext';

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
        <RoutineProvider>
          { children }
        </RoutineProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;