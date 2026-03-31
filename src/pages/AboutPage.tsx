import { useState, useEffect } from 'react';
import { Heart, Globe } from 'lucide-react';
import { SiteSettings } from '../types';
import { storage } from '../services/storage';

export const AboutPage = () => {
  const [settings, setSettings] = useState<SiteSettings>(storage.getSettings());

  useEffect(() => {
    setSettings(storage.getSettings());
  }, []);

  return (
    <div className="pt-20">
      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.about_hero_image} 
            alt="About Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-church-green/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">About GEM</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">GLORIOUS EVANGELICAL MINISTRIES</p>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">Indian National Apostolic Diocese</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/Bv1wzvn6/Whats_App_Image_2026_02_26_at_17_40_51.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h2 className="text-3xl font-bold text-church-green">{settings.about_story_title}</h2>
              </div>
              <div className="space-y-6 text-slate-600 leading-relaxed whitespace-pre-wrap">
                <p>{settings.about_story_content}</p>
              </div>
              
              <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-church-green mb-4">Our Belief: Apostles Creed</h3>
                <ul className="space-y-4 text-sm text-slate-600">
                  {[
                    "We believe in God, the father Almighty, Creator of heaven and earth.",
                    "We believe in Jesus Christ, His Only Son, Our Lord who was conceived by the Holy Spirit and born of the Virgin Mary.",
                    "He suffered under Pontius Pilate was crucified and was buried; He descended into the lower parts the earth.",
                    "Third day He rose again From the dead, ascended to heaven and Is seated at the right hand of God the Father Almighty, interceding for us.",
                    "We believe the Rapture the secret coming of Jesus in the mid-air for those who wait for His Return and the tribulation.",
                    "We believe the second coming of Jesus and establishing the 1000 years and judgement.",
                    "We believe in God the Father, God the Son, and God the Holy Spirit, three persons are to be worshipped in one Godhead.",
                    "We believe in immersed baptism for the remission of sins.",
                    "We believe in the infilling and indwelling of the Holy Spirit."
                  ].map((belief, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-church-accent mt-1.5"></div>
                      <span>{belief}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-church-green/5 p-8 rounded-2xl border border-church-green/10">
                <Heart className="text-church-accent mb-6" size={32} />
                <h3 className="text-2xl font-bold text-church-green mb-4">Our Mission</h3>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {settings.about_mission_content}
                </div>
              </div>

              <div className="bg-church-green/5 p-8 rounded-2xl border border-church-green/10">
                <Globe className="text-church-accent mb-6" size={32} />
                <h3 className="text-2xl font-bold text-church-green mb-4">Our Vision</h3>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {settings.about_vision_content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
