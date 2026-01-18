import ProfileController from './ProfileController'
import VideoController from './VideoController'
import Auth from './Auth'

const Controllers = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    VideoController: Object.assign(VideoController, VideoController),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers