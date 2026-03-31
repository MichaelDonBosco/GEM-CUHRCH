import { useState, useEffect } from 'react';
import { Leader } from '../types';
import { storage } from '../services/storage';

export const LeadershipPage = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [settings, setSettings] = useState(storage.getSettings());

  useEffect(() => {
    setLeaders(storage.getLeaders());
    setSettings(storage.getSettings());
  }, []);

   return (
    <div className="pt-20">
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
            <div>
              <span className="text-church-accent font-bold tracking-widest uppercase text-sm mb-4 block">Our Pastor</span>
              <h1 className="text-5xl font-bold text-church-green mb-2">Rev. L. Navaratnam</h1>
              <h2 className="text-2xl font-bold text-slate-700 mb-8">Testimony & Vision</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                <p className="text-xl italic text-slate-800">"My calling is not just to preach, but to be the hands and feet of Jesus in a world that is hurting."</p>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-church-green mb-4">Testimony</h3>
                  <p>God saved Rev Navaratnam in the year 1989 from catholic background. Having worked as a civil engineer and part time ministry for 4 years Resigned his job, surrendered for the full time ministry since 1994 March, as longing to serve in unreached remote place. God fulfilled his desire to work among Nepalis since then. Now by Gods grace doing his ministry in Tuticorin, Nepal, Bhutan, Darjeeling, Siliguri, Punjab, Andhra Pradesh, Orissa, Bangalore. Praise be to Jesus.</p>
                </div>
                <h3 className="text-xl font-bold text-church-green">Ministry Vision</h3>
                <p>The vision for the coming years is to establish sustainable support systems for widows and orphans in every mission field we serve, while raising up a new generation of leaders who are unashamed of the gospel.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-church-green/20 rounded-3xl"></div>
              <img 
                src="https://i.postimg.cc/4Nnh6Hds/Whats_App_Image_2024_04_11_at_19_57_04_d9a24723_removebg_preview.png" 
                alt="Pastor Rev. L. Navaratnam" 
                className="relative z-10 rounded-3xl w-full object-contain shadow-2xl bg-slate-50"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Church Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                  <img 
                    src={`https://picsum.photos/seed/leader-${i}/400/400`} 
                    alt="Leader" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Leader Name {i}</h4>
                <p className="text-church-accent text-sm font-medium">Ministry Role</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
