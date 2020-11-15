import Button from './Button';
import Content from './Content';
import Title from './Title';

const App = () => {
  const [isDark, setThemeState] = useState(false);

  return (
    <div>
      <Button />
      <Title text={isDark ? 'This is a Dark Prop!' : 'This is a Light Prop!'} />
      <Content />
    </div>
  );
}

export default App;
