import { useCompilerUpdater } from './compiled';
import { useUpdateDimensions } from './dimensions';

export default () => {
    useUpdateDimensions();
    useCompilerUpdater();
    return null;
};
