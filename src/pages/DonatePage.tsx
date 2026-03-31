import { useState, useEffect } from 'react';
import { Heart, Check, Copy } from 'lucide-react';
import { storage } from '../services/storage';

export const DonatePage = () => {
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState(storage.getSettings());

  useEffect(() => {
    setSettings(storage.getSettings());
  }, []);

  const upiId = settings.donate_upi_id;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20">
      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.donate_hero_image} 
            alt="Donate Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-church-green/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto text-church-accent mb-6" size={48} />
          <h1 className="text-5xl font-bold mb-6 text-white">{settings.donate_hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">{settings.donate_hero_subtitle}</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200">
              <h2 className="text-2xl font-bold text-church-green mb-8">Bank Account Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Name</label>
                  <p className="text-lg font-medium text-slate-800">{settings.donate_bank_account_name}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</label>
                  <p className="text-lg font-medium text-slate-800">{settings.donate_bank_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Number</label>
                    <p className="text-lg font-medium text-slate-800">{settings.donate_bank_account_number}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">IFSC Code</label>
                    <p className="text-lg font-medium text-slate-800">{settings.donate_bank_ifsc}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Branch</label>
                  <p className="text-lg font-medium text-slate-800">{settings.donate_bank_branch}</p>
                </div>
              </div>
            </div>

            <div className="bg-church-green/5 p-10 rounded-3xl border border-church-green/10 flex flex-col items-center justify-center text-center">
              <div className="w-48 h-48 bg-white p-4 rounded-2xl shadow-inner mb-8 flex items-center justify-center border border-church-green/20">
                <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-widest">UPI QR CODE</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-church-green mb-2">Scan to Donate</h3>
              <p className="text-slate-600 mb-6">Support us instantly using any UPI app (GPay, PhonePe, Paytm)</p>
              <button 
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-6 py-3 bg-white rounded-full border border-green-200 text-church-accent font-bold hover:bg-green-50 transition-colors"
              >
                <span>{upiId}</span>
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
