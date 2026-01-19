"use client"
import { useClerk, useUser , UserButton} from "@clerk/nextjs";

export default function Home() {

  const {openSignIn } = useClerk()
  const {user } = useUser()
  return (
   <div className="flex items-center gap-10 flex-col">
    <button onClick={() =>{
      if(user) return
      openSignIn}}>
    
    {user ? <UserButton/> : "click" }
    </button>
   </div>
  );
}
