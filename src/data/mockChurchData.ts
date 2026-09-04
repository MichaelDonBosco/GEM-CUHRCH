import { Sermon, ChurchEvent, PrayerRequest, Ministry, Devotional, GivingFund } from '../types';

export const CHURCH_INFO = {
  name: 'GEM Church Tuty',
  fullName: 'Glorious Evangelical Ministries (GEM Church)',
  tagline: 'Walking in Love, Holiness, and Service.',
  motto: 'Love • Holiness • Service',
  leadPastor: 'Rev. L. Navaratnam (Founder & Senior Pastor)',
  address: '7V/6B SundaravelPuram, Tuticorin – 628002, Tamil Nadu, India',
  phone: '+91 99943 01540 / +91 99946 45090',
  email: 'contact@gemchurchtuty.org',
  officeHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  serviceTimes: [
    { name: 'Sunday Celebration Worship', time: 'Sundays at 9:00 AM', location: 'Main Sanctuary, Tuticorin & Online' },
    { name: 'Tamil Sunday Service (தமிழ் ஆராதனை)', time: 'Sundays at 9:00 AM', location: 'Main Sanctuary & Live Stream' },
    { name: 'Midweek Bible & Fasting Prayer', time: 'Wednesdays at 6:30 PM', location: 'Sanctuary & Online' },
    { name: 'All Night Prayer Watch', time: '2nd Friday of Month at 10:00 PM', location: 'Main Sanctuary' },
  ],
  missionFields: [
    'Tuticorin', 'Nepal', 'Bhutan', 'Darjeeling', 'Siliguri', 'Punjab', 'Andhra Pradesh', 'Orissa', 'Bangalore'
  ],
  tamilWelcome: {
    title: 'கிறிஸ்துவுக்குள் மிகவும் பிரியமானவர்களே!',
    content: 'ஆண்டவரும் இரட்சகருமான இயேசு கிறிஸ்துவின் நாமத்தில் அன்பின் வாழ்த்துக்கள்! நேரலையில் கலந்துகொள்ளும் அனைவரும் பயபக்தியுடன் ஆராதனையில் கலந்து கொண்டு தேவ ஆசீர்வாதம் பெற்றுக்கொள்ளுங்கள்.'
  }
};

export const INITIAL_SERMONS: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'Walking in Love, Holiness, and Service',
    speaker: 'Rev. L. Navaratnam',
    speakerRole: 'Founder & Senior Pastor',
    date: 'August 31, 2026',
    series: 'Kingdom Foundations',
    duration: '42 mins',
    scripture: 'James 1:27 & Hebrews 12:26-29',
    description: 'When culture and circumstances tremble, our hope rests on a kingdom that cannot be shaken. Discover how to anchor your everyday decisions in God’s immutable covenant.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    videoEmbedId: 'live_stream_placeholder',
    audioDuration: '42:15',
    keyPoints: [
      'Pure religion: caring for orphans and widows in their distress (James 1:27).',
      'The storm doesn’t create your foundation; it tests it.',
      'Receive a kingdom that cannot be shaken through persistent gratitude and worship.'
    ],
    notesTemplate: `1. Foundational truth from James 1:27 & Hebrews 12:\n2. Areas where I need deeper spiritual roots:\n3. Action step for this week:`
  },
  {
    id: 'sermon-2',
    title: 'The Radical Grace That Rewrites Your Story',
    speaker: 'Rev. L. Navaratnam',
    speakerRole: 'Founder & Senior Pastor',
    date: 'August 24, 2026',
    series: 'Kingdom Foundations',
    duration: '38 mins',
    scripture: 'Ephesians 2:1-10 & Romans 8:1-4',
    description: 'Grace is not merely pardon for the past; it is supernatural empowerment for the future. You are His workmanship created in Christ Jesus for good works.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80',
    audioDuration: '38:40',
    keyPoints: [
      'We are saved by grace through faith, entirely outside human merit.',
      'God does not call the qualified; He qualifies the called.',
      'Living under grace transforms how we forgive those who trespass against us.'
    ],
  },
  {
    id: 'sermon-3',
    title: 'The Art of Persistent & Prevailing Prayer',
    speaker: 'Rev. Dr. Michael Don Bosco',
    speakerRole: 'Senior Pastor',
    date: 'August 17, 2026',
    series: 'Secret Place & Public Power',
    duration: '45 mins',
    scripture: 'Luke 18:1-8 & Philippians 4:6-7',
    description: 'Jesus taught that men ought always to pray and not lose heart. Learn how prayer changes not only our situation, but molds our inner character to reflect Christ.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
    audioDuration: '45:10',
    keyPoints: [
      'Prayer is intimacy before it is petition.',
      'Persistence in prayer expresses confidence in God’s goodness, not manipulation.',
      'Peace is God’s garrison guarding your heart before the physical breakthrough arrives.'
    ],
  },
  {
    id: 'sermon-4',
    title: 'Generosity That Sparks Revival',
    speaker: 'Pastor David Vance',
    speakerRole: 'Global Missions Director',
    date: 'August 10, 2026',
    series: 'Kingdom Stewardship',
    duration: '35 mins',
    scripture: '2 Corinthians 9:6-15 & Malachi 3:10',
    description: 'When God’s people loosen their grip on the temporary, heaven unlocks the eternal. A practical look at cheerful giving and eternal impact.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    audioDuration: '35:22',
    keyPoints: [
      'God loves a cheerful giver whose heart beats with compassion.',
      'You cannot outgive God when your resources bless the vulnerable.',
      'Missions is spiritual investment with eternal dividends.'
    ],
  }
];

