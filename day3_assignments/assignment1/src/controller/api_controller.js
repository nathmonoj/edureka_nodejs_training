import fs from "fs/promises";
const empfilepath = "./src/_data/employee.json";
const prjfilepath = "./src/_data/project.json";

const getJsonFileData = async (filepath) => {
  const filedata = await fs.readFile(filepath, 'utf8')
  return JSON.parse(filedata)
}
const jsonDataFind = async (filepath, id, jsonId) => {
  const jsonFullData = await getJsonFileData(filepath)
  return jsonFullData.find(data => data[jsonId] === id)
}

export async function getEmployee(req, res) {
  try {
    const { params } = req
    const { id } = params
    let employee = await jsonDataFind(empfilepath, id, 'eid')
    let status = employee ? 200 : 404
    employee = employee || 'Employee Id Not Found!!'
    res.status(status).json({ data: employee });
  } catch (error) {
    console.log(error)
    return "Employee Json File Not Found!!"
  }
}

export async function getProject(req, res) {
  try {
    const { params } = req
    const { id } = params
    let project = await jsonDataFind(prjfilepath, id, 'pid')
    let status = project ? 200 : 404
    project = project || 'Project Id Not Found!!'
    res.status(status).json({ data: project });
  } catch (error) {
    console.log(error)
    return "Project Json File Not Found!!"
  }
}

export async function getEmployeeDetails(req, res) {
  try {
    const { params } = req
    const { id } = params
    let employeeData = await fetch(`http://localhost:3000/employee/${id}`)
    employeeData = employeeData && await employeeData.json()
    let projData = employeeData && employeeData.data && employeeData.data.projectId && await fetch(`http://localhost:3000/project/${employeeData.data.projectId}`)
    projData = projData && await projData.json()
    let status = 404
    let employeeDetails = 'Employee Id Not Found!!'
    if (projData && projData.data && projData.data.pid) {
      status = 200
      employeeDetails = { ...employeeData.data, ...projData.data }
    }
    res.status(status).json({ data: employeeDetails });
  } catch (error) {
    console.log(error)
    return "Project Json File Not Found!!"
  }
}