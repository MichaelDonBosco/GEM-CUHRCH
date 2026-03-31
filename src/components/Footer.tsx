import { Link } from 'react-router-dom';
import { MapPin, Phone, Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://i.postimg.cc/Bv1wzvn6/Whats_App_Image_2026_02_26_at_17_40_51.jpg" 
                  alt="Glorious Evangelical Ministries Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-bold text-white">Glorious Evangelical Ministries</span>
            </div>
            <p className="text-slate-400 max-w-md mb-6 leading-relaxed">
              "Pure and undefiled religion before God the Father is this: to care for orphans and widows in their distress, and to keep oneself unstained by the world." — James 1:27
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/profile.php?id=100064793076144" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-church-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/gloriousevangelicalministries?igsh=eWFyZzN5djI2Ym5l" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-church-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-church-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-church-accent shrink-0 mt-1" />
                <span>7V/6B SundaravelPuram, Tuticorin – 628002</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-church-accent shrink-0" />
                <span>+91 99943 01540</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-church-accent shrink-0" />
                <span>+91 99946 45090</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-church-accent transition-colors">Statement of Faith</Link></li>
              <li><Link to="/missions" className="hover:text-church-accent transition-colors">Mission Fields</Link></li>
              <li><Link to="/donate" className="hover:text-church-accent transition-colors">Online Offering</Link></li>
              <li><Link to="/leadership" className="hover:text-church-accent transition-colors">Our Leadership</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Glorious Evangelical Ministries. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Walking in Love, Holiness, and Service.</p>
        </div>
      </div>
    </footer>
  );
};
