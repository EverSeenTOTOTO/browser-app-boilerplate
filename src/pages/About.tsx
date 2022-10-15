import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';

const About = observer(() => {
  const store = useStore('about');
  const navigate = useNavigate();

  return <div>
    <button onClick={() => navigate('/')}>home</button>
    <button onClick={() => store.increment()}>{store.count}</button>
  </div>;
});

export default About;
