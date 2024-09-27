import {
  FC,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react';

interface Character {
  name: string;
}

type TestProps = object;

const Test: FC<TestProps> = () => {
  const timeoutRef = useRef<number | null>(null);

  const [loading, setLoading,] = useState<boolean>(false);
  const [searchValue, setSearchValue,] = useState<string>('');
  const [characters, setCharacters,] = useState<Array<Character>>([]);
  
  const handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  }

  const findAllCharactersBySearch: () => Promise<Array<Character>> = useCallback(async () => {
    if (!searchValue || searchValue === '') return;

    const url = import.meta.env.VITE_API_URL;

    const endpoint = `${url}/character?name=${searchValue}`;
    const request = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await request.json();
    return response.results ?? [] as Array<Character>;
  }, [searchValue,]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      setLoading(true);

      timeoutRef.current = setTimeout(() => {
        findAllCharactersBySearch()
          .then(setCharacters)
          .catch(err => console.error(err))
          .finally(() => setLoading(false));
      }, 5000);
    
    return () => {
      isSubscribed = false;

      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);
    }
  }, [findAllCharactersBySearch,]);

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <input 
          type='search'
          placeholder='Buscar aquí'
          value={searchValue}
          onChange={handleInputChange} />
        <span>Resultados de la busqueda: {characters?.length ?? 0}</span>
      </div>
      {loading && (
        <p>Cargando...</p>
      )}
      {characters && characters?.length > 0 && (
        <ul className='flex flex-col gap-y-1'>
          {characters.map(character => (
            <li key={character.name}>
              {character.name}
            </li>
          ))}
        </ul>
      )}
      {characters?.length <= 0 && (
        <p>No se encontraron personajes</p>
      )}
    </div>
  );
}

export default Test;