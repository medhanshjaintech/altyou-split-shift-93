
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Database, Bell, Key, Shield, CreditCard, Globe, Monitor, Mail } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
            className="hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="bg-neutral-900 rounded-xl p-4">
              <nav className="space-y-2">
                {[
                  { icon: User, name: 'Account' },
                  { icon: Database, name: 'Subscription' },
                  { icon: Bell, name: 'Notifications' },
                  { icon: Key, name: 'API Keys' },
                  { icon: Shield, name: 'Privacy & Security' },
                  { icon: CreditCard, name: 'Billing' },
                  { icon: Globe, name: 'Language' },
                  { icon: Monitor, name: 'Appearance' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer ${i === 0 ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <div className="bg-neutral-900 rounded-xl p-6">
              <Tabs defaultValue="account">
                <TabsContent value="account" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-sm text-gray-400">Full Name</label>
                        <div className="flex gap-4">
                          <input id="name" type="text" value="Medhansh Jain" className="flex-1 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white" />
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">Update</Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm text-gray-400">Email Address</label>
                        <div className="flex gap-4">
                          <input id="email" type="email" value="medhansh@altyou.com" className="flex-1 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white" />
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">Update</Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-sm text-gray-400">Password</label>
                        <div className="flex gap-4">
                          <input id="password" type="password" value="••••••••" className="flex-1 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white" />
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">Change</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-800 pt-6">
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-400">Receive email about your account activity</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Communications</p>
                          <p className="text-sm text-gray-400">Receive updates about new features</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Setup</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-xl p-6 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Creator Pro Plan</h3>
                  <p className="text-sm text-white/80 mb-3">Your current plan renews on May 24, 2025</p>
                </div>
                <Button className="bg-white/20 hover:bg-white/30">Manage Plan</Button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white/70 mb-1">Storage</p>
                  <p className="font-semibold">750GB / 1TB</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white/70 mb-1">AI Credits</p>
                  <p className="font-semibold">8,500 / 10,000</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white/70 mb-1">Projects</p>
                  <p className="font-semibold">Unlimited</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
