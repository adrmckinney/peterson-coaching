import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:9
* @route '/landing'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/landing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:9
* @route '/landing'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:9
* @route '/landing'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:9
* @route '/landing'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const LandingController = { index }

export default LandingController