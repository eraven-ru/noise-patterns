const breakpoints = {
  xs: 0,
  sm: 600,
  md: 1024,
  lg: 1440,
  xl: 1820,
};

export default function useScreenSize() {
  const screenSize = ref(0);
  const screenSizesReady = computed(() => screenSize.value > 0);

  const sm = computed(() => ({ up: screenSize.value >= breakpoints.sm, down: screenSize.value < breakpoints.sm }));
  const md = computed(() => ({ up: screenSize.value >= breakpoints.md, down: screenSize.value < breakpoints.md }));
  const lg = computed(() => ({ up: screenSize.value >= breakpoints.lg, down: screenSize.value < breakpoints.lg }));
  const xl = computed(() => ({ up: screenSize.value >= breakpoints.xl, down: screenSize.value < breakpoints.xl }));

  const onResize = () => {
    updateScreenSize();
  };

  function updateScreenSize() {
    screenSize.value = window.innerWidth;
  }

  onMounted(() => {
    updateScreenSize();
    window.addEventListener('resize', onResize, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
  });

  return {
    screenSizesReady,
    
    sm,
    md,
    lg,
    xl,
  };
}
