import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PlaylistController::apiIndex
 * @see app/Http/Controllers/PlaylistController.php:129
 * @route '/api/playlists'
 */
export const apiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

apiIndex.definition = {
    methods: ["get","head"],
    url: '/api/playlists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlaylistController::apiIndex
 * @see app/Http/Controllers/PlaylistController.php:129
 * @route '/api/playlists'
 */
apiIndex.url = (options?: RouteQueryOptions) => {
    return apiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlaylistController::apiIndex
 * @see app/Http/Controllers/PlaylistController.php:129
 * @route '/api/playlists'
 */
apiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlaylistController::apiIndex
 * @see app/Http/Controllers/PlaylistController.php:129
 * @route '/api/playlists'
 */
apiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlaylistController::apiIndex
 * @see app/Http/Controllers/PlaylistController.php:129
 * @route '/api/playlists'
 */
    const apiIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: apiIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlaylistController::apiIndex
 * @see app/Http/Controllers/PlaylistController.php:129
 * @route '/api/playlists'
 */
        apiIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apiIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlaylistController::apiIndex
 * @see app/Http/Controllers/PlaylistController.php:129
 * @route '/api/playlists'
 */
        apiIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apiIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    apiIndex.form = apiIndexForm
/**
* @see \App\Http\Controllers\PlaylistController::index
 * @see app/Http/Controllers/PlaylistController.php:19
 * @route '/playlists'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/playlists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlaylistController::index
 * @see app/Http/Controllers/PlaylistController.php:19
 * @route '/playlists'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlaylistController::index
 * @see app/Http/Controllers/PlaylistController.php:19
 * @route '/playlists'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlaylistController::index
 * @see app/Http/Controllers/PlaylistController.php:19
 * @route '/playlists'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlaylistController::index
 * @see app/Http/Controllers/PlaylistController.php:19
 * @route '/playlists'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlaylistController::index
 * @see app/Http/Controllers/PlaylistController.php:19
 * @route '/playlists'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlaylistController::index
 * @see app/Http/Controllers/PlaylistController.php:19
 * @route '/playlists'
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
* @see \App\Http\Controllers\PlaylistController::create
 * @see app/Http/Controllers/PlaylistController.php:33
 * @route '/playlists/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/playlists/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlaylistController::create
 * @see app/Http/Controllers/PlaylistController.php:33
 * @route '/playlists/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlaylistController::create
 * @see app/Http/Controllers/PlaylistController.php:33
 * @route '/playlists/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlaylistController::create
 * @see app/Http/Controllers/PlaylistController.php:33
 * @route '/playlists/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlaylistController::create
 * @see app/Http/Controllers/PlaylistController.php:33
 * @route '/playlists/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlaylistController::create
 * @see app/Http/Controllers/PlaylistController.php:33
 * @route '/playlists/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlaylistController::create
 * @see app/Http/Controllers/PlaylistController.php:33
 * @route '/playlists/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\PlaylistController::store
 * @see app/Http/Controllers/PlaylistController.php:45
 * @route '/playlists'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/playlists',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlaylistController::store
 * @see app/Http/Controllers/PlaylistController.php:45
 * @route '/playlists'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlaylistController::store
 * @see app/Http/Controllers/PlaylistController.php:45
 * @route '/playlists'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PlaylistController::store
 * @see app/Http/Controllers/PlaylistController.php:45
 * @route '/playlists'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlaylistController::store
 * @see app/Http/Controllers/PlaylistController.php:45
 * @route '/playlists'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PlaylistController::edit
 * @see app/Http/Controllers/PlaylistController.php:69
 * @route '/playlists/{playlist}/edit'
 */
export const edit = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/playlists/{playlist}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlaylistController::edit
 * @see app/Http/Controllers/PlaylistController.php:69
 * @route '/playlists/{playlist}/edit'
 */
edit.url = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { playlist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { playlist: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    playlist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        playlist: typeof args.playlist === 'object'
                ? args.playlist.slug
                : args.playlist,
                }

    return edit.definition.url
            .replace('{playlist}', parsedArgs.playlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlaylistController::edit
 * @see app/Http/Controllers/PlaylistController.php:69
 * @route '/playlists/{playlist}/edit'
 */
edit.get = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlaylistController::edit
 * @see app/Http/Controllers/PlaylistController.php:69
 * @route '/playlists/{playlist}/edit'
 */
edit.head = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlaylistController::edit
 * @see app/Http/Controllers/PlaylistController.php:69
 * @route '/playlists/{playlist}/edit'
 */
    const editForm = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlaylistController::edit
 * @see app/Http/Controllers/PlaylistController.php:69
 * @route '/playlists/{playlist}/edit'
 */
        editForm.get = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlaylistController::edit
 * @see app/Http/Controllers/PlaylistController.php:69
 * @route '/playlists/{playlist}/edit'
 */
        editForm.head = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\PlaylistController::update
 * @see app/Http/Controllers/PlaylistController.php:88
 * @route '/playlists/{playlist}'
 */
export const update = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/playlists/{playlist}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PlaylistController::update
 * @see app/Http/Controllers/PlaylistController.php:88
 * @route '/playlists/{playlist}'
 */
update.url = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { playlist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { playlist: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    playlist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        playlist: typeof args.playlist === 'object'
                ? args.playlist.slug
                : args.playlist,
                }

    return update.definition.url
            .replace('{playlist}', parsedArgs.playlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlaylistController::update
 * @see app/Http/Controllers/PlaylistController.php:88
 * @route '/playlists/{playlist}'
 */
update.put = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PlaylistController::update
 * @see app/Http/Controllers/PlaylistController.php:88
 * @route '/playlists/{playlist}'
 */
update.patch = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PlaylistController::update
 * @see app/Http/Controllers/PlaylistController.php:88
 * @route '/playlists/{playlist}'
 */
    const updateForm = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlaylistController::update
 * @see app/Http/Controllers/PlaylistController.php:88
 * @route '/playlists/{playlist}'
 */
        updateForm.put = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PlaylistController::update
 * @see app/Http/Controllers/PlaylistController.php:88
 * @route '/playlists/{playlist}'
 */
        updateForm.patch = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PlaylistController::destroy
 * @see app/Http/Controllers/PlaylistController.php:114
 * @route '/playlists/{playlist}'
 */
export const destroy = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/playlists/{playlist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PlaylistController::destroy
 * @see app/Http/Controllers/PlaylistController.php:114
 * @route '/playlists/{playlist}'
 */
destroy.url = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { playlist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { playlist: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    playlist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        playlist: typeof args.playlist === 'object'
                ? args.playlist.slug
                : args.playlist,
                }

    return destroy.definition.url
            .replace('{playlist}', parsedArgs.playlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlaylistController::destroy
 * @see app/Http/Controllers/PlaylistController.php:114
 * @route '/playlists/{playlist}'
 */
destroy.delete = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PlaylistController::destroy
 * @see app/Http/Controllers/PlaylistController.php:114
 * @route '/playlists/{playlist}'
 */
    const destroyForm = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlaylistController::destroy
 * @see app/Http/Controllers/PlaylistController.php:114
 * @route '/playlists/{playlist}'
 */
        destroyForm.delete = (args: { playlist: string | { slug: string } } | [playlist: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PlaylistController = { apiIndex, index, create, store, edit, update, destroy }

export default PlaylistController