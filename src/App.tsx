Search, 
QrCode, 
ExternalLink,
  HelpCircle,
  FileSpreadsheet,
Check,
Sparkles,
  Settings,
  Link2,
  CheckCircle2,
Crown,
  Palmtree,
  Flower2,
  Image as ImageIcon
  MessageCircle,
  Filter
} from 'lucide-react';


// Background watermarked illustration
const WATERMARK_BG = 'https://lh3.googleusercontent.com/d/1zDyvSX5_C0CECa0j-AatUy9JWDeGsev_';

@@ -151,11 +144,10 @@ const DEFAULT_GIFTS = [
}
];


export default function App() {
const [activeTab, setActiveTab] = useState('rsvp'); 

  const [partyInfo, setPartyInfo] = useState({
  const [partyInfo] = useState({
titleLine1: 'O Reino da Jade',
titleLine2: '3º Aniversário da Nossa Leoazinha',
subtitle: 'Hakuna Matata! Celebração de 3 Anos no Reino da Selva',
@@ -165,19 +157,26 @@ export default function App() {
locationText: 'Aquarela Casa de Festa - R. Cel. Rodrigues, 92 – Lj – Centro – São Gonçalo – RJ',
pixKeyGlobal: '12814531700',
googleFormUrl: 'https://forms.gle/NYeD5nE7ruerHPMi6',
    headerBgUrl: WATERMARK_BG
    headerBgUrl: WATERMARK_BG,
    whatsappContact: '5521999999999' // Substitua pelo número real se desejar
  });

  const [gifts, setGifts] = useState(() => {
    const saved = localStorage.getItem('jade_gifts_reserved');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_GIFTS; }
    }
    return DEFAULT_GIFTS.map(g => ({ ...g, reservedBy: null }));
});

  const [gifts] = useState(DEFAULT_GIFTS);
const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedPriceRange, setSelectedPriceRange] = useState('todos');
const [searchQuery, setSearchQuery] = useState('');

const [selectedGift, setSelectedGift] = useState(null);
const [guestName, setGuestName] = useState('');
const [giftSuccessMsg, setGiftSuccessMsg] = useState(false);
const [copiedPix, setCopiedPix] = useState(false);

  const [showConfigModal, setShowConfigModal] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);

// Exact party countdown target: October 17, 2026 at 13:00
@@ -204,14 +203,20 @@ export default function App() {
return () => clearInterval(timer);
}, []);

  useEffect(() => {
    localStorage.setItem('jade_gifts_reserved', JSON.stringify(gifts));
  }, [gifts]);

const triggerConfetti = () => {
setShowConfetti(true);
setTimeout(() => setShowConfetti(false), 3500);
};