export const INITIAL_EVENTS: ChurchEvent[] = [
  {
    id: 'event-1',
    title: 'GEM Annual Kingdom Faith Conference 2026',
    category: 'Worship',
    date: 'September 18 - 20, 2026',
    time: '6:30 PM Nightly',
    location: 'Main Sanctuary & Broadcast Center',
    description: 'Three days of dynamic worship, prophetic ministry, breakout workshops on leadership and family life, and deep immersion in the Word of God.',
    lead: 'Rev. Dr. Michael Don Bosco & Guest Speakers',
    rsvpCount: 384,
    featured: true
  },
  {
    id: 'event-2',
    title: 'Night of Worship & Intercessory Prayer',
    category: 'Prayer',
    date: 'Friday, September 11, 2026',
    time: '7:30 PM - 10:30 PM',
    location: 'Main Sanctuary',
    description: 'An evening dedicated to unhurried praise, acoustic adoration, and intentional prayers for our families, nation, and local community needs.',
    lead: 'GEM Worship Collective & Prayer Ministry',
    rsvpCount: 142,
    featured: false
  },
  {
    id: 'event-3',
    title: 'GEM Youth "Ignite" Fall Campfire Rally',
    category: 'Youth',
    date: 'Saturday, September 26, 2026',
    time: '4:00 PM - 8:30 PM',
    location: 'Grace Pines Retreat Grounds',
    description: 'High school and college students gather for outdoor games, live band worship around the bonfire, barbecue, and inspiring testimonies of transformation.',
    lead: 'Pastor Marcus Cole',
    rsvpCount: 89,
    featured: true
  },
  {
    id: 'event-4',
    title: 'Community Hope Grocery Pantry Distribution',
    category: 'Community',
    date: 'Saturday, September 12, 2026',
    time: '9:00 AM - 1:00 PM',
    location: 'East Wing Community Center',
    description: 'Distributing fresh produce, non-perishable pantry items, and hot meals to over 250 local families in need. Volunteers warmly welcome!',
    lead: 'Deaconess Rebecca Lewis',
    rsvpCount: 65,
    featured: false
  },
  {
    id: 'event-5',
    title: 'New Believers & Water Baptism Class',
    category: 'Bible Study',
    date: 'Sunday, September 13, 2026',
    time: '1:00 PM - 2:30 PM',
    location: 'Discipleship Room 204',
    description: 'Learn the foundational truths of your new life in Christ, the spiritual significance of water baptism, and steps to grow in your walk.',
    lead: 'Elder Thomas Martinez',
    rsvpCount: 28,
    featured: false
  }
];

export const INITIAL_DEVOTIONALS: Devotional[] = [
  {
    id: 'dev-1',
    title: 'More Than Conquerors Through His Love',
    scriptureReference: 'Romans 8:37-39',
    scriptureVerse: '“No, in all these things we are more than conquerors through him who loved us. For I am convinced that neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.”',
    reflection: 'Notice the apostle Paul does not say we avoid troubles, hardships, or trials. Rather, he boldly declares that in the very midst of all these things, we are more than conquerors. Our victory is not earned through self-reliance, but received through Christ’s unshakeable love. Whatever battle you face today, remember that God’s presence is your ultimate victory.',
    prayer: 'Lord Jesus, thank You that Your love is an unbreakable anchor for my soul. When anxiety or trials whisper doubt, remind me that nothing can separate me from Your steadfast presence. Give me the faith to walk boldly in Your peace today. Amen.',
    date: 'Today • September 4, 2026',
    author: 'Rev. Dr. Michael Don Bosco',
    theme: 'Victory & Security'
  },
  {
    id: 'dev-2',
    title: 'Renewed Strength for Weary Hearts',
    scriptureReference: 'Isaiah 40:29-31',
    scriptureVerse: '“He gives strength to the weary and increases the power of the weak... those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.”',
    reflection: 'Human energy has limits, but God’s strength is inexhaustible. When we wait upon Him in quiet trust, He exchanges our human frailty for His divine stamina.',
    prayer: 'Heavenly Father, I confess I cannot walk this journey on my own stamina. I place my trust in You. Renew my joy and grant me wings of faith to rise above daily pressure. Amen.',
    date: 'Yesterday • September 3, 2026',
    author: 'Pastor Sarah Bosco',
    theme: 'Rest & Renewal'
  }
];

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'pray-1',
    author: 'Miriam K.',
    isAnonymous: false,
    category: 'Healing',
    content: 'Please lift up my mother Clara in prayer as she undergoes heart valve surgery this coming Tuesday. Praying for the surgeon’s hands, zero complications, and complete restoration.',
    timestamp: '2 hours ago',
    prayersCount: 47,
    hasPrayed: false,
    isAnswered: false
  },
  {
    id: 'pray-2',
    author: 'Anonymous Sister',
    isAnonymous: true,
    category: 'Faith & Guidance',
    content: 'Seeking God’s wisdom on a major career decision. I want to be right where the Lord desires me to serve and shine His light, not just chasing financial gain.',
    timestamp: '5 hours ago',
    prayersCount: 32,
    hasPrayed: true,
    isAnswered: false
  },
  {
    id: 'pray-3',
    author: 'The Hernandez Family',
    isAnonymous: false,
    category: 'Thanksgiving',
    content: 'Praise report! After 8 months of seeking employment, our son Gabriel received an offer at a Christian non-profit organization! God answered our GEM prayer chain faithfully!',
    timestamp: '1 day ago',
    prayersCount: 89,
    hasPrayed: true,
    isAnswered: true,
    answeredTestimony: 'Praise God! The Lord opened the exact door our family was praying for!'
  },
  {
    id: 'pray-4',
    author: 'David & Hannah',
    isAnonymous: false,
    category: 'Family',
    content: 'Praying for unity and reconciliation in our extended family before the holidays. Trusting the Holy Spirit to soften hearts and remove bitterness.',
    timestamp: '2 days ago',
    prayersCount: 28,
    hasPrayed: false,
    isAnswered: false
  }
];

