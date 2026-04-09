import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PageController::landing
* @see app/Http/Controllers/PageController.php:12
* @route '/'
*/
export const landing = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(options),
    method: 'get',
})

landing.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PageController::landing
* @see app/Http/Controllers/PageController.php:12
* @route '/'
*/
landing.url = (options?: RouteQueryOptions) => {
    return landing.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PageController::landing
* @see app/Http/Controllers/PageController.php:12
* @route '/'
*/
landing.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PageController::landing
* @see app/Http/Controllers/PageController.php:12
* @route '/'
*/
landing.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: landing.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PageController::about
* @see app/Http/Controllers/PageController.php:17
* @route '/about'
*/
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PageController::about
* @see app/Http/Controllers/PageController.php:17
* @route '/about'
*/
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PageController::about
* @see app/Http/Controllers/PageController.php:17
* @route '/about'
*/
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PageController::about
* @see app/Http/Controllers/PageController.php:17
* @route '/about'
*/
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PageController::features
* @see app/Http/Controllers/PageController.php:22
* @route '/features'
*/
export const features = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: features.url(options),
    method: 'get',
})

features.definition = {
    methods: ["get","head"],
    url: '/features',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PageController::features
* @see app/Http/Controllers/PageController.php:22
* @route '/features'
*/
features.url = (options?: RouteQueryOptions) => {
    return features.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PageController::features
* @see app/Http/Controllers/PageController.php:22
* @route '/features'
*/
features.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: features.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PageController::features
* @see app/Http/Controllers/PageController.php:22
* @route '/features'
*/
features.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: features.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PageController::testimonials
* @see app/Http/Controllers/PageController.php:27
* @route '/testimonials'
*/
export const testimonials = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testimonials.url(options),
    method: 'get',
})

testimonials.definition = {
    methods: ["get","head"],
    url: '/testimonials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PageController::testimonials
* @see app/Http/Controllers/PageController.php:27
* @route '/testimonials'
*/
testimonials.url = (options?: RouteQueryOptions) => {
    return testimonials.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PageController::testimonials
* @see app/Http/Controllers/PageController.php:27
* @route '/testimonials'
*/
testimonials.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testimonials.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PageController::testimonials
* @see app/Http/Controllers/PageController.php:27
* @route '/testimonials'
*/
testimonials.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: testimonials.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PageController::packages
* @see app/Http/Controllers/PageController.php:32
* @route '/packages'
*/
export const packages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: packages.url(options),
    method: 'get',
})

packages.definition = {
    methods: ["get","head"],
    url: '/packages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PageController::packages
* @see app/Http/Controllers/PageController.php:32
* @route '/packages'
*/
packages.url = (options?: RouteQueryOptions) => {
    return packages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PageController::packages
* @see app/Http/Controllers/PageController.php:32
* @route '/packages'
*/
packages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: packages.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PageController::packages
* @see app/Http/Controllers/PageController.php:32
* @route '/packages'
*/
packages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: packages.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PageController::contact
* @see app/Http/Controllers/PageController.php:37
* @route '/contact'
*/
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PageController::contact
* @see app/Http/Controllers/PageController.php:37
* @route '/contact'
*/
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PageController::contact
* @see app/Http/Controllers/PageController.php:37
* @route '/contact'
*/
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PageController::contact
* @see app/Http/Controllers/PageController.php:37
* @route '/contact'
*/
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

const PageController = { landing, about, features, testimonials, packages, contact }

export default PageController