import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const Hello = observer(() => {
  const home = useStore('home');

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (!home.name) throw home.fetchName(); // simulate context.read() in some implementations

  return <div>hello {home.name}</div>;
});

export default Hello;
