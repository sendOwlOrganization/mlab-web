import SvgIcon, { SvgIconProps } from "@/components/icons/SvgIcon";

const DeleteIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} width={18} height={18}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M8.99984 17.3334C4.39734 17.3334 0.666504 13.6026 0.666504 9.00008C0.666504 4.39758 4.39734 0.666748 8.99984 0.666748C13.6023 0.666748 17.3332 4.39758 17.3332 9.00008C17.3332 13.6026 13.6023 17.3334 8.99984 17.3334ZM8.99984 7.82175L6.64317 5.46425L5.464 6.64341L7.8215 9.00008L5.464 11.3567L6.64317 12.5359L8.99984 10.1784L11.3565 12.5359L12.5357 11.3567L10.1782 9.00008L12.5357 6.64341L11.3565 5.46425L8.99984 7.82175Z"
      />
    </SvgIcon>
  );
};

export default DeleteIcon;
