export function clearCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure`;
  }
  
  export function setCookie(name: string, value: string, expInSeconds: number) {
    const expDate = new Date();
    expDate.setSeconds(expDate.getSeconds() + expInSeconds);
    document.cookie = `${name}=${value}; expires=${expDate.toUTCString()}; path=/; SameSite=None; Secure`;
  }