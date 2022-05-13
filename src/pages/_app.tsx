import { ChakraProvider } from '@chakra-ui/react'
import '../styles/global.css';
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS >
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
