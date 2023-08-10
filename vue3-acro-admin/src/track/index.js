import jsError from './stability/jsError'
import promiseError from './stability/promiseError';
class Track {
  constructor() {
    this.eventRegister();
  }
  eventRegister() {
    jsError;
    promiseError;
  }
}

export default Track;