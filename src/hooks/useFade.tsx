import { useEffect, useRef, useState } from "react";
import { css } from "@linaria/core";

const FadeStyle = css`
  opacity: 0;
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  &.in {
    animation: fade-in 0.7s ease-in-out;
    opacity: 1;
  }
  &.out {
    animation: fade-out 0.7s ease-in-out;
    opacity: 0;
  }
`;

interface useFadeProps {
  timeout?: number;
  skip?: boolean;
  useDelay?: boolean;
}

const useFade = (props?: useFadeProps) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const timeoutKey = useRef<NodeJS.Timeout>();

  const runDelay = () => {
    if (isVisible) return;
    timeoutKey.current = setTimeout(() => {
      setIsVisible(true);
    }, props?.timeout ?? 500);
  };

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const fadeClassname = isVisible === null ? "" : isVisible ? "in" : "out";

  useEffect(() => {
    if (props?.skip) return;
    if (!props?.useDelay) {
      show();
      return;
    }

    runDelay();

    return () => {
      if (timeoutKey) {
        clearTimeout(timeoutKey.current);
      }
    };
  }, []);

  return {
    show,
    hide,
    runDelay,
    fadeClassname,
    FadeStyle
  };
};

export default useFade;
