import Dispatcher
import flux from 'flux';
const Dispatcher = flux.Dispatcher;
import assign from 'object-assign';

const AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: (action) => {
    const payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;
