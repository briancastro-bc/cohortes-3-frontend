import {
  FC,
} from 'react';
import { RouterProvider, } from 'react-router-dom';

import router from './Router';

type AppProps = object;

const App: FC<AppProps> = () => {
  return (
    <RouterProvider
      router={router}/>
  );
}

export default App;