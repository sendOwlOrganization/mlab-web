import global from "@/tokens/global.json";

//region Types

interface ModePalette {
  primary: string;
  secondary: string;

  background: string;
  text: {
    primary: string;
    secondary: string;
  };
}

type ColorKey = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
type Colors = Record<keyof typeof global.color, Record<ColorKey, string>>;

interface CommonPalette {
  colors: Colors;
}

type Palette = ModePalette & CommonPalette;

interface Theme {
  palette: Palette;
  font: {
    family: string;
  };
}

//endregion

//region Utils
const flattenObject = (obj: object, separator = "_"): Record<string, string> => {
  const flatten: Record<string, string> = {};

  const flattenRec = (obj: object, prefix: string) => {
    Object.entries(obj).forEach(([k, v]) => {
      const key = prefix ? `${prefix}${separator}${k}` : k;
      if (typeof v === "object") {
        flattenRec(v, key);
      }
      if (typeof v === "string" || typeof v === "number") {
        flatten[key] = v.toString();
      }
    });
  };

  flattenRec(obj, "");

  return flatten;
};

const toCssVar = (obj: object) => {
  return Object.entries(flattenObject(obj))
    .map(([k, v]) => `--${k}: ${v};`)
    .join("\n");
};

//endregion

//region Theme

// FIXME: temporary light theme
const light: ModePalette = {
  primary: global.color.pink["600"].value,
  secondary: global.color.blue["600"].value,

  background: "#fafafa",

  text: {
    primary: "#1a1a1a",
    secondary: "#2a2a2a"
  }
};

// FIXME: temporary dark theme
const dark: ModePalette = {
  primary: global.color.pink["500"].value,
  secondary: global.color.blue["500"].value,

  background: "#1a1a1a",

  text: {
    primary: "#fafafa",
    secondary: "#eaeaea"
  }
};

const common: CommonPalette = {
  colors: Object.entries(global.color).reduce(
    (acc, [color, value]) => ({
      ...acc,
      [color]: Object.entries(value).reduce(
        (acc, [key, { value }]) => ({
          ...acc,
          [key]: value
        }),
        {}
      )
    }),
    {}
  ) as Colors
};

const globalTheme: Theme = {
  palette: { ...common, ...light },
  font: {
    family: global.fontFamily.KR.value
  }
};

export const theme: Theme = (<T extends object>({
  obj,
  separator = "_",
  transformer = (v) => v.toString()
}: {
  obj: T;
  separator?: string;
  transformer?: (value: string | number) => string;
}): T => {
  const finalObj = JSON.parse(JSON.stringify(obj)) as T;

  const assignFlatten = (obj: object, prefix: string) => {
    Object.entries(obj).forEach(([k, v]) => {
      const key = prefix ? `${prefix}${separator}${k}` : k;
      if (typeof v === "object") {
        assignFlatten(v, key);
      } else if (typeof v === "string" || typeof v === "number") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj[k] = transformer(key);
      }
    });
  };

  assignFlatten(finalObj, "");
  return finalObj;
})({
  obj: globalTheme,
  transformer: (k) => `var(--${k})`
});

//endregion

//region ThemeVar
export const lightThemeVar = toCssVar({ palette: light });
export const darkThemeVar = toCssVar({ palette: dark });
export const commonThemeVar = toCssVar({ palette: common, font: { family: global.fontFamily.KR.value } });
//endregion
