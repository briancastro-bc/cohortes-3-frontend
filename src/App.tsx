import {
  FC,
  useEffect,
} from 'react';
import { RouterProvider, } from 'react-router-dom';

import router from './Router';

type AppProps = object;

const App: FC<AppProps> = () => {

  useEffect(() => {

    const fetchAllImages = async () => {
      const images = [
        'react copy',
        'react',
      ];

      const allImagesUrls = await Promise.all(
        images.map(async imageName => {
          const image = await import(`./assets/${imageName}.svg`);
          return image.default;
        })
      );

      console.log('all images', allImagesUrls);
    }

    fetchAllImages()
      .then()
      .catch(err => console.error(err));
  }, []);

  return (
    <RouterProvider
      router={router}/>
  );
}

export default App;