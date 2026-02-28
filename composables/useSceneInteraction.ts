const isNightMode = ref(false);
const toggleDayNightCallbacks: Array<() => void> = [];

export function useSceneInteraction() {
  const onToggleDayNight = (callback: () => void) => {
    toggleDayNightCallbacks.push(callback);
  };

  const toggleDayNight = () => {
    isNightMode.value = !isNightMode.value;
    toggleDayNightCallbacks.forEach((cb) => cb());
  };

  return {
    isNightMode: readonly(isNightMode),
    toggleDayNight,
    onToggleDayNight,
  };
}
