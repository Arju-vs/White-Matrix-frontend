import { PiCaretDoubleLeftDuotone, PiCaretDoubleRightDuotone } from "react-icons/pi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { IoIosSave } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Sidebar = () => {
    const [barOpen, setBarOpen] = useState(true);
    const navigate = useNavigate();

    const handleBar = () => {
        setBarOpen(!barOpen);
    };

    const handleLogout = () => {
        try {
            sessionStorage.clear();
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            {
                barOpen ? (
                <div className='fixed bg-blue-300 top-23 left-0 h-[calc(100vh-92px)] w-[200px] rounded-r-2xl z-50 shadow-xl'>
                    <div className="flex justify-end mr-2 py-2">
                        <PiCaretDoubleLeftDuotone onClick={handleBar} size={20} className="cursor-pointer hover:text-blue-600" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <div className="flex bg-gradient-to-r from-blue-400 to-blue-100 rounded-3xl mx-3 p-2 text-black hover:text-blue-600">
                            <RiDashboardHorizontalLine size={20} className="ms-2 me-2 mt-1" />
                            <Link to={'/dashboard/mainPage'} className="text-lg font-bold">Dashboard</Link>
                        </div>
                        <div className="flex bg-gradient-to-r from-blue-400 to-blue-100 rounded-3xl mx-3 p-3 text-black mt-5 hover:text-blue-600">
                            <VscNewFile size={20} className="ms-2 me-2 mt-.5" />
                            <Link to={'/dashboard/newpres'} className="text-sm font-bold mt-.5">New Prescription</Link>
                        </div>
                        <div className="flex bg-gradient-to-r from-blue-400 to-blue-100 rounded-3xl mx-3 p-3 text-black mt-5 hover:text-blue-600">
                            <IoIosSave size={20} className="ms-2 me-2 mt-.5" />
                            <Link to={'/dashboard/mypres'} className="text-sm font-bold mt-.5">My Prescriptions</Link>
                        </div>
                    </div>
                    <div className="absolute bottom-5 left-0 right-0 px-3">
                        <div className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-100 rounded-3xl p-2 text-black hover:text-blue-600 cursor-pointer" onClick={handleLogout}>
                            <RiLogoutCircleLine size={20} className="me-2" />
                            <span className="text-sm font-bold">Logout</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fixed top-24 left-4 z-50">
                    <div className="bg-blue-300 p-2 rounded-full shadow-lg hover:bg-blue-400 transition-colors">
                        <PiCaretDoubleRightDuotone 
                            onClick={handleBar} 
                            size={20} 
                            className="cursor-pointer hover:text-white" 
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;