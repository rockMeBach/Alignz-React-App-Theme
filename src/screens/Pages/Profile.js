import React from "react";
import PageHeader from "../../components/PageHeader";
import ProfileV1Setting from "../../components/Pages/ProfileV1Setting";

const Profile = () => {
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container">
          <PageHeader
            HeaderText="Profile"
            Breadcrumb={[{ name: "Profile", navigate: "" }]}
          />
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="body">
                <ProfileV1Setting />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
