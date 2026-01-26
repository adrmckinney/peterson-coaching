import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:12
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
* @see app/Http/Controllers/LandingController.php:12
* @route '/landing'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:12
* @route '/landing'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:12
* @route '/landing'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LandingController::edit
* @see app/Http/Controllers/LandingController.php:46
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
* @see app/Http/Controllers/LandingController.php:46
* @route '/admin/landing'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::edit
* @see app/Http/Controllers/LandingController.php:46
* @route '/admin/landing'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::edit
* @see app/Http/Controllers/LandingController.php:46
* @route '/admin/landing'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LandingController::patchSection
* @see app/Http/Controllers/LandingController.php:80
* @route '/admin/pages/{page}/sections/{section}'
*/
export const patchSection = (args: { page: number | { id: number }, section: number | { id: number } } | [page: number | { id: number }, section: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patchSection.url(args, options),
    method: 'patch',
})

patchSection.definition = {
    methods: ["patch"],
    url: '/admin/pages/{page}/sections/{section}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\LandingController::patchSection
* @see app/Http/Controllers/LandingController.php:80
* @route '/admin/pages/{page}/sections/{section}'
*/
patchSection.url = (args: { page: number | { id: number }, section: number | { id: number } } | [page: number | { id: number }, section: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            page: args[0],
            section: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        page: typeof args.page === 'object'
        ? args.page.id
        : args.page,
        section: typeof args.section === 'object'
        ? args.section.id
        : args.section,
    }

    return patchSection.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::patchSection
* @see app/Http/Controllers/LandingController.php:80
* @route '/admin/pages/{page}/sections/{section}'
*/
patchSection.patch = (args: { page: number | { id: number }, section: number | { id: number } } | [page: number | { id: number }, section: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patchSection.url(args, options),
    method: 'patch',
})

const LandingController = { index, edit, patchSection }

export default LandingController