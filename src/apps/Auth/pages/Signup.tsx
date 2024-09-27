import { 
  ChangeEvent,
  FC,
  useRef,
  useState,
} from 'react';

interface Signup {
  givenName: string;
  lastName: string;
  email: string;
  password: string;
}

type SignupProps = object;

const Signup: FC<SignupProps> = () => {
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [data, setData,] = useState<Signup>({
    givenName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleGivenName: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      givenName: value,
    }));
  }

  const handleLastname: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      lastName: value,
    }));
  }

  const handleEmail: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      email: value,
    }));
  }

  const handlePassword: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      password: value,
    }));
  }

  const onSubmit: () => void = async () => {
    if (data?.password?.length < 8) throw new Error('La contraseña tiene menos de 8 caracteres');

    if (data?.password !== confirmPasswordRef?.current?.value) throw new Error('Las contraseñas no coinciden');

    Object.entries(data).forEach(([value, key]) => {
      if (!value || value === '') throw new Error(`Valor ${value} invalido para la columna ${key}`);
    });

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/auth/signup`;
    const request = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    console.log('respuesta del backend', response);
  }

  return (
    <section className='h-screen w-full overflow-hidden'>
      <div className='size-full max-w-screen-2xl mx-auto'>
        <div className='size-full flex justify-center items-center'>
          <article className='h-auto w-full max-w-screen-md p-12 shadow-md border border-black rounded-lg'>
            <div className='size-full flex flex-col'>
              <div className='mb-4'>
                <h2 className='text-center text-4xl font-bold'>
                  Registrate
                </h2>
              </div>
              <div className='size-full grid grid-cols-2 gap-y-4'>
                <input
                  placeholder='Nombre'
                  className='col-span-1'
                  value={data?.givenName}
                  onChange={handleGivenName} />
                <input
                  placeholder='Apellido'
                  className='col-span-1'
                  value={data?.lastName}
                  onChange={handleLastname} />
                <input
                  placeholder='Correo electronico'
                  className='col-span-2'
                  value={data?.email}
                  onChange={handleEmail} />
                <input
                  placeholder='Contraseña'
                  className='col-span-2'
                  value={data?.password}
                  onChange={handlePassword} />
                <input
                  ref={confirmPasswordRef}
                  placeholder='Confirmar contraseña'
                  className='col-span-2'/>
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

export default Signup;
    