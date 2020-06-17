import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  AppProvider,
  Page,
  Stack,
  Button,
  Modal,
  Card,
  ResourceList,
} from "@shopify/polaris";

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, job_title, description, profile_url } = this.props.employee;
    console.log(this.props);
    return (
      <AppProvider>
        <Page
          title={name}
          primaryAction={{ content: "Save" }}
        >
          <Card sectioned>
            <img
              src={profile_url}
              alt=""
              style={{
                maxWidth: "250px",
              }}
            />
          </Card>
          <Card>
            <div>{job_title}</div>
          </Card>
        </Page>
      </AppProvider>
    );
  }
}
export default EmployeeEdit;

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("employee-edit");
  const data = node === null ? null : JSON.parse(node.getAttribute("data"));
  ReactDOM.render(<EmployeeEdit {...data} />, node);
});