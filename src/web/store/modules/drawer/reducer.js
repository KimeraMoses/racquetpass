import drawerState from './state';

function reducer(state = drawerState, action) {
  switch (action?.type) {
    case 'SHOW_DRAWER':
      return {
        ...drawerState,
        show: true,
      };
    case 'HIDE_DRAWER':
      return {
        ...drawerState,
        show: false,
      };
    default:
      return state;
  }
}
export default reducer;
