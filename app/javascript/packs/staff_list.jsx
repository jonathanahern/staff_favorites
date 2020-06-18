import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AppProvider , Page , Stack , TextStyle , Card , ResourceList, Button }
from '@shopify/polaris' ;


class StaffList extends Component {
  constructor(props) {
    super(props);
  }

  renderStaff = (staff) => {
    const { id, name, job_title, description, profile_url } = staff;
    let title = null;
    if (job_title.length > 0){
        title = ` - ${job_title}`
    } else {
        title = ``
    }
    
    return (
      <ResourceList.Item id={id} accessibilityLabel={`details for ${name} `}>
        <a href={Routes.edit_api_v1_employee_path({ id: id })}>
          <Stack>
            <img src={profile_url} style={{ width: "60px" }} />
            <h3>
              <TextStyle variation="strong">
                {" "}
                {name}
                {title}{" "}
              </TextStyle>
            </h3>
          </Stack>
        </a>
      </ResourceList.Item>
    );
  };

  render() {
    const { staff } = this.props;
    return (
      <AppProvider
        i18n={{
          Polaris: {
            ResourceList: {
              sortingLabel: "Sort by",
              defaultItemSingular: "staff",
              defaultItemPlural: "staff",
              showing: "Showing {itemsCount} {resource}",
              Item: {
                viewItem: "View details for {itemName}",
              },
            },
            Common: {
              checkbox: "checkbox",
            },
          },
        }}
      >
        <Page title="Staff Favorites App">
          <Card>
            <ResourceList
              showHeader
              items={staff}
              renderItem={this.renderStaff}
            ></ResourceList>
          </Card>
          <br />
          <Button primary>Add Staff</Button>
        </Page>
      </AppProvider>
    );
  }
}
export default StaffList;

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("staff-list");
  const data = node === null ? null : JSON.parse(node.getAttribute("data"));
  if (data !== null) {
    ReactDOM.render(<StaffList {...data} />, node);
  }
});