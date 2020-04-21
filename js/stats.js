var stats = {
    energy: {
        current: 10,
        increase: 0.1,
        speed: 5000,
        speedModifier: 1,
        max: 10,
        originalMax: 10,
        coffee: {
            total: 0,
            current: 0,
            timer: 60,
            cooldown: 300,
            boost: 5,
            isActive: false,
            isCooldown: false,
        }
    },
    strength: 0,
    strengthBoost: .001,
    endurance: 0,
    enduranceBoost: .001,
    agility: 0,
    agilityBoost: .001,
    intelligence: 0,
    intelligenceBoost: .001,
    allStatBoost: .000125,
    money: 0,
    saveTime: 0,
    gameVersion: .1,
};
var bodyweight = {
    pushups: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 50,
        energy: 1,
        strength: .05,
        endurance: .025,
        agility: .01,
        tier: 0,
        tiers: [
            {
                name: "Incline Pushups",
                multiplier: 2,
                upgrade: 100,
            },
            {
                name: "Pushups",
                multiplier: 2,
                upgrade: 1000,
            },
            {
                name: "Diamond Pushups",
                multiplier: 2,
                upgrade: 10000,
            },
            {
                name: "Pseudo Planche Pushups",
                multiplier: 2,
                upgrade: 100000,
            },
            {
                name: "Planche Pushups",
                multiplier: 2,
                upgrade: 100000,
            }
        ],
    },
    rows: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 50,
        energy: 1,
        strength: .025,
        endurance: .05,
        agility: .01,
        tier: 0,
        tiers: [
            {
                name: "Incline Rows",
                multiplier: 2,
                upgrade: 100,
            },
            {
                name: "Horizontal Rows",
                multiplier: 2,
                upgrade: 1000,
            },
            {
                name: "Tuck Front Lever Rows",
                multiplier: 2,
                upgrade: 10000,
            },
            {
                name: "Advanced Tuck Front Lever Rows",
                multiplier: 2,
                upgrade: 100000,
            },
            {
                name: "Front Lever Rows",
                multiplier: 2,
                upgrade: 100000,
            }
        ],
    },
    dips: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 50,
        energy: 2,
        strength: .05,
        endurance: .1,
        agility: .02,
        tier: 0,
        tiers: [
            {
                name: "Support Holds",
                multiplier: 2,
                upgrade: 100,
            },
            {
                name: "Dip Negatives",
                multiplier: 2,
                upgrade: 1000,
            },
            {
                name: "Dips",
                multiplier: 2,
                upgrade: 10000,
            },
            {
                name: "Ring Dips",
                multiplier: 2,
                upgrade: 100000,
            },
            {
                name: "Rings Turned-Out Dips",
                multiplier: 2,
                upgrade: 100000,
            }
        ],
    },
    pullups: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 50,
        energy: 2,
        strength: .1,
        endurance: .05,
        agility: .02,
        tier: 0,
        tiers: [
            {
                name: "Arch Holds",
                multiplier: 2,
                upgrade: 100,
            },
            {
                name: "Pullup Negatives",
                multiplier: 2,
                upgrade: 1000,
            },
            {
                name: "Pullups",
                multiplier: 2,
                upgrade: 10000,
            },
            {
                name: "Assisted One-Arm Pullups",
                multiplier: 2,
                upgrade: 100000,
            },
            {
                name: "One-Arm Pullups",
                multiplier: 2,
                upgrade: 100000,
            }
        ],
    },
    squats: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 50,
        energy: 4,
        strength: .15,
        endurance: .05,
        agility: .15,
        tier: 0,
        tiers: [
            {
                name: "Assisted Squat",
                multiplier: 2,
                upgrade: 100,
            },
            {
                name: "Squat",
                multiplier: 2,
                upgrade: 1000,
            },
            {
                name: "Split Squat",
                multiplier: 2,
                upgrade: 10000,
            },
            {
                name: "Bulgarian Split Squat",
                multiplier: 2,
                upgrade: 100000,
            },
            {
                name: "Pistol Squat",
                multiplier: 2,
                upgrade: 100000,
            }
        ],

    },
    rdl: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 50,
        energy: 4,
        strength: .15,
        endurance: .05,
        agility: .15,
        tier: 0,
        tiers: [
            {
                name: "Romanian Deadlifts (No Weight)",
                multiplier: 2,
                upgrade: 100,
            },
            {
                name: "Single-Legged Deadlifts",
                multiplier: 2,
                upgrade: 1000,
            },
            {
                name: "Banded Nordic Curl Negatives",
                multiplier: 2,
                upgrade: 10000,
            },
            {
                name: "Banded Nordic Curls",
                multiplier: 2,
                upgrade: 100000,
            },
            {
                name: "Nordic Curls",
                multiplier: 2,
                upgrade: 100000,
            }
        ],
    },
    upgrades: [
        {
            id: 0,
            isActive: false,
            isPurchased: false,
            name: "Homemade Pushup Handles",
            desc: "<strong>Cost: $2.5</strong> - Pushup handles should double my pushup speed. That's how physics work.",
            cost: 2.5,
        },
        {
            id: 1,
            isActive: false,
            isPurchased: false,
            name: "Homemade Gymnastic Rings",
            desc: "<strong>Cost: $7.5</strong> - These cheaply made gymnastic rings should let me do rows. Once I do some research, I should be able to do dips too.",
            cost: 7.5,
        },
        {
            id: 2,
            isActive: false,
            isPurchased: false,
            name: "Pay a Friend to Teach You",
            desc: "<strong>Cost: $25</strong> - My friend wants to show me the correct way to do pushups and rows. Halves the energy expenditure of pushups and rows.",
            cost: 25,
        },
        {
            id: 3,
            isActive: false,
            isPurchased: false,
            name: "Buy Wooden Gymnastic Rings",
            desc: "<strong>Cost: $50</strong> - These nice, wooden made gymnastic rings should let me do rows at double speed.",
            cost: 50,
        },
        {
            id: 4,
            isActive: false,
            isPurchased: false,
            name: "Buy Pullup Bar",
            desc: "<strong>Cost: $100</strong> - I'm flying! Unlocks Pullups.",
            cost: 100,
        },
        {
            id: 5,
            isActive: false,
            isPurchased: false,
            name: "Pay for Pullup Training",
            desc: "<strong>Cost: $250</strong> - My friend keeps wanting more money. Doubles pullup speed.",
            cost: 250,
        },
        {
            id: 6,
            isActive: false,
            isPurchased: false,
            name: "Pay for Dip Training",
            desc: "<strong>Cost: $250</strong> - I'm seriously getting mad at this guy. Doubles dip speed.",
            cost: 250,
        },
        {
            id: 7,
            isActive: false,
            isPurchased: false,
            name: "Create a Home Gym",
            desc: "<strong>Cost: $500</strong> - With proper equipment, anything is possible. Halves the energy expenditure of pullups.",
            cost: 500,
        },
        {
            id: 8,
            isActive: false,
            isPurchased: false,
            name: "Mount Rings and Expand Home Gym",
            desc: "<strong>Cost: $500</strong> - Mounted rings should give me a more stable platform for dips. Halves the energy expenditure of dips.",
            cost: 500,
        },
        {
            id: 9,
            isActive: false,
            isPurchased: false,
            name: "Pay for Squat Training",
            desc: "<strong>Cost: $1000</strong> - How does my friend know I have all this money. Is he a follower of mine? Doubles Squat Speed.",
            cost: 1000,
        },
        {
            id: 10,
            isActive: false,
            isPurchased: false,
            name: "Pay Romanian Deadlift Training",
            desc: "<strong>Cost: $1000</strong> - Maybe he's trying to launch a competing channel? Doubles Romanian Deadlift Speed.",
            cost: 1000,
        },
        {
            id: 11,
            isActive: false,
            isPurchased: false,
            name: "Pay for Leg Hypertrophy Guide",
            desc: "<strong>Cost: $2500</strong> - Seems reasonable. Halves the energy expenditure of bodyweight leg exercises.",
            cost: 2500,
        },
        {
            id: 12,
            isActive: false,
            isPurchased: false,
            name: "Better Form for Pushups and Rows",
            desc: "<strong>Cost: $5000</strong> - Double energy expenditure of pushups and rows, but double stat gains as well.",
            cost: 5000,
        },
        {
            id: 13,
            isActive: false,
            isPurchased: false,
            name: "Better Form for Dips and Pullups",
            desc: "<strong>Cost: $10000</strong> - Double energy expenditure of dips and pullups, but double stat gains as well.",
            cost: 10000,
        },
        {
            id: 14,
            isActive: false,
            isPurchased: false,
            name: "Better Form for Bodyweight Legs Exercises",
            desc: "<strong>Cost: $25000</strong> - Double energy expenditure of bodyweight leg exercises, but double stat gains as well.",
            cost: 25000,
        }
    ]
};

var upgrades = [
    {
        id: 0,
        isActive: false,
        isPurchased: false,
        name: "Buy Coffee",
        desc: "<strong>Cost: $1</strong> - Increase energy with coffee",
        cost: 1
    },
    {
        id: 1,
        isActive: false,
        isPurchased: false,
        name: "Buy Stronger Coffee",
        desc: "<strong>Cost: $5</strong> - Increase energy with coffee",
        cost: 5
    },
    {
        id: 2,
        isActive: false,
        isPurchased: false,
        name: "Buy Creatine",
        desc: "<strong>Cost: $10</strong> - Creatine will double your energy recovery.",
        cost: 10
    },
    {
        id: 3,
        isActive: false,
        isPurchased: false,
        name: "Protein Shakes",
        desc: "<strong>Cost: $50</strong> - Protein shakes let you build strength faster. Why get your protein from chicken when you can drink it. Makes strength more effective.",
        cost: 50
    },
    {
        id: 4,
        isActive: false,
        isPurchased: false,
        name: "Buy Endurance Supplements",
        desc: "<strong>Cost: $100</strong> - Supplements should give my endurance more of an impact.",
        cost: 100
    },
    {
        id: 5,
        isActive: false,
        isPurchased: false,
        name: "Buy Agility Supplements",
        desc: "<strong>Cost: $250</strong> - Supplements should give my agility more of an impact.",
        cost: 250
    },
    {
        id: 6,
        isActive: false,
        isPurchased: false,
        name: "Buy Intelligence Supplements",
        desc: "<strong>Cost: $500</strong> - Supplements should give my intelligence more of an impact.",
        cost: 500
    },
    {
        id: 7,
        isActive: false,
        isPurchased: false,
        name: "Purchase Bulk Supplements to Sell",
        desc: "<strong>Cost: $1000</strong> - Increases follower growth based on all stats.",
        cost: 1000
    },
    {
        id: 8,
        isActive: false,
        isPurchased: false,
        name: "Buy L-Citrulline in Bulk",
        desc: "<strong>Cost: $2500</strong> - A bit more expensive, but doubles energy recovery again.",
        cost: 2500
    },
    {
        id: 9,
        isActive: false,
        isPurchased: false,
        name: "Experimental Supplements for Strength",
        desc: "<strong>Cost: $5000</strong> - Very expensive, but doubles the effectiveness of strength.",
        cost: 5000
    },
    {
        id: 10,
        isActive: false,
        isPurchased: false,
        name: "Experimental Supplements for Agility",
        desc: "<strong>Cost: $10000</strong> - Very expensive, but doubles the effectiveness of agility.",
        cost: 10000
    },
    {
        id: 11,
        isActive: false,
        isPurchased: false,
        name: "Experimental Supplements for Endurance",
        desc: "<strong>Cost: $25000</strong> - Very expensive, but doubles the effectiveness of endurance.",
        cost: 25000
    },
    {
        id: 12,
        isActive: false,
        isPurchased: false,
        name: "Experimental Supplements for Intelligence",
        desc: "<strong>Cost: $50000</strong> - Very expensive, but doubles the effectiveness of intelligence.",
        cost: 50000
    }
];