export const MINISTRIES: Ministry[] = [
  {
    id: 'min-1',
    name: 'GEM Youth & Young Adults',
    category: 'Next Generation',
    tagline: 'Equipping teenagers and young adults to stand bold for Christ.',
    leader: 'Pastor Marcus Cole',
    meetingTime: 'Every Friday at 7:30 PM',
    location: 'Youth Center & Lounge',
    description: 'A vibrant community designed for high schoolers, college students, and young professionals to explore Scripture, build authentic friendships, and engage in high-impact outreach.',
    keyHighlights: ['Weekly Dynamic Worship Nights', 'Life Group Circles', 'Summer Camp & Mission Trips', 'Leadership Mentorship'],
    contactEmail: 'youth@gemchurch.org'
  },
  {
    id: 'min-2',
    name: 'GEM Worship & Creative Arts',
    category: 'Worship Arts',
    tagline: 'Leading the congregation into the presence of God through praise.',
    leader: 'Minister Joy Patterson',
    meetingTime: 'Rehearsals Thursdays at 7:00 PM',
    location: 'Main Sanctuary',
    description: 'Musicians, vocalists, audio engineers, broadcast operators, and lighting technicians serving together to create an environment where God’s presence transforms lives.',
    keyHighlights: ['Vocal Ensemble & Band', 'Audio/Visual Production Crew', 'Choir & Seasonal Musicals', 'Songwriting Guild'],
    contactEmail: 'worship@gemchurch.org'
  },
  {
    id: 'min-3',
    name: 'GEM Kids Academy',
    category: 'Children',
    tagline: 'Guiding precious little hearts to love Jesus deeply.',
    leader: 'Sister Grace O’Connor',
    meetingTime: 'Sundays during all main services',
    location: 'Children’s Wing (Safe Check-in)',
    description: 'Age-graded Sunday school, animated Bible storytelling, praise action songs, and secure childcare providing children from birth through 5th grade a joyful faith foundation.',
    keyHighlights: ['Secure Digital Check-in/Check-out', 'Biblically Rooted Curriculum', 'Annual VBS Summer Camp', 'Parent Dedication Milestones'],
    contactEmail: 'kids@gemchurch.org'
  },
  {
    id: 'min-4',
    name: 'Men of Valor & Purpose',
    category: 'Men',
    tagline: 'Iron sharpening iron for godly leadership in home and marketplace.',
    leader: 'Elder Robert Chen',
    meetingTime: '1st & 3rd Saturday at 8:00 AM (Breakfast)',
    location: 'Fellowship Hall',
    description: 'Men gathering for candid fellowship, breakfast, accountability, and practical teachings on marriage, fatherhood, career integrity, and spiritual warfare.',
    keyHighlights: ['Monthly Men’s Breakfast', 'Accountability Pods', 'Hands-On Community Service', 'Annual Retreat'],
    contactEmail: 'men@gemchurch.org'
  },
  {
    id: 'min-5',
    name: 'Women of Grace & Elegance',
    category: 'Women',
    tagline: 'Empowering women in every season through prayer and sisterhood.',
    leader: 'Pastor Sarah Bosco',
    meetingTime: '2nd Tuesday at 7:00 PM',
    location: 'Prayer Hall & Virtual Zoom',
    description: 'Fostering deep biblical sisterhood where women uplift one another in prayer, mentor younger generations, and walk in grace and holy distinction.',
    keyHighlights: ['Quarterly Tea & Testimony Nights', 'Moms in Prayer Network', 'Mentorship Program', 'Annual Women’s Summit'],
    contactEmail: 'women@gemchurch.org'
  },
  {
    id: 'min-6',
    name: 'Glorious Evangelical Missions',
    category: 'Missions & Outreach',
    tagline: 'Reaching the unreached across India, Nepal, and Bhutan.',
    leader: 'Rev. L. Navaratnam (Founder)',
    meetingTime: 'Monthly Mission Prayer Watch',
    location: 'Mission Center, Tuticorin',
    description: 'Founded in March 1994 by Rev. L. Navaratnam after surrendering to full-time ministry. Longing to serve in unreached remote places, God fulfilled his desire to work among Nepalis and beyond. Actively ministering across Tuticorin, Nepal, Bhutan, Darjeeling, Siliguri, Punjab, Andhra Pradesh, Orissa, and Bangalore.',
    keyHighlights: ['Missions in Nepal, Bhutan, Darjeeling & Siliguri', 'Caring for Widows & Orphans (James 1:27)', 'Church Planting in Unreached Areas', 'Tuticorin Evangelistic Rallies'],
    contactEmail: 'missions@gemchurchtuty.org'
  }
];

export const GIVING_FUNDS: GivingFund[] = [
  {
    id: 'fund-tithe',
    title: 'General Tithes & Sunday Offerings',
    description: 'Supports weekly Sunday worship, ministry operations, pastoral care, and sanctuary upkeep in Tuticorin.',
    isPopular: true
  },
  {
    id: 'fund-missions',
    title: 'Mission Fields Fund (Nepal, Bhutan & India)',
    description: 'Directly supports native evangelists, church planters, and gospel workers in Nepal, Bhutan, Darjeeling, Siliguri, Punjab, Andhra Pradesh, and Orissa.',
    isPopular: true,
    targetGoal: 100000,
    raisedAmount: 76500
  },
  {
    id: 'fund-orphans-widows',
    title: 'Orphans & Widows Mercy Care (James 1:27)',
    description: 'Pure and undefiled religion before God: providing food, medicine, and support to orphans and widows in distress.',
    isPopular: false,
    targetGoal: 50000,
    raisedAmount: 41200
  },
  {
    id: 'fund-building',
    title: 'Tuticorin Sanctuary & Mission Hub',
    description: 'Upgrading the main sanctuary, audio/visual live streaming facilities, and accommodation for visiting mission evangelists.',
    isPopular: false,
    targetGoal: 200000,
    raisedAmount: 145000
  }
];

