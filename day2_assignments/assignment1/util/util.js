import fs from "fs/promises"
const namesListFiletPath = '_file_repo/filenames.txt'
const filePrefix = '_file_repo/files'

export async function checkFileName(filename) {
  try {
    const filedata = await fs.readFile(namesListFiletPath, 'utf8')
    const nameList = filedata.split(",")
    return nameList.find((element) => element == `${filename}.txt`)
  } catch (error) {
    console.log("Name List file didn't exists.")
    throw error
  }
}
export async function updateFileNamesList(filename) {
  try {
    const filedata = await fs.readFile(namesListFiletPath, 'utf8')
    let nameList = filedata.split(",")
    nameList.push(`${filename}.txt`)
    fs.writeFile(namesListFiletPath, nameList.join())
  } catch (error) {
    fs.unlink(`${filePrefix}/${filename}.txt`)
    console.log("Name List file didn't exists.")
    throw error
  }
}
export async function createUserFile(text, filename) {
  let fileExists = await checkFileName(filename)
  if (fileExists) {
    console.log(`The provided file name ${filename} is already taken. Please provide a new filename.`)
  }
  else {
    try {
      fs.writeFile(`${filePrefix}/${filename}.txt`, text)
      await updateFileNamesList(filename)
      console.log(`The file:: ${filename} has been creeated with the text " ${text}" in it.`)
    }
    catch (error) {
      fs.unlink(`${filePrefix}/${filename}.txt`)
      console.log(`The file:: ${filename} was not created successfully.`)
      throw error
    }
  }
}
