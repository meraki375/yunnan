import { TripDay, Destination, PhotoSpot, CityWeather, TOTAL_DISTANCE, MAX_ALTITUDE } from './trip';
import type { HotelExtended } from './trip';

export type { HotelExtended };
export { TOTAL_DISTANCE, MAX_ALTITUDE };

const pendingHotel = (name: string, location: string) => ({
  name, location, oxygen: false, price: '—', rating: 0, tags: ['未预订'],
});

export const tripDays: TripDay[] = [
  {
    day: 'Day 1', date: '9月25日', from: '深圳', to: '玉林', distance: '约460km', duration: '6–7h',
    route: ['深圳', '广州', '梧州', '玉林'], highlights: ['中秋家宴', '家人团圆', '赏月'],
    hotel: { name: '家中团圆 🏠', location: '玉林·家里', oxygen: false, price: '—', rating: 5, tags: ['已确认', '中秋团圆'] },
    weather: { temp: '28°C', condition: '晴', altitude: '80m' },
    schedule: [
      { time: '08:00', activity: '深圳出发，向玉林驶去', type: 'morning' },
      { time: '12:00', activity: '服务区午餐与短暂休整', type: 'midday' },
      { time: '15:30', activity: '抵达玉林，回家和家人团圆', type: 'afternoon' },
      { time: '18:30', activity: '中秋家宴与赏月 🌕', type: 'evening' },
    ],
    attractions: [{ name: '中秋家宴', description: '这一天的重点不是赶景点，而是回到家人身边，好好吃一顿团圆饭。', bestTime: '18:30', photoSpot: '家里的餐桌与月亮', lens: '35mm', image: '' }],
  },
  {
    day: 'Day 2', date: '9月26日', from: '玉林', to: '昆明', distance: '约850km', duration: '10–11h',
    route: ['玉林', '南宁', '百色', '昆明'], highlights: ['长途驾驶', '百色午餐', '昆明夜市'],
    hotel: { name: '昆明曼棠·V酒店（翠湖公园云大医院店）', location: '五华区环城西路53号', oxygen: false, price: '¥298/晚', rating: 0, tags: ['已确认', '1晚', '含双早'] },
    weather: { temp: '22°C', condition: '多云', altitude: '1890m' },
    schedule: [
      { time: '08:30', activity: '玉林出发，进入返滇长途路段', type: 'morning' },
      { time: '12:30', activity: '百色午餐、加油和休整', type: 'midday' },
      { time: '18:30', activity: '抵达昆明，入住曼棠·V酒店', type: 'afternoon' },
      { time: '20:00', activity: '逛昆明夜市，吃一碗热腾腾的米线', type: 'evening' },
    ],
    attractions: [{ name: '昆明夜市', description: '只留一个轻松的夜晚给春城：散步、觅食、尽快休息，为次日去大理蓄力。', bestTime: '20:00', photoSpot: '夜市灯牌与小吃摊', lens: '35mm', image: '' }],
  },
  {
    day: 'Day 3', date: '9月27日', from: '昆明', to: '大理', distance: '约330km', duration: '3.5–4.5h',
    route: ['昆明', '楚雄', '大理'], highlights: ['大理古城', '人民路', '洋人街'],
    hotel: { name: '大理缦山缦海半山艺术民宿', location: '大理·半山', oxygen: false, price: '¥260/晚', rating: 0, tags: ['已确认', '婚纱照', '海景'] },
    weather: { temp: '24°C', condition: '晴', altitude: '1970m' },
    schedule: [
      { time: '08:30', activity: '昆明出发，沿杭瑞高速前往大理', type: 'morning' },
      { time: '12:30', activity: '抵达大理，入住已订民宿', type: 'midday' },
      { time: '15:00', activity: '大理古城、人民路、洋人街慢逛', type: 'afternoon' },
      { time: '19:00', activity: '古城晚餐，早些休息', type: 'evening' },
    ],
    attractions: [{ name: '大理古城', description: '把下午交给石板路与风花雪月，在人民路慢慢走到天黑。', bestTime: '15:00', photoSpot: '人民路转角', lens: '35mm', image: '' }],
  },
  {
    day: 'Day 4', date: '9月28日', from: '大理', to: '大理', distance: '市内行程', duration: '全天',
    route: ['婚纱照', '洱海生态廊道', '龙龛码头', '海东公路'], highlights: ['婚纱照', '洱海环湖', '海东日落'],
    hotel: { name: '大理缦山缦海半山艺术民宿', location: '大理·半山', oxygen: false, price: '¥260/晚', rating: 0, tags: ['已确认', '婚纱照', '海景'] },
    weather: { temp: '23°C', condition: '晴间多云', altitude: '1970m' },
    schedule: [
      { time: '08:00', activity: '婚纱照拍摄', type: 'morning' },
      { time: '13:30', activity: '洱海生态廊道与龙龛码头', type: 'afternoon' },
      { time: '17:30', activity: '海东公路等日落', type: 'evening' },
    ],
    attractions: [{ name: '龙龛码头', description: '湖面、红杉和远山形成大理最有呼吸感的画面。', bestTime: '13:30', photoSpot: '码头栈道', lens: '35mm, 85mm', image: '' }],
  },
  {
    day: 'Day 5', date: '9月29日', from: '大理', to: '大理', distance: '市内行程', duration: '全天',
    route: ['大理', '婚纱照', '洱海'], highlights: ['全天婚纱照', '慢节奏', '大理已订住宿'],
    hotel: { name: '大理缦山缦海半山艺术民宿', location: '大理·半山', oxygen: false, price: '¥260/晚', rating: 0, tags: ['已确认', '婚纱照', '海景'] },
    weather: { temp: '23°C', condition: '晴', altitude: '1970m' },
    schedule: [
      { time: '08:00', activity: '全天婚纱照拍摄', type: 'morning' },
      { time: '13:00', activity: '按光线与状态调整拍摄节奏', type: 'afternoon' },
      { time: '19:00', activity: '整理照片、收拾行李', type: 'evening' },
    ],
    attractions: [{ name: '苍山洱海', description: '不给行程塞满景点，把最好的光线和耐心留给这一天的拍摄。', bestTime: '全天', photoSpot: '按摄影师建议', lens: '24–70mm, 85mm', image: '' }],
  },
  {
    day: 'Day 6', date: '9月30日', from: '大理', to: '香格里拉', distance: '约180km', duration: '3.5–4.5h',
    route: ['大理', '香格里拉', '独克宗古城'], highlights: ['独克宗古城', '藏式晚餐', '转经筒'],
    hotel: { name: '香格里拉·如愿供氧民宿（独克宗古城店）', location: '独克宗古城', oxygen: true, price: '—', rating: 0, tags: ['已确认', '供氧', '第1晚'] },
    weather: { temp: '15°C', condition: '晴', altitude: '3300m' },
    schedule: [
      { time: '09:00', activity: '离开大理，向高原出发', type: 'morning' },
      { time: '13:30', activity: '抵达香格里拉，入住已订住宿', type: 'midday' },
      { time: '16:00', activity: '独克宗古城漫步', type: 'afternoon' },
      { time: '19:00', activity: '藏式晚餐，转动转经筒', type: 'evening' },
    ],
    attractions: [{ name: '独克宗古城', description: '先慢下来适应海拔，在月光城的巷子里感受高原的第一晚。', bestTime: '16:00', photoSpot: '月光广场', lens: '24–70mm', image: '' }],
  },
  {
    day: 'Day 7', date: '10月1日', from: '香格里拉', to: '香格里拉', distance: '市内行程', duration: '全天',
    route: ['松赞林寺', '独克宗古城', '龟山公园'], highlights: ['松赞林寺', '龟山公园', '国庆高原日'],
    hotel: { name: '香格里拉·如愿供氧民宿（独克宗古城店）', location: '独克宗古城', oxygen: true, price: '—', rating: 0, tags: ['已确认', '供氧', '第2晚'] },
    weather: { temp: '14°C', condition: '晴', altitude: '3300m' },
    schedule: [
      { time: '09:00', activity: '松赞林寺参观', type: 'morning' },
      { time: '14:30', activity: '独克宗古城与龟山公园', type: 'afternoon' },
      { time: '19:00', activity: '古城夜色，注意高反与保暖', type: 'evening' },
    ],
    attractions: [{ name: '松赞林寺', description: '金顶与群山相对，是香格里拉最具辨识度的建筑风景。', bestTime: '09:00', photoSpot: '拉姆央措湖畔', lens: '16–35mm, 70–200mm', image: '' }],
  },
  {
    day: 'Day 8', date: '10月2日', from: '香格里拉', to: '香格里拉', distance: '环湖行程', duration: '全天',
    route: ['纳帕海', '伊拉草原', '普达措国家公园'], highlights: ['纳帕海环湖', '伊拉草原', '不赶路'],
    hotel: { name: '阅归 Scenic｜雪山映阁富氧景观酒店', location: '香格里拉·松赞林寺景区店', oxygen: true, price: '¥317/晚', rating: 4.9, tags: ['已确认', '第3晚', '弥散式供氧'] },
    weather: { temp: '14°C', condition: '晴转多云', altitude: '3300m' },
    schedule: [
      { time: '09:30', activity: '纳帕海环湖，穿过伊拉草原', type: 'morning' },
      { time: '14:00', activity: '普达措国家公园（或巴拉格宗）', type: 'afternoon' },
      { time: '18:30', activity: '不赶路，确认第3晚待定住宿', type: 'evening' },
    ],
    attractions: [{ name: '纳帕海环湖', description: '把这一天留白给草甸、风和远山；没有必须打卡的时间表。', bestTime: '15:00', photoSpot: '环湖公路观景处', lens: '24–70mm', image: '' }],
  },
  {
    day: 'Day 9', date: '10月3日', from: '香格里拉', to: '飞来寺', distance: '约180km', duration: '4–5h',
    route: ['香格里拉', '奔子栏', '白马雪山垭口', '飞来寺'], highlights: ['白马雪山', '飞来寺', '梅里日落'],
    hotel: pendingHotel('飞来寺｜住宿未预订', '德钦·飞来寺'),
    weather: { temp: '8°C', condition: '晴，早晚冷', altitude: '3480m' },
    schedule: [
      { time: '08:00', activity: '香格里拉出发，经奔子栏向德钦前进', type: 'morning' },
      { time: '12:00', activity: '白马雪山垭口短暂停留', type: 'midday' },
      { time: '15:30', activity: '抵达飞来寺，入住待定住宿', type: 'afternoon' },
      { time: '17:30', activity: '等待梅里雪山日落', type: 'evening' },
    ],
    attractions: [{ name: '飞来寺观景台', description: '正对卡瓦格博的雪峰，是等待日照金山前最重要的一次踩点。', bestTime: '17:30', photoSpot: '飞来寺观景台', lens: '70–200mm', image: '' }],
  },
  {
    day: 'Day 10', date: '10月4日', from: '飞来寺', to: '飞来寺', distance: '观景行程', duration: '全天',
    route: ['飞来寺', '梅里雪山观景台'], highlights: ['日照金山', '清晨观景', '继续住飞来寺'],
    hotel: pendingHotel('飞来寺｜住宿未预订', '德钦·飞来寺'),
    weather: { temp: '6°C', condition: '晴，清晨严寒', altitude: '3480m' },
    schedule: [
      { time: '05:50', activity: '起床，穿好羽绒服与手套', type: 'morning' },
      { time: '06:20', activity: '观景台等待日照金山', type: 'morning' },
      { time: '09:00', activity: '早餐与补眠，整理拍摄素材', type: 'midday' },
      { time: '16:30', activity: '傍晚再看一次雪山光影', type: 'afternoon' },
    ],
    attractions: [{ name: '日照金山', description: '把清晨全部交给雪山：不追景点，只等第一束阳光抵达卡瓦格博。', bestTime: '06:20', photoSpot: '飞来寺观景台', lens: '70–200mm, 100–400mm', image: '' }],
  },
  {
    day: 'Day 11', date: '10月5日', from: '飞来寺', to: '丽江', distance: '约340km', duration: '6–7h',
    route: ['飞来寺', '德钦', '丽江古城'], highlights: ['丽江古城', '四方街', '酒吧街'],
    hotel: pendingHotel('丽江｜住宿未预订', '丽江古城附近'),
    weather: { temp: '20°C', condition: '晴', altitude: '2400m' },
    schedule: [
      { time: '08:00', activity: '告别梅里雪山，出发前往丽江', type: 'morning' },
      { time: '14:30', activity: '抵达丽江，办理待定住宿', type: 'afternoon' },
      { time: '17:00', activity: '丽江古城、四方街闲逛', type: 'afternoon' },
      { time: '20:00', activity: '酒吧街听歌，别太晚', type: 'evening' },
    ],
    attractions: [{ name: '丽江古城', description: '从雪山回到人间烟火，在石板路和流水声里放松一晚。', bestTime: '17:00', photoSpot: '四方街巷口', lens: '35mm', image: '' }],
  },
  {
    day: 'Day 12', date: '10月6日', from: '丽江', to: '百色', distance: '约900km', duration: '10h',
    route: ['丽江', '昆明', '百色'], highlights: ['超长返程', '分段休息', '百色落脚'],
    hotel: pendingHotel('百色｜住宿未预订', '百色'),
    weather: { temp: '27°C', condition: '晴', altitude: '130m' },
    schedule: [
      { time: '07:00', activity: '丽江出发，开启返程最长驾驶日', type: 'morning' },
      { time: '12:30', activity: '服务区午餐，轮换驾驶', type: 'midday' },
      { time: '18:30', activity: '抵达百色，办理待定住宿', type: 'afternoon' },
      { time: '20:00', activity: '简单补给，早休息', type: 'evening' },
    ],
    attractions: [{ name: '百色落脚', description: '今天的重点是安全抵达。把时间留给休息，给最后一程保留体力。', bestTime: '18:30', photoSpot: '城市夜色', lens: '35mm', image: '' }],
  },
  {
    day: 'Day 13', date: '10月7日', from: '百色', to: '深圳', distance: '约720km', duration: '8h',
    route: ['百色', '玉林', '深圳'], highlights: ['最后一程', '回到深圳', '旅途收束'],
    hotel: { name: '家 🏠', location: '深圳', oxygen: false, price: '¥0', rating: 5, tags: ['已确认', '抵达'] },
    weather: { temp: '30°C', condition: '晴', altitude: '10m' },
    schedule: [
      { time: '08:00', activity: '百色出发，踏上最后一程', type: 'morning' },
      { time: '12:30', activity: '服务区午餐与休整', type: 'midday' },
      { time: '16:30', activity: '抵达深圳，结束十三日旅程 🎉', type: 'afternoon' },
    ],
    attractions: [{ name: '回到深圳', description: '带着中秋的团圆、洱海的风和梅里的晨光，回到日常。', bestTime: '16:30', photoSpot: '到家那一刻', lens: '记忆', image: '' }],
  },
];

