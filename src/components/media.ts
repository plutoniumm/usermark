const match = (by: string, value: string): boolean =>
  matchMedia(`(${by}: ${value})`).matches;

interface Matchable {
  [key: string]: {
    values: string[],
    default: string
  }
}

const matchable: Matchable = {
  "inverted-colors": {
    values: ["inverted", "none"],
    default: "none"
  },
  "forced-colors": {
    values: ["active", "none"],
    default: "none"
  },
  "prefers-reduced-motion": {
    values: ["reduce", "no-preference"],
    default: "no-preference"
  },
  "color-gamut": {
    values: ["p3", "srgb", "rec2020"],
    default: "srgb"
  },
  "hdr": {
    values: ["high", "standard"],
    default: "standard"
  }
};

function check2 (by: string): boolean {
  try {
    const value = matchable[by].values[0];
    return match(by, value);
  } catch (e) {
    return false;
  }
};
function checkn (by: string): boolean | string {
  try {
    for (let i = 0; i < matchable[by].values.length; i++) {
      const v = matchable[by].values[i];
      if (match(by, v)) return v;
    }
  } catch (e) {
    return matchable[by].default;
  }
};

let matchable_resolved = {};
// loop over matchables
const opts = Object.keys(matchable);
const len = opts.length;
for (let i = 0; i < len; i++) {
  const by = opts[i];
  const obj = matchable[by];
  if (obj.values.length === 2) {
    matchable_resolved[by] = check2(by);
  } else {
    matchable_resolved[by] = checkn(by);
  }
};

// EXCEPTIONS
// prefers-contrast
type Trinary = -2 | -1 | 0 | 1 | 2;
function check_contrast (): Trinary {
  try {
    if (match('prefers-contrast', 'forced')) return 2;

    if (match('prefers-contrast', 'high')) return 1;
    if (match('prefers-contrast', 'more')) return 1;

    if (match('prefers-contrast', 'low')) return -1;
    if (match('prefers-contrast', 'less')) return -1;

    if (match('prefers-contrast', 'no-preference')) return 0;
  } catch (e) {
    return 0;
  }
};



// add all exceptions
matchable_resolved['prefers-contrast'] = check_contrast();

export default matchable_resolved;