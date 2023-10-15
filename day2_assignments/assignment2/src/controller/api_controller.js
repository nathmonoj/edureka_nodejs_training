import fs from "fs/promises";
const filepath = "./src/_data/user.json";

export async function listUsers(fromatted = false) {
  try {
    const filedata = await fs.readFile(filepath, 'utf8')
    return JSON.parse(filedata)
  } catch (error) {
    console.log(error)
    return "Json User List File Not Found!!"
  }
}