export const destinations: Destination[] = [
  { id: 'shenzhen', name: '深圳', subtitle: '出发与归来', description: '从海湾城市出发，十三天后再带着山海回到这里。', duration: '往返', theme: '启程', coordinates: { x: 800, y: 420 }, icon: '🚗', recommendations: ['检查车况', '补齐补给', '安全归来'], images: [] },
  { id: 'yulin', name: '玉林', subtitle: '中秋团圆', description: '第一站回家过中秋；这不是待定住宿，而是一晚踏实的家人团圆。', duration: '1晚', theme: '团圆', coordinates: { x: 680, y: 405 }, icon: '🌕', recommendations: ['家人团圆', '中秋家宴', '赏月'], images: [] },
  { id: 'kunming', name: '昆明', subtitle: '春城一夜已订', description: '抵达后入住曼棠·V酒店，轻松逛一趟夜市，次日再向大理出发。', duration: '1晚', theme: '夜市', coordinates: { x: 390, y: 330 }, icon: '🌃', recommendations: ['昆明夜市', '过桥米线', '早点休息'], images: [] },
  { id: 'dali', name: '大理', subtitle: '婚纱照已订', description: '三晚的拍摄与洱海时光，住宿已经确认。', duration: '3晚', theme: '婚纱照', coordinates: { x: 305, y: 280 }, icon: '💍', recommendations: ['大理古城', '龙龛码头', '海东公路'], images: [] },
  { id: 'shangrila', name: '香格里拉', subtitle: '三晚已确认', description: '三晚高原时光均已落实：前两晚住独克宗附近供氧民宿，第3晚住松赞林寺景区旁的弥散式供氧酒店。', duration: '3晚', theme: '高原', coordinates: { x: 245, y: 155 }, icon: '🏔️', recommendations: ['松赞林寺', '独克宗古城', '纳帕海'], images: [] },
  { id: 'meili', name: '飞来寺·梅里', subtitle: '等待金山', description: '在飞来寺住两晚待定，清晨等候卡瓦格博的日照金山。', duration: '2晚', theme: '日照金山', coordinates: { x: 145, y: 110 }, icon: '🌄', recommendations: ['白马雪山', '飞来寺', '日照金山'], images: [] },
  { id: 'lijiang', name: '丽江', subtitle: '古城一夜', description: '从雪山回到古城，在四方街和灯火里歇一晚。', duration: '1晚', theme: '古城', coordinates: { x: 270, y: 220 }, icon: '🏮', recommendations: ['丽江古城', '四方街', '酒吧街'], images: [] },
  { id: 'baise', name: '百色', subtitle: '返程落脚', description: '返程最长驾驶日的落脚点，酒店尚未预订。', duration: '1晚', theme: '返程', coordinates: { x: 500, y: 375 }, icon: '🛣️', recommendations: ['分段休息', '补给', '早点休息'], images: [] },
];

