import { useNavigate } from "react-router-dom";

export default function Home(){
    return(<div>
        <Navbar/>
        <Outlet/>   
    </div>)
}



function Navbar(){
const navigate = useNavigate();
const handleLoginClick = () => {
    navigate('/login');
}
return(<div className='flex justify-between items-center p-4 bg-blue-500 text-white'>
    <div className='text-2xl font-bold'>
         picture
    </div>
    <div className="">
        <ul className='flex space-x-4'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </div>

    <div>
      <button className='bg-white text-blue-500 px-4 py-2 rounded-lg' onClick={handleLoginClick}>Login</button>
      <button className='bg-white text-blue-500 px-4 py-2 rounded-lg'>Register</button>
    </div>
    </div>)
}


function Outlet(){


    return(<div>


    </div>)
}


