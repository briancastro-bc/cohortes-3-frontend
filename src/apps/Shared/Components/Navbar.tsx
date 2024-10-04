import { 
  FC,
  ComponentPropsWithRef,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useNavigate, } from 'react-router-dom';
import Button from './Button';

type NavbarProps = object & ComponentPropsWithRef<'header'>;

const Navbar: FC<NavbarProps> = ({
  ref,
}) => {
  const navigate = useNavigate();

  const timeoutRef = useRef<number | null>(null);

  const [searchValue, setSearchValue,] = useState<string>('');

  const handleSearch: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = e.target.value;
    setSearchValue(value);
  }

  useEffect(() => {
    if (!searchValue) {
      navigate({
        pathname: '/',
      });
      return;
    }

    timeoutRef.current = setTimeout(() => {
      navigate({
        pathname: 'search',
        search: `?value=${searchValue}`,
      });
    }, 1000);

  }, [searchValue,]);

  return (
    <header 
      ref={ref}
      className='fixed w-full h-20 bg-white border border-b-gray-200 z-10'>
      <div className='size-full max-w-screen-xl mx-auto flex items-center'>
        <h2 className='text-2xl font-bold'>Hoteles</h2>
        <div className='ml-auto flex items-center gap-x-2'>
          <input
            type='search'
            className='border border-gray-400 rounded-md py-2 px-6' 
            placeholder='Buscar aqui'
            onChange={handleSearch} />
          <Button
            onClick={() => navigate('/signup')}>
            Registrar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;