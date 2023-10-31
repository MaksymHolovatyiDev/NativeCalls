import { Pages } from '../pages';
import DataProvider from '../shared/provider';

export default function App({}) {
  return (
    <DataProvider>
      <Pages />
    </DataProvider>
  );
}
