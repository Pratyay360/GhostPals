import Navbar from '@/components/Navbar';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  UserMinus, 
  Users, 
  Search, 
  RefreshCw, 
  Heart,
  UserPlus,
  TrendingUp,
  Settings
} from "lucide-react"

export default function Home() {
  const[followers, setFollowers] = useState(0);
  const[following, setFollowing] = useState(0);
  const[notFollowingBack, setNotFollowingBack] = useState(0);
  
  return (
    <>
      <Navbar />
      <main>
        <h1>Welcome to the Home Page</h1>
      </main>
    </>
  );
}