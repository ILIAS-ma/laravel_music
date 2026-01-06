import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ApiKeyController::index
 * @see app/Http/Controllers/ApiKeyController.php:15
 * @route '/api-keys'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api-keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ApiKeyController::index
 * @see app/Http/Controllers/ApiKeyController.php:15
 * @route '/api-keys'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ApiKeyController::index
 * @see app/Http/Controllers/ApiKeyController.php:15
 * @route '/api-keys'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ApiKeyController::index
 * @see app/Http/Controllers/ApiKeyController.php:15
 * @route '/api-keys'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ApiKeyController::index
 * @see app/Http/Controllers/ApiKeyController.php:15
 * @route '/api-keys'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ApiKeyController::index
 * @see app/Http/Controllers/ApiKeyController.php:15
 * @route '/api-keys'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ApiKeyController::index
 * @see app/Http/Controllers/ApiKeyController.php:15
 * @route '/api-keys'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ApiKeyController::store
 * @see app/Http/Controllers/ApiKeyController.php:27
 * @route '/api-keys'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api-keys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ApiKeyController::store
 * @see app/Http/Controllers/ApiKeyController.php:27
 * @route '/api-keys'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ApiKeyController::store
 * @see app/Http/Controllers/ApiKeyController.php:27
 * @route '/api-keys'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ApiKeyController::store
 * @see app/Http/Controllers/ApiKeyController.php:27
 * @route '/api-keys'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ApiKeyController::store
 * @see app/Http/Controllers/ApiKeyController.php:27
 * @route '/api-keys'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ApiKeyController::update
 * @see app/Http/Controllers/ApiKeyController.php:46
 * @route '/api-keys/{api_key}'
 */
export const update = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api-keys/{api_key}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ApiKeyController::update
 * @see app/Http/Controllers/ApiKeyController.php:46
 * @route '/api-keys/{api_key}'
 */
update.url = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { api_key: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    api_key: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        api_key: args.api_key,
                }

    return update.definition.url
            .replace('{api_key}', parsedArgs.api_key.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ApiKeyController::update
 * @see app/Http/Controllers/ApiKeyController.php:46
 * @route '/api-keys/{api_key}'
 */
update.put = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ApiKeyController::update
 * @see app/Http/Controllers/ApiKeyController.php:46
 * @route '/api-keys/{api_key}'
 */
update.patch = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ApiKeyController::update
 * @see app/Http/Controllers/ApiKeyController.php:46
 * @route '/api-keys/{api_key}'
 */
    const updateForm = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ApiKeyController::update
 * @see app/Http/Controllers/ApiKeyController.php:46
 * @route '/api-keys/{api_key}'
 */
        updateForm.put = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ApiKeyController::update
 * @see app/Http/Controllers/ApiKeyController.php:46
 * @route '/api-keys/{api_key}'
 */
        updateForm.patch = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ApiKeyController::destroy
 * @see app/Http/Controllers/ApiKeyController.php:65
 * @route '/api-keys/{api_key}'
 */
export const destroy = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api-keys/{api_key}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ApiKeyController::destroy
 * @see app/Http/Controllers/ApiKeyController.php:65
 * @route '/api-keys/{api_key}'
 */
destroy.url = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { api_key: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    api_key: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        api_key: args.api_key,
                }

    return destroy.definition.url
            .replace('{api_key}', parsedArgs.api_key.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ApiKeyController::destroy
 * @see app/Http/Controllers/ApiKeyController.php:65
 * @route '/api-keys/{api_key}'
 */
destroy.delete = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ApiKeyController::destroy
 * @see app/Http/Controllers/ApiKeyController.php:65
 * @route '/api-keys/{api_key}'
 */
    const destroyForm = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ApiKeyController::destroy
 * @see app/Http/Controllers/ApiKeyController.php:65
 * @route '/api-keys/{api_key}'
 */
        destroyForm.delete = (args: { api_key: string | number } | [api_key: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const apiKeys = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default apiKeys