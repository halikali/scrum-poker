interface IAppSettings {
  development: {
    socketUrl: string
  }
  production: {
    socketUrl: string
  }
  [key: string]: {
    socketUrl: string
  }
}

export type { IAppSettings }
