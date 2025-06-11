"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const { data: session,} = authClient.useSession()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    },{
      onError: (error) => {
        console.log(error)
      },
      onSuccess: () => {
        console.log("User created")
      }
    })
  }
  const handleLogin = () => {
    authClient.signIn.email({
      email,
      password,
      
    },{
      onError: (error) => {
        console.log(error)
      },
      onSuccess: () => {
        console.log("User created")
      }
    })
  }

  if(session){
    return <div>
      <h1>Welcome {session.user?.name}</h1>
      <Button onClick={() => authClient.signOut()}>
        Sign Out
      </Button>
    </div>
  }

  return (
    <div className="flex flex-col gap-y-10">

    <div className="flex flex-col gap-4">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSubmit}>
        Create User
      </Button>
    </div>
    <div className="flex flex-col gap-4">
   
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>
        Login
      </Button>
    </div>
    </div>
  );
}
