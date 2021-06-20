import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createStore } from 'redux';
import { rootReducer } from '../redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
