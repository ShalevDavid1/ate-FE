import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import theme from './styles/theme'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
