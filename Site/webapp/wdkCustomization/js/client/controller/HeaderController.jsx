import { ViewController } from 'wdk-client/Controllers';
import { Header } from '../components/Layout/Header';

export default class HeaderController extends ViewController {
  renderView() {
    return <Header/>;
  }
}
