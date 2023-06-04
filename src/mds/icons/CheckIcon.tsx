import { ComponentProps } from "react";

export const Check = (props: ComponentProps<"svg">) => {
  return (
    <svg width={12} height={9} viewBox={"0 0 12 9"} {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M4.16255 8.9563C4.07505 8.9563 3.9908 8.94055 3.9098 8.90905C3.8283 8.87805 3.7563 8.8313 3.6938 8.7688L0.562549 5.63755C0.450049 5.52505 0.396799 5.39055 0.402799 5.23405C0.409299 5.07805 0.462549 4.9438 0.562549 4.8313C0.675049 4.7188 0.809549 4.66255 0.966049 4.66255C1.12205 4.66255 1.25005 4.7188 1.35005 4.8313L4.16255 7.6438L10.65 1.1563C10.75 1.0438 10.8813 0.987549 11.0438 0.987549C11.2063 0.987549 11.3375 1.0438 11.4375 1.1563C11.55 1.2688 11.6063 1.40305 11.6063 1.55905C11.6063 1.71555 11.55 1.85005 11.4375 1.96255L4.6313 8.7688C4.5688 8.8313 4.49705 8.87805 4.41605 8.90905C4.33455 8.94055 4.25005 8.9563 4.16255 8.9563Z"
      />
    </svg>
  );
};
