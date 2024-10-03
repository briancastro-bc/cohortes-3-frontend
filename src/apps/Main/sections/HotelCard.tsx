import { 
  FC, 
  useCallback, 
  ComponentProps,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Hotel, } from '../../Shared/domain/Hotel';

import Button from '../../Shared/Components/Button';

type HotelCardProps = object & ComponentProps<'article'> & {
  hotel: Hotel;
};

const HotelCard: FC<HotelCardProps> = ({
  hotel,
}) => {
  const navigate = useNavigate();

  const handleLimitDescription = useCallback((limit: number) => {
    if (hotel?.description?.length > limit) {
      return `${hotel?.description?.slice(0, limit)}...`;
    }
    return hotel.description;
  }, [hotel.description]);

  return (
    <article className='grow min-h-[280px] min-w-[250px] h-full w-full max-h-[330px] max-w-[310px] bg-white rounded-xl border border-gray-300 shadow-md'>
      <div className='h-full w-full p-4 flex flex-col'>
        <div className='relative w-full h-[120px]'>
          <img 
            className='h-full w-full object-cover' 
            src={hotel?.photo} alt={hotel?.name} />
        </div>
        <div className='size-full flex flex-col'>
          {hotel?.ranking && (
            <span>
              Ranking: {hotel?.ranking}
            </span>
          )}
          <h3 className='font-primary-alt font-bold text-2xl'>
            {hotel?.name}
          </h3>
          <span className='mt-1 text-sm text-gray-700'>
            {handleLimitDescription(100)}
          </span>
          <div className='mt-auto ml-auto'>
            <Button 
              onClick={() => navigate({
                pathname: `/hotel/${hotel?.id}`,
              })}>
              Ver
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;