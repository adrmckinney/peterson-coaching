import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::edit
* @see app/Http/Controllers/LandingController.php:0
* @route '/admin/landing'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/landing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LandingController::edit
* @see app/Http/Controllers/LandingController.php:0
* @route '/admin/landing'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::edit
* @see app/Http/Controllers/LandingController.php:0
* @route '/admin/landing'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::edit
* @see app/Http/Controllers/LandingController.php:0
* @route '/admin/landing'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

const landing = {
    edit: Object.assign(edit, edit),
}

export default landing