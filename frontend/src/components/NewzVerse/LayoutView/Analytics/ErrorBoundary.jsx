import React from "react";
import somethingWentWrong from "../../../../assets/Analytics/somethingwentwrong.svg";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const Error = ({ props }) => {
  const dispatch = useDispatch();
  return (
    <div className="portlet_images mb-15 mt-15">
      <img
        alt="no data"
        src={somethingWentWrong}
        style={{ maxWidth: "100%" }}
      />

      <div
        className="text_regular fontSize-18 mb-15"
        style={{ lineHeight: "normal" }}
      >
        Oops ! Something went wrong.
      </div>
    </div>
  );
};

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div
          style={{
            height: this.props.deepDiveTab
              ? "100%"
              : this.props.chart
              ? "450px"
              : "calc(100vh - 50px)",
          }}
          className="d-flex bg__white align-items-center"
        >
          <div className="w-100 text-center">
            <Error props={this.props} />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
