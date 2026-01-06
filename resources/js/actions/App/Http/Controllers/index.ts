import PlaylistController from './PlaylistController'
import HomeController from './HomeController'
import Settings from './Settings'
import TrackController from './TrackController'
import ApiKeyController from './ApiKeyController'
const Controllers = {
    PlaylistController: Object.assign(PlaylistController, PlaylistController),
HomeController: Object.assign(HomeController, HomeController),
Settings: Object.assign(Settings, Settings),
TrackController: Object.assign(TrackController, TrackController),
ApiKeyController: Object.assign(ApiKeyController, ApiKeyController),
}

export default Controllers