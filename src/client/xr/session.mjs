export async function setupXR(renderer, button, status) {
  if (!window.isSecureContext || !navigator.xr) {
    button.textContent = 'XR unavailable';
    status.textContent = 'Desktop preview available. XR requires a compatible browser and HTTPS or localhost.';
    return;
  }
  let mode;
  try {
    if (await navigator.xr.isSessionSupported('immersive-ar')) mode = 'immersive-ar';
    else if (await navigator.xr.isSessionSupported('immersive-vr')) mode = 'immersive-vr';
  } catch (error) {
    button.textContent = 'XR unavailable';
    status.textContent = error.message;
    return;
  }
  if (!mode) {
    button.textContent = 'XR unavailable';
    return;
  }
  const label = mode === 'immersive-ar' ? 'Enter AR' : 'Enter VR';
  button.textContent = label;
  button.disabled = false;
  let session = null;
  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      if (session) {
        await session.end();
        return;
      }
      session = await navigator.xr.requestSession(mode, { requiredFeatures: ['local-floor'] });
      session.addEventListener('end', () => {
        session = null;
        button.textContent = label;
        button.disabled = false;
        status.textContent = 'Returned to desktop preview.';
      }, { once: true });
      await renderer.xr.setSession(session);
      button.textContent = 'Exit XR';
      status.textContent = 'XR scene preview active.';
    } catch (error) {
      if (session) await session.end().catch(() => {});
      session = null;
      button.textContent = label;
      status.textContent = `Could not open XR: ${error.message}`;
    } finally {
      button.disabled = false;
    }
  });
}
