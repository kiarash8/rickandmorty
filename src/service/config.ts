import { apiRoutes } from "./api-routes";

export const apiUrl = process.env.REACT_APP_API_URL;

const setPathVariables = (url: string, variables: {[name: string]: any}): string => {
    Object.keys(variables).forEach((key: string) => {
      url = url.replace(
        new RegExp(`:${key}(/|$)`, 'g'),
        `${variables[key].toString().trim()}$1`
      )
    })
    return url
}

const setQueryParams = (prams: {[name: string]: any}): string =>
  Object.keys(prams)
    .map(key => `${key}=${prams[key].toString().trim()}`)
    .join('&')

export const Config = {
    apiUrl,
    apiRoutes,
    setPathVariables,
    setQueryParams
};