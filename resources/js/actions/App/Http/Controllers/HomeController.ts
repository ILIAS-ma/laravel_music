import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::test
 * @see app/Http/Controllers/HomeController.php:9
 * @route '/test'
 */
export const test = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})

test.definition = {
    methods: ["get","head"],
    url: '/test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::test
 * @see app/Http/Controllers/HomeController.php:9
 * @route '/test'
 */
test.url = (options?: RouteQueryOptions) => {
    return test.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::test
 * @see app/Http/Controllers/HomeController.php:9
 * @route '/test'
 */
test.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::test
 * @see app/Http/Controllers/HomeController.php:9
 * @route '/test'
 */
test.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: test.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::test
 * @see app/Http/Controllers/HomeController.php:9
 * @route '/test'
 */
    const testForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: test.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::test
 * @see app/Http/Controllers/HomeController.php:9
 * @route '/test'
 */
        testForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: test.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::test
 * @see app/Http/Controllers/HomeController.php:9
 * @route '/test'
 */
        testForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: test.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    test.form = testForm
const HomeController = { test }

export default HomeController