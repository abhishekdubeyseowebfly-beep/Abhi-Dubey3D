import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ja';

export interface Translations {
  nav: {
    about: string;
    skills: string;
    projects: string;
    education: string;
    contact: string;
    preview: string;
    downloadResume: string;
    portfolioView: string;
    templeView: string;
    sakura: string;
    soundOn: string;
    soundOff: string;
    weather: {
      label: string;
      sakura: string;
      rain: string;
      snow: string;
      mist: string;
      clear: string;
    };
  };
  hero: {
    statusTag: string;
    statusText: string;
    eyebrow: string;
    name: string;
    titlePrefix: string;
    titleWeb: string;
    titleAnd: string;
    titleSoftware: string;
    location: string;
    careerObjectiveTitle: string;
    careerObjectiveBody: string;
    verifiedText: string;
    mcaTag: string;
    downloadPdf: string;
    previewCv: string;
    explore3d: string;
    pillars: {
      eduTag: string;
      eduTitle: string;
      eduDesc: string;
      undergradTag: string;
      undergradTitle: string;
      undergradDesc: string;
      langsTag: string;
      langsTitle: string;
      langsDesc: string;
      certTag: string;
      certTitle: string;
      certDesc: string;
    };
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    tabs: {
      all: string;
      languages: string;
      web: string;
      core: string;
      tools: string;
    };
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    viewDetails: string;
    closeProject: string;
    overviewTitle: string;
    highlightsTitle: string;
  };
  education: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    academicTitle: string;
    certTitle: string;
    scholasticTitle: string;
    verifiedTag: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    directChannels: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    socialLabel: string;
    calloutTitle: string;
    calloutDesc: string;
    formTitle: string;
    fastResponse: string;
    nameLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sentSuccess: string;
    quoteText: string;
    footerCopyright: string;
  };
  modal: {
    title: string;
    subtitle: string;
    downloadBtn: string;
    rawPdfBtn: string;
    closeBtn: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
      preview: 'Preview',
      downloadResume: 'Download Resume (PDF)',
      portfolioView: 'Portfolio',
      templeView: '3D World (Abhishek Dubey)',
      sakura: 'Sakura',
      soundOn: 'Sound: ON',
      soundOff: 'Sound: Muted',
      weather: {
        label: 'Weather',
        sakura: 'Sakura Petals',
        rain: 'Temple Rain',
        snow: 'Falling Snow',
        mist: 'Sacred Mist',
        clear: 'Clear Sky',
      },
    },
    hero: {
      statusTag: 'STATUS //',
      statusText: 'Open to Opportunities • MCA Candidate',
      eyebrow: 'DEVELOPER PORTFOLIO · ABHISHEK DUBEY',
      name: 'ABHISHEK DUBEY',
      titlePrefix: 'Aspiring',
      titleWeb: 'Web Developer',
      titleAnd: '&',
      titleSoftware: 'Software Developer',
      location: 'Delhi, Uttar Pradesh',
      careerObjectiveTitle: 'Career Objective',
      careerObjectiveBody:
        'MCA student with a strong foundation in Java, Python, Data Structures & Algorithms, and Web Development (HTML, CSS, JavaScript). Seeking a Web Developer / Software Developer role to apply problem-solving skills, build scalable applications, and contribute to real-world engineering teams.',
      verifiedText: 'Verified academic credentials & production-focused projects',
      mcaTag: 'MCA 2025–2027 · IMSEC',
      downloadPdf: 'Download Official Resume (PDF)',
      previewCv: 'Preview CV',
      explore3d: 'Explore 3D World',
      pillars: {
        eduTag: 'Education',
        eduTitle: 'MCA (2025–2027)',
        eduDesc: 'IMSEC Ghaziabad',
        undergradTag: 'Undergrad',
        undergradTitle: 'BCA (CGPA: 6.8)',
        undergradDesc: 'DAVV Indore (Grade A Project)',
        langsTag: 'Core Languages',
        langsTitle: 'Java, Python, C++, JS',
        langsDesc: 'DSA & OOP Foundations',
        certTag: 'Certification',
        certTitle: 'Meta Front-End Cert',
        certDesc: 'Coursera + IBM SkillsBuild',
      },
    },
    skills: {
      eyebrow: '01 // TECHNICAL MATRIX',
      title: 'Skills & Engineering Stack',
      subtitle:
        'Grounded in rigorous computer science principles, object-oriented systems, and modern responsive web development.',
      badge: 'CORE COMPUTING',
      tabs: {
        all: 'All Disciplines',
        languages: 'Languages',
        web: 'Web Tech',
        core: 'Core CS',
        tools: 'Tools & DB',
      },
    },
    projects: {
      eyebrow: '02 // ARCHIVE OF WORK',
      title: 'Featured Projects & Engineering Work',
      subtitle:
        'From BCA Capstone hospital architectures and OOP banking ledgers to cybersecurity threat monitoring and retail intelligence.',
      badge: '5 PRODUCTION ARCHITECTURES',
      viewDetails: 'View Details',
      closeProject: 'Close Project',
      overviewTitle: 'Overview',
      highlightsTitle: 'Technical Highlights & Defense Records',
    },
    education: {
      eyebrow: '03 // ACADEMIC & CERTIFIED FOUNDATIONS',
      title: 'Education & Certifications',
      subtitle:
        'Pursuing advanced Master of Computer Applications with established foundational degrees and industry-recognized certifications.',
      badge: 'MCA · IMSEC GHAZIABAD',
      academicTitle: 'Academic Progression',
      certTitle: 'Verified Certifications',
      scholasticTitle: 'Scholastic Highlights',
      verifiedTag: 'VERIFIED',
    },
    contact: {
      eyebrow: '04 // INITIATE TRANSMISSION',
      title: 'Get In Touch',
      subtitle:
        'Open for software developer roles, engineering internships, and collaborative web projects. Reach out via email, phone, or message below.',
      badge: 'FAST TRANSMISSION',
      directChannels: 'Direct Channels',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      locationLabel: 'Current Location',
      socialLabel: 'Profiles & Repositories',
      calloutTitle: 'Official Resume Document',
      calloutDesc:
        "Grab Abhishek Dubey's updated verified resume with complete academic records, project defense grades, and technical stack details.",
      formTitle: 'Send a Direct Message',
      fastResponse: 'FAST RESPONSE',
      nameLabel: 'Your Name',
      namePlaceholder: 'Recruiter / Collaborator Name',
      emailPlaceholder: 'name@company.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Job Opportunity / Project Collaboration',
      messageLabel: 'Message',
      messagePlaceholder: 'Share details about the role, technical requirements, or inquiry...',
      sendButton: 'Send Message to Abhishek',
      sentSuccess: 'Opening your email client to dispatch the message directly to dubeyabhi9794@gmail.com!',
      quoteText: '"Continuous learning and dedication to building scalable software." — Abhishek Dubey',
      footerCopyright: '© 2026 Abhishek Dubey. All Rights Reserved by Abhishek Dubey.',
    },
    modal: {
      title: 'Abhishek Dubey — Curriculum Vitae',
      subtitle: 'Official PDF Document & Verified Record',
      downloadBtn: 'Download PDF',
      rawPdfBtn: 'Open Raw PDF',
      closeBtn: 'Close',
    },
  },
  ja: {
    nav: {
      about: '自己紹介',
      skills: '技術',
      projects: '実績',
      education: '学歴',
      contact: '連絡先',
      preview: 'プレビュー',
      downloadResume: '履歴書保存 (PDF)',
      portfolioView: 'ポートフォリオ',
      templeView: '3D空間 (アビシェック・ドゥベイ)',
      sakura: '桜の舞',
      soundOn: '音響: 有効',
      soundOff: '音響: 消音',
      weather: {
        label: '気象演出',
        sakura: '桜吹雪',
        rain: '時雨 (雨)',
        snow: '深雪 (雪)',
        mist: '朝霧 (霧)',
        clear: '快晴 (オフ)',
      },
    },
    hero: {
      statusTag: '状況 //',
      statusText: '求職中・採用受付中 • MCA大学院生',
      eyebrow: '開発者ポートフォリオ · アビシェック・ドゥベイ',
      name: 'アビシェック・ドゥベイ',
      titlePrefix: '',
      titleWeb: 'Webエンジニア',
      titleAnd: '・',
      titleSoftware: 'ソフトウェア開発者',
      location: 'インド・デリー / ウッタル・プラデーシュ州',
      careerObjectiveTitle: '志望動機・目標',
      careerObjectiveBody:
        'Java、Python、データ構造とアルゴリズム（DSA）、およびWeb開発（HTML、CSS、JavaScript）の強固な基盤を持つMCA大学院生。問題解決力を発揮し、拡張性の高いシステムを構築して実世界のエンジニアリングチームに貢献できるWeb・ソフトウェア開発のポジションを希望しています。',
      verifiedText: '学術資格・本番指向プロジェクト検証済み',
      mcaTag: 'MCA 2025–2027 · IMSEC工科大学',
      downloadPdf: '公式履歴書（PDF）を保存',
      previewCv: '履歴書をプレビュー',
      explore3d: '3D空間を探索',
      pillars: {
        eduTag: '大学院',
        eduTitle: 'MCA (2025–2027)',
        eduDesc: 'IMSEC ガーズィヤーバード',
        undergradTag: '学部卒',
        undergradTitle: 'BCA (CGPA: 6.8)',
        undergradDesc: 'DAVV インドール (A判定作品)',
        langsTag: '主言語',
        langsTitle: 'Java, Python, C++, JS',
        langsDesc: 'DSA & OOP の基礎',
        certTag: '認定資格',
        certTitle: 'Meta フロントエンド認定',
        certDesc: 'Coursera + IBM SkillsBuild',
      },
    },
    skills: {
      eyebrow: '01 // 技術領域',
      title: '技術スタックと専門領域',
      subtitle:
        '厳格なコンピュータサイエンスの理論、オブジェクト指向設計、および最新のレスポンシブWeb開発に基づいています。',
      badge: '計算機科学基盤',
      tabs: {
        all: '全分野',
        languages: 'プログラミング言語',
        web: 'Web技術',
        core: 'CS基礎概念',
        tools: 'ツール & DB',
      },
    },
    projects: {
      eyebrow: '02 // 制作・開発実績',
      title: '主要プロジェクトと開発実績',
      subtitle:
        'BCA卒業制作の病院管理システムから、Javaによる銀行勘定系、侵入検知システム、UIクローン、データ分析まで。',
      badge: '5つの実証システム',
      viewDetails: '詳細を見る',
      closeProject: '閉じる',
      overviewTitle: '概要',
      highlightsTitle: '技術的ハイライトと審査実績',
    },
    education: {
      eyebrow: '03 // 学歴・保有資格',
      title: '学歴と公式認定資格',
      subtitle:
        '確固たる計算機科学の学士号と国際的な認定資格を基礎とし、最新のMCA大学院課程に在籍中。',
      badge: 'MCA · IMSEC大学院',
      academicTitle: '学歴の推移',
      certTitle: '検証済み認定証',
      scholasticTitle: '学術実績ハイライト',
      verifiedTag: '認定済',
    },
    contact: {
      eyebrow: '04 // 連絡・通信',
      title: 'お問い合わせ',
      subtitle:
        'ソフトウェアエンジニア職、インターンシップ、共同開発のご相談を随時受け付けています。メールやお電話等でお気軽にご連絡ください。',
      badge: '即時対応',
      directChannels: '直接連絡先',
      emailLabel: 'メールアドレス',
      phoneLabel: '電話 / WhatsApp',
      locationLabel: '居住地',
      socialLabel: 'GitHub & LinkedIn',
      calloutTitle: '公式履歴書ドキュメント',
      calloutDesc:
        '学業成績、プロジェクト防衛評価、使用技術スタックの詳細を記載した公式PDF履歴書を入手できます。',
      formTitle: 'ダイレクトメッセージ送信',
      fastResponse: '迅速返信',
      nameLabel: 'お名前',
      namePlaceholder: '採用担当者様 / お名前',
      emailPlaceholder: 'name@company.com',
      subjectLabel: '件名',
      subjectPlaceholder: '採用案件・共同開発について',
      messageLabel: '本文',
      messagePlaceholder: '求人要件、案件概要、メッセージをご記入ください...',
      sendButton: 'アビシェックへ送信',
      sentSuccess: 'メーラーを起動して dubeyabhi9794@gmail.com 宛に送信準備を行います。',
      quoteText: '「継続的な学びと高品質なソフトウェア開発への献身。」— アビシェック・ドゥベイ',
      footerCopyright: '© 2026 Abhishek Dubey. All Rights Reserved by Abhishek Dubey.',
    },
    modal: {
      title: 'アビシェック・ドゥベイ — 履歴書・職務経歴書',
      subtitle: '公式PDFドキュメントおよび認証記録',
      downloadBtn: 'PDFをダウンロード',
      rawPdfBtn: '原本PDFを表示',
      closeBtn: '閉じる',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('abhishek_portfolio_lang') || localStorage.getItem('kage_portfolio_lang');
      if (saved === 'en' || saved === 'ja') return saved;
    } catch {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('abhishek_portfolio_lang', lang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
