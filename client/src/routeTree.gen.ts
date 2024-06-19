/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as NoobImport } from './routes/noob'
import { Route as LoginImport } from './routes/login'
import { Route as UserImport } from './routes/_user'
import { Route as AdminImport } from './routes/_admin'
import { Route as IndexImport } from './routes/index'
import { Route as PlacementPlacementIdImport } from './routes/placement.$placementId'
import { Route as ExtracuricullarEventsExtracuricullarEventIdImport } from './routes/extracuricullarEvents.$extracuricullarEventId'
import { Route as AchievementsAchievementIdImport } from './routes/achievements.$achievementId'
import { Route as UserTechnicalHomeImport } from './routes/_user/technicalHome'
import { Route as UserTechnicalFormImport } from './routes/_user/technicalForm'
import { Route as UserPlacementHomeImport } from './routes/_user/placementHome'
import { Route as UserPlacementFormImport } from './routes/_user/placementForm'
import { Route as UserExtracurricularFormImport } from './routes/_user/extracurricularForm'
import { Route as UserExtracuricullarHomeImport } from './routes/_user/extracuricullarHome'
import { Route as UserAchievementsImport } from './routes/_user/achievements'
import { Route as UserAchievementFormImport } from './routes/_user/achievementForm'

// Create/Update Routes

