import {
  FC,
  useState,
  ChangeEvent,
} from 'react';

import Test from './Test';

type AppProps = object;

const App: FC<AppProps> = () => {
  const [counter, setCounter,] = useState<number>(0);
  const [increment, setIncrement,] = useState<number>(1);

  const handleDecrement: () => void = () => {
    setCounter(counter - increment);
  };

  const handleIncrement: () => void = () => {
    setCounter(counter + increment);
  };

  const handleReset: () => void = () => {
    setCounter(0);
  }

  const handleInputIncrement: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = +e.target.value;
    if (typeof value !== 'number') return;

    setIncrement(value);
  }

  // const handleKeyDown: (event: KeyboardEvent) => void = useCallback((e) => {
  //   if (e.key === '+') setCounter(counter + increment);
  //   if (e.key === '-') setCounter(counter + increment);
  // }, []);

  // UN USE EFFECT SOLO SE EJECUTA UNA UNICA VEZ SI NO TIENE PARAMETROS EN EL ARRAY DE DEPENDENCIAS.
  // useEffect(() => {
  // }, []);

  // UN USE EFFECT SE EJECUTA VARIAS VECES SI TIENE PARAMETROS CAMBIANTES EN EL ARRAY DE DEPENDENCIAS.
  // useEffect(() => {
  //   console.log('EJECUTANDO USE EFFECT CON PARAMETROS');
  // }, [counter,]);

  return (
    <div className='p-6'>
      <h1>Hola mundo!</h1>
      <div className='flex flex-col gap-y-4'>
        <input 
          type='number' 
          placeholder='Incremento del contador'
          value={increment}
          onChange={handleInputIncrement}/>
        <span>Contador: {counter}</span>
      </div>
      <div className='flex items-center mt-4 gap-x-4'>
        <button 
          className='bg-red-500'
          onClick={() => handleDecrement()}>
          - Decrementar
        </button>
        <button
          className='bg-yellow-500'
          onClick={() => handleReset()}>
          Reiniciar
        </button>
        <button 
          className='bg-green-500'
          onClick={() => handleIncrement()}>
          + Incrementar
        </button>
      </div>
      {counter > 5 && (
        <Test/>
      )}
    </div>
  );
}

export default App;