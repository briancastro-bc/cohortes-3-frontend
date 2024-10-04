import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate, useParams, } from 'react-router-dom';

import { Hotel, } from '../../Shared/domain/Hotel';
import Button from '../../Shared/Components/Button';

type SelectedHotelProps = object;

const SelectedHotel: FC<SelectedHotelProps> = () => {
  const navigate = useNavigate();

  const { 
    id,
  } = useParams();

  const [loading, setLoading,] = useState<boolean>(false);
  const [hotel, setHotel,] = useState<Hotel | null>(null);

  const getHotelById: () => Promise<Hotel> = useCallback(async () => {
    const url = import.meta.env.VITE_BACK_URL;

    const request = await fetch(`${url}/hotels/${id}`, {
      method: 'GET',
    });

    const response = await request.json();
    return response.data as Hotel;
  }, [id,]);

  useEffect(() => {
    setLoading(true);
    let isSubscribed = true;

    if (isSubscribed)
      getHotelById()
        .then(setHotel)
        .catch(err => console.error(err))
        .finally(() => setLoading(false))

    return () => {
      isSubscribed = false;
    }
  }, [getHotelById,]);

  return (
    <>
      {loading && (
        <p>Cargando...</p>
      )}
      {!loading && (
        <section className='h-screen w-full overflow-hidden'>
          <div className='size-full max-w-screen-2xl mx-auto px-6 py-6'>
            <div className='size-full flex gap-x-6'>
              <div className='size-full flex flex-col gap-y-4 overflow-y-auto'>
                {hotel?.rooms && hotel?.rooms.length > 0 && hotel?.rooms.map(room => (
                  <div className='flex flex-col p-4 rounded-md border border-gray-400' key={room.id}>
                    <h2>{room?.codeName}</h2>
                    <p>{room?.description}</p>
                    <div className='flex flex-col'>
                      <span>Camas: {room?.bedsQuantity}</span>
                      <span>Capacidad: {room?.capacity}</span>
                    </div>
                    <Button
                      onClick={() => navigate(`reservation/${room?.id}`)}>
                      Reservar
                    </Button>
                  </div>
                ))}
              </div>
              <div className='size-full flex flex-col items-center justify-center'>
                <div className='size-full flex flex-col gap-y-4'>
                  <img className='rounded-lg' src={hotel?.photo} alt={hotel?.name} />
                  <div>
                    <h2 className='font-sans text-4xl font-bold'>{hotel?.name}</h2>
                    <p>{hotel?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default SelectedHotel;