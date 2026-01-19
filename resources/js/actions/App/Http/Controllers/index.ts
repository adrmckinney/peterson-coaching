import ProfileController from './ProfileController'
import LandingController from './LandingController'
import Auth from './Auth'

const Controllers = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    LandingController: Object.assign(LandingController, LandingController),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers