import '../styles/globals.css'
import { Fragment } from 'react'
import Navbar from '../components/Navbar'
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Navbar />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
