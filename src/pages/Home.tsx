import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const Hello = lazy(() => import('./comonents/Hello'));

const Home = () => {
  const navigate = useNavigate();

  return <div>
        <button onClick={() => navigate('/about')}>about</button>
        <Suspense fallback={<div>Loading...</div>}>
            <Hello />
        </Suspense>
    </div>;
};

export default Home;
