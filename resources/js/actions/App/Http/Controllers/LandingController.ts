import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:13
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
* @see app/Http/Controllers/LandingController.php:13
* @route '/landing'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:13
* @route '/landing'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::index
* @see app/Http/Controllers/LandingController.php:13
* @route '/landing'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

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

/**
* @see \App\Http\Controllers\LandingController::patchIntro
* @see app/Http/Controllers/LandingController.php:27
* @route '/admin/pages/{pageId}/sections/{sectionId}'
*/
export const patchIntro = (args: { pageId: string | number, sectionId: string | number } | [pageId: string | number, sectionId: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patchIntro.url(args, options),
    method: 'patch',
})

patchIntro.definition = {
    methods: ["patch"],
    url: '/admin/pages/{pageId}/sections/{sectionId}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\LandingController::patchIntro
* @see app/Http/Controllers/LandingController.php:27
* @route '/admin/pages/{pageId}/sections/{sectionId}'
*/
patchIntro.url = (args: { pageId: string | number, sectionId: string | number } | [pageId: string | number, sectionId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            pageId: args[0],
            sectionId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pageId: args.pageId,
        sectionId: args.sectionId,
    }

    return patchIntro.definition.url
            .replace('{pageId}', parsedArgs.pageId.toString())
            .replace('{sectionId}', parsedArgs.sectionId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::patchIntro
* @see app/Http/Controllers/LandingController.php:27
* @route '/admin/pages/{pageId}/sections/{sectionId}'
*/
patchIntro.patch = (args: { pageId: string | number, sectionId: string | number } | [pageId: string | number, sectionId: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patchIntro.url(args, options),
    method: 'patch',
})

const LandingController = { index, edit, patchIntro }

export default LandingController