export const hotelsData: HotelExtended[] = [
  { id: 'home-yulin', name: '玉林·家中团圆', location: '玉林·家里', price: '—', rating: 5, tags: ['中秋团圆', '家人'], reason: ['中秋回家团圆', '无需另订酒店'], distance: [], image: '', oxygen: false, heating: false, parking: true, lat: 22.63, lng: 110.15, confirmed: true, confirmedTags: ['行程已确定', '家中团圆'], city: '玉林' },
  {
    id: 'hotel-dali', name: '大理缦山缦海半山艺术民宿', location: '左岸高地别墅·乐水轩16-31号', price: '¥260/晚', rating: 0,
    tags: ['已确认3晚', '诧寂风', '6居6卫', '一层一房', '全房朝向洱海', '独立卫浴', '24小时热水', '空调', '智能马桶', '密码锁', '投影仪', '浴缸', '慕斯床垫', '羽绒被芯', '一次性浴巾毛巾', '浴缸套', '马桶垫', '拖鞋', '停车场20m', 'A401海筵', 'B401云笺'],
    reason: ['四楼两种海景大露台浴缸大床房：A401海筵、B401云笺，均为1.8×2.0m大床；可看日出、日落与星空。', '停车场距民宿约20m；张家花园、观音塘步行几百米，寂照庵/苍山索道约1.5km，有风小院约1.8km。', '步行1–3分钟可到福十、Dalia、理里白、瑞丰园、三内可颂、周一闭馆书店及周边小酒馆、咖啡店。'],
    distance: [{ landmark: '寂照庵、苍山索道', distance: '约1.5km' }, { landmark: '有风小院', distance: '约1.8km' }, { landmark: '三圣岛、心邸咖啡、洱海生态走廊', distance: '约3km' }, { landmark: '大理古城', distance: '约4–5km' }],
    image: '/images/hotels/dali-manshan-room.jpg', oxygen: false, heating: false, parking: true, lat: 25.59, lng: 100.25,
    confirmed: true, confirmedTags: ['已确认', '3晚', '¥260/晚'], city: '大理',
  },
  { id: 'hotel-shangrila-confirmed', name: '香格里拉·如愿 Family Warm Water Whirlpool 供氧民宿', location: '香格里拉·仁达廊17号', price: '¥694.96 / 2晚', rating: 0, tags: ['已确认2晚', '云起·日衔山大床房', '供氧', '地暖', '智能客控', '戴森吹风机', '星空顶', '1.8m大床', '最多2人'], reason: ['09月30日（周三）至10月02日（周五），共2晚', '11:00后入住 · 12:00前离店', '入住人需携带所有住客身份证件；按订单规则可在入住日14:00前免费取消'], distance: [{ landmark: '独克宗古城', distance: '步行可达' }, { landmark: '转经筒', distance: '500m' }], image: '', oxygen: true, heating: true, parking: true, lat: 27.86, lng: 99.71, confirmed: true, confirmedTags: ['已确认', '2晚', '¥694.96'], city: '香格里拉' },
  {
    id: 'hotel-kunming', name: '昆明曼棠·V酒店（翠湖公园云大医院店）', location: '五华区环城西路53号', price: '¥298/晚', rating: 0,
    tags: ['已确认1晚', '轻奢悦享大床房', '含2份早餐', '1.8m大床', '38㎡', '有窗', '独立洗漱台', '独立空调', '电视投屏', '免费 Wi‑Fi', '24小时热水', '电梯', '行李寄存'],
    reason: ['09月26日入住，09月27日离店，共1晚；14:00后入住 · 12:00前离店。', '轻奢悦享大床房：1.8m大床、38㎡、2–8层，有窗；最多住4人（成人不超过2人）。', '含2份早餐；独立空调、电视投屏、免费 Wi‑Fi、24小时热水与电梯，适合长途抵达后直接休息。'],
    distance: [{ landmark: '翠湖公园', distance: '附近' }, { landmark: '云南大学医院', distance: '附近' }],
    image: '/images/hotels/kunming-mantang-v-exterior.png', oxygen: false, heating: false, parking: false, lat: 25.04, lng: 102.71,
    confirmed: true, confirmedTags: ['已确认', '1晚', '¥298（优惠后）'], city: '昆明',
  },
  { id: 'hotel-shangrila-scenic', name: '阅归 Scenic｜雪山映阁富氧景观酒店（香格里拉松赞林寺景区店）', location: '香格里拉·康珠大道337号', price: '¥317/晚', rating: 4.9, tags: ['第3晚已确认', '2025年开业', '弥散式供氧', '全屋地暖', '落地窗', '雪山景观', '私人停车场', '洗衣房', '健身室', '投影仪', '加湿器', '零压床品', '双人早餐', '18:00前免费取消', '藏族服饰体验', '亲子手工'], reason: ['第三晚已确认', '距香格里拉汽车客运站约2公里，驾车约8分钟', '靠近松赞林寺景区，便于 Day 8 环湖后休整'], distance: [{ landmark: '香格里拉汽车客运站', distance: '约2km / 8分钟车程' }, { landmark: '松赞林寺景区', distance: '驾车可达' }], image: '', oxygen: true, heating: true, parking: true, lat: 27.84, lng: 99.72, confirmed: true, confirmedTags: ['已确认', '第3晚', '¥317'], city: '香格里拉' },
  { id: 'hotel-feilai', name: '飞来寺｜住宿未预订', location: '德钦·飞来寺附近', price: '—', rating: 0, tags: ['2晚', '观景便利'], reason: ['方便清晨看日照金山', '需确认观景与停车条件'], distance: [], image: '', oxygen: false, heating: true, parking: true, lat: 28.45, lng: 98.88, confirmed: false, confirmedTags: ['待预订', '2晚'], city: '梅里雪山' },
  { id: 'hotel-lijiang', name: '丽江｜住宿未预订', location: '丽江古城附近', price: '—', rating: 0, tags: ['1晚', '古城'], reason: ['方便夜逛四方街', '次日长途返程'], distance: [], image: '', oxygen: false, heating: false, parking: true, lat: 26.87, lng: 100.23, confirmed: false, confirmedTags: ['待预订', '1晚'], city: '丽江' },
  { id: 'hotel-baise', name: '百色｜住宿未预订', location: '百色', price: '—', rating: 0, tags: ['1晚', '返程休整'], reason: ['超长驾驶日后休息', '方便最后一程回深圳'], distance: [], image: '', oxygen: false, heating: false, parking: true, lat: 23.90, lng: 106.62, confirmed: false, confirmedTags: ['待预订', '1晚'], city: '百色' },
];

