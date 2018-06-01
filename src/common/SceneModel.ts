import { SceneEventArgs } from '../Scene';

export interface SceneModel {
    draw: (
        e: SceneEventArgs,
        setMenuContent: (menuContent: JSX.Element) => void
    ) => void;
}
