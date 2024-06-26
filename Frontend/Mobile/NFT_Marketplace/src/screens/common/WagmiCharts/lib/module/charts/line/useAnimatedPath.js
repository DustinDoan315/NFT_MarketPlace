import { useAnimatedProps, useAnimatedReaction, useSharedValue, withTiming } from 'react-native-reanimated';
import { interpolatePath } from './utils';
import { usePrevious } from '../../utils';
export default function useAnimatedPath({
  enabled = true,
  path
}) {
  const transition = useSharedValue(0);
  const previousPath = usePrevious(path);
  useAnimatedReaction(() => {
    return path;
  }, (result, previous) => {
    if (result !== previous) {
      transition.value = 0;
      transition.value = withTiming(1);
    }
  }, [path]);
  const animatedProps = useAnimatedProps(() => {
    let d = path || '';
    if (previousPath && enabled) {
      const pathInterpolator = interpolatePath(previousPath, path, null);
      d = pathInterpolator(transition.value);
    }
    return {
      d
    };
  });
  return {
    animatedProps
  };
}
//# sourceMappingURL=useAnimatedPath.js.map