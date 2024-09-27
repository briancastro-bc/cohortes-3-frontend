import {
  FC,
  useState,
  ChangeEvent,
  useRef,
} from 'react';

import Test from './Test';

type AppProps = object;

const App: FC<AppProps> = () => {
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  const [counter, setCounter,] = useState<number>(0);
  const [increment, setIncrement,] = useState<number>(1);

  const handleDecrement: () => void = () => {
    setCounter(counter - increment);
    handleChangeFontsize(counter);
  };

  const handleIncrement: () => void = () => {
    setCounter(counter + increment);
    handleChangeFontsize(counter);
  };

  const handleReset: () => void = () => {
    setCounter(0);
    handleChangeFontsize(16);
  }

  const handleInputIncrement: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = +e.target.value;
    if (typeof value !== 'number') return;

    setIncrement(value);
  }

  const handleChangeFontsize: (fontSize: number) => void = (fontSize) => 
    subtitleRef.current!.style.fontSize = `${fontSize}px`;

  return (
    <div className='p-6'>
      <h1>Hola mundo!</h1>
      <div className='flex flex-col gap-y-2'>
        <h2
          ref={subtitleRef}>
          Este sub titulo esta referenciado
        </h2>
        {/* <div className='flex items-center gap-x-4'>
          <button
            onClick={() => handleChangeFontsize('-')}>-</button>
          <button
            onClick={() => handleChangeFontsize('+')}>+</button>
        </div> */}
      </div>
      <div className='flex flex-col gap-y-4'>
        <input 
          type='number' 
          placeholder='Incremento del contador'
          value={increment}
          onChange={handleInputIncrement}/>
        <span>Contador: {counter}</span>
      </div>
      <div className='flex items-center mt-4 gap-x-4 mb-6'>
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
      {/* {counter > 5 && ( */}
        <Test/>
      {/* )} */}
    </div>
  );
}

export default App;