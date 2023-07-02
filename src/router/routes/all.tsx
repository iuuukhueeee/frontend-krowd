import Login from '@/modules/auth/page/Login';
import Register from '@/modules/auth/page/Register';
import DashBoardPage from '@/modules/dashboard/page/po-dashboard';
import NavSection from '@/modules/layout/components/nav-section';
import DashboardLayout from '@/modules/layout/dash-board';
import ProductNewForm from '@/modules/projects/components/create-project';
import POProjectManagement from '@/modules/projects/page/po-project-management';
import LandingPage from '@/modules/seo/pages/lading';
import { AuthRouteObject } from '@/types';

export const allRoute: AuthRouteObject[] = [
  {
    path: '/home',
    element: <LandingPage />,
  },
  {
    path: '/nav',
    layout: DashboardLayout,
    children: [
      {
        path: '/nav',
        element: <DashBoardPage />,
      },
    ],
  },
  {
    path: '/po',
    layout: DashboardLayout,
    children: [
      {
        path: '/po/project',
        element: <POProjectManagement />,
      },
      {
        path: '/po/project/:projectId',
        element: <ProductNewForm isEdit />,
      },
      {
        path: '/po/project/add',
        element: <ProductNewForm isEdit={false} />,
      },
    ],
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/register',
    element: <Register />,
  },
];
