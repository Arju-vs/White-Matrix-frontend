import { useEffect, useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import { editPrescriptionAPI, getPrescriptionAPI, getMedicineRecommentationAPI } from '../services/allAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MdDeleteForever } from "react-icons/md";

const EditPrescription = () => {

  const [inputDetails, setInputDetails] = useState({
    name:"",
    age:"",
    gender:"",
    date:"",
    symptoms:"",
    diagnosis:"",
    advice:"",
    medicines: [{
      mName:"",
      dosage:"",
      frequency:"",
      duration:""
    }]
  })
  console.log(inputDetails);
  const [suggest, setSuggest] = useState([])
  const [typing, setTyping] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const navigate =  useNavigate()
  const {id} = useParams()

  const handleChange = (e) =>{
    setInputDetails({...inputDetails, [e.target.name] : e.target.value })
  }

  const handleMedicineChange = (e, index) => {
    const updatedMedicines = [...inputDetails.medicines];
    updatedMedicines[index][e.target.name] = e.target.value;
    setInputDetails({ ...inputDetails, medicines: updatedMedicines });

    if (e.target.name === "mName") {
      setTyping(e.target.value);
      setSelectedIndex(index);
    }
  };

  const handleAddMedicine = () =>{
    const newMedicine = {
      mName:"",
      dosage:"",
      frequency:"",
      duration:""
    }
    setInputDetails((prev)=>({
      ...prev,medicines: [...prev.medicines, newMedicine]
    }))
  }

  const handleDeleteMedicine = (index) =>{
    const updatedMedicines = [...inputDetails.medicines]
    updatedMedicines.splice(index,1)
    setInputDetails({...inputDetails, medicines: updatedMedicines})
  }

  const fetchPrescription = async () => {
    try{
        const result = await getPrescriptionAPI(id)
        const data = result.data.result
        setInputDetails({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          date: data.date?.split("T")[0] || "",
          symptoms: data.symptoms || "",
          diagnosis: data.diagnosis || "",
          advice: data.advice || "",
          medicines: data.medicines?.length ? data.medicines : [{
            mName: "",
            dosage: "",
            frequency: "",
            duration: ""
          }]
        })
    }catch(error){
        toast.error("Failed to load prescription");
    }
  }

  const handleEditPrescription = async (e) =>{
    e.preventDefault()
    const { name, age, gender, date, symptoms, diagnosis, advice, medicines } = inputDetails;
    
    if(name && age && gender && date && medicines.length >=1){
      try {
        const result = await editPrescriptionAPI(id, inputDetails)
        if(result.data.success){
          toast.success("Prescription Updated Successfully!")
          navigate(`/dashboard/preview/${id}`)
          setInputDetails({
            name:"",
            age:"",
            gender:"",
            date:"",
            symptoms:"",
            diagnosis:"",
            advice:"",
            medicines: [{
              mName:"",
              dosage:"",
              frequency:"",
              duration:""
            }]
          })
        }
      } catch (error) {
        if (error.response?.status == 409) {
            toast.error("Failed to Update!");
          } else {
            toast.error(error.response?.data?.error || "Something went wrong");
          }
      }
    }else{
      toast.error("Please fill the Form!!!")
    }
  }

  useEffect(()=>{
    fetchPrescription()
  },[])

  const handleSuggestions = async () => {
    if (typing.trim().length > 1) {
      try {
        const results = await getMedicineRecommentationAPI(typing);
        console.log(results);
        setSuggest(results);
      } catch (error) {
        console.log("Error fetching", error);
      }
    } else {
      setSuggest([]);
    }
  };
  
  useEffect(()=>{
    const timer = setTimeout(handleSuggestions, 400)
    return () => clearTimeout(timer)
  },[typing])

  return (
    <>
     <div className='w-full flex items-center justify-center p-2 md:p-0'>
        <div className="w-full md:w-[85%] bg-blue-300 p-2 md:p-4 min-h-[600px] mt-25 ms:mt-10 pt-10 sm:pt-24 rounded-2xl mb-3 mx-2">
          <h3 className='text-2xl md:text-3xl font-bold text-blue-700 mb-3 md:mb-5 ms-1 mt-2 md:mt-3'>
            Edit Prescription
          </h3>
          <form>
            <h3 className='text-base md:text-lg font-semibold my-2 ms-1'>Patient Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <input type="text" name='name' placeholder='Name' className='w-full border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} value={inputDetails.name} required />
              <input type="number" name='age' placeholder='Age' min={0} max={120} className='w-full border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} value={inputDetails.age} required />
              <select name="gender" required className='w-full border border-gray-300 px-3 md:px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black/50' onChange={handleChange} value={inputDetails.gender}>
                <option value="" className='text-black'>Gender</option>
                <option value="Male" className='text-black'>Male</option>
                <option value="Female" className='text-black'>Female</option>
              </select>
              <input type="date" name='date' placeholder='Date' className='w-full border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} value={inputDetails.date} required />
            </div>
            <div className="grid gap-3 md:gap-4">
              <textarea name="symptoms" placeholder='Symptoms' className='w-full mt-3 md:mt-4 h-20 border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} value={inputDetails.symptoms}/>
              <textarea name="diagnosis" placeholder='Diagnosis' className='w-full h-20 border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} value={inputDetails.diagnosis} />
            </div>
            <div>
              <h3 className='text-base md:text-lg font-semibold my-2 ms-1'>Medicines</h3>
              {
                inputDetails.medicines.map((med, index) => (
                  <div key={index} className="relative grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 mb-2 items-center">
                    <div className="md:col-span-1 relative">
                      <input name='mName' placeholder='Medicine Name' className='w-full border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => handleMedicineChange(e, index)} value={med.mName} autoComplete='off' required />
                      {selectedIndex === index && suggest.length > 0 && (
                        <ul className="absolute z-50 bg-white border w-full shadow-md rounded mt-1 max-h-48 overflow-y-auto">
                          {suggest.map((item, i) => (
                            <li key={i} className="px-3 py-1 md:px-4 md:py-2 hover:bg-blue-100 cursor-pointer text-xs md:text-sm" onClick={() => {
                                const updatedMedicines = [...inputDetails.medicines];
                                updatedMedicines[index].mName = item.name;
                                setInputDetails({ ...inputDetails, medicines: updatedMedicines });
                                setSuggest([]);
                                setTyping("");
                                setSelectedIndex(null);
                              }}
                            >
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <input name='dosage' placeholder='Dosage' className='w-full border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => handleMedicineChange(e, index)} value={med.dosage} required />
                    <input name='frequency' placeholder='Frequency' className='w-full border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => handleMedicineChange(e, index)} value={med.frequency} required />
                    <input name='duration' placeholder='Duration' className='w-full border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e) => handleMedicineChange(e, index)} value={med.duration} required 
                    />
                    
                    <div className='flex justify-center items-center md:col-span-1'>
                      {inputDetails.medicines.length > 1 && 
                        <button type="button" onClick={() => handleDeleteMedicine(index)} className="w-full flex justify-center text-red-500 py-2 bg-blue-400 rounded-2xl cursor-pointer hover:text-white text-xs md:text-base">
                          <MdDeleteForever size={20} className="mr-1" /> 
                          <span className="hidden md:inline">Remove Medicine</span>
                          <span className="md:hidden">Remove</span>
                        </button>
                      }
                    </div>
                  </div>
                ))
              }
              <button onClick={handleAddMedicine} type='button' className='text-sm mt-2 text-blue-600 flex items-center cursor-pointer hover:text-white'>
                <IoIosAdd size={20} /> 
                Add Medicine
              </button>
            </div>
            <h3 className='text-base md:text-lg font-semibold my-2 ms-1'>Advices</h3>
            <textarea name="advice" placeholder='Add Advices to patients' className='w-full h-20 border border-gray-300 bg-white px-3 md:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={handleChange} value={inputDetails.advice} />
            <div className="flex justify-end gap-3 md:gap-4 mt-4">
              <button onClick={handleEditPrescription} type='button' className='bg-blue-600 text-white px-3 md:px-4 py-2 rounded-md hover:text-black cursor-pointer text-sm md:text-base'>Update Prescription</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditPrescription