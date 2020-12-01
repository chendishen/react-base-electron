import Loadable from 'react-loadable';
import createBrowserHistory from 'history/createBrowserHistory';
import Loading from '../components/Loading';

const Main = Loadable({loader: () => import('../pages/Main'),loading: Loading});
const Choose = Loadable({loader: () => import('../pages/Choose'),loading: Loading});

export const history = createBrowserHistory();

export const routes = [
  {
    path:'/',
    redirect:'/Main'
  },
  {
    path:'/Main',
    component: Main
  },
  {
    path:'/Choose',
    component: Choose
  },
]
