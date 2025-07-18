import React, { useEffect, useRef, useState } from 'react'
import logo from '/logo.png'
import preBg from '/preBg.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { getPrescriptionAPI } from '../services/allAPI'
import toast from 'react-hot-toast'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaArrowLeft, FaEdit, FaPrint } from 'react-icons/fa'

const Preview = () => {
  const { id } = useParams()
  const [previewDetails, setPreviewDetails] = useState(null)
  const navigate = useNavigate()
  const printRef = useRef()

  const handlePreview = async () => {
    try {
      const result = await getPrescriptionAPI(id)
      if(result.data.success){
        setPreviewDetails(result.data.result)
      }
    } catch(error) {
      toast.error("Failed to load Prescription!!")
    }
  }

  const handlePrintPDF = async () => {
    const input = printRef.current;
    try {
      toast.loading("Generating PDF...", { id: "pdf-loading" });
      const originalWidth = input.style.width;
      const originalHeight = input.style.height;
      const originalOverflow = input.style.overflow;
      // Set fixed dimensions for printing
      input.style.width = '794px';
      input.style.height = '1123px';
      input.style.overflow = 'visible';
      
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123
      });
      // Restore original styles
      input.style.width = originalWidth;
      input.style.height = originalHeight;
      input.style.overflow = originalOverflow;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Prescription_${previewDetails?.name}_${Date.now()}.pdf`);
      toast.dismiss("pdf-loading");
    } catch (error) {
      console.error("PDF Print Error:", error);
      toast.error("Failed to generate PDF.");
      toast.dismiss("pdf-loading");
    }
  };

  useEffect(() => {
    handlePreview()
  }, [])

  return (
    <div className='w-full min-h-screen bg-blue-200 flex flex-col items-center p-4 pt-24 md:pt-24'>
      <div className="w-full h-[700px] md:h-[1000px] p-2 bg-blue-300 rounded-2xl flex flex-col justify-center items-center">
        <div ref={printRef} id='prescription' className="w-full max-w-[794px] h-[1123px] rounded bg-cover bg-center mx-auto overflow-hidden" style={{backgroundImage:`url(${preBg})`}}>
        <div className="flex h-full w-full">
          <div className="w-[100px] md:w-[160px] flex flex-col items-center justify-between text-center pt-5 pb-15 m-2 rounded-t-full" style={{backgroundColor:'#60A5FA'}}>
          <div>
            <img src={logo} alt="" className='w-23 mx-auto' />
            <h3 className='text-xl md:text-2xl mt-2' style={{color:'#FFFFFFB3'}}>MedBook</h3>
          </div>
          <div className='flex flex-col' style={{color:'#FFFFFFB3'}}>
            <h3 className='text-xs md:text-sm'>Contact Doctor: </h3>
            <h4 className='text-xs md:text-sm px-2 break-words'>{previewDetails?.doctorId?.email}</h4>
            <h4 className='text-xs md:text-sm'>{new Date(previewDetails?.createdAt).toLocaleDateString('en-GB')}</h4>
          </div>
        </div>
        <div className="flex-1 h-full overflow-y-auto p-3">
          <div className="flex flex-col gap-7 h-full">
            <div className="flex flex-col items-end p-10 rounded-2xl" style={{backgroundColor:'#60A5FA'}}>
              <h2 className='text-xl lg:text-2xl font-extrabold' style={{color:'#0D47A1'}}>Dr. {previewDetails?.doctorId?.fName}</h2>
              <h3 className='text-lg lg:text-xl font-bold -mt-2' style={{color:'#FFFFFFB3'}}>{previewDetails?.doctorId?.specialty}</h3>
              <h2 className='text-sm -mt-2' style={{color:'#FFFFFF80'}}>{new Date(previewDetails?.createdAt).toLocaleDateString('en-GB')}</h2>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h2 className='text-lg lg:text-2xl sm:text-lg underline'>Patient Details</h2>
              <h2 className='text-sm mt-2 md:text-sm lg:text-xl'>Name: {previewDetails?.name}</h2>
              <h2 className='text-sm mt-2 md:text-sm lg:text-xl'>Age: {previewDetails?.age}</h2>
              <h2 className='text-sm mt-2 md:text-sm lg:text-xl'>Gender: {previewDetails?.gender}</h2>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h2 className='text-lg lg:text-2xl sm:text-lg underline'>Symptoms & Diagnosis Details</h2>
              <h2 className='text-sm mt-2 md:text-sm lg:text-xl'>Symptoms: {previewDetails?.symptoms}</h2>
              <h2 className='text-sm mt-2 md:text-sm lg:text-xl'>Diagnosis: {previewDetails?.diagnosis}</h2>
            </div>
            <div className="text-5xl text-stroke font-bold -mb-5" style={{color:'#60A5FA'}}>
              Rx
            </div>
            <div className="flex flex-col items-start">
              <h3 className='text-lg font-semibold mt-3' style={{color:'#1e40af'}}>
                Medication Instructions - <span className='text-sm' style={{color:'#374151'}}>following list includes:</span>
              </h3>
              <p className='mb-4'>
                <span className="font-medium text-xs md:text-sm sm:text-sm">Medicine Name, 
                Dosage, Frequency, and Duration</span>.
              </p>
              <div className="mb-4">
                <ul className="list-disc list-inside space-y-1">
                  {previewDetails?.medicines?.map((med, index) => (
                    <li key={index} className="text-sm mt-2 md:text-sm lg:text-xl">
                      {med.mName} - ({med.dosage}) | {med.frequency} | {med.duration}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col self-end mt-auto mb-5">
              <p className='underline text-2xl'>Signature</p>
              <span className='text-2xl' style={{fontFamily:'"Dancing Script", cursive'}}>
                Dr. {previewDetails?.doctorId?.fName}
              </span>
              <span className='text-sm font-bold text-right -mt-2' style={{fontFamily:'"Dancing Script", cursive'}}>
                {new Date(previewDetails?.createdAt).toLocaleDateString('en-GB')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className='flex text-center text-white mt-5 gap-4'>
          <button onClick={() => navigate(`/dashboard/editpres/${id}`, {state: {data: previewDetails}})} className='w-40 h-10 bg-blue-600 font-bold rounded-2xl shadow-lg hover:text-black cursor-pointer flex items-center justify-center gap-2'>
            <FaEdit /> Edit Changes
          </button>
          <button onClick={handlePrintPDF} className='w-40 h-10 bg-blue-600 font-bold rounded-2xl shadow-lg hover:text-black cursor-pointer flex items-center justify-center gap-2'>
            <FaPrint /> Print
          </button>
        </div>
      </div>
    </div>
  )
}

export default Preview