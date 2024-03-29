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
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_admin': {
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_user': {
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/noob': {
      preLoaderRoute: typeof NoobImport
      parentRoute: typeof rootRoute
    }
    '/_user/achievementForm': {
      preLoaderRoute: typeof UserAchievementFormImport
      parentRoute: typeof UserImport
    }
    '/_user/achievements': {
      preLoaderRoute: typeof UserAchievementsImport
      parentRoute: typeof UserImport
    }
    '/_user/extracuricullarHome': {
      preLoaderRoute: typeof UserExtracuricullarHomeImport
      parentRoute: typeof UserImport
    }
    '/_user/extracurricularForm': {
      preLoaderRoute: typeof UserExtracurricularFormImport
      parentRoute: typeof UserImport
    }
    '/_user/placementForm': {
      preLoaderRoute: typeof UserPlacementFormImport
      parentRoute: typeof UserImport
    }
    '/_user/placementHome': {
      preLoaderRoute: typeof UserPlacementHomeImport
      parentRoute: typeof UserImport
    }
    '/_user/technicalForm': {
      preLoaderRoute: typeof UserTechnicalFormImport
      parentRoute: typeof UserImport
    }
    '/_user/technicalHome': {
      preLoaderRoute: typeof UserTechnicalHomeImport
      parentRoute: typeof UserImport
    }
    '/achievements/$achievementId': {
      preLoaderRoute: typeof AchievementsAchievementIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AdminRoute,
  UserRoute.addChildren([
    UserAchievementFormRoute,
    UserAchievementsRoute,
    UserExtracuricullarHomeRoute,
    UserExtracurricularFormRoute,
    UserPlacementFormRoute,
    UserPlacementHomeRoute,
    UserTechnicalFormRoute,
    UserTechnicalHomeRoute,
  ]),
  LoginRoute,
  NoobRoute,
  AchievementsAchievementIdRoute,
])

/* prettier-ignore-end */
