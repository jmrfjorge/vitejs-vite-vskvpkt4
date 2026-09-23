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
  Navigation,
  CalendarPlus,
  Filter,
  Send,
  Key
} from 'lucide-react';

// Background watermarked illustration
const WATERMARK_BG = 'https://lh3.googleusercontent.com/d/1zDyvSX5_C0CECa0j-AatUy9JWDeGsev_';

// Lista atualizada com imagens correspondentes a cada presente
const DEFAULT_GIFTS = [
  {
    id: 1,
    title: 'Livro de Colorir & Histórias "O Rei Leão"',
    category: 'Livros & Arte',
    price: 35,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 2,
    title: 'Kit de Massinhas & Forminhas da Selva',
    category: 'Brinquedos Educativos',
    price: 45,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 3,
    title: 'Livro Sonoro Contos da Selva',
    category: 'Livros & Arte',
    price: 55,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 4,
    title: 'Quebra-Cabeça Gigante Infantil de Madeira',
    category: 'Jogos & Quebra-Cabeças',
    price: 65,
    image: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 5,
    title: 'Kit Pintura com Tela, Pincéis e Tintas Laváveis',
    category: 'Livros & Arte',
    price: 80,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 6,
    title: 'Jogo de Chá Infantil Delicado Safari',
    category: 'Faz de Conta',
    price: 95,
    image: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 7,
    title: 'Vestidinho de Festa Mágica Rosa & Floral (Tam 3)',
    category: 'Vestuário',
    price: 120,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 8,
    title: 'Blocos de Montar Didáticos Educativos',
    category: 'Brinquedos Educativos',
    price: 140,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 9,
    title: 'Cozinha de Brinquedo Infantil Completa',
    category: 'Faz de Conta',
    price: 180,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 10,
    title: 'Pelúcia Gigante Leoazinha Antialérgica',
    category: 'Pelúcias',
    price: 220,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 11,
    title: 'Patinete 3 Rodas com Luzes LED e Capacete',
    category: 'Esporte & Ar Livre',
    price: 280,
    image: 'https://images.unsplash.com/photo-1597086058000-0e1c27d4ee09?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 12,
    title: 'Mercadinho Infantil com Acessórios',
    category: 'Faz de Conta',
    price: 330,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 13,
    title: 'Triciclo Infantil Passeio com Empurrador Rosa',
    category: 'Esporte & Ar Livre',
    price: 390,
    image: 'https://images.unsplash.com/photo-1532330393533-443990a51d20?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 14,
    title: 'Mini Playground de Atividades e Escorregador',
    category: 'Esporte & Ar Livre',
    price: 450,
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  },
  {
    id: 15,
    title: 'Contribuição Especial / Vale Presente Mimo de Aniversário',
    category: 'Experiências',
    price: 500,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    pixKey: '12814531700'
  }
];

