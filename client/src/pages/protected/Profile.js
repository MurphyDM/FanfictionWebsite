import React from "react";
import Alert from "../../helpers/Alert";
import ProfileHead from "../../components/containers/ProfileHeadContainer";
import Tabs from "../../components/components/ControlledTabs";
import Header from "../../components/containers/HeaderContainer";
import ReadingList from "./ReadingList"
const LazyReadingListComponent = React.lazy(() =>
  import("./ReadingListContainer")
);
const LazyWriteStoryComponent = React.lazy(() => import("./WriteStory"));
const LazyWorksListComponent = React.lazy(() => import("./WorksListContainer"));

function Profile(props) {
  const components = [
    {
      name: "Works",
      component: LazyWorksListComponent,
    },
    {
      name: "Reading list",
      component: LazyReadingListComponent,
    },
    {
      name: "Write Story",
      component: LazyWriteStoryComponent,
    },
  ];

  return (
    <>
     <Header/>
      <ProfileHead />
      <Tabs components={components} />
    </>
  );
}

export default Profile;
