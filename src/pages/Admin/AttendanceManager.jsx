
 
 import { useEffect, useState } from "react";
import { privateAPI, publicAPI } from "../../utils/config";
import { toast } from "react-toastify";
 
const AttendanceManager = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
 
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    clockIn: "",
    clockOut: "",
    status: "present",
    notes: "",
  });
 
  const fetchAttendance = async () => {
    try {
      const res = await publicAPI.get("attendance/getAtt");
      setAttendance(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance", error);
      setLoading(false);
    }
  };
 
  const fetchEmployees = async () => {
    try {
      const res = await privateAPI.get("employees/get");
      setEmployees(res.data.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
};
