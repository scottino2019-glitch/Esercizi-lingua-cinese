export interface Exercise {
  type: 'listening' | 'zh-it' | 'it-zh' | 'sentence-building';
  chinese: string;
  pinyin: string;
  italian: string;
  options?: string[];
  scrambled?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: Exercise['type'];
}

export const CATEGORIES: Category[] = [
  {
    id: 'ascolto',
    name: 'Ascolto',
    icon: '🎧',
    type: 'listening'
  },
  {
    id: 'zh-it',
    name: 'Cinese ➔ Italiano',
    icon: '🇮🇹',
    type: 'zh-it'
  },
  {
    id: 'it-zh',
    name: 'Italiano ➔ Cinese',
    icon: '🇨🇳',
    type: 'it-zh'
  },
  {
    id: 'costruzione',
    name: 'Costruzione Frasi',
    icon: '🧩',
    type: 'sentence-building'
  }
];

export const ALL_EXERCISES: Exercise[] = [
  // Listening
  {
    type: 'listening',
    chinese: '你好',
    pinyin: 'nǐ hǎo',
    italian: 'ciao / buongiorno',
    options: ['你好', '谢谢', '再见', '不客气']
  },
  {
    type: 'listening',
    chinese: '再见',
    pinyin: 'zàijiàn',
    italian: 'arrivederci',
    options: ['你好', '再见', '对不起', '没关系']
  },
  {
    type: 'listening',
    chinese: '图书馆',
    pinyin: 'túshūguǎn',
    italian: 'biblioteca',
    options: ['图书馆', '电影院', '火车站', '飞机场']
  },
  {
    type: 'listening',
    chinese: '谢谢',
    pinyin: 'xièxiè',
    italian: 'grazie',
    options: ['谢谢', '你好', '再见', '不客气']
  },
  {
    type: 'listening',
    chinese: '北京',
    pinyin: 'Běijīng',
    italian: 'Pechino',
    options: ['北京', '上海', '广州', '西安']
  },
  {
    type: 'listening',
    chinese: '苹果',
    pinyin: 'píngguǒ',
    italian: 'mela',
    options: ['苹果', '香蕉', '西瓜', '葡萄']
  },
  {
    type: 'listening',
    chinese: '咖啡',
    pinyin: 'kāfēi',
    italian: 'caffè',
    options: ['咖啡', '茶', '牛奶', '果汁']
  },
  {
    type: 'listening',
    chinese: '老师',
    pinyin: 'lǎoshī',
    italian: 'insegnante',
    options: ['老师', '学生', '医生', '司机']
  },
  {
    type: 'listening',
    chinese: '学生',
    pinyin: 'xuésheng',
    italian: 'studente',
    options: ['学生', '老师', '警察', '厨师']
  },
  
  // zh-it
  {
    type: 'zh-it',
    chinese: '我爱你',
    pinyin: 'wǒ ài nǐ',
    italian: 'ti amo'
  },
  {
    type: 'zh-it',
    chinese: '今天天气很好',
    pinyin: 'jīntiān tiānqì hěn hǎo',
    italian: 'oggi il tempo è molto bello'
  },
  {
    type: 'zh-it',
    chinese: '我喜欢吃中国菜',
    pinyin: 'wǒ xǐhuān chī zhōngguó cài',
    italian: 'mi piace mangiare cibo cinese'
  },
  {
    type: 'zh-it',
    chinese: '这是我的爸爸',
    pinyin: 'zhè shì wǒ de bàba',
    italian: 'questo è mio papà'
  },
  {
    type: 'zh-it',
    chinese: '我不认识他',
    pinyin: 'wǒ bù rènshi tā',
    italian: 'non lo conosco'
  },
  {
    type: 'zh-it',
    chinese: '他在哪儿？',
    pinyin: 'tā zài nǎr?',
    italian: 'dov\'è lui?'
  },
  {
    type: 'zh-it',
    chinese: '现在几点？',
    pinyin: 'xiànzài jǐ diǎn?',
    italian: 'che ore sono?'
  },
  {
    type: 'zh-it',
    chinese: '我想喝水',
    pinyin: 'wǒ xiǎng hē shuǐ',
    italian: 'voglio bere acqua'
  },
  {
    type: 'zh-it',
    chinese: '这个多少钱？',
    pinyin: 'zhège duōshao qián?',
    italian: 'quanto costa questo?'
  },

  // it-zh
  {
    type: 'it-zh',
    chinese: '谢谢',
    pinyin: 'xièxiè',
    italian: 'grazie'
  },
  {
    type: 'it-zh',
    chinese: '你会说中文吗？',
    pinyin: 'nǐ huì shuō zhōngwén ma?',
    italian: 'sai parlare cinese?'
  },
  {
    type: 'it-zh',
    chinese: '妈妈',
    pinyin: 'māma',
    italian: 'mamma'
  },
  {
    type: 'it-zh',
    chinese: '你好',
    pinyin: 'nǐ hǎo',
    italian: 'ciao'
  },
  {
    type: 'it-zh',
    chinese: '厕所在哪里？',
    pinyin: 'cèsuǒ zài nǎlǐ?',
    italian: 'dov\'è il bagno?'
  },
  {
    type: 'it-zh',
    chinese: '我叫...',
    pinyin: 'wǒ jiào...',
    italian: 'mi chiamo...'
  },
  {
    type: 'it-zh',
    chinese: '很高兴认识你',
    pinyin: 'hěn gāoxìng rènshi nǐ',
    italian: 'piacere di conoscerti'
  },
  {
    type: 'it-zh',
    chinese: '你吃什么？',
    pinyin: 'nǐ chī shénme?',
    italian: 'cosa mangi?'
  },
  {
    type: 'it-zh',
    chinese: '我很累',
    pinyin: 'wǒ hěn lèi',
    italian: 'sono stanco'
  },

  // sentence-building
  {
    type: 'sentence-building',
    chinese: '我是意大利人',
    pinyin: 'wǒ shì yìdàlì rén',
    italian: 'io sono italiano',
    scrambled: ['我', '是', '意大利', '人']
  },
  {
    type: 'sentence-building',
    chinese: '我想去中国旅游',
    pinyin: 'wǒ xiǎng qù zhōngguó lǚyóu',
    italian: 'voglio andare in Cina a viaggiare',
    scrambled: ['我', '想', '去', '中国', '旅游']
  },
  {
    type: 'sentence-building',
    chinese: '我家有四口人',
    pinyin: 'wǒ jiā yǒu sì kǒu rén',
    italian: 'nella mia famiglia ci sono quattro persone',
    scrambled: ['我', '家', '有', '四', '口', '人']
  },
  {
    type: 'sentence-building',
    chinese: '你叫什么名字？',
    pinyin: 'nǐ jiào shénme míngzi?',
    italian: 'come ti chiami?',
    scrambled: ['你', '叫', '什么', '名字']
  },
  {
    type: 'sentence-building',
    chinese: '我喜欢看电影',
    pinyin: 'wǒ xǐhuān kàn diànyǐng',
    italian: 'mi piace guardare film',
    scrambled: ['我', '喜欢', '看', '电影']
  },
  {
    type: 'sentence-building',
    chinese: '他在北京工作',
    pinyin: 'tā zài Běijīng gōngzuò',
    italian: 'lui lavora a Pechino',
    scrambled: ['他', '在', '北京', '工作']
  },
  {
    type: 'sentence-building',
    chinese: '我们去饭店吧',
    pinyin: 'wǒmen qù fàndiàn ba',
    italian: 'andiamo al ristorante',
    scrambled: ['我们', '去', '饭店', '吧']
  },
  {
    type: 'sentence-building',
    chinese: '今天星期五',
    pinyin: 'jīntiān xīngqīwǔ',
    italian: 'oggi è venerdì',
    scrambled: ['今天', '星期五']
  }
];
