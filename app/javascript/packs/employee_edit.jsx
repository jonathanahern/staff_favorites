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
  Form,
  FormLayout,
  Checkbox,
  TextField
} from "@shopify/polaris";

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.employee.name,
      job_title: this.props.employee.job_title,
      description: this.props.employee.description,
      profile_url: this.props.employee.profile_url,
      save_loading: false,
      save_disabled: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ save_loading: true });
    let employee = {
        name: this.state.name,
        job_title: this.state.job_title,
        description: this.state.description,
        profile_url: this.state.profile_url,
    };
    this.setState({ employee }, () => {
      const data = {
        employee
      };
      fetch(
        Routes.api_v1_employee_path(this.props.employee.id, {
          format: "json",
        }),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": Rails.csrfToken(),
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          this.setState({ save_loading: false, save_disabled: true });
        });
    });
  }

  handleChange(name, value) {
    this.setState({ save_disabled: false });
    let state = this.state;
    state[name] = value;
    this.setState({ state });
  }

  render() {
    const { name } = this.props.employee;
    const { save_loading, save_disabled } = this.state;
    const title = `${name}'s Profile`;
    return (
      <AppProvider>
        <Page
          breadcrumbs={[{ content: "Back", url: Routes.root_path() }]}
          title={title}
        >
          <br />
          <Form onSubmit={this.handleSubmit}>
            <FormLayout>
              <Stack>
                <div>
                  <TextField
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, "name")}
                    label="Name"
                    type="text"
                    maxLength={24}
                    fullWidth
                  />
                  <br />
                  <TextField
                    value={this.state.job_title}
                    onChange={this.handleChange.bind(this, "job_title")}
                    label="Job Title"
                    type="text"
                    maxLength={24}
                  />
                  <br />
                  <TextField
                    value={this.state.description}
                    onChange={this.handleChange.bind(this, "description")}
                    label="Description"
                    multiline={true}
                    rows={3}
                    maxLength={240}
                  />
                  <br />
                  <TextField
                    value={this.state.profile_url}
                    onChange={this.handleChange.bind(this, "profile_url")}
                    label="Profile Image URL"
                    maxLength={300}
                    helpText={
                      <span>
                        Upload images to Shopify Files page (Settings > Files)
                        and paste the URL here
                      </span>
                    }
                  />
                </div>
                <img
                  src={this.state.profile_url}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                  }}
                  style={{ height: "320px" }}
                />
              </Stack>
              <Button
                primary={true}
                loading={save_loading}
                disabled={save_disabled}
                submit
              >
                Save
              </Button>
            </FormLayout>
          </Form>
        </Page>
      </AppProvider>
    );
  }
}
export default EmployeeEdit;

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("employee-edit");
  const data = node === null ? null : JSON.parse(node.getAttribute("data"));
  if (data !== null) {
    ReactDOM.render(<EmployeeEdit {...data} />, node);
  }
});