const handleReserveGift = (e) => {
e.preventDefault();
    if (!guestName.trim()) return;
    if (!guestName.trim() || !selectedGift) return;

    setGifts(prev => prev.map(g => g.id === selectedGift.id ? { ...g, reservedBy: guestName.trim() } : g));
setGiftSuccessMsg(true);
triggerConfetti();
};
@@ -228,9 +233,14 @@ export default function App() {
const filteredGifts = gifts.filter(gift => {
const matchesCategory = selectedCategory === 'Todas' || gift.category === selectedCategory;
const matchesSearch = gift.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
    
    let matchesPrice = true;
    if (selectedPriceRange === 'ate50') matchesPrice = gift.price <= 50;
    else if (selectedPriceRange === '50a150') matchesPrice = gift.price > 50 && gift.price <= 150;
    else if (selectedPriceRange === 'acimade150') matchesPrice = gift.price > 150;

    return matchesCategory && matchesSearch && matchesPrice;
  });

return (
<div className="min-h-screen bg-rose-50/40 text-stone-800 font-sans relative pb-20 selection:bg-pink-200 selection:text-pink-900">
@@ -269,9 +279,8 @@ export default function App() {
</div>
)}

      {/* HEADER BANNER - TRANSLÚCIDO PARA EXPÔR O PLANO DE FUNDO */}
      {/* HEADER BANNER */}
<header className="relative text-stone-900 overflow-hidden shadow-sm bg-pink-100/30 backdrop-blur-xs min-h-[500px] flex items-center justify-center border-b border-pink-200/50 py-12 px-4 z-10">
        
<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
<div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-pink-300 text-pink-700 font-extrabold text-xs uppercase tracking-wider mb-4 shadow-sm">
<Crown className="w-4 h-4 text-pink-600" />
@@ -289,9 +298,8 @@ export default function App() {
{partyInfo.welcomeMsg}
</p>

          {/* HIGH CONTRAST EVENT DETAILS BOX */}
          {/* EVENT DETAILS BOX */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto bg-stone-900/95 backdrop-blur-md p-5 rounded-2xl border-2 border-emerald-500 text-left mb-8 shadow-2xl text-white">
            
<div className="flex items-center gap-3">
<div className="p-3 bg-pink-600 rounded-2xl text-white shrink-0 shadow-md">
<Calendar className="w-6 h-6" />
@@ -321,7 +329,6 @@ export default function App() {
<p className="font-extrabold text-white text-xs sm:text-sm leading-snug">{partyInfo.locationText}</p>
</div>
</div>

</div>

{/* Countdown Timer */}
@@ -347,16 +354,12 @@ export default function App() {
))}
</div>
</div>

</div>
</header>


{/* NAVIGATION TABS */}
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
<div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-2 border border-pink-200 flex flex-wrap gap-1 max-w-xl mx-auto">
          
          {/* BOTÃO 1: Confirme sua Presença */}
<button
onClick={() => setActiveTab('rsvp')}
className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all ${
@@ -369,7 +372,6 @@ export default function App() {
Confirme sua Presença
</button>

          {/* BOTÃO 2: Lista de Presentes */}
<button
onClick={() => setActiveTab('gifts')}
className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all ${
@@ -381,13 +383,12 @@ export default function App() {
<Gift className="w-4 h-4 text-pink-200" />
Lista de Presentes
</button>
          
</div>
</div>

<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">

        {/* SECTION 1: RSVP WITH GOOGLE FORM */}
        {/* SECTION 1: RSVP */}
{activeTab === 'rsvp' && (
<div className="space-y-6 animate-fadeIn">
<div className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200 shadow-xl overflow-hidden">
@@ -396,7 +397,6 @@ export default function App() {
<Crown className="w-4 h-4 text-pink-600" />
<span>Formulário Oficial de Presença (Leoazinha 3 Anos)</span>
</div>

<a
href={partyInfo.googleFormUrl}
target="_blank"
@@ -423,8 +423,6 @@ export default function App() {
{/* SECTION 2: GIFTS LIST */}
{activeTab === 'gifts' && (
<div className="space-y-8 animate-fadeIn">
            
            {/* Mensagem de Aviso Carinhoso */}
<div className="bg-pink-100/90 border-2 border-pink-300 p-4 rounded-2xl text-center mb-6 shadow-sm max-w-3xl mx-auto">
<p className="text-xs sm:text-sm font-bold text-pink-950 leading-relaxed">
💡 <span className="underline">Observação:</span> "🦁 Sua presença é o nosso maior presente! Montamos esta lista apenas como uma sugestão para ajudar quem pediu ideias. Fiquem totalmente à vontade para escolher outro presente ou apenas sua presença no dia da festa."
@@ -460,10 +458,19 @@ export default function App() {
))}
</div>

              {/* Simplified Price Filter */}
              <div className="w-full md:w-auto px-4 py-2.5 bg-pink-100/80 border border-pink-300 rounded-xl text-xs font-black text-pink-950 flex items-center justify-center gap-2 shadow-sm">
                <Gift className="w-4 h-4 text-pink-600" />
                <span>Todos os Valores</span>
              {/* Functional Price Filter */}
              <div className="w-full md:w-auto flex items-center gap-2">
                <Filter className="w-4 h-4 text-pink-600 shrink-0" />
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full md:w-auto px-4 py-2.5 bg-pink-50 border border-pink-300 rounded-xl text-xs font-black text-pink-950 focus:outline-none focus:ring-2 focus:ring-pink-500/30 shadow-sm"
                >
                  <option value="todos">Todos os Valores</option>
                  <option value="ate50">Até R$ 50</option>
                  <option value="50a150">R$ 51 a R$ 150</option>
                  <option value="acimade150">Acima de R$ 150</option>
                </select>
</div>
</div>

@@ -472,7 +479,9 @@ export default function App() {
{filteredGifts.map((gift) => (
<div
key={gift.id}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-pink-200 hover:border-pink-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  className={`bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    gift.reservedBy ? 'border-amber-300 bg-amber-50/20' : 'border-pink-200 hover:border-pink-400 hover:shadow-2xl hover:-translate-y-1'
                  }`}
>
<div>
<div className="relative h-48 overflow-hidden bg-pink-100/50">
@@ -484,15 +493,27 @@ export default function App() {
<span className="absolute top-3 left-3 bg-emerald-950/90 text-pink-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-pink-300/30">
{gift.category}
</span>
                      {gift.reservedBy && (
                        <span className="absolute top-3 right-3 bg-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                          Reservado
                        </span>
                      )}
</div>

<div className="p-5">
<h3 className="font-extrabold text-stone-900 text-base mb-2 line-clamp-2">
{gift.title}
</h3>
                      <p className="text-2xl font-black text-rose-600 mb-4 font-mono">
                      <p className="text-2xl font-black text-rose-600 mb-2 font-mono">
R$ {gift.price.toFixed(2)}
</p>
                      {gift.reservedBy ? (
                        <p className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200">
                          ❤️ Reservado por: <strong>{gift.reservedBy}</strong>
                        </p>
                      ) : (
                        <p className="text-xs text-stone-500 font-medium">Disponível para escolha</p>
                      )}
</div>
</div>

@@ -503,27 +524,39 @@ export default function App() {
setGiftSuccessMsg(false);
setGuestName('');
}}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-600 via-rose-600 to-emerald-700 hover:from-pink-700 hover:to-emerald-800 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition"
                      className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition ${
                        gift.reservedBy 
                          ? 'bg-stone-200 text-stone-600 hover:bg-stone-300' 
                          : 'bg-gradient-to-r from-pink-600 via-rose-600 to-emerald-700 hover:from-pink-700 hover:to-emerald-800 text-white'
                      }`}
>
                      <Heart className="w-4 h-4 fill-white" />
                      Presentear / PIX
                      <Heart className={`w-4 h-4 ${gift.reservedBy ? '' : 'fill-white'}`} />
                      {gift.reservedBy ? 'Ver Detalhes / Alterar' : 'Presentear / PIX'}
</button>
</div>
</div>
))}
</div>

</div>
)}

</main>

      {/* WhatsApp Quick Floating Button */}
      <a
        href={`https://wa.me/${partyInfo.whatsappContact}?text=Olá! Vim pelo site do aniversário da Jade e gostaria de tirar uma dúvida.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        title="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>

{/* Gift Modal */}
{selectedGift && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-md p-4 animate-fadeIn">
<div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden border border-pink-200">
            
<button
onClick={() => setSelectedGift(null)}
className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full bg-stone-100"
@@ -574,7 +607,7 @@ export default function App() {
</div>
</div>

                  {/* Physical Gift / Reservation Option */}
                  {/* Reservation Form */}
<form onSubmit={handleReserveGift} className="space-y-4">
<div>
<label className="block text-xs font-bold text-stone-700 mb-1">
@@ -617,7 +650,6 @@ export default function App() {
</button>
</div>
)}

</div>
</div>
)}
