import { LayoutName } from "./layout";
import { Characters } from "./pages/characters";

interface Route {
    path: string;
    component: JSX.Element;
    layout: LayoutName;
}

const Routes: Array<Route> = [
    {
        path: '',
        component: <Characters />,
        layout: 'main',
    },
];

export default Routes;