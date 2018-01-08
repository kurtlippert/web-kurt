import { readdirSync, statSync } from 'fs'
import { either, tryCatch } from 'libs/monads'
import { basename, join, normalize } from 'path'

export interface File {
  checked: boolean,
  created: Date,
  name: string,
  path: string,
  size: number,
}

export interface Folder {
  name: string,
  path: string,
}

// I want an either, but before I fold, I'd like to chain the either with a try/catch
// which attempts to read the normalized path as a directory.
//
// I want to map over the contents of the directory ('map' being the monad that evaluates the try/catch function)
// filter out either non-directories or files, map over those results ('map' here being a list map)
// and return json (typescript represents the shape of the object as a 'Folder' or 'File').
//
// Finally I fold. The left side will return an error string. If anything in our pipeline goes wrong,
// this function will be the one that evaluates, otherwise, I return the results

/** 
 * Gets all the folders in the path.
 * 
 * Returns 'Folder' object 
 * 
 * @param folderPath path of the folder
 */
export const getFolders = (folderPath: string) =>
  either(folderPath)
    .map((path: string) => normalize(path))
    .chain((normPath: string) =>
      tryCatch(() => readdirSync(normPath))
        .map((contents: string[]) => contents
          .filter((child: string) => statSync(join(normPath, child)).isDirectory())
          .map((childPath: string) => {
            return {
              name: basename(childPath),
              path: childPath,
            } as Folder
          }),
      ),
  )
    .fold((_: any) => 'error getting folder path',
    (folders: Folder[]) => folders) as Folder[] | string

/** 
 * Gets all the files in the path.
 * 
 * Returns 'File' object 
 * 
 * @param folderPath path of the folder
 */
export const getFiles = (folderPath: string) =>
  tryCatch(() => normalize(folderPath))
    .fold((_: any) => 'error getting folder path',
    (normPath: string) => readdirSync(normPath)
      .filter((child: string) => !statSync(join(normPath, child)).isDirectory())
      .map((childPath: string) => {
        const childStat = statSync(childPath)
        return {
          checked: false,
          created: childStat.ctime,
          name: basename(childPath),
          path: childPath,
          size: childStat.size,
        } as File
      }),
  ) as File[] | string
