import axios from "axios";
export async function getEmployeeList(req, res) {

  try {
    const { data } = await axios.get("http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees")
    res.render("employees", { employees: data })
  } catch (error) {
    res.json({ message: "Internal Error." })
  }
}