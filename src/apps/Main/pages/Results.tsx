/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useSearchParams, } from 'react-router-dom';

import { Room } from '../../Shared/domain/Room';
import { Hotel } from '../../Shared/domain/Hotel';

import Stepper from '../../Shared/Components/Stepper';
import HotelCard from '../sections/HotelCard';

type ResultsProps = object;

const Results: FC<ResultsProps> = () => {
  const navigate = useNavigate();

  const [queryParams, ,] = useSearchParams();

  const [currentStep, setCurrentStep,] = useState<number>(0);
  const [loading, setLoading,] = useState<boolean>(false);
  const [results, setResults,] = useState<{
    rooms: Array<Room>;
    hotels: Array<Hotel>;
    users: Array<any>;
  }>();

  const getSearchResults: () => Promise<{
    rooms: Array<Room>;
    hotels: Array<Hotel>;
    users: Array<any>;
  }> = useCallback(async () => {
    const value = queryParams.get('value');
    if (!value) return;

    const url = import.meta.env.VITE_BACK_URL;

    const request = await fetch(`${url}/search?value=${value}`, {
      method: 'GET',
    });

    const response = await request.json();
    return response.data;
  }, [queryParams,])

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed)
      getSearchResults()
        .then(setResults)
        .catch(err => console.error(err))
        .finally(() => setLoading(false));

    return () => {
      isSubscribed = false;
    };
  }, [getSearchResults,]);

  useEffect(() => {
    const search = queryParams.get('value');
    if (!search || search?.length === 0) {
      navigate('/');
    }
  }, [queryParams])

  return (
    <section className='w-full min-h-screen h-screen overflow-hidden'>
      <div className='max-w-[1366px] h-full mx-auto py-6'>
        <div className='w-full h-auto flex items-center gap-x-4'>
          {/* PASO 1 */}
          <span 
            className='text-lg leading-4 hover:cursor-pointer'
            style={{
              ...(currentStep === 0 && {
                fontWeight: 700,
                color: 'green',
              }),
            }}
            onClick={() => setCurrentStep(0)}>
            Hoteles
          </span>
          {/* PASO 2 */}
          <span 
            className='text-lg leading-4 hover:cursor-pointer'
            style={{
              ...(currentStep === 1 && {
                fontWeight: 700,
                color: 'green',
              }),
            }}
            onClick={() => setCurrentStep(1)}>
            Habitaciones
          </span>
          {/* PASO 3 */}
          <span 
            className='text-lg leading-4 hover:cursor-pointer'
            style={{
              ...(currentStep === 2 && {
                fontWeight: 700,
                color: 'green',
              }),
            }}
            onClick={() => setCurrentStep(2)}>
            Usuarios
          </span>
        </div>
        <div className='w-full h-full mt-8 flex flex-col justify-start items-start'>
          <Stepper currentStep={currentStep}>
            {/* PASO 1 */}
            <div className='grow h-full w-full flex gap-x-6 flex-wrap'>
              {!loading && results && results?.hotels?.length > 0 && results?.hotels?.map(hotel => (
                <HotelCard key={hotel?.id} hotel={hotel}/>
              ))}
              {loading && (
                <p>Cargando...</p>
              )}
              {!loading && results && results?.hotels?.length <= 0 && (
                <p>No se encontraron hoteles</p>
              )}
            </div>
            {/* PASO 2 */}
            <div className='grow h-full w-full flex gap-x-6 flex-wrap'>
              <ul className='w-full flex flex-col gap-y-4'>
                {!loading && results && results?.rooms?.length > 0 && results?.rooms?.map(room => (
                  <li className='w-full h-80 flex items-center p-6 bg-green-600' key={room?.id}>
                    <div className='h-60 w-60 '>
                      <img className='size-full object-fill' src={room?.photos}/>
                    </div>
                    <div className='flex flex-col'>
                      {room?.codeName}
                      <span>{room?.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {loading && (
                <p>Cargando...</p>
              )}
              {!loading && results && results?.rooms?.length <= 0 && (
                <p>No se encontraron habitaciones</p>
              )}
            </div>
            {/* PASO 3 */}
            <div className='grow h-full w-full flex gap-x-6 flex-wrap'>
              <ul>
                {!loading && results && results?.users?.length > 0 && results?.users?.map(user => (
                  <li key={user?.id}>
                    {user.givenName}
                  </li>
                ))}
              </ul>
              {loading && (
                <p>Cargando...</p>
              )}
              {!loading && results && results?.users?.length <= 0 && (
                <p>No se encontraron usuarios</p>
              )}
            </div>
          </Stepper>
        </div>
      </div>
    </section>
  );
}

export default Results;