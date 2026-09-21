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
    category: 'Brinquedos EducativosAs melhorias e novidades de um serviço ou sistema podem ser disponibilizadas de formas diferentes em cada plataforma, sendo comum que certas funções — como a leitura e geração de QR Codes Pix — cheguem primeiro ou fiquem restritas aos aplicativos móveis devido ao uso da câmera do celular.

Se você está buscando o QR Code ou a opção de transacionar via Pix no computador e ela não aparece na tela, as causas mais comuns costumam ser:

* **Integração restrita ao App:** Alguns bancos e plataformas limitam a leitura de QR Code e certas operações financeiras ao aplicativo para smartphone por razões de segurança e autenticação biométrica.
* **Menu ou Localização Diferente:** No navegador desktop, a opção de Pix às vezes fica alocada em um menu específico de pagamentos ou transferências, diferente da interface do aplicativo.
* **Suporte à Leitura de Código:** Caso a plataforma permita ler um QR Code pelo computador, isso geralmente depende do envio do arquivo da imagem ou da autorização de uso da webcam.

Para saber exatamente onde encontrar a funcionalidade no computador ou se trata de uma limitação da versão desktop, vale verificar a qual plataforma, site ou aplicativo você está se referindo.
