import PageController from './PageController'
import ProfileController from './ProfileController'
import ContactController from './ContactController'
import MailgunWebhookController from './MailgunWebhookController'
import Auth from './Auth'

const Controllers = {
    PageController: Object.assign(PageController, PageController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    ContactController: Object.assign(ContactController, ContactController),
    MailgunWebhookController: Object.assign(MailgunWebhookController, MailgunWebhookController),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers