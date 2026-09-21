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
  Filter,
  Navigation
} from 'lucide-react';

const WATERMARK_BG = 'https://lh3.googleusercontent.com/d/1zDyvSX5_C0CECa0j-AatUy9JWDeGsev_';

const DEFAULT_GIFTS = [
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
  const [activeTab, setActiveTab] = useState('rsvp'); 

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
    pixKeyGlobal: '12814531700',Para te dar a melhor sugestão, de qual projeto ou texto especificamente você gostaria de ver mais melhorias?
