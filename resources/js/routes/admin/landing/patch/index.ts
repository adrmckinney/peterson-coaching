import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::section
* @see app/Http/Controllers/LandingController.php:80
* @route '/admin/pages/{page}/sections/{section}'
*/
export const section = (args: { page: number | { id: number }, section: number | { id: number } } | [page: number | { id: number }, section: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: section.url(args, options),
    method: 'patch',
})

section.definition = {
    methods: ["patch"],
    url: '/admin/pages/{page}/sections/{section}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\LandingController::section
* @see app/Http/Controllers/LandingController.php:80
* @route '/admin/pages/{page}/sections/{section}'
*/
section.url = (args: { page: number | { id: number }, section: number | { id: number } } | [page: number | { id: number }, section: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return section.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::section
* @see app/Http/Controllers/LandingController.php:80
* @route '/admin/pages/{page}/sections/{section}'
*/
section.patch = (args: { page: number | { id: number }, section: number | { id: number } } | [page: number | { id: number }, section: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: section.url(args, options),
    method: 'patch',
})

const patch = {
    section: Object.assign(section, section),
}

export default patch