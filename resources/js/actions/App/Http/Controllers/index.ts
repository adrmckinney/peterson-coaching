import ProfileController from './ProfileController'
import LandingController from './LandingController'
import ContactController from './ContactController'
import Auth from './Auth'

const Controllers = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    LandingController: Object.assign(LandingController, LandingController),
    ContactController: Object.assign(ContactController, ContactController),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers