// Import Dispatcher from flux
import { Dispatcher } from 'flux';
import assign from 'object-assign';


const AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: (action) => {
    const payload = {
      action: action
    };
    this.dispatch(payload);
  }
});

// Export  dispatch
export default AppDispatcher;
