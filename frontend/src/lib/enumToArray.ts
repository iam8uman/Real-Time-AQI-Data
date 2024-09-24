export function enumToArray<T>(enumObject: any): T[] {
    return Object.keys(enumObject)
      .filter(key => isNaN(Number(key))) // Exclude numeric keys
      .map(key => enumObject[key]);
  }
  