var job = {
    makeVideo: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 100,
    },
    recruitInfluencers: {
        total: 0,
        current: 0,
        increase: 5,
        speed: 1000,
        speedModifier: 1,
        max: 100,
    },
    followers: 0.00,
    views: 0.00,
    influencers: 0.00,
    influencerGrowth: .0125,
    influencerMulti: .00001,
    followerGrowth: .1,
    viewGrowth: .001,
    moneyGrowth: .00001,
    moneyDrain: 0.00,
    pushupFollowerMod: 0.00,
    rowFollowerMod: 0.00,
    dipFollowerMod: 0.00,
    pullupFollowerMod: 0.00,
    bwSquatFollowerMod: 0.00,
    bwRdlFollowerMod: 0.00,
    postFollowerMod: 0.00,
    upgrades: [
        {
            id: 0,
            isActive: false,
            isPurchased: false,
            name: "Go Viral Accidentally",
            desc: "<strong>Cost: 1 follower</strong> - Not sure what happened. Adds 5000 views",
            cost: 1,
        },
        {
            id: 1,
            isActive: false,
            isPurchased: false,
            name: "Make Misleading Claims",
            desc: "<strong>Cost: 1 followers</strong> - No one will ever realize I'm talking nonsense. Double your work speed.",
            cost: 1,
        },
        {
            id: 2,
            isActive: false,
            isPurchased: false,
            name: "Livestream Pushups",
            desc: "<strong>Cost: 2.5 follower</strong> - Annoy a follower by livestreaming pushups all day. Adds a portion of your total pushups to your follower growth.",
            cost: 2.5,
        },
        {
            id: 3,
            isActive: false,
            isPurchased: false,
            name: "Livestream Rows",
            desc: "<strong>Cost: 2.5 follower</strong> - Annoy a follower by livestreaming rows all day. Adds a portion of your total rows to your follower growth.",
            cost: 2.5,
        },
        {
            id: 4,
            isActive: false,
            isPurchased: false,
            name: "Speculate About Fitness",
            desc: "<strong>Cost: 5 followers</strong> - Unlocks research.",
            cost: 5,
        },
        {
            id: 5,
            isActive: false,
            isPurchased: false,
            name: "Clickbait Titles",
            desc: "<strong>Cost: 7.5 followers</strong> - Change all of your video titles to scare people into clicking. Views go up faster per follower.",
            cost: 7.5,
        },
        {
            id: 6,
            isActive: false,
            isPurchased: false,
            name: "Put Ads on Videos",
            desc: "<strong>Cost: 10 followers</strong> - Everyone loves ads! Double your money per view.",
            cost: 10,
        },
        {
            id: 7,
            isActive: false,
            isPurchased: false,
            name: "Get Sponsors",
            desc: "<strong>Cost: 15 followers</strong> - I'm becoming an influencer. Double the effectiveness of stats on follower growth.",
            cost: 15,
        },
        {
            id: 8,
            isActive: false,
            isPurchased: false,
            name: "Guest Stars",
            desc: "<strong>Cost: 50 followers</strong> - Bring some important people into the channel to discuss with me. Intellect gain is doubled from research.",
            cost: 50,
        },
        {
            id: 9,
            isActive: false,
            isPurchased: false,
            name: "Plug Products",
            desc: "<strong>Cost: 100 followers</strong> - Carefully place products in my videos. Double the views per follower.",
            cost: 100,
        },
        {
            id: 10,
            isActive: false,
            isPurchased: false,
            name: "Compete in Pullup Contest",
            desc: "<strong>Cost: 250 followers</strong> - Everyone loves a contest. Adds pullups to follower growth.",
            cost: 250,
        },
        {
            id: 11,
            isActive: false,
            isPurchased: false,
            name: "Compete in Dip Contest",
            desc: "<strong>Cost: 250 followers</strong> - Well, maybe not everyone loves a contest. I love contests. Adds dips to follower growth.",
            cost: 250,
        },
        {
            id: 12,
            isActive: false,
            isPurchased: false,
            name: "Film Squats",
            desc: "<strong>Cost: 500 followers</strong> - Everyone wants to see some squats. Adds squats to follower growth.",
            cost: 500,
        },
        {
            id: 13,
            isActive: false,
            isPurchased: false,
            name: "Film Romanian Deadlifts",
            desc: "<strong>Cost: 500 followers</strong> - No one can ever do romanian deadlifts correctly. I'll show them show. Adds romanian deadlifts to follower growth.",
            cost: 500,
        },
        {
            id: 14,
            isActive: false,
            isPurchased: false,
            name: "Bring Research into Videos",
            desc: "<strong>Cost: 1000 followers</strong> - Maybe I'll make things more scientific. Adds a portion of your total posts to follower growth.",
            cost: 1000,
        },
        {
            id: 15,
            isActive: false,
            isPurchased: false,
            name: "Refine Marketing Techniques",
            desc: "<strong>Cost: 2500 followers</strong> - I must learn the secrets of the dark side. Double views per follower.",
            cost: 2500,
        },
        {
            id: 16,
            isActive: false,
            isPurchased: false,
            name: "Coordinate Better with Influencers",
            desc: "<strong>Cost: 5000 followers</strong> - I need to get coordinated to bring more followers into my channel. Double influencer growth.",
            cost: 5000,
        },
        {
            id: 17,
            isActive: false,
            isPurchased: false,
            name: "Advertise with Influencers",
            desc: "<strong>Cost: 10000 followers</strong> - Placing ads on my influencer's pages will add to follower growth per influencer.",
            cost: 10000,
        },
        {
            id: 18,
            isActive: false,
            isPurchased: false,
            name: "Show Off Body",
            desc: "<strong>Cost: 25000 followers</strong> - I'm getting buff. Doubles the influence of stats on follower growth.",
            cost: 25000,
        },
        {
            id: 19,
            isActive: false,
            isPurchased: false,
            name: "Planned Viral Video",
            desc: "<strong>Cost: 250 followers</strong> - Work with influencers to go 'viral'. Doubles the recruitment of influencers.",
            cost: 250,
        },
        {
            id: 20,
            isActive: false,
            isPurchased: false,
            name: "Send Marketing Emails",
            desc: "<strong>Cost: 75 followers</strong> - Market to your audience. Doubles views per follower.",
            cost: 75,
        },
        {
            id: 21,
            isActive: false,
            isPurchased: false,
            name: "Put Link to Workout Plan in Bio",
            desc: "<strong>Cost: 25 followers</strong> - Get that sweet money. Doubles views per follower.",
            cost: 25,
        },
        {
            id: 22,
            isActive: false,
            isPurchased: false,
            name: "Scream Very Loudly in All Workout Videos",
            desc: "<strong>Cost: 25 followers</strong> - Yelling always makes people love you. Doubles follower growth.",
            cost: 25,
        },
        {
            id: 23,
            isActive: false,
            isPurchased: false,
            name: "Try to Look Smarter",
            desc: "<strong>Cost: 7500 followers</strong> - First impressions count. Doubles intelligence from research.",
            cost: 7500,
        },
        {
            id: 24,
            isActive: false,
            isPurchased: false,
            name: "Ads Within Ads",
            desc: "<strong>Cost: 1000 followers</strong> - Inception. Doubles view growth.",
            cost: 1000,
        },
        {
            id: 25,
            isActive: false,
            isPurchased: false,
            name: "Put Followers to Work",
            desc: "<strong>Cost: 15000 followers</strong> - Ask questions online so they can do your research. Doubles research speed.",
            cost: 15000,
        },
        {
            id: 26,
            isActive: false,
            isPurchased: false,
            name: "Sell Supplements on Channel",
            desc: "<strong>Cost: 25 followers</strong> - This won't annoy anyone! Doubles money growth.",
            cost: 25,
        },
        {
            id: 27,
            isActive: false,
            isPurchased: false,
            name: "Put Influencers to Work",
            desc: "<strong>Cost: 50000 followers</strong> - Get influencers researching too. Doubles research speed.",
            cost: 50000,
        },
        {
            id: 28,
            isActive: false,
            isPurchased: false,
            name: "Ads Within Ads Within Ads",
            desc: "<strong>Cost: 5000 followers</strong> - Double inception. Doubles money growth.",
            cost: 5000,
        },
    ]
};

