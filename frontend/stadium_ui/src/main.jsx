// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'
// import { ChakraProvider, theme } from '@chakra-ui/react'

// ReactDOM.render(
//   <React.StrictMode>
//     <ChakraProvider theme={theme}>
//       <App />
//     </ChakraProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
 document.getElementById('root')
)