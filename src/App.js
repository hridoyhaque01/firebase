import {getDatabase,ref,set} from "firebase/database"
import { app } from "./firebase"; 

function App() {

  const db = getDatabase(app);

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const form = event.target;
    const username = form?.username.value;
    const password = form?.password.value;
    const createUser = {username,password}
    try{
        await set(ref(db,"users/" + username),createUser);
        form.reset()
    }catch(error){
      console.log(error)
    }
    // form.reset();
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-200">
      <div className='w-[480px] bg-white py-6 px-4 rounded-lg'>
        <div className='mb-6'>
          <h1 className='text-2xl text-center font-bold text-black'>Fill the form.</h1>
        </div>
          <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className="flex items-center">
                <p className='w-1/3'>Username:</p>
                <input type="text" name='username' placeholder='type username here' className='w-2/3 p-2 border border-slate-200 outline-none rounded-md' />
            </div>
            <div className="flex items-center">
                <p className='w-1/3'>password:</p>
                <input type="password" name='password' placeholder='type password here' className='w-2/3 p-2 border border-slate-200 outline-none rounded-md' />
            </div>
            <div className="flex items-center mt-4">
                <button type='submit' className='w-full py-2 rounded-full text-xl font-medium text-white bg-blue-500 hover:bg-blue-600 duration-200'>Submit</button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default App;
