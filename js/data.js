var game = angular.module("game",[]);

game.constant('data', {
	// 城池
	cities: [
		{
			id: 1,
			name: "许昌",
			pos: {
				x: 54,
				y: 48
			},
			money: 220,
			food: 18000,
			population: 0,
			agriculture: {
				current: 15,
				max: 80
			},
			merchant: {
				current: 20,
				max: 90
			},
			tax: 4,
			neighbors: [2,3],
			disasterPrevention: 50,
			precious: 0,
			generals: [2,6],
			leader: 2,
			counsellor: 2,
			morale: 0,
			solider: 22000,
			isLargeCity: false
		},
		{
			id: 2,
			name: "洛阳",
			pos: {
				x: 46,
				y: 42
			},
			money: 360,
			food: 50000,
			population: 0,
			agriculture: {
				current: 30,
				max: 120
			},
			merchant: {
				current: 50,
				max: 150
			},
			tax: 3,
			neighbors: [1,3],
			disasterPrevention: 35,
			precious: 0,
			generals: [3,5],
			leader: 3,
			counsellor: 5,
			morale: 0,
			solider: 40000,
			isLargeCity: true
		},
		{
			id: 3,
			name: "长安",
			pos: {
				x: 33,
				y: 37
			},
			money: 380,
			food: 35000,
			population: 0,
			agriculture: {
				current: 35,
				max: 135
			},
			merchant: {
				current: 35,
				max: 135
			},
			tax: 3,
			neighbors: [1,2],
			disasterPrevention: 45,
			precious: 0,
			generals: [1,4],
			leader: 4,
			counsellor: 1,
			morale: 0,
			solider: 23000,
			isLargeCity: true
		}
	],
	// 武将
	people: [
		{
			id: 1,
			name: "荀彧",
			props: {
				hp: {
					current: 59,
					max: 59
				},
				str: 23,
				tac: 96,
				pol: 92,
				influ: 90,
				command: 70,
				fame: 35,
				loyality: 80,
				ambition: 30,
				win: 0,
				lose: 0
			},
			loyalTo: [],
			personality: 1,
			decisionPreference: [1,2],
			status: 0, // 在野，势力
			weapon: 1,
			armor: 1,
			army: 1, // 兵种，平原军
			exp: 0
		},
		{
			id: 2,
			name: "曹操",
			props: {
				hp: {
					current: 76,
					max: 76
				},
				str: 60,
				tac: 92,
				pol: 97,
				influ: 90,
				command: 96,
				fame: 65,
				loyality: 75,
				ambition: 100,
				win: 0,
				lose: 0
			},
			loyalTo: [],
			personality: 2,
			decisionPreference: [1,2,3,4,5],
			status: 1,
			weapon: 1,
			armor: 1,
			army: 1,
			exp: 70		
		},
		{
			id: 3,
			name: "刘备",
			props: {
				hp: {
					current: 81,
					max: 81
				},
				str: 82,
				tac: 75,
				pol: 83,
				influ: 100,
				command: 82,
				fame: 60,
				loyality: 95,
				ambition: 100,
				win: 0,
				lose: 0
			},
			loyalTo: [],
			personality: 2,
			decisionPreference: [1,2,3,4,5],
			status: 1,
			weapon: 1,
			armor: 1,
			army: 2,
			exp: 40
		},
		{
			id: 4,
			name: "许褚",
			props: {
				hp: {
					current: 98,
					max: 98
				},
				str: 97,
				tac: 35,
				pol: 45,
				influ: 63,
				command: 72,
				fame: 30,
				loyality: 94,
				ambition: 15,
				win: 0,
				lose: 0
			},
			loyalTo: [],
			personality: 2,
			decisionPreference: [1,2,3,4,5],
			status: 1,
			weapon: 1,
			armor: 1,
			army: 3,
			exp: 20
		},
		{
			id: 5,
			name: "关羽",
			props: {
				hp: {
					current: 97,
					max: 97
				},
				str: 97,
				tac: 75,
				pol: 45,
				influ: 96,
				command: 94,
				fame: 30,
				loyality: 97,
				ambition: 80,
				win: 0,
				lose: 0
			},
			loyalTo: [],
			personality: 2,
			decisionPreference: [1,2,3,4,5],
			status: 1,
			weapon: 1,
			armor: 1,
			army: 3,
			exp: 20
		},
		{
			id: 6,
			name: "曹仁",
			props: {
				hp: {
					current: 89,
					max: 89
				},
				str: 87,
				tac: 45,
				pol: 48,
				influ: 75,
				command: 95,
				fame: 30,
				loyality: 91,
				ambition: 65,
				win: 0,
				lose: 0
			},
			loyalTo: [],
			personality: 2,
			decisionPreference: [5],
			status: 1,
			weapon: 1,
			armor: 1,
			army: 1,
			exp: 40
		}
	],
	// 性格
	personalities: [
		{
			id: 1,
			name: "冷静",
		},
		{
			id: 2,
			name: "果敢",
		},
		{
			id: 3,
			name: "胆小",
		},
		{
			id: 4,
			name: "刚愎",
		},
		{
			id: 5,
			name: "狂妄",
		},
		{
			id: 6,
			name: "鲁莽",
		},
		{
			id: 7,
			name: "谨慎",
		},
		{
			id: 8,
			name: "不决",
		}
	],
	// 势力
	kingdoms: [
		{
			id: 1,
			lord: 2,
			color: '1368c0',
			cities: [1,2,3],
			ancestor: [],
		},
		{
			id: 2,
			lord: 3,
			color: '333333',
			cities: [],
			ancestor: [],
		}
	],
	// 武器
	weapons: [
		{
			id: 1,
			name: "倚天剑",
			power: 10,
			price: 400,
			threshold: 50
		},
		{
			id: 2,
			name: "青缸剑",
			power: 11,
			price: 450,
			threshold: 80
		},
		{
			id: 3,
			name: "龙牙刀",
			power: 9,
			price: 350,
			threshold: 50
		},
		{
			id: 4,
			name: "方天画戟",
			power: 12,
			price: 500,
			threshold: 70
		},
		{
			id: 5,
			name: "铁脊蛇矛",
			power: 8,
			price: 350,
			threshold: 70
		}
	],
	// 防具
	armors: [
		{
			id: 1,
			name: "龙鳞铠",
			power: 10,
			price: 600,
			threshold: 50
		}
	],
	// 地形
	blocks: [
		{
			id: 1,
			name: "沙",
			grid: {
				x: 1,
				y: 1
			}
		},
		{
			id: 2,
			name: "路",
			grid: {
				x: 1,
				y: 1
			}
		},
		{
			id: 3,
			name: "山",
			grid: {
				x: 1,
				y: 1
			}
		},
		{
			id: 4,
			name: "大山",
			grid: {
				x: 2,
				y: 2
			}
		},
		{
			id: 5,
			name: "河",
			grid: {
				x: 1,
				y: 1
			}
		},
		{
			id: 6,
			name: "海",
			grid: {
				x: 1,
				y: 1
			}
		},
		{
			id: 7,
			name: "林",
			grid: {
				x: 1,
				y: 1
			}
		},
		{
			id: 8,
			name: "城",
			grid: {
				x: 1,
				y: 1
			}
		},
	],
	// 决策
	decisions: [
		{
			id: 1,
			name: "速攻"
		},
		{
			id: 2,
			name: "断粮"
		},
		{
			id: 3,
			name: "断水"
		},
		{
			id: 4,
			name: "伏击"
		},
		{
			id: 5,
			name: "攻心"
		},
		{
			id: 6,
			name: "离间"
		},
		{
			id: 7,
			name: "铁壁"
		},
		{
			id: 8,
			name: "阵地"
		}
	],
	// 兵种
	armies: [
		{
			id: 1,
			name: "马军"
		},
		{
			id: 2,
			name: "步军"
		},
		{
			id: 3,
			name: "水军"
		},
		{
			id: 4,
			name: "弓队"
		}
	],
	// 官阶
	titles: [
		{
			id: 0,
			name: "君主",
			army: {
				current: 0,
				max: 20000
			}
		},
		{
			id: 1,
			name: "校尉",
			army: {
				current: 0,
				max: 3000
			}
		},
		{
			id: 2,
			name: "都尉",
			army: {
				current: 0,
				max: 5000
			}
		}
	],
	// 执行顺序
	order: [1,2]




});