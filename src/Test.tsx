import {
  FC,
  useEffect,
} from 'react';

type TestProps = object;

const Test: FC<TestProps> = () => {

  useEffect(() => {
    // INICIALIZACION DEL COMPONENTE.
    console.log("EL COMPONENTE SE CREA");

    return () => {
      // ESTO SE EJECUTA CUANDO EL COMPONENTE MUERE O DESTRUYE
      console.log("EL COMPONENTE SE DESTRUYE");
    };
  }, []);

  return (
    <div>
      Hola
    </div>
  );
}

export default Test;