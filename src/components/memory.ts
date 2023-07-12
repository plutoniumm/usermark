function localStorage (): boolean {
  try {
    return !!window.localStorage
  } catch (e) {
    // SecurityError occurs when user has blocked
    return true;
  }
};

function RAM (): boolean {
  let mem = undefined;
  try {
    mem = navigator.deviceMemory;
    mem = parseFloat(mem);
    mem = Number.isNaN(mem) ? undefined : mem;
  } catch (e) {
    mem = undefined;
  }

  return mem;
};

interface Stores {
  isLS: boolean,
  RAM?: number | undefined
}
const stores: Stores = {
  isLS: localStorage(),
};

export default stores;