const NoobRoute = NoobImport.update({
  path: '/noob',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const UserRoute = UserImport.update({
  id: '/_user',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PlacementPlacementIdRoute = PlacementPlacementIdImport.update({
  path: '/placement/$placementId',
  getParentRoute: () => rootRoute,
} as any)

const ExtracuricullarEventsExtracuricullarEventIdRoute =
  ExtracuricullarEventsExtracuricullarEventIdImport.update({
    path: '/extracuricullarEvents/$extracuricullarEventId',
    getParentRoute: () => rootRoute,
  } as any)

const AchievementsAchievementIdRoute = AchievementsAchievementIdImport.update({
  path: '/achievements/$achievementId',
  getParentRoute: () => rootRoute,
} as any)

const UserTechnicalHomeRoute = UserTechnicalHomeImport.update({
  path: '/technicalHome',
  getParentRoute: () => UserRoute,
} as any)

const UserTechnicalFormRoute = UserTechnicalFormImport.update({
  path: '/technicalForm',
  getParentRoute: () => UserRoute,
} as any)

const UserPlacementHomeRoute = UserPlacementHomeImport.update({
  path: '/placementHome',
  getParentRoute: () => UserRoute,
} as any)

const UserPlacementFormRoute = UserPlacementFormImport.update({
  path: '/placementForm',
  getParentRoute: () => UserRoute,
} as any)

const UserExtracurricularFormRoute = UserExtracurricularFormImport.update({
  path: '/extracurricularForm',
  getParentRoute: () => UserRoute,
} as any)

const UserExtracuricullarHomeRoute = UserExtracuricullarHomeImport.update({
  path: '/extracuricullarHome',
  getParentRoute: () => UserRoute,
} as any)

const UserAchievementsRoute = UserAchievementsImport.update({
  path: '/achievements',
  getParentRoute: () => UserRoute,
} as any)

const UserAchievementFormRoute = UserAchievementFormImport.update({
  path: '/achievementForm',
  getParentRoute: () => UserRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_admin': {
      id: '/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_user': {
      id: '/_user'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/noob': {
      id: '/noob'
      path: '/noob'
      fullPath: '/noob'
      preLoaderRoute: typeof NoobImport
      parentRoute: typeof rootRoute
    }
    '/_user/achievementForm': {
      id: '/_user/achievementForm'
      path: '/achievementForm'
      fullPath: '/achievementForm'
      preLoaderRoute: typeof UserAchievementFormImport
      parentRoute: typeof UserImport
    }
    '/_user/achievements': {
      id: '/_user/achievements'
      path: '/achievements'
      fullPath: '/achievements'
      preLoaderRoute: typeof UserAchievementsImport
      parentRoute: typeof UserImport
    }
    '/_user/extracuricullarHome': {
      id: '/_user/extracuricullarHome'
      path: '/extracuricullarHome'
      fullPath: '/extracuricullarHome'
      preLoaderRoute: typeof UserExtracuricullarHomeImport
      parentRoute: typeof UserImport
    }
    '/_user/extracurricularForm': {
      id: '/_user/extracurricularForm'
      path: '/extracurricularForm'
      fullPath: '/extracurricularForm'
      preLoaderRoute: typeof UserExtracurricularFormImport
      parentRoute: typeof UserImport
    }
    '/_user/placementForm': {
      id: '/_user/placementForm'
      path: '/placementForm'
      fullPath: '/placementForm'
      preLoaderRoute: typeof UserPlacementFormImport
      parentRoute: typeof UserImport
    }
    '/_user/placementHome': {
      id: '/_user/placementHome'
      path: '/placementHome'
      fullPath: '/placementHome'
      preLoaderRoute: typeof UserPlacementHomeImport
      parentRoute: typeof UserImport
    }
    '/_user/technicalForm': {
      id: '/_user/technicalForm'
      path: '/technicalForm'
      fullPath: '/technicalForm'
      preLoaderRoute: typeof UserTechnicalFormImport
      parentRoute: typeof UserImport
    }
    '/_user/technicalHome': {
      id: '/_user/technicalHome'
      path: '/technicalHome'
      fullPath: '/technicalHome'
      preLoaderRoute: typeof UserTechnicalHomeImport
      parentRoute: typeof UserImport
    }
    '/achievements/$achievementId': {
      id: '/achievements/$achievementId'
      path: '/achievements/$achievementId'
      fullPath: '/achievements/$achievementId'
      preLoaderRoute: typeof AchievementsAchievementIdImport
      parentRoute: typeof rootRoute
    }
    '/extracuricullarEvents/$extracuricullarEventId': {
      id: '/extracuricullarEvents/$extracuricullarEventId'
      path: '/extracuricullarEvents/$extracuricullarEventId'
      fullPath: '/extracuricullarEvents/$extracuricullarEventId'
      preLoaderRoute: typeof ExtracuricullarEventsExtracuricullarEventIdImport
      parentRoute: typeof rootRoute
    }
    '/placement/$placementId': {
      id: '/placement/$placementId'
      path: '/placement/$placementId'
      fullPath: '/placement/$placementId'
      preLoaderRoute: typeof PlacementPlacementIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  UserRoute: UserRoute.addChildren({
    UserAchievementFormRoute,
    UserAchievementsRoute,
    UserExtracuricullarHomeRoute,
    UserExtracurricularFormRoute,
    UserPlacementFormRoute,
    UserPlacementHomeRoute,
    UserTechnicalFormRoute,
    UserTechnicalHomeRoute,
  }),
  LoginRoute,
  NoobRoute,
  AchievementsAchievementIdRoute,
  ExtracuricullarEventsExtracuricullarEventIdRoute,
  PlacementPlacementIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_admin",
        "/_user",
        "/login",
        "/noob",
        "/achievements/$achievementId",
        "/extracuricullarEvents/$extracuricullarEventId",
        "/placement/$placementId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_admin": {
      "filePath": "_admin.tsx"
    },
    "/_user": {
      "filePath": "_user.tsx",
      "children": [
        "/_user/achievementForm",
        "/_user/achievements",
        "/_user/extracuricullarHome",
        "/_user/extracurricularForm",
        "/_user/placementForm",
        "/_user/placementHome",
        "/_user/technicalForm",
        "/_user/technicalHome"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/noob": {
      "filePath": "noob.tsx"
    },
    "/_user/achievementForm": {
      "filePath": "_user/achievementForm.tsx",
      "parent": "/_user"
    },
    "/_user/achievements": {
      "filePath": "_user/achievements.tsx",
      "parent": "/_user"
    },
    "/_user/extracuricullarHome": {
      "filePath": "_user/extracuricullarHome.tsx",
      "parent": "/_user"
    },
    "/_user/extracurricularForm": {
      "filePath": "_user/extracurricularForm.tsx",
      "parent": "/_user"
    },
    "/_user/placementForm": {
      "filePath": "_user/placementForm.tsx",
      "parent": "/_user"
    },
    "/_user/placementHome": {
      "filePath": "_user/placementHome.tsx",
      "parent": "/_user"
    },
    "/_user/technicalForm": {
      "filePath": "_user/technicalForm.tsx",
      "parent": "/_user"
    },
    "/_user/technicalHome": {
      "filePath": "_user/technicalHome.tsx",
      "parent": "/_user"
    },
    "/achievements/$achievementId": {
      "filePath": "achievements.$achievementId.tsx"
    },
    "/extracuricullarEvents/$extracuricullarEventId": {
      "filePath": "extracuricullarEvents.$extracuricullarEventId.tsx"
    },
    "/placement/$placementId": {
      "filePath": "placement.$placementId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
