/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// WhatsApp helper utility for GEM Church Tuticorin
// Generates direct wa.me deep links with formatted greetings in English & Tamil

export const CHURCH_WHATSAPP_PRIMARY = '919994301540';
export const CHURCH_WHATSAPP_SECONDARY = '919994645090';

export interface WhatsAppMessageOptions {
  recipientPhone?: string;
  recipientName?: string;
  spouseName?: string;
  type?: 'birthday' | 'anniversary' | 'prayer_encouragement' | 'general_enquiry' | 'mission_pledge' | 'prayer_request';
  customNote?: string;
}

/**
 * Generates an official pastoral blessing for believer celebrations
 */
export function generateCelebrationWhatsAppMessage(options: {
  memberName: string;
  type: 'birthday' | 'anniversary';
  spouseName?: string;
  years?: number;
}): string {
  const { memberName, type, spouseName, years } = options;

  if (type === 'anniversary') {
    const coupleText = spouseName ? `${memberName} & ${spouseName}` : memberName;
    const yearText = years ? ` on your *${years}th* Wedding Anniversary` : ' on your Wedding Anniversary';
    return (
      `🕊️ *Glorious Evangelical Ministries (GEM Church Tuticorin)*\n\n` +
      `Dear beloved in Christ, *${coupleText}*,\n\n` +
      `Warmest Christian Greetings and heartfelt congratulations${yearText}! 🎉💍\n\n` +
      `📖 *"And over all these virtues put on love, which binds them all together in perfect unity."* — Colossians 3:14\n\n` +
      `May our Heavenly Father continuously pour His boundless love, divine peace, good health, and joyful harmony upon your home and marriage. May your union stand as a shining testament to God's unfailing faithfulness.\n\n` +
      `_"கர்த்தர் உங்கள் இல்லத்தை எப்போதும் ஆசீர்வதித்து சமாதானத்தினால் நிரப்புவாராக!"_\n\n` +
      `With heartfelt prayers and pastoral blessings,\n` +
      `*Rev. L. Navaratnam* (Senior Pastor & Founder)\n` +
      `GEM Church, 7V/6B SundaravelPuram, Tuticorin – 628002`
    );
  }

  // Birthday
  return (
    `✨ *Glorious Evangelical Ministries (GEM Church Tuticorin)*\n\n` +
    `Dear beloved in Christ, *${memberName}*,\n\n` +
    `Grace and peace to you in the precious name of our Lord Jesus Christ! 🎂🎈\n` +
    `Wishing you a very *Happy and Blessed Birthday*!\n\n` +
    `📖 *"The Lord bless you and keep you; the Lord make His face shine upon you and be gracious to you; the Lord turn His face toward you and give you peace."* — Numbers 6:24-26\n\n` +
    `As you step into this new year of life, may the Almighty God grant you good health, wisdom, divine guidance, and fulfill all the righteous desires of your heart.\n\n` +
    `_"கர்த்தர் உங்களை ஆசீர்வதித்து, உங்கள் வழிகளையெல்லாம் செழிப்பாக்குவாராக!"_\n\n` +
    `With sincere prayers and pastoral love,\n` +
    `*Rev. L. Navaratnam* (Senior Pastor & Founder)\n` +
    `GEM Church, 7V/6B SundaravelPuram, Tuticorin – 628002`
  );
}

/**
 * Creates a click-to-chat WhatsApp link
 */
export function createWhatsAppUrl(phoneNumber: string, message: string): string {
  // Clean phone number (strip spaces, dashes, parentheses)
  let cleanPhone = phoneNumber.replace(/\D/g, '');
  if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}

/**
 * Quick link to chat directly with Church Sanctuary
 */
export function getSanctuaryWhatsAppUrl(purpose: string = 'General Enquiry'): string {
  const message = 
    `Praise the Lord Pastor! 🕊️\n` +
    `I am contacting GEM Church Tuticorin regarding: *${purpose}*.\n\n` +
    `Name:\n` +
    `Contact:\n` +
    `Message / Request:`;
  return `https://api.whatsapp.com/send?phone=${CHURCH_WHATSAPP_PRIMARY}&text=${encodeURIComponent(message)}`;
}
