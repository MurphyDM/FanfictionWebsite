import React from "react"
import Alert from '../../helpers/Alert'
import ProfileHead from "../../components/containers/ProfileHeadContainer"
import Tabs from "../../components/components/ControlledTabs"

const LazyReadingListComponent = React.lazy(() => import("./ReadingListContainer"));
const LazyWriteStoryComponent = React.lazy(() => import("./WriteStory"));
const LazyWorksListComponent = React.lazy(() => import("./WorksListContainer"));

function Profile(props) {
    const components = [
        {
            name: 'Works',
            component: LazyWorksListComponent
        },
        {
            name: 'Reading list',
            component: LazyReadingListComponent
        },
        {
            name: 'Write Story',
            component: LazyWriteStoryComponent
        }
    ]

        return (
            <>
            {props.err&&<Alert msg={props.error} type="danger" />}
            {props.success&&<Alert msg={props.success} type="success" />}

                <ProfileHead/>
                <Tabs components = {components}/>
                
            </>
        )
}

export default Profile;
