import { theme } from "@/mds/theme";

interface MlabLogoProps {
  width?: number;
  height?: number;
}

const MlabLogo = ({ width = 112, height = 48 }: MlabLogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 112 48`} fill="none">
      <path
        d="m5.7 24.709 4.947 7.392 4.974-7.392 1.088 9.038h4.61l-2.926-18.608-7.746 10.81-7.72-10.81L0 33.747h4.611L5.7 24.709zm21.672.228h3.394c1.26 0 2.366-.17 3.316-.507.967-.354 1.727-.86 2.28-1.519.569-.658.854-1.451.854-2.38 0-1.012-.285-1.848-.855-2.506-.552-.675-1.312-1.173-2.28-1.493-.95-.338-2.055-.507-3.315-.507h-6.658v17.722h7.098c1.433 0 2.677-.169 3.73-.507 1.054-.354 1.865-.894 2.435-1.62.588-.726.881-1.679.881-2.86 0-.895-.207-1.655-.622-2.279a4.71 4.71 0 0 0-1.606-1.57A7.152 7.152 0 0 0 33.771 24a11.703 11.703 0 0 0-2.565-.279h-3.834v2.33h3.342c.432 0 .82.042 1.166.126.362.068.682.186.958.355.276.169.492.388.648.658.155.27.233.59.233.962 0 .574-.138 1.03-.415 1.367-.259.32-.613.557-1.062.709a5.307 5.307 0 0 1-1.528.202h-2.228V19.342h1.813c.76 0 1.347.152 1.762.456.414.303.622.759.622 1.367 0 .405-.095.75-.285 1.038-.19.27-.467.48-.83.632-.345.152-.768.228-1.269.228h-2.927v1.874zm11.341-5.089h4.974v13.899h4.378V19.848h5v-3.823H38.713v3.823zm16.334-3.823v17.722h4.456V16.025h-4.456zm16.065 0v17.722h11.657v-3.671h-7.28v-14.05h-4.377zM87.44 30.101c0-.287.07-.523.207-.709.139-.202.346-.354.622-.455.276-.102.648-.152 1.114-.152.605 0 1.175.084 1.71.253.552.152 1.036.38 1.45.683v-1.696c-.207-.22-.518-.43-.932-.633a7.028 7.028 0 0 0-1.502-.506 8.462 8.462 0 0 0-1.943-.203c-1.486 0-2.634.33-3.446.988-.811.641-1.217 1.519-1.217 2.633 0 .793.19 1.468.57 2.025.397.557.915.979 1.554 1.266.656.27 1.364.405 2.124.405s1.468-.127 2.124-.38a3.999 3.999 0 0 0 1.606-1.164c.415-.524.622-1.157.622-1.899l-.414-1.519c0 .54-.121.996-.363 1.367a2.31 2.31 0 0 1-.933.835c-.38.186-.794.279-1.243.279-.31 0-.596-.05-.855-.152a1.607 1.607 0 0 1-.622-.48 1.323 1.323 0 0 1-.233-.786zm-1.735-4.43c.172-.101.449-.228.829-.38.38-.169.82-.312 1.32-.43a7.082 7.082 0 0 1 1.58-.178c.364 0 .683.034.96.102.293.067.535.177.725.329.19.152.328.337.414.557.104.202.156.447.156.734v7.342h3.756v-8.203c0-.81-.242-1.493-.726-2.05-.483-.557-1.14-.98-1.968-1.266-.83-.304-1.77-.456-2.824-.456-1.123 0-2.159.144-3.109.43-.95.287-1.761.591-2.435.912l1.322 2.557zM102.26 14h-3.912v19.747h3.912V14zM112 27.924c0-1.316-.277-2.422-.829-3.316-.536-.895-1.235-1.578-2.098-2.051a5.543 5.543 0 0 0-2.746-.709c-.985 0-1.865.245-2.643.734-.777.49-1.39 1.19-1.839 2.101-.449.895-.673 1.975-.673 3.241 0 1.249.224 2.33.673 3.24.449.912 1.062 1.612 1.839 2.102.778.49 1.658.734 2.643.734.984 0 1.899-.236 2.746-.709.863-.472 1.562-1.156 2.098-2.05.552-.912.829-2.017.829-3.317zm-4.119 0c0 .608-.129 1.14-.388 1.595-.26.439-.605.785-1.037 1.038a2.918 2.918 0 0 1-1.424.354c-.449 0-.89-.118-1.322-.354a2.952 2.952 0 0 1-1.036-1.013c-.276-.455-.414-.995-.414-1.62 0-.625.138-1.156.414-1.595a2.89 2.89 0 0 1 1.036-1.038 2.727 2.727 0 0 1 1.322-.354c.518 0 .992.126 1.424.38.432.236.777.582 1.037 1.037.259.44.388.963.388 1.57z"
        fill={theme.palette.colors.pink[500]}
      />
    </svg>
  );
};
export default MlabLogo;
