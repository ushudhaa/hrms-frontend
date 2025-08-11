import {userState, userEmployeeState} from "react";
import axios from 'axios';
import cookies from "ja-cookie";
import {toast} from "react-toastify";

const EmployeeManager = () =>{
    const [employees, setEmployees] = useState ([]);
    const [department, setDepartment] = useState ([]);
    const[formData, setFormData] = useState ({
name:"",
email: "",
password : "",
designation: "",
salary: "",
phoneNUmber: "",
adress: "",
role: "employees",
department: "",
    });
    const [profileImage,setProfileImage] = useState(null);
    const [editingId,setEditingId]= useState(null);

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    },
    []);

    const fetchEmployees = async () => {
        try{
            const token = cookies.get("token");
            const res = await axios.get("http://localhost:3000/api/employee/get",{
                headers: {
                    Authorization: 'Bearer ${token}',

                },
                withCredentials: true,
            });
            setDepartment(res.data.data);
            console.log(res);
        }catch (err){
console.error("error fetching departments",err);
            }
        };

        conshandlechange =(e) => {
            const {name,value} = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleSubmit= async (e) => {
            e.preventDefault();
            try{
                const data = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    data.append(key, value);
                });
                if (profileImage) {
                    data.append("profileImage", profileImage);
                }

                if (editingId) {
                    await axios.put(
                        `http://localhost:3000/api/employee/${editingId}`,
                        data,
                        {
                            withCredentials: true,
            }
                    );
                toast.success("Employee updated successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                });  
            } else{
                    await axios.post(
                        "http://localhost:3000/api/employee/create",
                        data,
                        {
                            withCredentials: true,
                        }
                    );
                    toast.success("Employee created successfully", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                    });
                }
                fetchEmployees();
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    designation: "",
                    salary: "",
                    phoneNumber: "",
                    address: "",
                    role: "employees",
                    department: "",
                });
                setProfileImage(null);
                setEditingId(null);
            }catch(err){
                console.error("Erroe is fetching employees",err);
 }
            
const handleEdit= (emp) => {
    setEditingId(emp._id);
    setFormData({
        name: emp.name || "",
        email: emp.email || "",
        password: emp.password || "",
        designation: emp.designation || "",
        salary: emp.salary || "",
        phoneNumber: emp.phoneNumber || "",
        address: emp.address || "",
        role: emp.role || "employees",
        department: emp.department || "",
    });
};
 const handleDElete = async (Id) =>{
    try{
        await axios.delete(
            `http://localhost:3000/api/employee/${Id}`,
            {
                withCredentials: true,
            }
        );
        
    }
 }
                }
                }

}