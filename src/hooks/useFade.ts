import { useEffect, useState } from "react";
import { css, cx } from "@linaria/core";

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
}

const useFade = ({ timeout = 500 }: useFadeProps = {}) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  const hide = () => {
    setIsVisible(false);
  };

  const className = cx(FadeStyle, isVisible === null ? "" : isVisible ? "in" : "out");

  useEffect(() => {
    let timeoutKey: ReturnType<typeof setTimeout>;

    const runDelay = () => {
      if (isVisible) return;
      timeoutKey = setTimeout(() => {
        setIsVisible(true);
      }, timeout);
    };

    runDelay();

    return () => {
      if (timeoutKey) {
        clearTimeout(timeoutKey);
      }
    };
  }, [timeout, isVisible]);

  return {
    show: () => setIsVisible(true),
    hide,
    className
  };
};

export default useFade;
