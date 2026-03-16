import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MailgunWebhookController::handle
* @see app/Http/Controllers/MailgunWebhookController.php:10
* @route '/mailgun/webhook'
*/
export const handle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

handle.definition = {
    methods: ["post"],
    url: '/mailgun/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MailgunWebhookController::handle
* @see app/Http/Controllers/MailgunWebhookController.php:10
* @route '/mailgun/webhook'
*/
handle.url = (options?: RouteQueryOptions) => {
    return handle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MailgunWebhookController::handle
* @see app/Http/Controllers/MailgunWebhookController.php:10
* @route '/mailgun/webhook'
*/
handle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

const MailgunWebhookController = { handle }

export default MailgunWebhookController