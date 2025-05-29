import styled from "styled-components";

export const DrawerHeader = styled.div``;

export const SplitDrawerContent = styled.div`
  .ant-input-affix-wrapper-lg {
    border: 1px solid #e8eaee;
  }
  .ant-input-affix-wrapper {
    /*background: #f7f8f9;*/
    border-color: #d9e5ed;
    .ant-input {
      background: #f7f8f9;
      color: #869dad;
      font-size: 14px;

      &::placeholder {
        color: #869dad;
      }
    }
  }
  .ant-collapse {
    border: none;
    .ant-collapse-item {
      background: white;
      border-color: #eaf1f4;

      .ant-collapse-header {
        padding: 15px;
        padding-right: 40px;
        color: #365366;
        font-size: 14px;
        font-family: "Roboto";
        font-weight: 500;
        border-radius: 0;
      }
      .ant-collapse-content {
        border-color: #eaf1f4;
        .ant-checkbox-wrapper {
          font-family: "Roboto";
          color: #365366;
          font-size: 14px;
        }
      }
    }
  }
  .ant-picker-range {
    width: 100%;
  }
  .ant-collapse-header {
    padding: 15px;
    padding-right: 40px;
    color: #365366;
    font-size: 14px;
    font-family: "Roboto";
    border-radius: 0;
  }
`;

export const CustomDrawerContent = styled.div`
  .ant-input-affix-wrapper {
    background: #f7f8f9;
    .ant-input {
      background: #f7f8f9;
      &::placeholder {
        color: #869dad;
      }
    }
  }
  .ant-collapse {
    border: none;
    .ant-collapse-item {
      background: white;
    }
  }
  .ant-picker-range {
    width: 100%;
  }
`;

export const FilterDrawerContent = styled.div`
  .ant-input-affix-wrapper {
    background: #f7f8f9;
    border-color: #d9e5ed;
    .ant-input {
      background: #f7f8f9;
      color: #869dad;
      font-size: 14px;

      &::placeholder {
        color: #869dad;
      }
    }
  }
  .ant-collapse {
    border: none;
    .ant-collapse-item {
      background: white;
      border-color: #eaf1f4;

      .ant-collapse-header {
        padding: 15px;
        padding-right: 40px;
        color: #365366;
        font-size: 14px;
        font-family: "Roboto";
        font-weight: 500;
        border-radius: 0;
      }

      .ant-collapse-content {
        border-color: #eaf1f4;
        .ant-radio-wrapper,
        .ant-checkbox-wrapper {
          font-family: "Roboto";
          color: #365366;
          font-size: 14px;
        }
      }
    }
  }
  .ant-picker-range {
    width: 100%;
  }
  .ant-collapse-header {
    padding: 15px;
    padding-right: 40px;
    color: #365366;
    font-size: 14px;
    font-family: "Roboto";
    border-radius: 0;
  }
`;

export const Wrapper = styled.div`

	.nav-item {
		border: none;
		border-top: 5px solid transparent;
		&.active {
			border-top: 5px solid #1c8bf9;
		}
	}
	.tab-content {
		background: white;
	}
	.WorkSheet_tabs > .ant-tabs-nav {
		margin: 0;
		position: sticky;
		z-index: 2;
		top: 0;
		background-color: #F5F6F8;
		
	}
	.ant-tabs {
	    overflow: unset;
		
		.ant-tabs-tab-btn {
			text-transform: capitalize;
			color: #3B5175;
		}
		.ant-tabs-nav {

			.ant-tabs-tab {
				border-radius: 12px 12px 0px 0px;
				display: flex;
				justify-content: space-between;
				background-color:transparent;
			}
			.ant-tabs-tab.ant-tabs-tab-active{
				&:before {
					position: absolute;
					content: "";
					width: 26px;
					height: 26px;
					right: -24px;
					border-radius: 50%;
					background-color: transparent;
					bottom: -1px;
					box-shadow: 2px 3px #ffffff;
					transform: rotate(80deg);
					transition: all 0.9s ease-in;
					z-index:-1;
				}
				&:after {
					position: absolute;
					content: "";
					width: 26px;
					height: 26px;
					left: -25px;
					border-radius: 50%;
					background-color: transparent;
					bottom: -2px;
					box-shadow: 2px 3px #ffffff;
					transform: rotate(351deg)
					transition: all 0.9s ease-in;
			}
		}
	}
`;

export const BlueDiv = styled.div`
  .welcome_heading-main {
    font-size: 22px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 8px;
    color: #3b5175;
    font-family: "Roboto Slab";
  }
  .welcome_heading-two {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 15px;
    color: #5e708d;
    font-family: "Roboto";
  }

  .select-wrapper.welcome_Select {
    max-width: 660px;
    margin: 0 auto;
    .portlet-input {
      width: 100%;
      padding: 15px;
      background-image: url(../assets/search_icon.svg);
    }
    .welcome_search {
      position: absolute;
      right: 4px;
      top: 11px;
      cursor: pointer;
    }
    .portlet-label {
      display: none;
    }
    .ant-select-single:not(.ant-select-customize-input) {
      .ant-select-selector {
        width: 100%;
        height: 50px !important;
        border: 1px #d9e5ed solid;
        border-radius: 4px;
        text-align: left;
      }
    }
    .SearchOutlined {
      font-size: 20px;
      color: #869dad;
      font-weight: 800;
    }
    .ant-select-arrow {
      width: auto;
      height: auto;
      top: 45%;
      cursor: default;
    }
    .ant-select-selection-search-input {
      font-size: 14px;
      color: #869dad;
      height: 48px !important;
    }
    .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
      line-height: 48px !important;
      font-size: 14px;
      color: #869dad;
    }
  }
`;

export const WorkDiv = styled.div`
  background: white;
  padding: 2rem 0;
  display: flex;
  justify-content: space-evenly;

  .main-div {
    width: 30%;
    .heading {
      font-size: 18px;
      font-weight: 500;
      color: rgb(54, 83, 102);
      font-family: "Roboto";
      margin-bottom: 10px;
    }
  }
`;

export const AttributeBar = styled.div`
  .left {
    .ant-select-selector {
      background: #f2f7f9;
    }
  }

  .right {
    width: 25%;
  }

  .right,
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 10px;
    }
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ant-input {
      width: 200px;
    }
  }
  .custom-attribute-btn {
    color: #185edf;
    border: 1px solid #185edf;
    border-radius: 4px;
    height: auto;
    padding: 5.5px 10px;
    line-height: normal;
    font-size: 14px;
    font-weight: 500;
    &:hover {
      color: white;
      background: #185edf;
    }
  }
  .grey-btn {
    background: #fff;
    padding: 8px 10px;
    height: auto;
    font-size: 14px;
    border: 1px #d9e5ed solid;
    border-radius: 4px;
    color: #365366;
    width: auto;

    img {
      max-width: 15px;
      max-height: 15px;
    }

    &:hover {
      color: #365366;
    }
  }
`;
