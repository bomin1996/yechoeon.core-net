export namespace ServerConsts {
  export function photoServerUrl(userKey?: string, fallbackUrl?: string) {
    return userKey ? `/serverimages/photo/${userKey}` : fallbackUrl;
  }
}
