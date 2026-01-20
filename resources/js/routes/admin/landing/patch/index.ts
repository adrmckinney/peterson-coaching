import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::intro
* @see app/Http/Controllers/LandingController.php:27
* @route '/admin/pages/{pageId}/sections/{sectionId}'
*/
export const intro = (args: { pageId: string | number, sectionId: string | number } | [pageId: string | number, sectionId: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: intro.url(args, options),
    method: 'patch',
})

intro.definition = {
    methods: ["patch"],
    url: '/admin/pages/{pageId}/sections/{sectionId}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\LandingController::intro
* @see app/Http/Controllers/LandingController.php:27
* @route '/admin/pages/{pageId}/sections/{sectionId}'
*/
intro.url = (args: { pageId: string | number, sectionId: string | number } | [pageId: string | number, sectionId: string | number ], options?: RouteQueryOptions) => {
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

    return intro.definition.url
            .replace('{pageId}', parsedArgs.pageId.toString())
            .replace('{sectionId}', parsedArgs.sectionId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::intro
* @see app/Http/Controllers/LandingController.php:27
* @route '/admin/pages/{pageId}/sections/{sectionId}'
*/
intro.patch = (args: { pageId: string | number, sectionId: string | number } | [pageId: string | number, sectionId: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: intro.url(args, options),
    method: 'patch',
})

const patch = {
    intro: Object.assign(intro, intro),
}

export default patch