export const photoSpots: PhotoSpot[] = [
  { id: 'photo-01', name: '玉林云天文化城', bestTime: '16:30–18:00', lens: '24–70mm', description: '用广角收下层叠屋檐与金色光线，为中秋团圆留一张有仪式感的开篇。', tips: ['避开正午硬光', '拍建筑时校正垂直线'], image: '/images/destinations/yulin-yuntian.jpg', rating: 4 },
  { id: 'photo-02', name: '斗南花市', bestTime: '傍晚', lens: '35mm, 50mm', description: '抵达昆明的夜晚，用摊位灯光与鲜花色块记录春城的一次短暂停留。', tips: ['优先拍色彩层次', '注意保管器材'], image: '/images/photo-spots/24-dounan-market.jpg', rating: 4 },
  { id: 'photo-03', name: '龙龛码头日出', bestTime: '06:20–07:10', lens: '24–70mm', description: '把栈桥、湖面与远山放进同一层次；第一束光出现前就完成构图。', tips: ['提前30分钟到位', '准备保暖外套'], image: '/images/photo-spots/01-longkan-dawn.webp', rating: 5 },
  { id: 'photo-04', name: '龙龛码头婚纱晨光', bestTime: '06:30–07:30', lens: '35mm, 85mm', description: '日出逆光适合拍轮廓和人物互动，给婚纱照保留大面积湖面留白。', tips: ['人物站位远离栏杆', '使用点测光保护高光'], image: '/images/photo-spots/02-longkan-sunrise.jpg', rating: 5 },
  { id: 'photo-05', name: '龙龛红杉与水岸', bestTime: '07:00–08:00', lens: '70–200mm', description: '利用红杉、水鸟和远山压缩画面，拍出洱海清晨的纵深。', tips: ['长焦压缩远山', '不要进入生态保护水域'], image: '/images/photo-spots/03-longkan-redwoods.jpg', rating: 4 },
  { id: 'photo-06', name: '洱海生态廊道俯瞰', bestTime: '15:30–17:30', lens: '24–70mm', description: '从高处寻找岸线弧度与湖面层次，把生态廊道拍成一条舒缓的引导线。', tips: ['逆光时加遮光罩', '注意无人机禁飞提示'], image: '/images/photo-spots/04-longkan-aerial.jpg', rating: 4 },
  { id: 'photo-07', name: '喜洲麦田', bestTime: '16:00–18:00', lens: '24–70mm, 50mm', description: '白族民居、田野和苍山同框，是大理最有田园感的婚纱照补充机位。', tips: ['不要踩踏农田', '浅色服装更上镜'], image: '/images/photo-spots/06-xizhou-wheat.jpg', rating: 5 },
  { id: 'photo-08', name: '喜洲金色田野', bestTime: '日落前1小时', lens: '70–200mm', description: '用长焦截取稻田、村落和山脊，把秋天的颜色压进画面。', tips: ['留意收割期变化', '使用长焦减少杂乱元素'], image: '/images/photo-spots/08-xizhou-golden.jpg', rating: 4 },
  { id: 'photo-09', name: '喜洲白族村落', bestTime: '上午', lens: '35mm', description: '在田野边拍白墙灰瓦与巷道生活感，适合低饱和纪实风格。', tips: ['尊重当地住户', '避开正门与私宅近拍'], image: '/images/photo-spots/09-xizhou-fields.jpg', rating: 4 },
  { id: 'photo-10', name: '松赞林寺倒影', bestTime: '08:30–10:00', lens: '16–35mm, 70–200mm', description: '寺院、湖面和金顶的倒影是最完整的建筑风景，要等湖面足够安静。', tips: ['顺时针参观', '勿在殿内拍摄'], image: '/images/photo-spots/10-songzanlin-reflection.jpg', rating: 5 },
  { id: 'photo-11', name: '松赞林寺山谷全景', bestTime: '10:00–11:00', lens: '24–70mm', description: '从外侧高点拍寺院依山而建的层级，强调金顶与高原山谷关系。', tips: ['广角注意边缘变形', '备防晒与薄羽绒'], image: '/images/photo-spots/11-songzanlin-hillside.jpg', rating: 5 },
  { id: 'photo-12', name: '独克宗古城夜色', bestTime: '19:00–20:30', lens: '35mm, 50mm', description: '青石路、木楼与暖灯适合拍低速慢门，记录月光城入夜后的温度。', tips: ['三脚架勿挡通道', '高原夜间注意保暖'], image: '/images/photo-spots/12-dukezong-night.jpg', rating: 4 },
  { id: 'photo-13', name: '龟山大转经筒', bestTime: '19:30', lens: '16–35mm', description: '仰拍金色转经筒与夜空，保留人物比例表现建筑的尺度。', tips: ['跟随人流顺时针', '广角贴近拍摄'], image: '/images/photo-spots/13-prayer-wheel.jpg', rating: 5 },
  { id: 'photo-14', name: '月光广场转经筒', bestTime: '蓝调时刻', lens: '35mm', description: '利用蓝调天空和暖色灯光的冷暖对比，画面比全黑夜更有层次。', tips: ['白平衡设为自动后再微调', '控制高光不过曝'], image: '/images/photo-spots/14-dukezong-wheel.jpg', rating: 4 },
  { id: 'photo-15', name: '纳帕海草原', bestTime: '15:00–17:00', lens: '24–70mm', description: '草场、牦牛和起伏山坡适合横幅构图，给画面保留足够天空。', tips: ['不驶入草场', '风大时固定好三脚架'], image: '/images/photo-spots/15-napahai-grass.jpg', rating: 5 },
  { id: 'photo-16', name: '纳帕海湖湾', bestTime: '下午', lens: '24–70mm, 70–200mm', description: '等待云影经过湖湾，用水面反光与远山做出高原湿地的通透感。', tips: ['留意天气反差', '备偏振镜'], image: '/images/photo-spots/16-napahai-lake.jpg', rating: 5 },
  { id: 'photo-17', name: '依拉草甸', bestTime: '16:00–18:00', lens: '50mm, 70–200mm', description: '把草甸上的牛羊作为前景点缀，画面会比单拍风景更有生命力。', tips: ['保持安全距离', '不要投喂动物'], image: '/images/photo-spots/17-napahai-meadow.jpg', rating: 4 },
  { id: 'photo-18', name: '飞来寺晨光', bestTime: '06:10–06:40', lens: '70–200mm', description: '日照金山前的冷色阶段同样值得拍，雪峰与寺院前景更有氛围。', tips: ['提前占观景位', '携带手套和备用电池'], image: '/images/photo-spots/18-feilai-dawn.jpg', rating: 5 },
  { id: 'photo-19', name: '飞来寺望梅里', bestTime: '06:30–07:20', lens: '24–70mm, 70–200mm', description: '用中焦收下寺院与雪山关系，既有地点感也能突出卡瓦格博。', tips: ['查看云量预报', '拍摄后及时收镜防结露'], image: '/images/photo-spots/19-meili-feilai.jpg', rating: 5 },
  { id: 'photo-20', name: '梅里日照金山', bestTime: '06:20–06:50', lens: '100–400mm', description: '只在金色开始爬上峰顶时按下快门，长焦最能表现峰脊光影。', tips: ['使用连拍记录变化', '曝光宁可略保守'], image: '/images/photo-spots/20-meili-golden.jpg', rating: 5 },
  { id: 'photo-21', name: '黑龙潭玉龙倒影', bestTime: '08:00–10:00', lens: '24–70mm', description: '无风晴天拍水面倒影，古建筑与玉龙雪山同框最具丽江辨识度。', tips: ['优先选择无风早晨', '带偏振镜控制反光'], image: '/images/photo-spots/21-black-dragon-pool.jpg', rating: 5 },
  { id: 'photo-22', name: '玉龙雪山与古城', bestTime: '上午', lens: '70–200mm', description: '从丽江方向寻找雪山与古城屋脊的层次，压缩视角更有故事感。', tips: ['雪山天气变化快', '长焦注意快门速度'], image: '/images/photo-spots/22-lijiang-jade-dragon.jpg', rating: 4 },
  { id: 'photo-23', name: '丽江古城水系', bestTime: '18:30–20:00', lens: '35mm, 50mm', description: '石桥、流水和灯笼适合低机位拍摄，避开最拥挤的主街。', tips: ['带小型三脚架', '尊重居民生活'], image: '/images/photo-spots/23-lijiang-lake.jpg', rating: 4 },
  { id: 'photo-24', name: '半山露台望洱海', bestTime: '日出或日落前', lens: '24–70mm', description: '民宿露台把洱海、屋顶与天空一并收进画面，是婚纱照行程里的休憩机位。', tips: ['拍摄前擦净玻璃栏杆', '适合延时与静物组合'], image: '/images/hotels/dali-manshan-terrace.jpg', rating: 5 },
  { id: 'photo-25', name: '海景浴缸房窗景', bestTime: '午后逆光', lens: '24–35mm', description: '从房间向外拍露台与洱海，借浴缸、床品和窗框建立有生活感的前景。', tips: ['收纳杂物再拍', '窗外高光需降曝光'], image: '/images/hotels/dali-manshan-room.jpg', rating: 4 },
];

