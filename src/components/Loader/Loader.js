import { Oval } from 'react-loader-spinner';
import s from '../Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <Oval
        height={80}
        width={80}
        color="#3f51b5"
        wrapperStyle={{}}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#3f51b5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