export const MISSION_FIELDS: import('../types').MissionField[] = [
  {
    id: 'nepal',
    name: 'Nepal Himalayan Mission',
    region: 'Kathmandu, Pokhara & Terai Border',
    country: 'Nepal',
    photoUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    leadMissionary: 'Pastor Ramesh Thapa & GEM Native Workers',
    establishedYear: '1996',
    tagline: 'Bringing the Light of Christ across the valleys and mountain heights of Nepal.',
    overview: 'In 1994, after Rev. L. Navaratnam surrendered to full-time ministry with a deep burden for the unreached, God miraculously opened the doors to minister among Nepalis. Today, GEM supports native evangelists, builds fellowship halls in rural mountain hamlets, and conducts leadership Bible training.',
    churchesCount: 14,
    believersReached: '2,800+',
    keyProjects: [
      'Native Church Planter Sponsorship',
      'Winter Blanket & Food Relief for Mountain Believers',
      'Nepali Bible & Gospel Tract Distribution',
      'Children Sunday Schools in 8 Districts'
    ],
    prayerNeeds: [
      'Protection for local evangelists in remote hill villages',
      'Provision for church building roofs against heavy monsoon rains',
      'Spiritual harvest among youth and students in Kathmandu'
    ],
    urgentNeed: 'Support 5 native evangelists with monthly living stipend ($120/mo)',
    recentReport: {
      date: 'August 2026',
      title: '38 Souls Baptized in Pokhara Valley',
      summary: 'A 3-day gospel retreat in the hills led to 38 believers taking water baptism. Village elders who had opposed the Gospel opened their homes for weekly prayer meetings.'
    }
  },
  {
    id: 'bhutan',
    name: 'Bhutan Cross-Border Fellowship',
    region: 'Border Foothills & Underground Home Cells',
    country: 'Bhutan',
    photoUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
    leadMissionary: 'Brother Tshering & Border Evangelism Cell',
    establishedYear: '2001',
    tagline: 'Discreet church planting and intercession for the Dragon Kingdom.',
    overview: 'Ministering discreetly across border outposts and quiet home prayer fellowships. GEM trains believers in personal evangelism, provides Scripture materials, and establishes home cells in mountainous districts.',
    churchesCount: 6,
    believersReached: '650+',
    keyProjects: [
      'Secret Scripture Translation & Audio Bibles',
      'Youth Discipleship Gatherings at Border Towns',
      'Benevolence for Families in Need'
    ],
    prayerNeeds: [
      'Freedom of Christian worship and peace for home fellowship leaders',
      'Wisdom for native workers sharing the Gospel one-on-one',
      'Strong spiritual growth for newly converted families'
    ],
    urgentNeed: '200 solar-powered audio Bibles for hill dwellers without electricity',
    recentReport: {
      date: 'July 2026',
      title: 'New Underground Prayer Cell Planted',
      summary: 'Two extended families embraced Christ following prayer for healing. A weekly prayer cell is now meeting in southern Bhutan.'
    }
  },
  {
    id: 'darjeeling-siliguri',
    name: 'Darjeeling & Siliguri Foothills Mission',
    region: 'North Bengal Tea Estates & Hill Communities',
    country: 'India (West Bengal)',
    photoUrl: 'https://images.unsplash.com/photo-1571295982845-a98e82ef45b4?auto=format&fit=crop&w=1200&q=80',
    leadMissionary: 'Pastor Bikash Rai & Team',
    establishedYear: '1998',
    tagline: 'Transforming lives in the mist-covered tea gardens of Darjeeling.',
    overview: 'Reaching tea garden laborer families who live in poverty and lack access to healthcare. GEM Church runs children’s literacy clubs, conducts tea estate gospel meetings, and ministers in Nepali, Hindi, and Bengali.',
    churchesCount: 9,
    believersReached: '1,500+',
    keyProjects: [
      'Tea Estate Workers Children Tuition Centers',
      'Monthly Medical Aid & Health Checks',
      'Youth Worship & Music Training Institute'
    ],
    prayerNeeds: [
      'Better socio-economic stability for tea garden laborer families',
      'A permanent ministry hall in Siliguri junction',
      'Grace and anointing over Pastor Bikash Rai and gospel teams'
    ],
    recentReport: {
      date: 'August 2026',
      title: 'Annual Hill Children Vacation Bible School',
      summary: 'Over 220 children gathered for a 4-day gospel camp in Kurseong. Many memorized Scripture portions and received school supplies.'
    }
  },
  {
    id: 'punjab',
    name: 'Punjab Rural Outreach & Crusades',
    region: 'Amritsar, Jalandhar & Border Villages',
    country: 'India (Punjab)',
    photoUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    leadMissionary: 'Evangelist Gurpreet Singh',
    establishedYear: '2005',
    tagline: 'Miracles, healing rallies, and revival among rural farming hamlets.',
    overview: 'GEM conducts village-level open-air prayer meetings and disciples village youth who have turned away from substance addictions to follow Jesus Christ as Lord and Savior.',
    churchesCount: 11,
    believersReached: '3,200+',
    keyProjects: [
      'Rehabilitation & Spiritual Counseling Centers',
      'Open-Air Village Gospel Crusades',
      'Bicycle provision for rural gospel workers'
    ],
    prayerNeeds: [
      'Deliverance and complete spiritual freedom for youth',
      'Boldness and protection for newly formed rural house churches',
      'Resources for traveling evangelistic sound gear'
    ],
    recentReport: {
      date: 'June 2026',
      title: 'Village Healing Rally in Amritsar District',
      summary: 'Hundreds gathered under a pandal where mighty prayers were offered for the sick. Over 50 souls testified of supernatural healing and accepted Jesus.'
    }
  },
  {
    id: 'andhra-odisha',
    name: 'Andhra & Odisha Tribal Agency Mission',
    region: 'Eastern Ghats Tribal Hamlets & Agency Tracts',
    country: 'India (AP & Odisha)',
    photoUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    leadMissionary: 'Pastor Samuel Kora & Tribal Workers',
    establishedYear: '2008',
    tagline: 'Living water and eternal life for remote tribal communities.',
    overview: 'Reaching forest hamlets where roads and clean water do not reach. GEM provides borewells for drinking water ("Living Water Wells") combined with the saving message of Christ.',
    churchesCount: 8,
    believersReached: '1,900+',
    keyProjects: [
      'Gospel Borewells for Clean Drinking Water',
      'Tribal Children Nutrition & Clothing Distribution',
      'Grass-roof Church Construction'
    ],
    prayerNeeds: [
      'Physical safety during travel through dense forest terrains',
      'Funds for 3 new borewells in water-scarce hamlets ($900 each)',
      'Spiritual breakthroughs against ancestral animistic bondage'
    ],
    urgentNeed: '1 Gospel Borewell urgently needed in Koraput tribal colony',
    recentReport: {
      date: 'July 2026',
      title: 'New Borewell Dedicated in Malkangiri',
      summary: 'A clean drinking borewell was inaugurated with prayers. The entire village rejoiced and listened intently to the Gospel of John 4.'
    }
  },
  {
    id: 'tuticorin-mercy',
    name: 'Tuticorin Sanctuary & Mercy Outreaches',
    region: '7V/6B SundaravelPuram & Coastal Tuticorin',
    country: 'India (Tamil Nadu)',
    photoUrl: 'https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=1200&q=80',
    leadMissionary: 'Rev. L. Navaratnam (Senior Pastor)',
    establishedYear: '1994',
    tagline: 'Pure religion: Caring for orphans and widows in their distress (James 1:27).',
    overview: 'The heartbeat and home base of Glorious Evangelical Ministries. Aside from weekly worship and live broadcasts, GEM Church regularly cares for widows, provides educational support to fatherless children, and coordinates national missions.',
    churchesCount: 1,
    believersReached: '4,500+ Local & Online',
    keyProjects: [
      'Monthly Rice & Provisions for 85+ Widows',
      'Orphan Education Scholarship Fund',
      'Daily 24/7 Phone Prayer Line & Counseling',
      'Sunday School & GEM Youth Discipleship Army'
    ],
    prayerNeeds: [
      'Wisdom, health, and divine strength for Rev. L. Navaratnam',
      'Sanctuary expansion to accommodate growing Sunday worshipers',
      'Blessing upon every GEM family and believer'
    ]
  }
];

