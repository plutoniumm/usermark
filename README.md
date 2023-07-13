# usermark

A small library for Fingerprinting experiments. I will make it hard to use. This is not to use, but to learn what to be aware of.

## Tracked Parameters
All media queries are tracked, basically what css runs as `@media(xxx)` for some parameter `xxx`.

### Media
```ts
interface Media{
  "inverted-colors": boolean;
  "forced-colors": boolean;
  "prefers-reduced-motion": boolean;
  "color-gamut": "p3" | "srgb" | "rec2020";
  "hdr": boolean;
  "prefers-contrast": -2 | -1 | 0 | 1 | 2;
};

// Default values in case of error
const MediaDefaults: Media = {
  "inverted-colors": false,
  "forced-colors": false,
  "prefers-reduced-motion": false,
  "color-gamut": "srgb",
  "hdr": false,
  "prefers-contrast": 0,
}
```

### Memory
All memory related parameters such as RAM, localStorage, sessionStorage, etc.

```ts
interface Memory{
  isLS: boolean;
  RAM: number;
}

// Default values in case of error
const MemoryDefaults: Memory = {
  isLS: true,
  RAM: 8,
}
```