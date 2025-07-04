
(() => {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const clerkStartMsg = 'Clerk: Clerk has been loaded with development keys.';
    if (
      process.env.NODE_ENV === 'development' &&
      typeof args[0] === 'string' &&
      args[0].startsWith(clerkStartMsg)
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
})();