// Gerador de Payload EMVCo BR Code (Padrão Oficial do Banco Central)
function generatePixPayload(key: string, name: string, city: string, amount: number) {
  const cleanKey = key.replace(/\D/g, '');
  const formattedAmount = amount.toFixed(2);
  
  const merchantAccount = `0014BR.GOV.BCB.PIX01${cleanKey.length.toString().padStart(2, '0')}${cleanKey}`;
  const formattedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 25);
  const formattedCity = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 15);

  let payload = 
    `000201` +
    `26${merchantAccount.length.toString().padStart(2, '0')}${merchantAccount}` +
    `52040000` +
    `5303986` +
    `54${formattedAmount.length.toString().padStart(2, '0')}${formattedAmount}` +
    `5802BR` +
    `59${formattedName.length.toString().padStart(2, '0')}${formattedName}` +
    `60${formattedCity.length.toString().padStart(2, '0')}${formattedCity}` +
    `62070503***6304`;

  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
  }
  const crcHex = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return payload + crcHex;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('rsvp'); 

  const [partyInfo] = useState({
    titleLine1: 'O Reino da Jade',
    titleLine2: '3º Aniversário da Nossa Leoazinha',
    subtitle: 'Hakuna Matata! Celebração de 3 Anos no Reino da Selva',
    welcomeMsg: 'Sua presença é o nosso maior presente! Venha celebrar o 3º aninho da nossa leoazinha no Reino da Selva Encantada. Hakuna Matata!',
    dateText: 'Sábado, 17 de Outubro de 2026',
    timeText: 'A partir das 13:00',
    locationText: 'Aquarela Casa de Festa - R. Cel. Rodrigues, 92 – Centro, São Gonçalo - RJ',
    pixKeyGlobal: '12814531700',
    pixReceiverName: 'JORGE MENDES',
    pixReceiverCity: 'SAO GONCALO',
    googleFormUrl: 'https://forms.gle/NYeD5nE7ruerHPMi6',
    headerBgUrl: WATERMARK_BG,
    whatsappNumber: '5521987600882',
    whatsappMessage: 'Olá! Gostaria de tirar uma dúvida sobre a festa da Jade.'
  });

  const [gifts] = useState(DEFAULT_GIFTS);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedGift, setSelectedGift] = useState<typeof DEFAULT_GIFTS[0] | null>(null);
  const [guestName, setGuestName] = useState('');
  const [giftSuccessMsg, setGiftSuccessMsg] = useState(false);
  
  // Estados independentes para os dois feedbacks de cópia
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedRawKey, setCopiedRawKey] = useState(false);

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

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  const handleReserveGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !selectedGift) return;

    setGiftSuccessMsg(true);
    triggerConfetti();

    const msg = `Olá! Meu nome é *${guestName.trim()}* e escolhi presentear a Jade no seu 3º aninho com: *${selectedGift.title}* (R$ ${selectedGift.price.toFixed(2)}). 🦁✨`;
    const giftWhatsappUrl = `https://wa.me/${partyInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(giftWhatsappUrl, '_blank');
    }, 1200);
  };

  // Método 1: Copiar código PIX Copia e Cola completo (EMVCo)
  const copyPixPayload = (code: string, amount: number) => {
    const pixPayload = generatePixPayload(
      code, 
      partyInfo.pixReceiverName, 
      partyInfo.pixReceiverCity, 
      amount
    );

    navigator.clipboard.writeText(pixPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 3000);
  };

  // Método 2: Copiar apenas a chave PIX num do telefone/CPF
  const copyRawPixKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedRawKey(true);
    setTimeout(() => setCopiedRawKey(false), 3000);
  };

  const categories = ['Todas', ...Array.from(new Set(gifts.map(g => g.category)))];

  const filteredGifts = gifts.filter(gift => {
    const matchesCategory = selectedCategory === 'Todas' || gift.category === selectedCategory;
    const matchesSearch = gift.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter === 'under50') matchesPrice = gift.price <= 50;
    else if (priceFilter === '50to150') matchesPrice = gift.price > 50 && gift.price <= 150;
    else if (priceFilter === 'above150') matchesPrice = gift.price > 150;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const whatsappLink = `https://wa.me/${partyInfo.whatsappNumber}?text=${encodeURIComponent(partyInfo.whatsappMessage)}`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partyInfo.locationText)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(partyInfo.locationText)}&navigate=yes`;
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("3º Aniversário da Jade - O Reino da Leoazinha")}&dates=20261017T160000Z/20261017T210000Z&details=${encodeURIComponent("Venha celebrar o 3º aninho da nossa leoazinha no Reino da Selva Encantada!")}&location=${encodeURIComponent(partyInfo.locationText)}`;

  return (
    <div className="min-h-screen bg-rose-50/40 text-stone-800 font-sans relative pb-20 selection:bg-pink-200 selection:text-pink-900">
      
      {/* GLOBAL WATERMARK BACKGROUND IMAGE */}
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
                    animationDelay: `${Math.random() * 0.5}s`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* HEADER BANNER */}
      <header className="relative text-stone-900 overflow-hidden shadow-sm bg-pink-100/30 backdrop-blur-xs min-h-[500px] flex items-center justify-center border-b border-pink-200/50 py-12 px-4 z-10">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-pink-300 text-pink-700 font-extrabold text-xs uppercase tracking-wider mb-4 shadow-sm">
            <Crown className="w-4 h-4 text-pink-600" />
            {partyInfo.subtitle}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight mb-4 drop-shadow-sm font-serif">
            <span className="block">{partyInfo.titleLine1}</span>
            <span className="block text-xl sm:text-3xl md:text-4xl text-pink-900 font-sans font-extrabold mt-2">
              • {partyInfo.titleLine2}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-800 max-w-2xl mx-auto font-semibold leading-relaxed mb-8 bg-white/80 backdrop-blur-md p-4.5 rounded-2xl border border-pink-200 shadow-sm">
            {partyInfo.welcomeMsg}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto bg-stone-900/95 backdrop-blur-md p-5 rounded-2xl border-2 border-emerald-500 text-left mb-6 shadow-2xl text-white">
            <div className="flex flex-col justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-600 rounded-2xl text-white shrink-0 shadow-md">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-pink-300 font-black">Data da Festa</p>
                  <p className="font-extrabold text-white text-sm sm:text-base leading-snug">{partyInfo.dateText}</p>
                </div>
              </div>
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-pink-600/80 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                Salvar na Agenda
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-600 rounded-2xl text-white shrink-0 shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-pink-300 font-black">Horário</p>
                <p className="font-extrabold text-white text-sm sm:text-base leading-snug">{partyInfo.timeText}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-600 rounded-2xl text-white shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] uppercase tracking-widest text-pink-300 font-black">Reino da Leoazinha</p>
                  <p className="font-extrabold text-white text-xs sm:text-sm leading-snug">{partyInfo.locationText}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold transition shadow-sm"
                >
                  <Navigation className="w-3 h-3" />
                  Google Maps
                </a>
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-[11px] font-bold transition shadow-sm"
                >
                  <Navigation className="w-3 h-3" />
                  Waze
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-emerald-950 mb-3 font-black flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-600" />
              Contagem Regressiva Para a Grande Festa!
              <Sparkles className="w-4 h-4 text-pink-600" />
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: 'Dias', val: timeLeft.days },
                { label: 'Horas', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Seg', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/95 border-2 border-pink-300 rounded-2xl p-3 text-center backdrop-blur-md shadow-md">
                  <span className="text-2xl sm:text-4xl font-black font-mono text-pink-700 block">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-700 uppercase tracking-wider font-extrabold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-2 border border-pink-200 flex flex-wrap gap-1 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('rsvp')}
            className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all ${
              activeTab === 'rsvp'
                ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-emerald-700 text-white shadow-md'
                : 'text-stone-700 hover:text-pink-900 hover:bg-pink-50'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-pink-200" />
            Confirme sua Presença
          </button>

          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all ${
              activeTab === 'gifts'
                ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-emerald-700 text-white shadow-md'
                : 'text-stone-700 hover:text-pink-900 hover:bg-pink-50'
            }`}
          >
            <Gift className="w-4 h-4 text-pink-200" />
            Lista de Presentes
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">

        {/* SECTION 1: RSVP */}
        {activeTab === 'rsvp' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200 shadow-xl overflow-hidden">
              <div className="p-4 bg-pink-100/80 border-b border-pink-200 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2 text-pink-950 text-xs font-bold">
                  <Crown className="w-4 h-4 text-pink-600" />
                  <span>Formulário Oficial de Presença (Leoazinha 3 Anos)</span>
                </div>

                <a
                  href={partyInfo.googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pink-700 hover:underline flex items-center gap-1 font-bold"
                >
                  Abrir em nova aba <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full h-[750px] relative bg-stone-100 overflow-y-auto touch-pan-y">
                <iframe
                  src={partyInfo.googleFormUrl}
                  className="w-full h-full border-0"
                  title="Google Forms RSVP Leoazinha 3 Anos"
                >
                  Carregando formulário...
                </iframe>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: GIFTS LIST */}
        {activeTab === 'gifts' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-pink-100/90 border-2 border-pink-300 p-4 rounded-2xl text-center mb-6 shadow-sm max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm font-bold text-pink-950 leading-relaxed">
                💡 <span className="underline">Observação:</span> "🦁 Sua presença é o nosso maior presente! Montamos esta lista apenas como uma sugestão para ajudar quem pediu ideias. Fiquem totalmente à vontade para escolher outro presente ou apenas sua presença no dia da festa."
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-pink-200 shadow-md flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar presente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-pink-50/50 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-pink-100 hover:text-pink-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-auto flex items-center gap-2 bg-pink-50/80 border border-pink-200 px-3 py-1.5 rounded-xl">
                <Filter className="w-4 h-4 text-pink-600 shrink-0" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="bg-transparent text-xs font-bold text-pink-950 focus:outline-none cursor-pointer"
                >
                  <option value="all">Todos os Valores</option>
                  <option value="under50">Até R$ 50</option>
                  <option value="50to150">R$ 51 a R$ 150</option>
                  <option value="above150">Acima de R$ 150</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGifts.length > 0 ? (
                filteredGifts.map((gift) => (
                  <div
                    key={gift.id}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-pink-200 hover:border-pink-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-pink-100/50">
                        <img
                          src={gift.image}
                          alt={gift.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400';
                          }}
                        />
                        <span className="absolute top-3 left-3 bg-emerald-950/90 text-pink-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-pink-300/30">
                          {gift.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="font-extrabold text-stone-900 text-base mb-2 line-clamp-2">
                          {gift.title}
                        </h3>
                        <p className="text-2xl font-black text-rose-600 mb-4 font-mono">
                          R$ {gift.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => {
                          setSelectedGift(gift);
                          setGiftSuccessMsg(false);
                          setGuestName('');
                          setCopiedPayload(false);
                          setCopiedRawKey(false);
                        }}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-600 via-rose-600 to-emerald-700 hover:from-pink-700 hover:to-emerald-800 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        Presentear / PIX
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white/80 rounded-3xl border border-pink-200">
                  <p className="text-stone-600 font-bold">Nenhum presente encontrado para estes filtros.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Gift Modal */}
      {selectedGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden border border-pink-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedGift(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!giftSuccessMsg ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedGift.image}
                    alt={selectedGift.title}
                    className="w-20 h-20 object-cover rounded-2xl border border-pink-200"
                  />
                  <div>
                    <span className="text-[10px] font-black text-pink-900 bg-pink-100 px-2.5 py-1 rounded-full uppercase">
                      {selectedGift.category}
                    </span>
                    <h3 className="font-bold text-stone-900 text-lg mt-1 line-clamp-1">
                      {selectedGift.title}
                    </h3>
                    <p className="text-xl font-black text-rose-600 font-mono">
                      R$ {selectedGift.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-pink-50/80 border-2 border-pink-300 rounded-2xl p-4 text-center">
                    <h4 className="font-extrabold text-pink-950 text-sm flex items-center justify-center gap-2 mb-3">
                      <QrCode className="w-4 h-4 text-pink-700" />
                      Pagamento via PIX (QR Code & Códigos)
                    </h4>

                    {/* QR CODE DINÂMICO */}
                    <div className="bg-white p-3 rounded-2xl border border-pink-200 inline-block mb-4 shadow-sm">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                          generatePixPayload(
                            selectedGift.pixKey,
                            partyInfo.pixReceiverName,
                            partyInfo.pixReceiverCity,
                            selectedGift.price
                          )
                        )}`} 
                        alt="QR Code PIX Válido"
                        className="w-36 h-36 mx-auto rounded-lg"
                      />
                    </div>

                    {/* OPÇÃO 2 IMPLEMENTADA: DOIS BOTÕES CLAROS E SEPARADOS */}
                    <div className="space-y-2.5">
                      {/* BOTÃO A: COPIAR PIX COPIA E COLA COMPLETO */}
                      <button
                        onClick={() => copyPixPayload(selectedGift.pixKey, selectedGift.price)}
                        className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition shadow-sm"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedPayload ? '✅ PIX Copia e Cola Copiado!' : '📋 Copiar PIX Copia e Cola (Valor Exato)'}
                      </button>

                      {/* BOTÃO B: COPIAR APENAS A CHAVE SECA (CPF/TELEFONE) */}
                      <button
                        onClick={() => copyRawPixKey(selectedGift.pixKey)}
                        className="w-full py-2.5 px-4 bg-white hover:bg-pink-100 text-pink-950 border border-pink-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                      >
                        <Key className="w-3.5 h-3.5 text-pink-700" />
                        {copiedRawKey ? '✅ Chave Copiada!' : `🔑 Copiar Apenas a Chave (${selectedGift.pixKey})`}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleReserveGift} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Insira seu nome para o cartão"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full p-3 bg-pink-50/40 border border-pink-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-500/30 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-rose-600 hover:from-emerald-700 hover:to-rose-700 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition"
                    >
                      <Send className="w-4 h-4" />
                      Confirmar Escolha e Avisar pelo WhatsApp
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 mb-2">Hakuna Matata! Muito Obrigada!</h3>
                <p className="text-sm text-stone-600 mb-4">
                  Registramos seu carinho para o presente <strong>"{selectedGift.title}"</strong>!
                </p>
                <p className="text-xs text-emerald-800 font-bold bg-emerald-50 p-3 rounded-xl mb-6 border border-emerald-200">
                  📲 Redirecionando para abrir o WhatsApp com a mensagem do presente...
                </p>
                <button
                  onClick={() => setSelectedGift(null)}
                  className="px-6 py-3 bg-pink-600 text-white font-bold text-xs rounded-xl hover:bg-pink-700 transition"
                >
                  Fechar Janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-110 active:scale-95 group border-2 border-white/50"
      >
        <MessageCircle className="w-6 h-6 fill-white stroke-emerald-500" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-extrabold pr-0 group-hover:pr-2">
          Falar Conosco
        </span>
      </a>

    </div>
  );
}
