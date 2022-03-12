import { Main } from "./layers";

interface Layout {
    name: LayoutName;
    path: string;
    component: JSX.Element;
}
export type LayoutName = typeof layoutName[number];

export const layoutName = [
    'main',
] as const;
  
const Layouts: Array<Layout> = [
    {
        name: 'main',
        path: '/',
        component: <Main />
    },
];

export default Layouts;