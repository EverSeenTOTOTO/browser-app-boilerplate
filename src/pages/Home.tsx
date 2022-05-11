import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { PrefetchContext } from '@/App';
import { useNavigate } from 'react-router-dom';

export const prefetch = (ctx: PrefetchContext) => ctx.store.home.fetchName();

const Home = observer(() => {
  const store = useStore('home');
  const hello = `hello ${store.name}`;
  const navigate = useNavigate();

  return <div>
    <button onClick={() => navigate('/about')}>about</button>
    <div>{hello}</div>
  </div>;
});

export default Home;
