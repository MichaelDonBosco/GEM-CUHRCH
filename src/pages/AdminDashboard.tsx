import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Globe, 
  DollarSign, 
  Bell, 
  LogOut, 
  Plus, 
  Trash2, 
  Pencil,
  Gift, 
  X,
  UserCheck,
  Map,
  Settings as SettingsIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { Member, Event, MissionReport, Announcement, Finance, Leader, MissionField, SiteSettings } from '../types';
import { storage } from '../services/storage';

interface AdminDashboardProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

export const AdminDashboard = ({ isLoggedIn, setIsLoggedIn }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'members' | 'events' | 'missions' | 'finances' | 'announcements' | 'leaders' | 'mission_fields' | 'settings'>('members');
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [reports, setReports] = useState<MissionReport[]>([]);
  const [finances, setFinances] = useState<Finance[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [missionFields, setMissionFields] = useState<MissionField[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(storage.getSettings());
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [greetings, setGreetings] = useState<{ birthdays: Member[], anniversaries: Member[] }>({ birthdays: [], anniversaries: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string, id: string } | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = () => {
    setMembers(storage.getMembers());
    setEvents(storage.getEvents());
    setReports(storage.getMissions());
    setFinances(storage.getFinances());
    setAnnouncements(storage.getAnnouncements());
    setLeaders(storage.getLeaders());
    setMissionFields(storage.getMissionFields());
    setSettings(storage.getSettings());
    setGreetings(storage.getGreetings());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid credentials (try admin/admin123)');
    }
  };

  const handleDelete = (type: string, id: string) => {
    setDeleteConfirm({ type, id });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;
    
    switch(type) {
      case 'members': storage.deleteMember(id); break;
      case 'events': storage.deleteEvent(id); break;
      case 'mission-reports': storage.deleteMission(id); break;
      case 'finances': storage.deleteFinance(id); break;
      case 'announcements': storage.deleteAnnouncement(id); break;
      case 'leaders': storage.deleteLeader(id); break;
      case 'mission_fields': storage.deleteMissionField(id); break;
    }
    setDeleteConfirm(null);
    fetchData();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    switch(activeTab) {
      case 'members': storage.saveMember(formData); break;
      case 'events': storage.saveEvent(formData); break;
      case 'missions': storage.saveMission(formData); break;
      case 'finances': storage.saveFinance(formData); break;
      case 'announcements': storage.saveAnnouncement(formData); break;
      case 'leaders': storage.saveLeader(formData); break;
      case 'mission_fields': storage.saveMissionField(formData); break;
    }
    
    setFormData({});
    setIsModalOpen(false);
    fetchData();
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1920&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-church-green/60 backdrop-blur-sm"></div>
        </div>
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 relative z-10 mx-4">
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
              <img 
                src="https://i.postimg.cc/Bv1wzvn6/Whats_App_Image_2026_02_26_at_17_40_51.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-slate-500 mt-2">Glorious Evangelical Ministries</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-church-accent focus:ring-1 focus:ring-church-accent outline-none transition-all"
                value={loginData.username}
                onChange={e => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-church-accent focus:ring-1 focus:ring-church-accent outline-none transition-all"
                value={loginData.password}
                onChange={e => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="w-full py-4 bg-church-green hover:bg-church-green/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-church-green/20">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-12 p-8 bg-church-green rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80" 
              alt="Dashboard BG" 
              className="w-full h-full object-cover mix-blend-overlay opacity-20"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-green-100">Welcome back, Administrator. Manage your ministry with ease.</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Greetings Alert */}
        {(greetings.birthdays.length > 0 || greetings.anniversaries.length > 0) && (
          <div className="mb-12 p-6 bg-church-green rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Gift size={24} className="text-church-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Today's Greetings</h3>
                <p className="text-green-100 text-sm">
                  {greetings.birthdays.length} Birthdays • {greetings.anniversaries.length} Anniversaries
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-6 py-2 bg-church-accent hover:bg-church-accent/80 text-white rounded-full text-sm font-bold transition-colors">
                Send WhatsApp Wishes
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'members', icon: Users, label: 'Members' },
              { id: 'events', icon: Calendar, label: 'Events' },
              { id: 'missions', icon: Globe, label: 'Mission Reports' },
              { id: 'finances', icon: DollarSign, label: 'Finances' },
              { id: 'announcements', icon: Bell, label: 'Announcements' },
              { id: 'leaders', icon: UserCheck, label: 'Leadership' },
              { id: 'mission_fields', icon: Map, label: 'Mission Fields' },
              { id: 'settings', icon: SettingsIcon, label: 'Site Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-church-green text-white shadow-lg shadow-church-green/20' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <tab.icon size={20} />
                <span className="font-bold">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-church-green capitalize">{activeTab}</h2>
                <button 
                  onClick={() => {
                    setFormData({});
                    setIsModalOpen(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-church-green/5 text-church-accent rounded-xl font-bold hover:bg-church-green/10 transition-colors"
                >
                  <Plus size={18} />
                  <span>Add New</span>
                </button>
              </div>
              
              <div className="p-8">
                {activeTab === 'members' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="pb-4">Name</th>
                          <th className="pb-4">Phone</th>
                          <th className="pb-4">Birthday</th>
                          <th className="pb-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {members.map((m) => (
                          <tr key={m._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <td className="py-4 font-bold text-slate-800">{m.name}</td>
                            <td className="py-4 text-slate-500">{m.phone}</td>
                            <td className="py-4 text-slate-500">{m.birthday ? format(new Date(m.birthday), 'MMM d') : '-'}</td>
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <button 
                                  onClick={() => {
                                    setFormData(m);
                                    setIsModalOpen(true);
                                  }}
                                  className="text-slate-400 hover:text-church-accent transition-colors"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button 
                                  onClick={() => handleDelete('members', m._id)}
                                  className="text-red-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === 'finances' && (
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-6 bg-church-green/5 rounded-2xl border border-church-green/10">
                        <span className="text-xs font-bold text-church-accent uppercase tracking-widest">Total Income</span>
                        <p className="text-3xl font-bold text-church-green mt-1">₹ {finances.filter(f => f.type === 'income').reduce((acc, f) => acc + f.amount, 0).toLocaleString()}</p>
                      </div>
                      <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                        <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Total Expenses</span>
                        <p className="text-3xl font-bold text-red-900 mt-1">₹ {finances.filter(f => f.type === 'expense').reduce((acc, f) => acc + f.amount, 0).toLocaleString()}</p>
                      </div>
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Category</th>
                          <th className="pb-4">Amount</th>
                          <th className="pb-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {finances.map((f) => (
                          <tr key={f._id} className="border-b border-slate-50">
                            <td className="py-4 text-slate-500">{format(new Date(f.date), 'MMM d, yyyy')}</td>
                            <td className="py-4 font-medium text-slate-800">{f.category}</td>
                            <td className={`py-4 font-bold ${f.type === 'income' ? 'text-church-accent' : 'text-red-600'}`}>
                              {f.type === 'income' ? '+' : '-'} ₹ {f.amount.toLocaleString()}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <button 
                                  onClick={() => {
                                    setFormData(f);
                                    setIsModalOpen(true);
                                  }}
                                  className="text-slate-400 hover:text-church-accent transition-colors"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button 
                                  onClick={() => handleDelete('finances', f._id)}
                                  className="text-red-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'missions' && (
                  <div className="space-y-6">
                    {reports.map((r) => (
                      <div key={r._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden">
                            <img src={r.image_url || `https://picsum.photos/seed/${r.region}/100/100`} alt="" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{r.title}</h4>
                            <p className="text-xs text-slate-400 uppercase tracking-widest">{r.region} • {format(new Date(r.date), 'MMM yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => {
                              setFormData(r);
                              setIsModalOpen(true);
                            }}
                            className="text-slate-400 hover:text-church-accent transition-colors"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete('mission-reports', r._id)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'announcements' && (
                  <div className="space-y-4">
                    {announcements.map((a) => (
                      <div key={a._id} className="p-4 bg-church-green/5 rounded-2xl border border-church-green/10 flex justify-between items-center">
                        <p className="text-church-green font-medium">{a.content}</p>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => {
                              setFormData(a);
                              setIsModalOpen(true);
                            }}
                            className="text-church-accent hover:text-church-green transition-colors"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete('announcements', a._id)}
                            className="text-church-accent hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((e) => (
                      <div key={e._id} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden relative group">
                        <div className="h-32 bg-slate-200">
                          {e.image_url && <img src={e.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-slate-800">{e.title}</h4>
                          <p className="text-xs text-slate-400 mt-1">{format(new Date(e.event_date), 'MMM d, yyyy h:mm a')}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => {
                              setFormData(e);
                              setIsModalOpen(true);
                            }}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-slate-400 hover:text-church-accent"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete('events', e._id)}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'leaders' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {leaders.map((l) => (
                      <div key={l._id} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden relative group">
                        <div className="aspect-square bg-slate-200">
                          <img src={l.image_url} alt={l.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-slate-800">{l.name}</h4>
                          <p className="text-xs text-church-accent font-bold uppercase tracking-widest">{l.role}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => {
                              setFormData(l);
                              setIsModalOpen(true);
                            }}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-slate-400 hover:text-church-accent"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete('leaders', l._id)}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'mission_fields' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {missionFields.map((f) => (
                      <div key={f._id} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden relative group">
                        <div className="h-40 bg-slate-200">
                          <img src={f.image_url} alt={f.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-slate-800">{f.name}</h4>
                          <p className="text-sm text-slate-500 line-clamp-2">{f.description}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => {
                              setFormData(f);
                              setIsModalOpen(true);
                            }}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-slate-400 hover:text-church-accent"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete('mission_fields', f._id)}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="max-w-4xl">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      storage.saveSettings(settings);
                      alert('Settings saved successfully!');
                    }} className="space-y-12">
                      
                      {/* Home Page Settings */}
                      <div className="space-y-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-church-green border-b border-church-green/10 pb-2">Home Page</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hero Title</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.home_hero_title} onChange={e => setSettings({...settings, home_hero_title: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hero Subtitle</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-24" value={settings.home_hero_subtitle} onChange={e => setSettings({...settings, home_hero_subtitle: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hero Image URL</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.home_hero_image} onChange={e => setSettings({...settings, home_hero_image: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Gospel Quote</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.home_gospel_quote} onChange={e => setSettings({...settings, home_gospel_quote: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Gospel Verse</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-24" value={settings.home_gospel_verse} onChange={e => setSettings({...settings, home_gospel_verse: e.target.value})} />
                          </div>
                        </div>
                      </div>

                      {/* Tamil Section Settings */}
                      <div className="space-y-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-church-green border-b border-church-green/10 pb-2">Tamil Section (Home Page)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Section Title</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.tamil_section_title} onChange={e => setSettings({...settings, tamil_section_title: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Section Content</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-32" value={settings.tamil_section_content} onChange={e => setSettings({...settings, tamil_section_content: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.tamil_section_image} onChange={e => setSettings({...settings, tamil_section_image: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Live Service URL</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.live_service_url} onChange={e => setSettings({...settings, live_service_url: e.target.value})} />
                          </div>
                        </div>
                      </div>

                      {/* About Page Settings */}
                      <div className="space-y-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-church-green border-b border-church-green/10 pb-2">About Page</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hero Image URL</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.about_hero_image} onChange={e => setSettings({...settings, about_hero_image: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Story Title</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.about_story_title} onChange={e => setSettings({...settings, about_story_title: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Story Content</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-32" value={settings.about_story_content} onChange={e => setSettings({...settings, about_story_content: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vision Content</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-24" value={settings.about_vision_content} onChange={e => setSettings({...settings, about_vision_content: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mission Content</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-24" value={settings.about_mission_content} onChange={e => setSettings({...settings, about_mission_content: e.target.value})} />
                          </div>
                        </div>
                      </div>

                      {/* Missions & Leadership Hero Settings */}
                      <div className="space-y-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-church-green border-b border-church-green/10 pb-2">Missions & Leadership Heroes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Missions Hero Title</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.missions_hero_title} onChange={e => setSettings({...settings, missions_hero_title: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Missions Hero Subtitle</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.missions_hero_subtitle} onChange={e => setSettings({...settings, missions_hero_subtitle: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Leadership Hero Title</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.leadership_hero_title} onChange={e => setSettings({...settings, leadership_hero_title: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Leadership Hero Subtitle</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.leadership_hero_subtitle} onChange={e => setSettings({...settings, leadership_hero_subtitle: e.target.value})} />
                          </div>
                        </div>
                      </div>

                      {/* Donate Page Settings */}
                      <div className="space-y-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-church-green border-b border-church-green/10 pb-2">Donate Page & Bank Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Donate Title</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.donate_title} onChange={e => setSettings({...settings, donate_title: e.target.value})} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Donate Content</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-24" value={settings.donate_content} onChange={e => setSettings({...settings, donate_content: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Account Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.bank_account_name} onChange={e => setSettings({...settings, bank_account_name: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Account Number</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.bank_account_number} onChange={e => setSettings({...settings, bank_account_number: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">IFSC Code</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.bank_ifsc} onChange={e => setSettings({...settings, bank_ifsc: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Branch</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={settings.bank_branch} onChange={e => setSettings({...settings, bank_branch: e.target.value})} />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="w-full py-4 bg-church-green text-white rounded-xl font-bold hover:bg-church-green/90 transition-all shadow-lg sticky bottom-4">
                        Save All Site Settings
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding New Items */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-auto"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-church-green capitalize">
                  {formData._id ? 'Edit' : 'Add New'} {activeTab.slice(0, -1).replace('_', ' ')}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                {activeTab === 'members' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Phone</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Birthday</label>
                      <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.birthday || ''} onChange={e => setFormData({...formData, birthday: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Anniversary</label>
                      <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.anniversary || ''} onChange={e => setFormData({...formData, anniversary: e.target.value})} />
                    </div>
                  </>
                )}
                {activeTab === 'events' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Event Title</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date & Time</label>
                      <input type="datetime-local" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.event_date || ''} onChange={e => setFormData({...formData, event_date: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Location</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
                    </div>
                  </>
                )}
                {activeTab === 'missions' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Region / Field</label>
                      <select 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" 
                        value={formData.region || ''} 
                        onChange={e => setFormData({...formData, region: e.target.value})}
                      >
                        <option value="">Select Region</option>
                        {missionFields.map(f => (
                          <option key={f._id} value={f.name}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Report Title</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Content</label>
                      <textarea required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-32" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date</label>
                      <input type="date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>
                  </>
                )}
                {activeTab === 'finances' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Type</label>
                      <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.type || 'income'} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount</label>
                      <input type="number" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.amount || ''} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date</label>
                      <input type="date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>
                  </>
                )}
                {activeTab === 'announcements' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Announcement Content</label>
                      <textarea required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-32" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                    </div>
                  </>
                )}
                {activeTab === 'leaders' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Leader Name</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Role</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                    </div>
                  </>
                )}
                {activeTab === 'mission_fields' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Field Name</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Parent Field (Optional)</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" 
                        value={formData.parent_id || ''} 
                        onChange={e => setFormData({...formData, parent_id: e.target.value || undefined})}
                      >
                        <option value="">None (Top Level)</option>
                        {missionFields.filter(f => !f.parent_id && f._id !== formData._id).map(f => (
                          <option key={f._id} value={f._id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent h-32" placeholder="Write about this mission field here..." value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                      <p className="mt-1 text-[10px] text-slate-400 italic">Write the history or current status of this mission field.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Main Image URL</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-church-accent" placeholder="https://example.com/image.jpg" value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                      <p className="mt-1 text-[10px] text-slate-400 italic">Paste the link to the main cover image here.</p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Additional Sections</h4>
                        <button 
                          type="button"
                          onClick={() => {
                            const sections = formData.sections || [];
                            setFormData({...formData, sections: [...sections, { image_url: '', content: '' }]});
                          }}
                          className="p-2 bg-church-accent/10 text-church-accent rounded-lg hover:bg-church-accent/20 transition-all flex items-center space-x-2 text-xs font-bold"
                        >
                          <Plus size={14} />
                          <span>Add Section</span>
                        </button>
                      </div>
                      <div className="space-y-6">
                        {(formData.sections || []).map((section: any, index: number) => (
                          <div key={index} className="p-6 bg-slate-50 rounded-2xl relative border border-slate-100">
                            <button 
                              type="button"
                              onClick={() => {
                                const sections = [...formData.sections];
                                sections.splice(index, 1);
                                setFormData({...formData, sections});
                              }}
                              className="absolute -top-2 -right-2 p-1.5 bg-white text-red-600 rounded-full shadow-md hover:bg-red-50 transition-all border border-red-100"
                            >
                              <X size={14} />
                            </button>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Section Image URL</label>
                                <input 
                                  type="text" 
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-church-accent text-sm" 
                                  value={section.image_url} 
                                  onChange={e => {
                                    const sections = [...formData.sections];
                                    sections[index] = { ...sections[index], image_url: e.target.value };
                                    setFormData({...formData, sections});
                                  }} 
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Section Content</label>
                                <textarea 
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-church-accent text-sm h-24" 
                                  value={section.content} 
                                  onChange={e => {
                                    const sections = [...formData.sections];
                                    sections[index] = { ...sections[index], content: e.target.value };
                                    setFormData({...formData, sections});
                                  }} 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {(!formData.sections || formData.sections.length === 0) && (
                          <p className="text-center py-8 text-slate-400 text-sm italic border-2 border-dashed border-slate-200 rounded-2xl">
                            No additional sections added yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="pt-4">
                  <button type="submit" className="w-full py-4 bg-church-green text-white rounded-xl font-bold hover:bg-church-green/90 transition-all">
                    Save {activeTab.slice(0, -1)}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Delete</h3>
              <p className="text-slate-500 mb-8">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