var research = {
    browseReddit: {
        total: 0,
        current: 0,
        increase: 5,
        speed: 1000,
        speedModifier: 1,
        max: 100,
        intelligence: .05,
    },
    codeBots: {
        total: 0,
        current: 0,
        increase: 2.5,
        speed: 1000,
        speedModifier: 1,
        max: 100,
        intelligence: .1,
    },
    posts: 0.00,
    points: 0.00,
    bots: 0.00,
    pointSpeed: 1000,
    postGrowth: 1,
    postStrengthMod: 0,
    pointGrowth: .0001,
    botGrowth: 0.1,
    botSpeed: 1000,
    botMulti: .00001,
    upgrades: [
        {
            id: 0,
            isActive: false,
            isPurchased: false,
            name: "Effective Marketing",
            desc: "<strong>Cost: 1 research</strong> - Market your channel in your posts to double follower growth.",
            cost: 1,
        },
        {
            id: 1,
            isActive: false,
            isPurchased: false,
            name: "Sleeping Better",
            desc: "<strong>Cost: 2.5 research</strong> - It's time to get serious about sleep hygiene. Double your energy recovery.",
            cost: 2.5,
        },
        {
            id: 2,
            isActive: false,
            isPurchased: false,
            name: "Sort Comments by Best",
            desc: "<strong>Cost: 5 research</strong> - The best sorting is best. Double your research speed.",
            cost: 5,
        },
        {
            id: 3,
            isActive: false,
            isPurchased: false,
            name: "Study Other YouTube Channels",
            desc: "<strong>Cost: 5 research</strong> - How are they monetizing their channel? Double your money growth.",
            cost: 5,
        },
        {
            id: 4,
            isActive: false,
            isPurchased: false,
            name: "Dips",
            desc: "<strong>Cost: 7.5 research</strong> - When I dip you dip we dip. Unlocks dips.",
            cost: 7.5,
        },
        {
            id: 5,
            isActive: false,
            isPurchased: false,
            name: "Hypertrophy",
            desc: "<strong>Cost: 10 research</strong> - How to build muscle. Doubles the effectiveness of strength.",
            cost: 10,
        },
        {
            id: 6,
            isActive: false,
            isPurchased: false,
            name: "Hide Downvoted Posts",
            desc: "<strong>Cost: 10 research</strong> - No bad comments allowed. Doubles research speed.",
            cost: 10,
        },
        {
            id: 7,
            isActive: false,
            isPurchased: false,
            name: "High Intensity Interval Training",
            desc: "<strong>Cost: 25 research</strong> - Get that heart rate up! Doubles the effectiveness of agility.",
            cost: 25,
        },
        {
            id: 8,
            isActive: false,
            isPurchased: false,
            name: "High Reps",
            desc: "<strong>Cost: 50 research</strong> - How to build endurance. Doubles the effectiveness of endurance.",
            cost: 50,
        },
        {
            id: 9,
            isActive: false,
            isPurchased: false,
            name: "Advanced Research Techniques",
            desc: "<strong>Cost: 100 research</strong> - I am one with the universe. Doubles the effectivess of intelligence.",
            cost: 100,
        },
        {
            id: 10,
            isActive: false,
            isPurchased: false,
            name: "Research Recruiting Influencers",
            desc: "<strong>Cost: 50 research</strong> - Recruit influencers to increase follower growth.",
            cost: 50,
        },
        {
            id: 11,
            isActive: false,
            isPurchased: false,
            name: "Leg Day",
            desc: "<strong>Cost: 250 research</strong> - Stop being a bro. Unlocks squats and romanian deadlifts.",
            cost: 250,
        },
        {
            id: 12,
            isActive: false,
            isPurchased: false,
            name: "Examine Your Beliefs",
            desc: "<strong>Cost: 1000 research</strong> - Double the intellect growth of research.",
            cost: 1000,
        },
        {
            id: 13,
            isActive: false,
            isPurchased: false,
            name: "Research Bots",
            desc: "<strong>Cost: 250 research</strong> - With bots, I can read posts faster. Unlocks Code Bots.",
            cost: 250,
        },
        {
            id: 14,
            isActive: false,
            isPurchased: false,
            name: "More Effective Bots",
            desc: "<strong>Cost: 2500 research</strong> - Refine the code. Doubles the effect of bots on post growth.",
            cost: 2500,
        },
        {
            id: 15,
            isActive: false,
            isPurchased: false,
            name: "Efficient Coding",
            desc: "<strong>Cost: 5000 research</strong> - Bot growth is doubled.",
            cost: 5000,
        },
        {
            id: 16,
            isActive: false,
            isPurchased: false,
            name: "Learn Speed Reading",
            desc: "<strong>Cost: 10000 research</strong> - You might miss some important facts, but it's just fitness. Doubles post read speed.",
            cost: 10000,
        },
        {
            id: 17,
            isActive: false,
            isPurchased: false,
            name: "Deload",
            desc: "<strong>Cost: 25000 research</strong> - Unlock deloading (prestige).",
            cost: 25000,
        },
        {
            id: 18,
            isActive: false,
            isPurchased: false,
            name: "Flex Online",
            desc: "<strong>Cost: 25 research</strong> - Learning to flex your smarts online will add your strength modifier to post growth.",
            cost: 25,
        },
        {
            id: 19,
            isActive: false,
            isPurchased: false,
            name: "Posing",
            desc: "<strong>Cost: 2.5 research</strong> - Pose for the camera! Doubles the stat modifier for follower growth.",
            cost: 2.5,
        },
        {
            id: 20,
            isActive: false,
            isPurchased: false,
            name: "Take a Free Marketing Course",
            desc: "<strong>Cost: 500 research</strong> - Thanks internet! Doubles follower growth.",
            cost: 500,
        },
        {
            id: 21,
            isActive: false,
            isPurchased: false,
            name: "Study Influencers",
            desc: "<strong>Cost: 2500 research</strong> - How do these people do it. There must be some secret. Doubles the influencer multiplier on follower growth.",
            cost: 2500,
        },
        {
            id: 22,
            isActive: false,
            isPurchased: false,
            name: "Research Bulking",
            desc: "<strong>Cost: 250 research</strong> - Eat big to get big. Doubles energy recovery.",
            cost: 250,
        },
    ]
};

var checks = {
    isResting: false,
    story1: false,
    story2: false,
    story3: false,
    story4: false,
    story5: false,
};

var baseStats = JSON.parse(JSON.stringify(stats));
var baseBodyweight = JSON.parse(JSON.stringify(bodyweight));;
var baseUpgrades = JSON.parse(JSON.stringify(upgrades));;
var baseJob = JSON.parse(JSON.stringify(job));;
var baseResearch = JSON.parse(JSON.stringify(research));;
var baseChecks = JSON.parse(JSON.stringify(checks));;