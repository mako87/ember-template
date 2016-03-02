export function initialize(application) {
  application.inject('route', 'websocket', 'service:websocket');
}

export default {
  name: 'websocket',
  initialize
};
