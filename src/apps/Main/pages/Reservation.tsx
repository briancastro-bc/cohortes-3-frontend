import {
  ChangeEvent,
  FC,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Reservation = {
  startDate: string;
  endDate: string;
  nightsQuantity: number;
  roomId: string;
}

type ReservationProps = object;

const Reservation: FC<ReservationProps> = () => {
  const navigate = useNavigate();

  const {
    roomId,
    hotelId,
  } = useParams();

  const [data, setData,] = useState<Reservation>({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    nightsQuantity: 0,
    roomId: roomId!,
  });

  const handleStartDate: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      startDate: value,
    }));
  }

  const handleEndDate: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      endDate: value,
    }));
  }

  const handleNightsQuantity: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = +e.target.value;
    setData((previousState) => ({
      ...previousState,
      nightsQuantity: value,
    }));
  }

  const onSubmit: () => void = async () => {
    Object.entries(data).forEach(([value, key]) => {
      if (!value || value === '') throw new Error(`Valor ${value} invalido para la columna ${key}`);
    });

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/reservations`;
    const request = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhOGNjMDQwZS1hMDJjLTQxMjItYTcxOS1hYWIyNDJjZjUxYzMiLCJleHAiOjE3MjgwMTI1MTYsImlhdCI6MTcyODAwNTMxNiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwIn0.99B5glszM8G8XG9ssnsmBvUnjepDqXNxg4lpWcAQkRw`
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if ('success' in response && response.success) {
      navigate('/');
    }
    console.log('response', response);
  }

  return (
     <section className='h-screen w-full overflow-hidden'>
      <div className='size-full max-w-screen-2xl mx-auto'>
        <div className='size-full flex justify-center items-center'>
          <article className='h-auto w-full max-w-screen-md p-12 shadow-md border border-black rounded-lg'>
            <div className='size-full flex flex-col'>
              <div className='mb-4'>
                <h2 className='text-center text-4xl font-bold'>
                  Crear reserva
                </h2>
              </div>
              <div className='size-full grid grid-cols-2 gap-y-4'>
                <input
                  type='date'
                  placeholder='Nombre'
                  className='col-span-2'
                  value={data?.startDate}
                  onChange={handleStartDate} />
                <input
                  type='date'
                  placeholder='Apellido'
                  className='col-span-2'
                  value={data?.endDate}
                  onChange={handleEndDate} />
                <input
                  type='number'
                  placeholder='Correo electronico'
                  className='col-span-2'
                  value={data?.nightsQuantity}
                  onChange={handleNightsQuantity} />
                <div className='col-span-1'>
                  <button
                    onClick={() => onSubmit()}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Reservation;