
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Database, Bell, Key, Shield, CreditCard, Globe, Monitor, Mail } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Settings = () => {
  const navigate = useNavigate();

  // Fake API Keys
  const apiKeys = [
    { name: "Production API Key", key: "alt_prod_c7f8e9a2d3b1", created: "Apr 12, 2025", lastUsed: "1 hour ago" },
    { name: "Development API Key", key: "alt_dev_a1b2c3d4e5f6", created: "Mar 3, 2025", lastUsed: "2 days ago" },
    { name: "Testing API Key", key: "alt_test_g7h8i9j0k1l2", created: "Feb 15, 2025", lastUsed: "1 week ago" },
  ];

  // Fake billing history
  const billingHistory = [
    { date: "May 1, 2025", plan: "Creator Pro", amount: "$49.00", status: "Paid" },
    { date: "Apr 1, 2025", plan: "Creator Pro", amount: "$49.00", status: "Paid" },
    { date: "Mar 1, 2025", plan: "Creator Basic", amount: "$19.00", status: "Paid" },
  ];

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
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6 bg-neutral-800">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="apikeys">API Keys</TabsTrigger>
                </TabsList>
                <TabsList className="grid grid-cols-4 mb-6 bg-neutral-800">
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="language">Language</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>

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

                <TabsContent value="subscription" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Your Subscription</h3>
                    
                    <div className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-xl p-6 mb-6">
                      <h4 className="text-xl font-bold mb-2">Creator Pro Plan</h4>
                      <p className="mb-4 text-white/80">Your subscription renews on May 24, 2025</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                          <p className="text-lg font-semibold">1 TB</p>
                          <p className="text-sm text-white/70">Storage</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                          <p className="text-lg font-semibold">10,000</p>
                          <p className="text-sm text-white/70">AI Credits</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                          <p className="text-lg font-semibold">Unlimited</p>
                          <p className="text-sm text-white/70">Projects</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="bg-white/20 hover:bg-white/30">Upgrade Plan</Button>
                        <Button variant="outline" className="border-white/20 hover:bg-white/10">Cancel Subscription</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Compare Plans</h4>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                          <h5 className="font-semibold mb-2">Free</h5>
                          <p className="text-2xl font-bold mb-4">$0</p>
                          <ul className="text-sm space-y-2 text-gray-400">
                            <li>100GB Storage</li>
                            <li>500 AI Credits/month</li>
                            <li>2 projects</li>
                            <li>Community support</li>
                          </ul>
                        </div>
                        <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                          <h5 className="font-semibold mb-2">Basic</h5>
                          <p className="text-2xl font-bold mb-4">$19</p>
                          <ul className="text-sm space-y-2 text-gray-400">
                            <li>500GB Storage</li>
                            <li>2,000 AI Credits/month</li>
                            <li>10 projects</li>
                            <li>Email support</li>
                          </ul>
                        </div>
                        <div className="bg-gradient-to-b from-indigo-900 to-indigo-800 p-4 rounded-lg border border-indigo-500">
                          <div className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full w-fit mb-2">CURRENT</div>
                          <h5 className="font-semibold mb-2">Pro</h5>
                          <p className="text-2xl font-bold mb-4">$49</p>
                          <ul className="text-sm space-y-2 text-gray-200">
                            <li>1TB Storage</li>
                            <li>10,000 AI Credits/month</li>
                            <li>Unlimited projects</li>
                            <li>Priority support</li>
                          </ul>
                        </div>
                        <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                          <h5 className="font-semibold mb-2">Enterprise</h5>
                          <p className="text-2xl font-bold mb-4">$199</p>
                          <ul className="text-sm space-y-2 text-gray-400">
                            <li>5TB Storage</li>
                            <li>100,000 AI Credits/month</li>
                            <li>Unlimited projects</li>
                            <li>Dedicated support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="border-b border-neutral-800 pb-4">
                        <h4 className="font-medium mb-3">Email Notifications</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Account Updates</p>
                              <p className="text-sm text-gray-400">Security alerts and account changes</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Project Notifications</p>
                              <p className="text-sm text-gray-400">Updates about your projects</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Marketing Emails</p>
                              <p className="text-sm text-gray-400">New features, tips, and special offers</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Newsletter</p>
                              <p className="text-sm text-gray-400">Monthly digest of content creation tips</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-neutral-800 pb-4">
                        <h4 className="font-medium mb-3">In-App Notifications</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Project Completion</p>
                              <p className="text-sm text-gray-400">When AI tasks are completed</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Usage Alerts</p>
                              <p className="text-sm text-gray-400">When approaching resource limits</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Feature Announcements</p>
                              <p className="text-sm text-gray-400">New tools and platform updates</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Notification Frequency</h4>
                        <div className="bg-neutral-800 p-4 rounded-lg">
                          <div className="mb-2">
                            <p className="font-medium">Email Digest Frequency</p>
                            <p className="text-sm text-gray-400">Combine multiple notifications into one email</p>
                          </div>
                          <div className="mt-2">
                            <ToggleGroup type="single" defaultValue="daily">
                              <ToggleGroupItem value="realtime" variant="outline">Real-time</ToggleGroupItem>
                              <ToggleGroupItem value="daily" variant="outline">Daily</ToggleGroupItem>
                              <ToggleGroupItem value="weekly" variant="outline">Weekly</ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="apikeys" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">API Keys</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-neutral-800 p-5 rounded-lg mb-6">
                        <p className="text-sm text-gray-400 mb-4">
                          API keys allow external applications to authenticate with our service. Keep your keys secure and don't expose them in public repositories or client-side code.
                        </p>
                        
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                          <Key className="h-4 w-4 mr-2" />
                          Create New API Key
                        </Button>
                      </div>
                      
                      <div className="overflow-hidden rounded-lg border border-neutral-700">
                        <Table>
                          <TableHeader className="bg-neutral-800">
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>API Key</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Last Used</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {apiKeys.map((key, i) => (
                              <TableRow key={i} className="bg-neutral-900">
                                <TableCell>{key.name}</TableCell>
                                <TableCell>
                                  <code className="bg-neutral-800 px-2 py-0.5 rounded text-sm">
                                    •••••••••••{key.key.slice(-4)}
                                  </code>
                                </TableCell>
                                <TableCell>{key.created}</TableCell>
                                <TableCell>{key.lastUsed}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" className="h-8 px-2 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                    Revoke
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="bg-neutral-800 p-5 rounded-lg">
                        <h4 className="font-medium mb-3">API Documentation</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          Learn how to use ALTYOU's API to create, process and analyze content programmatically.
                        </p>
                        <div className="flex gap-3">
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">
                            View Documentation
                          </Button>
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">
                            API Reference
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
                    
                    <div className="space-y-6">
                      <div className="border-b border-neutral-800 pb-4">
                        <h4 className="font-medium mb-3">Account Security</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Two-Factor Authentication</p>
                              <p className="text-sm text-gray-400">Add an extra layer of security</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Enable</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Login History</p>
                              <p className="text-sm text-gray-400">View recent account activity</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">View</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Session Management</p>
                              <p className="text-sm text-gray-400">Manage active sessions</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Manage</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-neutral-800 pb-4">
                        <h4 className="font-medium mb-3">Data & Privacy</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Content Usage & Analytics</p>
                              <p className="text-sm text-gray-400">Help improve our AI with your content</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Personalized Recommendations</p>
                              <p className="text-sm text-gray-400">Receive content ideas based on your history</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Data Export</p>
                              <p className="text-sm text-gray-400">Download a copy of your data</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Export</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Platform Connections</h4>
                        <div className="bg-neutral-800 p-4 rounded-lg space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <Globe className="h-4 w-4" />
                              </div>
                              <div>
                                <p>Social Media Access</p>
                                <p className="text-xs text-gray-400">Connected: YouTube, Instagram, TikTok</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Manage</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                                <Database className="h-4 w-4" />
                              </div>
                              <div>
                                <p>Third-Party Integrations</p>
                                <p className="text-xs text-gray-400">Connected: Dropbox, Google Drive</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Manage</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="billing" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Billing & Payments</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-neutral-800 p-5 rounded-lg mb-6">
                        <div className="flex justify-between mb-4">
                          <div>
                            <h4 className="font-medium">Payment Method</h4>
                            <div className="flex items-center mt-2">
                              <div className="bg-white rounded w-8 h-6 mr-2"></div>
                              <span>•••• •••• •••• 4289</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Change Method</Button>
                        </div>
                        
                        <div className="pt-4 border-t border-neutral-700">
                          <h4 className="font-medium mb-2">Billing Information</h4>
                          <div className="text-sm text-gray-400">
                            <p>Medhansh Jain</p>
                            <p>medhansh@altyou.com</p>
                            <p>123 Creator Avenue</p>
                            <p>Mumbai, Maharashtra 400001</p>
                            <p>India</p>
                          </div>
                          <Button variant="link" className="p-0 h-auto mt-2 text-indigo-400">Edit Information</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Billing History</h4>
                        <div className="overflow-hidden rounded-lg border border-neutral-700">
                          <Table>
                            <TableHeader className="bg-neutral-800">
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Invoice</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {billingHistory.map((item, i) => (
                                <TableRow key={i} className="bg-neutral-900">
                                  <TableCell>{item.date}</TableCell>
                                  <TableCell>{item.plan}</TableCell>
                                  <TableCell>{item.amount}</TableCell>
                                  <TableCell>
                                    <span className="inline-block px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-xs">
                                      {item.status}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-indigo-400 hover:text-indigo-300">
                                      Download
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="language" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                    
                    <div className="space-y-6">
                      <div className="border-b border-neutral-800 pb-6">
                        <h4 className="font-medium mb-3">Application Language</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-neutral-800 p-4 rounded-lg border border-indigo-500">
                            <div className="flex items-center gap-2 mb-1">
                              <Globe className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">English</span>
                              <span className="ml-auto bg-indigo-600/30 text-indigo-400 text-xs px-2 py-0.5 rounded">Current</span>
                            </div>
                            <p className="text-xs text-gray-400">English (United States)</p>
                          </div>
                          <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 cursor-pointer hover:border-neutral-600">
                            <div className="flex items-center gap-2 mb-1">
                              <Globe className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">Hindi</span>
                            </div>
                            <p className="text-xs text-gray-400">हिन्दी (भारत)</p>
                          </div>
                        </div>
                        <Button variant="link" className="text-indigo-400 mt-3 p-0 h-auto">Show more languages</Button>
                      </div>
                      
                      <div className="border-b border-neutral-800 pb-6">
                        <h4 className="font-medium mb-3">Content Creation Languages</h4>
                        <p className="text-sm text-gray-400 mb-3">Select languages you create content in</p>
                        <div className="flex flex-wrap gap-2">
                          <Button className="bg-indigo-600 hover:bg-indigo-700">English</Button>
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">Hindi</Button>
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">Spanish</Button>
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">+ Add Language</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Region Settings</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Time Zone</label>
                            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white">
                              <option>Asia/Kolkata (GMT+5:30)</option>
                              <option>America/New_York (GMT-4:00)</option>
                              <option>Europe/London (GMT+1:00)</option>
                              <option>Australia/Sydney (GMT+10:00)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Date Format</label>
                            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white">
                              <option>DD/MM/YYYY</option>
                              <option>MM/DD/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="appearance" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Appearance Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="border-b border-neutral-800 pb-6">
                        <h4 className="font-medium mb-3">Theme Preference</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-neutral-800 p-4 rounded-lg border border-indigo-500 cursor-pointer">
                            <div className="h-24 bg-[#121212] rounded mb-3 flex items-center justify-center">
                              <span className="text-white text-xs">Dark</span>
                            </div>
                            <div className="flex items-center">
                              <span>Dark Mode</span>
                              <div className="ml-auto bg-indigo-600/30 text-indigo-400 text-xs px-2 py-0.5 rounded">Current</div>
                            </div>
                          </div>
                          <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 cursor-pointer hover:border-neutral-600">
                            <div className="h-24 bg-white rounded mb-3 flex items-center justify-center">
                              <span className="text-black text-xs">Light</span>
                            </div>
                            <div className="flex items-center">
                              <span>Light Mode</span>
                            </div>
                          </div>
                          <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 cursor-pointer hover:border-neutral-600">
                            <div className="h-24 rounded mb-3 overflow-hidden">
                              <div className="h-12 bg-[#121212] flex items-center justify-center">
                                <span className="text-white text-xs">Auto</span>
                              </div>
                              <div className="h-12 bg-white flex items-center justify-center">
                                <span className="text-black text-xs">Auto</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span>System Default</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-neutral-800 pb-6">
                        <h4 className="font-medium mb-3">Accent Color</h4>
                        <div className="flex gap-3 mb-4">
                          <div className="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                          <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                          <div className="w-6 h-6 rounded-full bg-green-600"></div>
                          <div className="w-6 h-6 rounded-full bg-amber-600"></div>
                          <div className="w-6 h-6 rounded-full bg-red-600"></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Interface Density</h4>
                        <div className="space-y-3">
                          <div className="flex items-center mb-2">
                            <input type="radio" id="density-compact" name="density" className="mr-3" />
                            <div>
                              <label htmlFor="density-compact" className="font-medium">Compact</label>
                              <p className="text-xs text-gray-400">Denser UI with smaller spacing</p>
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            <input type="radio" id="density-comfortable" name="density" checked className="mr-3" />
                            <div>
                              <label htmlFor="density-comfortable" className="font-medium">Comfortable</label>
                              <p className="text-xs text-gray-400">Default spacing and element sizes</p>
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            <input type="radio" id="density-spacious" name="density" className="mr-3" />
                            <div>
                              <label htmlFor="density-spacious" className="font-medium">Spacious</label>
                              <p className="text-xs text-gray-400">More spacing between elements</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Interface Customization</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Show recent projects on dashboard</p>
                              <p className="text-sm text-gray-400">Display your recent work on home page</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Animations</p>
                              <p className="text-sm text-gray-400">Enable interface animations</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p>Sidebar collapse behavior</p>
                              <p className="text-sm text-gray-400">Remember sidebar state between sessions</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
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

