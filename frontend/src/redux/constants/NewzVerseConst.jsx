export const getDynamicSvgIcons = (status = null, color, width, height) => {
  switch (status) {
    case "user_details":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="person">
            <path
              id="Vector"
              d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 16C14.7 16 17.8 17.29 18 18H6C6.23 17.28 9.31 16 12 16ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill={color}
            />
          </g>
        </svg>
      );
    case "user_verification":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="verified_user">
            <path
              id="Vector"
              d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM19 11C19 15.52 16.02 19.69 12 20.93C7.98 19.69 5 15.52 5 11V6.3L12 3.19L19 6.3V11ZM7.41 11.59L6 13L10 17L18 9L16.59 7.58L10 14.17L7.41 11.59Z"
              fill={color}
            />
          </g>
        </svg>
      );
    case "user_account_set_up":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Icon Frame">
            <path
              id="Vector 160"
              d="M11 21L4 4L21 11L14.7353 13.6849C14.2633 13.8872 13.8872 14.2633 13.6849 14.7353L11 21Z"
              stroke={color}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      );
    case "user_back_button":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="arrow_back_ios">
            <path
              id="Vector"
              d="M17.835 3.86998L16.055 2.09998L6.16504 12L16.065 21.9L17.835 20.13L9.70504 12L17.835 3.86998Z"
              fill={color}
            />
          </g>
        </svg>
      );
    case "sign_up_star_icon":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 96 97"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="auto_awesome">
            <g id="Vector">
              <path
                d="M76 36.5L81 25.5L92 20.5L81 15.5L76 4.5L71 15.5L60 20.5L71 25.5L76 36.5Z"
                fill={color}
              />
              <path
                d="M76 60.5L71 71.5L60 76.5L71 81.5L76 92.5L81 81.5L92 76.5L81 71.5L76 60.5Z"
                fill={color}
              />
              <path
                d="M46 38.5L36 16.5L26 38.5L4 48.5L26 58.5L36 80.5L46 58.5L68 48.5L46 38.5ZM39.96 52.46L36 61.18L32.04 52.46L23.32 48.5L32.04 44.54L36 35.82L39.96 44.54L48.68 48.5L39.96 52.46Z"
                fill={color}
              />
            </g>
          </g>
        </svg>
      );
    case "green_check_circle":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="check_circle">
            <path
              id="Vector"
              d="M7.99992 1.33325C4.31992 1.33325 1.33325 4.31992 1.33325 7.99992C1.33325 11.6799 4.31992 14.6666 7.99992 14.6666C11.6799 14.6666 14.6666 11.6799 14.6666 7.99992C14.6666 4.31992 11.6799 1.33325 7.99992 1.33325ZM6.66659 11.3333L3.33325 7.99992L4.27325 7.05992L6.66659 9.44659L11.7266 4.38659L12.6666 5.33325L6.66659 11.3333Z"
              fill={color}
            />
          </g>
        </svg>
      );
    case "user_email":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="email">
            <path
              id="Vector"
              d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
              fill={color}
            />
          </g>
        </svg>
      );
    case "user_reset_password":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="password">
            <path
              id="Vector"
              d="M2 16H22V18H2V16ZM3.15 11.95L4 10.47L4.85 11.95L6.15 11.2L5.3 9.72H7V8.22H5.3L6.15 6.75L4.85 6L4 7.47L3.15 6L1.85 6.75L2.7 8.22H1V9.72H2.7L1.85 11.2L3.15 11.95ZM9.85 11.2L11.15 11.95L12 10.47L12.85 11.95L14.15 11.2L13.3 9.72H15V8.22H13.3L14.15 6.75L12.85 6L12 7.47L11.15 6L9.85 6.75L10.7 8.22H9V9.72H10.7L9.85 11.2ZM23 8.22H21.3L22.15 6.75L20.85 6L20 7.47L19.15 6L17.85 6.75L18.7 8.22H17V9.72H18.7L17.85 11.2L19.15 11.95L20 10.47L20.85 11.95L22.15 11.2L21.3 9.72H23V8.22Z"
              fill={color}
            />
          </g>
        </svg>
      );
    case "add_company_plus_icon":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Icons/add_24px">
            <path
              id="icon"
              d="M13.3334 8.66675H8.66675V13.3334H7.33342V8.66675H2.66675V7.33342H7.33342V2.66675H8.66675V7.33342H13.3334V8.66675Z"
              fill={color}
            />
          </g>
        </svg>
      );

    default:
      return "";
  }
};

export const getDashboardGlobalBrands = (
  dashboardsData,
  dashboardBrandsList,
  dashboardActiveKey
) => {
  let final_brands = [];

  let comBrandList = [];
  if (dashboardsData?.[dashboardActiveKey]?.selected_comp_brands?.length) {
    comBrandList = [
      dashboardsData?.[dashboardActiveKey]?.selected_brands,
      ...dashboardsData?.[dashboardActiveKey]?.selected_comp_brands,
    ];
  } else {
    comBrandList = [];
  }

  final_brands =
    dashboardActiveKey + 1 === 1
      ? [dashboardBrandsList?.[0]]
      : dashboardActiveKey + 1 === 2
      ? comBrandList
      : dashboardsData?.[dashboardActiveKey]?.selected_brands;

  return final_brands;
};
