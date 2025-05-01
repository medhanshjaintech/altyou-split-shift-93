
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const navigate = useNavigate();

  // Social account data for profile
  const socialAccounts = [
    { platform: 'YouTube', username: '@altyoucreator', connected: true, followers: '245K' },
    { platform: 'Instagram', username: '@altyou_official', connected: true, followers: '112K' },
    { platform: 'Twitter', username: '@altyou', connected: true, followers: '58.2K' },
    { platform: 'TikTok', username: '@altyoucreator', connected: true, followers: '325K' },
    { platform: 'Facebook', username: 'ALTYOU Creator', connected: false, followers: '- -' }
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
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="bg-neutral-900 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">M</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Medhansh Jain</h2>
                  <p className="text-indigo-400">Premium Creator</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Edit Profile</Button>
                <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">View Public Profile</Button>
              </div>
            </div>
            
            <div className="bg-neutral-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Account Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">medhansh@altyou.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="text-white">March 2023</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Plan</p>
                  <p className="text-white">Creator Pro <span className="text-xs bg-indigo-600/30 text-indigo-400 px-2 py-0.5 rounded-full ml-2">Active</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="bg-neutral-900 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Content Stats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-neutral-800 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">47</p>
                  <p className="text-sm text-gray-400">Videos</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-sm text-gray-400">Podcasts</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">28</p>
                  <p className="text-sm text-gray-400">Articles</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-white">85K</p>
                  <p className="text-sm text-gray-400">Total Views</p>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Linked Social Accounts</h3>
                <Button variant="ghost" className="text-sm hover:bg-white/10">
                  <User className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
              
              <div className="space-y-4">
                {socialAccounts.map((account, index) => (
                  <div key={index} className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{account.platform}</p>
                        <p className="text-sm text-gray-400">{account.username}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{account.followers}</p>
                        <p className="text-xs text-gray-400">Followers</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className={`text-xs font-medium ${account.connected ? 'text-green-400' : 'text-yellow-400'}`}>
                        {account.connected ? '● Connected' : '○ Not Connected'}
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs hover:bg-white/10">
                        {account.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
