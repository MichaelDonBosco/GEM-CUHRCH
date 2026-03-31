import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Quote, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Announcement, MissionField, SiteSettings } from '../types';
import { storage } from '../services/storage';

export const HomePage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [missionFields, setMissionFields] = useState<MissionField[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(storage.getSettings());

  useEffect(() => {
    setAnnouncements(storage.getAnnouncements());
    setMissionFields(storage.getMissionFields());
    setSettings(storage.getSettings());
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-church-green"></div>
          <img 
            src={settings.home_hero_image} 
            alt="" 
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-church-green/10 border border-church-green/20 text-church-accent text-xs font-bold uppercase tracking-widest mb-6">
              Welcome to Glorious Evangelical Ministries
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              {settings.home_hero_title.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'love' ? 'text-church-accent italic' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              {settings.home_hero_subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="px-8 py-4 bg-church-green hover:bg-church-green/90 text-white rounded-full font-bold transition-all transform hover:scale-105">
                Learn More
              </Link>
              <Link to="/donate" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-full font-bold transition-all">
                Support Our Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Announcements Bar */}
      {announcements.length > 0 && (
        <div className="bg-church-green text-white py-4 overflow-hidden">
          <div className="flex items-center whitespace-nowrap animate-marquee">
            {announcements.map((a, i) => (
              <span key={i} className="mx-8 flex items-center space-x-2">
                <Bell size={16} className="text-church-accent" />
                <span className="text-sm font-medium">{a.content}</span>
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {announcements.map((a, i) => (
              <span key={`dup-${i}`} className="mx-8 flex items-center space-x-2">
                <Bell size={16} className="text-church-accent" />
                <span className="text-sm font-medium">{a.content}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Gospel Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Quote size={48} className="mx-auto text-church-green/10 mb-8" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-relaxed"
          >
            {settings.home_gospel_quote}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 mb-8 leading-relaxed italic"
          >
            A strong connection between loving and giving “God so LOVED the world that he GAVE …,” (John 3:16 ESV).
          </motion.p>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-church-accent mx-auto mb-8"
          ></motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl italic text-slate-800 mb-8 leading-relaxed"
          >
            {settings.home_gospel_verse.split('—')[0]}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-church-accent font-bold tracking-widest uppercase text-sm"
          >
            — {settings.home_gospel_verse.split('—')[1]}
          </motion.p>
        </div>
      </section>

      {/* Tamil Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h3 className="text-2xl font-bold text-church-green mb-6">{settings.tamil_section_title}</h3>
              <div className="space-y-4 text-slate-700 leading-relaxed whitespace-pre-wrap">
                {settings.tamil_section_content}
              </div>
              <a 
                href={settings.live_service_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-8 px-6 py-3 border border-church-green text-church-green rounded-full font-bold hover:bg-church-green/5 transition-colors"
              >
                Watch Live Service
              </a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <img 
                src={settings.tamil_section_image} 
                alt="Tamil Service" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Fields Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Mission Fields</h2>
              <p className="text-slate-500 max-w-xl">Spreading the gospel and serving communities across India and beyond.</p>
            </div>
            <Link to="/missions" className="hidden md:flex items-center space-x-2 text-church-accent font-bold hover:text-church-green">
              <span>View All Fields</span>
              <ChevronRight size={20} />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionFields.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400">
                No mission fields added yet.
              </div>
            ) : (
              missionFields.slice(0, 3).map((field, idx) => (
                <motion.div 
                  key={field._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={field.image_url} 
                    alt={field.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{field.name}</h4>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{field.description}</p>
                    <Link to="/missions" className="text-church-accent text-sm font-bold flex items-center space-x-1">
                      <span>Read More</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
