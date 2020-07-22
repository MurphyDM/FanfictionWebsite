import React from "react"

import ProfileHead from "../../components/components/ProfileHead"
import WorksList from "./WorksListContainer"
import Readinglist from "./ReadingList"
import WriteStory from "./WriteStory"

import Tabs from "../../components/components/ControlledTabs"

class Profile extends React.Component {
    render() {
        const components = [
            {
                name: 'Works',
                component: WorksList
            },
            {
                name: 'Reading list',
                component: Readinglist
            },
            {
                name: 'Write Story',
                component: WriteStory
            }
        ]
        return (
            <>
                <ProfileHead/>

                <Tabs components = {components}/>
            </>
        )
    }
}

export default Profile;