// Believer Birthday and Wedding Anniversary directory
// We include entries matching today's date dynamically as well as around the year
const currentNow = new Date();
const currentMonth = currentNow.getMonth() + 1;
const currentDay = currentNow.getDate();

export const INITIAL_CELEBRATIONS: import('../types').BelieverCelebration[] = [
  {
    id: 'cel-today-1',
    name: 'Bro. David Navamani',
    type: 'birthday',
    month: currentMonth,
    day: currentDay,
    year: 1988,
    phone: '+91 99943 01540',
    area: 'SundaravelPuram, Tuticorin',
    notes: 'Sunday School Teacher & GEM Youth Leader',
    wishesCount: 18,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'cel-today-2',
    name: 'Bro. Samuel & Sis. Esther Rathnam',
    type: 'anniversary',
    month: currentMonth,
    day: currentDay,
    year: 2012,
    phone: '+91 99946 45090',
    area: 'Millerpuram, Tuticorin',
    spouseName: 'Esther Rathnam',
    notes: '14th Wedding Anniversary • Sanctuary Ushering Ministry',
    wishesCount: 24,
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'cel-upcoming-1',
    name: 'Sis. Mary Jemima',
    type: 'birthday',
    month: currentMonth,
    day: ((currentDay % 28) + 1),
    year: 1995,
    phone: '+91 98421 11223',
    area: 'Bryant Nagar, Tuticorin',
    notes: 'GEM Choir & Worship Team Soprano',
    wishesCount: 9,
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'cel-upcoming-2',
    name: 'Bro. Jebaraj & Sis. Deborah',
    type: 'anniversary',
    month: currentMonth,
    day: ((currentDay % 28) + 3),
    year: 2016,
    phone: '+91 94431 88990',
    area: 'Cruzpuram, Tuticorin',
    spouseName: 'Deborah Jebaraj',
    notes: '10th Wedding Anniversary • Media & Sound Ministry',
    wishesCount: 12,
    photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'cel-upcoming-3',
    name: 'Pastor Ramesh Thapa',
    type: 'birthday',
    month: currentMonth,
    day: ((currentDay % 28) + 5),
    year: 1980,
    phone: '+977 98412 34567',
    area: 'Kathmandu Field, Nepal',
    notes: 'GEM Nepal Mission Coordinator & Pioneer',
    wishesCount: 31,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'cel-upcoming-4',
    name: 'Sis. Kanimozhi Selvan',
    type: 'birthday',
    month: (currentMonth % 12) + 1,
    day: 12,
    year: 2001,
    phone: '+91 97890 55443',
    area: 'SundaravelPuram, Tuticorin',
    notes: 'Sunday School Volunteer & College Student',
    wishesCount: 7,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'cel-upcoming-5',
    name: 'Bro. Paul & Sis. Grace Navaratnam',
    type: 'anniversary',
    month: (currentMonth % 12) + 1,
    day: 18,
    year: 1999,
    phone: '+91 99943 01540',
    area: 'Tuticorin Sanctuary Family',
    spouseName: 'Grace Navaratnam',
    notes: '27 Years of Marriage & Ministry Together',
    wishesCount: 45,
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80'
  }
];
