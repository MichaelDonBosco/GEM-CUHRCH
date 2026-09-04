import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  CreditCard, 
  DollarSign, 
  Repeat, 
  Lock,
  ArrowRight,
  Download
} from 'lucide-react';
import { GIVING_FUNDS } from '../data/mockChurchData';

export const GivingSection: React.FC = () => {
  const [selectedFundId, setSelectedFundId] = useState(GIVING_FUNDS[0].id);
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'one_time' | 'weekly' | 'monthly'>('one_time');
  const [coverFees, setCoverFees] = useState<boolean>(true);
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<{
    id: string;
    amount: number;
    fund: string;
    date: string;
    frequency: string;
  } | null>(null);

  const presetAmounts = [25, 50, 100, 250, 500];

  const currentAmount = selectedAmount === 'custom' 
    ? (parseFloat(customAmount) || 0) 
    : selectedAmount;

  const processingFee = coverFees ? Number((currentAmount * 0.022 + 0.30).toFixed(2)) : 0;
  const totalCharge = Number((currentAmount + processingFee).toFixed(2));

  const selectedFund = GIVING_FUNDS.find(f => f.id === selectedFundId) || GIVING_FUNDS[0];

  const handleProcessGiving = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReceipt({
        id: `GEM-TX-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: totalCharge,
        fund: selectedFund.title,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        frequency: frequency === 'one_time' ? 'One-time Gift' : frequency === 'weekly' ? 'Weekly Recurring' : 'Monthly Recurring'
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#043e32]/10 text-[#043e32] mb-2">
          <Heart className="w-3.5 h-3.5 text-[#043e32] fill-[#043e32]/30" />
          <span>Generosity & Kingdom Stewardship</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
          Faithful Giving & Stewardship
        </h2>
        <p className="font-scripture italic text-stone-600 text-sm mt-2">
          “Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” — 2 Corinthians 9:7
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Giving Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {receipt ? (
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[#043e32] mb-1">
                Thank You for Your Generosity!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto mb-6">
                Your tithes and offerings directly power our preaching of the Gospel, local food pantry, and youth discipleship.
              </p>

              {/* Receipt Summary Box */}
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-left max-w-md mx-auto space-y-2.5 text-xs text-stone-700 mb-6 font-mono">
                <div className="flex justify-between border-b border-stone-200 pb-2 font-sans font-bold text-stone-900">
                  <span>Official Gift Receipt</span>
                  <span className="text-emerald-700">COMPLETED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Transaction ID:</span>
                  <span>{receipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Fund Allocated:</span>
                  <span className="font-sans font-medium">{receipt.fund}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date:</span>
                  <span>{receipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Frequency:</span>
                  <span>{receipt.frequency}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 text-sm font-bold text-stone-900">
                  <span>Total Received:</span>
                  <span className="text-emerald-800 font-bold">${receipt.amount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setReceipt(null)}
                className="px-6 py-2.5 rounded-xl bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-xs font-semibold transition-colors cursor-pointer"
              >
                Make Another Gift
              </button>
            </div>
          ) : (
            <form onSubmit={handleProcessGiving} className="space-y-6">
              {/* Frequency Toggle */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Giving Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'one_time', label: 'One-Time' },
                    { id: 'weekly', label: 'Weekly' },
                    { id: 'monthly', label: 'Monthly' },
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => setFrequency(freq.id as any)}
                      className={`py-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        frequency === freq.id
                          ? 'bg-[#043e32] text-[#fbbf24] border-[#043e32] shadow-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Amount (USD)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        selectedAmount === amt
                          ? 'bg-[#043e32] text-[#fbbf24] border-[#043e32] shadow-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedAmount('custom')}
                    className={`py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedAmount === 'custom'
                        ? 'bg-[#043e32] text-[#fbbf24] border-[#043e32] shadow-sm'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {selectedAmount === 'custom' && (
                  <div className="relative">
                    <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="number"
                      step="any"
                      min="1"
                      required
                      placeholder="Enter custom gift amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
                    />
                  </div>
                )}
              </div>

              {/* Fund Allocation Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Fund Designation
                </label>
                <div className="space-y-2">
                  {GIVING_FUNDS.map((fund) => (
                    <div
                      key={fund.id}
                      onClick={() => setSelectedFundId(fund.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedFundId === fund.id
                          ? 'bg-[#043e32]/5 border-[#043e32] ring-1 ring-[#043e32]/40'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-900">{fund.title}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{fund.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        selectedFundId === fund.id ? 'border-[#043e32] bg-[#043e32]' : 'border-stone-400'
                      }`}>
                        {selectedFundId === fund.id && <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donor Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First & Last Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email for Tax Receipt
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
                  />
                </div>
              </div>

              {/* Cover processing fees toggle */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-200">
                <input
                  type="checkbox"
                  id="fees"
                  checked={coverFees}
                  onChange={(e) => setCoverFees(e.target.checked)}
                  className="rounded text-[#043e32] focus:ring-[#043e32] cursor-pointer"
                />
                <label htmlFor="fees" className="text-xs text-stone-600 cursor-pointer select-none">
                  Add <strong>${processingFee.toFixed(2)}</strong> to cover credit card processing fees so 100% of my gift reaches ministry.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || currentAmount <= 0}
                className="w-full py-3.5 px-6 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] disabled:opacity-50 text-[#043e32] font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Secure Gift...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Give ${totalCharge.toFixed(2)} USD</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit SSL Encrypted • GEM Church Tuticorin Stewardship</span>
              </div>
            </form>
          )}
        </div>

        {/* Right Info: Ministry Impact & Financial Transparency (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Campaign Progress */}
          <div className="bg-[#011712] text-slate-100 rounded-2xl p-6 border border-[#065f46] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#fbbf24] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Special Ministry Campaign</span>
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-2">
              Sanctuary & Youth Center Expansion
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Our church family is investing in our children and youth. Funds raised provide modern multimedia classrooms, worship space, and fellowship areas.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Raised: $184,500</span>
                <span className="text-[#fbbf24]">Goal: $250,000</span>
              </div>
              <div className="w-full bg-[#02241d] h-2 rounded-full overflow-hidden border border-[#065f46]">
                <div className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] h-full rounded-full" style={{ width: '74%' }} />
              </div>
              <div className="text-right text-[11px] text-emerald-300/70">
                74% Funded • 65 Days Remaining
              </div>
            </div>
          </div>

          {/* Where Does Your Tithe Go? */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
            <h4 className="font-cinzel text-lg font-bold text-[#043e32] mb-3">
              Where Does Your Offering Go?
            </h4>
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold flex-shrink-0">
                  45%
                </div>
                <div>
                  <div className="font-bold text-stone-800">Worship & Ministry Discipleship</div>
                  <div className="text-stone-500">Weekly worship services, youth academy, sound and video broadcast.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
                  25%
                </div>
                <div>
                  <div className="font-bold text-stone-800">Global & Local Outreach</div>
                  <div className="text-stone-500">Community food pantry, 18 missionary families across the world.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold flex-shrink-0">
                  20%
                </div>
                <div>
                  <div className="font-bold text-stone-800">Facilities & Operations</div>
                  <div className="text-stone-500">Sanctuary maintenance, utilities, technology infrastructure.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold flex-shrink-0">
                  10%
                </div>
                <div>
                  <div className="font-bold text-stone-800">Pastoral Benevolence</div>
                  <div className="text-stone-500">Emergency community crisis relief and medical aid.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
