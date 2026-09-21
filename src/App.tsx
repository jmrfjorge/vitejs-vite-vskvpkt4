import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  X, 
  Copy, 
  Heart, 
  Search, 
  QrCode, 
  ExternalLink,
  Check,
  Sparkles,
  Crown,
  MessageCircle,
  Filter
} from 'lucide-react';

const WATERMARK_BG = 'https://lh3.googleusercontent.com/d/1zDyvSX5_C0CECa0j-AatUy9JWDeGsev_';

interface GiftItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  pixKey: string;
  reservedBy?: string | null;
}

const DEFAULT_GIFTS: GiftItem[] = [
  {
    id: 1,
    title: 'Livro de Colorir & Histórias "O Rei Leão"',
    category: 'Livros & Arte',
    price: 35,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 2,
    title: 'Kit de Massinhas & Forminhas da Selva',
    category: 'Brinquedos Educativos',
    price: 45,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 3,
    title: 'Livro Sonoro Contos da Selva',
    category: 'Livros & Arte',
    price: 55,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 4,
    title: 'Quebra-Cabeça Gigante Infantil de Madeira',
    category: 'Jogos & Quebra-Cabeças',
    price: 65,
    image: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 5,
    title: 'Kit Pintura com Tela, Pincéis e Tintas Laváveis',
    category: 'Livros & Arte',
    price: 80,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 6,
    title: 'Jogo de Chá Infantil Delicado Safari',
    category: 'Faz de Conta',
    price: 95,
    image: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 7,
    title: 'Vestidinho de Festa Mágica Rosa & Floral (Tam 3)',
    category: 'Vestuário',
    price: 120,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 8,
    title: 'Blocos de Montar Didáticos Educativos',
    category: 'Brinquedos Educativos',
    price: 140,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 9,
    title: 'Cozinha de Brinquedo Infantil Completa',
    category: 'Faz de Conta',
    price: 180,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 10,
    title: 'Pelúcia Gigante Leoazinha Antialérgica',
    category: 'Pelúcias',
    price: 220,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 11,
    title: 'Patinete 3 Rodas com Luzes LED e Capacete',
    category: 'Esporte & Ar Livre',
    price: 280,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 12,
    title: 'Mercadinho Infantil com Acessórios',
    category: 'Faz de Conta',
    price: 330,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 13,
    title: 'Triciclo Infantil Passeio com Empurrador Rosa',
    category: 'Esporte & Ar Livre',
    price: 390,
    image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 14,
    title: 'Mini Playground de Atividades e Escorregador',
    category: 'Esporte & Ar Livre',
    price: 450,
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  },
  {
    id: 15,
    title: 'Contribuição Especial / Vale Presente Mimo de Aniversário',
    category: 'Experiências',
    price: 500,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400',
    pixKey: '12814531700'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'rsvp' | 'gifts'>('rsvp'); 

  const [partyInfo] = useState({
    titleLine1: 'O Reino da Jade',
    titleLine2: '3º Aniversário da Nossa Leoazinha',
    subtitle: 'Hakuna Matata! Celebração de 3 Anos no Reino da Selva',
    welcomeMsg: 'Sua presença é o nosso maior presente! Venha celebrar o 3º aninho da nossa leoazinha no Reino da Selva Encantada. Hakuna Matata!',
    dateText: 'Sábado, 17 de Outubro de 2026',
    timeText: 'A partir das 13:00',
    locationText: 'Aquarela Casa de Festa - R. Cel. Rodrigues, 92 – Lj – Centro – São Gonçalo – RJ',
    mapsUrl: 'https://maps.google.com/?q=Aquarela+Casa+de+Festa+R.+Cel.+Rodrigues,+92+Centro+São+Gonçalo+RJ',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Anivers%C3%A1rio+de+3+Anos+da+Jade&dates=20261017T160000Z/20261017T210000Z&details=Celebra%C3%A7%C3%A3o+de+3+Anos+da+Jade+no+Reino+da+Selva!&location=Aquarela+Casa+de+Festa+-+R.+Cel.+Rodrigues,+92+%E2%80%93+Lj+%E2%80%93+Centro+%E2%80%93+S%C3%A3o+Gon%C3%A7alo+%E2%80%93+RJ',
    pixKeyGlobal: '12814531700',
    googleFormUrl: 'https://forms.gle/NYeD5nE7ruerHPMi6',
    headerBgUrl: WATERMARK_BG,
    whatsappContact: '5521987600882'
  });

  const [gifts, setGifts] = useState<GiftItem[]>(() => {
    const saved = localStorage.getItem('jade_gifts_reserved');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_GIFTS; }
    }
    return DEFAULT_GIFTS;
  });

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedPriceRange, setSelectedPriceRange] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [guestName, setGuestName] = useState('');
  const [giftSuccessMsg, setGiftSuccessMsg] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const partyDate = new Date('2026-10-17T13:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = partyDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('jade_gifts_reserved', JSON.stringify(gifts));
  }, [gifts]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  const handleReserveGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !selectedGift) return;

    setGifts(prev => prev.map(g => g.id === selectedGift.id ? { ...g, reservedBy: guestName.trim() } : g));
    setGiftSuccessMsg(true);
    triggerConfetti();
  };

  const copyPixCode = (code?: string) => {
    const textToCopy = code || partyInfo.pixKeyGlobal;
    navigator.clipboard.writeText(textToCopy);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const categories = ['Todas', ...Array.from(new Set(gifts.map(g => g.category)))];

  const filteredGifts = gifts.filter(gift => {
    const matchesCategory = selectedCategory === 'Todas' || gift.category === selectedCategory;
    const matchesSearch = gift.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (selectedPriceRange === 'ate50') matchesPrice = gift.price <= 50;
    else if (selectedPriceRange === '50a150') matchesPrice = gift.price > 50 && gift.price <= 150;
    else if (selectedPriceRange === 'acimade150') matchesPrice = gift.price > 150;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // URL para imagem estática do QR Code da Chave PIX
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${partyInfo.pixKeyGlobal}`;

  return (
    <div className="min-h-screen bg-rose-50/40 text-stone-800 font-sans relative pb-20 selection:bg-pink-200 selection:text-pink-900">
      
      {/* GLOBAL WATERMARK BACKGROUND */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-cover bg-center bg-no-repeat bg-fixed filter saturate-120"
        style={{ backgroundImage: `url('${partyInfo.headerBgUrl}')` }}
      />

      {/* CONFETTI ANIMATION */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 50 }).map((_, i) => {
              const colors = ['bg-pink-400', 'bg-rose-300', 'bg-emerald-500', 'bg-lime-400', 'bg-pink-300', 'bg-emerald-700'];
              const color = colors[i % colors.length];
              const left = `${Math.random() * 100}%`;
              return (
                <div
                  key={i}
                  className={`absolute rounded-full animate-bounce ${color}`}
                  style={{
                    left,
                    top: '-20px',
                    width: `${10 + Math.random() * 12}px`,
                    height: `${10 + Math.random() * 12}px`,
                    animationDuration: `${1.5 + Math.random() * 2}s`,
                    animationDelay: `${Math.random()