export const weatherData: CityWeather[] = [
  { city: '深圳', altitude: '10m', temp: '30°C', condition: '晴热', advice: ['短袖短裤', '防晒霜', '充足饮水'] },
  { city: '玉林', altitude: '80m', temp: '28°C', condition: '晴', advice: ['短袖', '防蚊', '遮阳帽'] },
  { city: '昆明', altitude: '1890m', temp: '22°C', condition: '多云', advice: ['薄外套', '防晒', '保湿'] },
  { city: '大理', altitude: '1970m', temp: '23°C', condition: '晴', advice: ['薄外套', '防晒', '墨镜'] },
  { city: '香格里拉', altitude: '3300m', temp: '15°C', condition: '晴', advice: ['保暖外套', '慢走', '多喝水', '抗高反药'] },
  { city: '飞来寺', altitude: '3480m', temp: '6°C', condition: '晴，早晚冷', advice: ['羽绒服', '保暖内衣', '手套', '帽子', '氧气瓶'] },
  { city: '丽江', altitude: '2400m', temp: '20°C', condition: '晴', advice: ['薄外套', '防晒', '舒适鞋'] },
  { city: '百色', altitude: '130m', temp: '27°C', condition: '晴', advice: ['短袖', '防晒', '充足饮水'] },
];

export const packingList = [
  { category: '📸 摄影装备', items: ['相机机身', '16–35mm', '24–70mm', '70–200mm', '三脚架', '备用电池', '存储卡', '清洁套装'] },
  { category: '👕 衣物', items: ['短袖T恤', '薄外套', '羽绒服', '保暖内衣', '徒步鞋', '防晒帽', '墨镜'] },
  { category: '💊 药品', items: ['红景天', '高原安', '感冒药', '肠胃药', '创可贴', '晕车药', '葡萄糖'] },
  { category: '🧴 日用品', items: ['防晒霜', '润唇膏', '保湿霜', '保温杯', '充电宝', '数据线'] },
  { category: '📄 证件', items: ['身份证', '驾驶证', '行驶证', '银行卡', '现金若干'] },
  { category: '🎒 车载补给', items: ['车载充电器', '手机支架', '零食补给', '矿泉水', '雨伞', '垃圾袋'] },
];
