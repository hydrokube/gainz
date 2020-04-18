var pushupTimerId;
var rowTimerId;
var dipTimerId;
var pullupTimerId;
var bwRdlTimerId;
var bwSquatTimerId;
var makeVideoTimerId;
var moneyTimerId;
var influencerId;
var influencerFollowerId;
var browseRedditTimerId;
var researchTimerId;
var coffeeTimerId;

var stats = {
    energy: {
        current: 10,
        increase: 0.1,
        speed: 5000,
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
    enduranceBoost: .1,
    agility: 0,
    agilityBoost: .001,
    intelligence: 0,
    intelligenceBoost: .001,
    allStatBoost: .0001,
    money: 0,
};
var bodyweight = {
    pushups: {
        total: 0,
        current: 0,
        increase: 10,
        speed: 1000,
        speedModifier: 1,
        max: 50,
        energy: 2,
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
                multiplier: 10,
                upgrade: 100000,
            },
            {
                name: "Planche Pushups",
                multiplier: 10,
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
        energy: 2,
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
                multiplier: 10,
                upgrade: 100000,
            },
            {
                name: "Front Lever Rows",
                multiplier: 10,
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
        energy: 4,
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
                multiplier: 10,
                upgrade: 100000,
            },
            {
                name: "Rings Turned-Out Dips",
                multiplier: 10,
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
        energy: 4,
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
                multiplier: 10,
                upgrade: 100000,
            },
            {
                name: "One-Arm Pullups",
                multiplier: 10,
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
        energy: 8,
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
                multiplier: 10,
                upgrade: 100000,
            },
            {
                name: "Pistol Squat",
                multiplier: 10,
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
        energy: 8,
        strength: .1,
        endurance: .05,
        agility: .02,
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
                multiplier: 10,
                upgrade: 100000,
            },
            {
                name: "Nordic Curls",
                multiplier: 10,
                upgrade: 100000,
            }
        ],

    },
    upgrades: [
        {
            isPurchased: false,
            name: "Homemade Pushup Handles",
            desc: "<strong>Cost: $2.5</strong> - Pushup handles should double my pushup speed. That's how physics work.",
            cost: 2.5,
        },
        {
            isPurchased: false,
            name: "Homemade Gymnastic Rings",
            desc: "<strong>Cost: $7.5</strong> - These cheaply made gymnastic rings should let me do rows. Once I do some research, I should be able to do dips too.",
            cost: 7.5,
        },
        {
            isPurchased: false,
            name: "Pay a Friend to Teach You",
            desc: "<strong>Cost: $25</strong> - My friend wants to show me the correct way to do pushups and rows. Halves the energy expenditure of pushups and rows.",
            cost: 25,
        },
        {
            isPurchased: false,
            name: "Buy Wooden Gymnastic Rings",
            desc: "<strong>Cost: $50</strong> - These nice, wooden made gymnastic rings should let me do rows at double speed.",
            cost: 50,
        },
        {
            isPurchased: false,
            name: "Buy Pullup Bar",
            desc: "<strong>Cost: $100</strong> - I'm flying! Unlocks Pullups.",
            cost: 100,
        },
        {
            isPurchased: false,
            name: "Pay for Pullup Training",
            desc: "<strong>Cost: $250</strong> - My friend keeps wanting more money. Doubles pullup speed.",
            cost: 250,
        },
        {
            isPurchased: false,
            name: "Pay for Dip Training",
            desc: "<strong>Cost: $250</strong> - I'm seriously getting mad at this guy. Doubles dip speed.",
            cost: 250,
        },
        {
            isPurchased: false,
            name: "Create a Home Gym",
            desc: "<strong>Cost: $500</strong> - With proper equipment, anything is possible. Halves the energy expenditure of pullups.",
            cost: 500,
        },
        {
            isPurchased: false,
            name: "Mount Rings and Expand Home Gym",
            desc: "<strong>Cost: $500</strong> - Mounted rings should give me a more stable platform for dips. Halves the energy expenditure of dips.",
            cost: 500,
        },
        {
            isPurchased: false,
            name: "Pay for Squat Training",
            desc: "<strong>Cost: $1000</strong> - How does my friend know I have all this money. Is he a follower of mine? Doubles Squat Speed.",
            cost: 1000,
        },
        {
            isPurchased: false,
            name: "Pay Romanian Deadlift Training",
            desc: "<strong>Cost: $1000</strong> - Maybe he's trying to launch a competing channel? Doubles Romanian Deadlift Speed.",
            cost: 1000,
        },
        {
            isPurchased: false,
            name: "Pay for Leg Hypertrophy Guide",
            desc: "<strong>Cost: $2500</strong> - Seems reasonable. Halves the energy expenditure of bodyweight leg exercises.",
            cost: 2500,
        }
    ]
}
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
    influencerGrowth: .01,
    influencerMulti: .00001,
    influencerSpeed: 1000,
    followerGrowth: .1,
    viewGrowth: .001,
    moneyGrowth: .00001,
    moneySpeed: 1000,
    moneyDrain: 0.00,
    pushupFollowerMod: 0.00,
    rowFollowerMod: 0.00,
    dipFollowerMod: 0.00,
    pullupFollowerMod: 0.00,
    bwSquatFollowerMod: 0.00,
    bwRdlFollowerMod: 0.00,
    upgrades: [
        {
            isPurchased: false,
            name: "Go Viral Accidentally",
            desc: "<strong>Cost: 1 follower</strong> - Not sure what happened. Adds 5000 views",
            cost: 1,
        },
        {
            isPurchased: false,
            name: "Make Misleading Claims",
            desc: "<strong>Cost: 1 followers</strong> - No one will ever realize I'm talking nonsense. Double your work speed.",
            cost: 1,
        },
        {
            isPurchased: false,
            name: "Livestream Pushups",
            desc: "<strong>Cost: 2.5 follower</strong> - Annoy a follower by livestreaming pushups all day. Adds a portion of your total pushups to your follower growth.",
            cost: 2.5,
        },
        {
            isPurchased: false,
            name: "Livestream Rows",
            desc: "<strong>Cost: 2.5 follower</strong> - Annoy a follower by livestreaming rows all day. Adds a portion of your total rows to your follower growth.",
            cost: 2.5,
        },
        {
            isPurchased: false,
            name: "Speculate About Fitness",
            desc: "<strong>Cost: 5 followers</strong> - Unlocks research.",
            cost: 5,
        },
        {
            isPurchased: false,
            name: "Clickbait Titles",
            desc: "<strong>Cost: 7.5 followers</strong> - Change all of your video titles to scare people into clicking. Views go up faster per follower.",
            cost: 7.5,
        },
        {
            isPurchased: false,
            name: "Put Ads on Videos",
            desc: "<strong>Cost: 10 followers</strong> - Everyone loves ads! Double your money per view.",
            cost: 10,
        },
        {
            isPurchased: false,
            name: "Get Sponsors",
            desc: "<strong>Cost: 25 followers</strong> - I'm becoming an influencer. Double the effectiveness of stats on follower growth.",
            cost: 25,
        },
        {
            isPurchased: false,
            name: "Guest Stars",
            desc: "<strong>Cost: 50 followers</strong> - Bring some important people into the channel to discuss with me. Intellect gain is doubled from research.",
            cost: 50,
        },
        {
            isPurchased: false,
            name: "Plug Products",
            desc: "<strong>Cost: 100 followers</strong> - Carefully place products in my videos. Double the views per follower.",
            cost: 100,
        },
        {
            isPurchased: false,
            name: "Compete in Pullup Contest",
            desc: "<strong>Cost: 250 followers</strong> - Everyone loves a contest. Adds pullups to follower growth.",
            cost: 250,
        },
        {
            isPurchased: false,
            name: "Compete in Dip Contest",
            desc: "<strong>Cost: 250 followers</strong> - Well, maybe not everyone loves a contest. I love contests. Adds dips to follower growth.",
            cost: 250,
        },
        {
            isPurchased: false,
            name: "Film Squats",
            desc: "<strong>Cost: 500 followers</strong> - Everyone wants to see some squats. Adds squats to follower growth.",
            cost: 500,
        },
        {
            isPurchased: false,
            name: "Film Romanian Deadlifts",
            desc: "<strong>Cost: 500 followers</strong> - No one can ever do romanian deadlifts correctly. I'll show them show. Adds romanian deadlifts to follower growth.",
            cost: 500,
        },
    ]
}

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
    posts: 0.00,
    points: 0.00,
    pointSpeed: 1000,
    postGrowth: 1,
    pointGrowth: .0001,
    upgrades: [
        {
            isPurchased: false,
            name: "Effective Marketing",
            desc: "<strong>Cost: 1 research</strong> - Market your channel in your posts to double follower growth.",
            cost: 1,
        },
        {
            isPurchased: false,
            name: "Sleeping Better",
            desc: "<strong>Cost: 2.5 research</strong> - It's time to get serious about sleep hygiene. Double your energy recovery.",
            cost: 2.5,
        },
        {
            isPurchased: false,
            name: "Sort Comments by Best",
            desc: "<strong>Cost: 5 research</strong> - The best sorting is best. Double your research speed.",
            cost: 5,
        },
        {
            isPurchased: false,
            name: "Study Other YouTube Channels",
            desc: "<strong>Cost: 5 research</strong> - How are they monetizing their channel? Double your money growth.",
            cost: 5,
        },
        {
            isPurchased: false,
            name: "Dips",
            desc: "<strong>Cost: 7.5 research</strong> - This looks interesting. Unlocks dips.",
            cost: 7.5,
        },
        {
            isPurchased: false,
            name: "Hypertrophy",
            desc: "<strong>Cost: 10 research</strong> - How to build muscle. Doubles the effectiveness of strength.",
            cost: 10,
        },
        {
            isPurchased: false,
            name: "Hide Downvoted Posts",
            desc: "<strong>Cost: 10 research</strong> - No bad comments allowed. Doubles research speed.",
            cost: 10,
        },
        {
            isPurchased: false,
            name: "High Intensity Interval Training",
            desc: "<strong>Cost: 25 research</strong> - Get that heart rate up! Doubles the effectiveness of agility.",
            cost: 25,
        },
        {
            isPurchased: false,
            name: "High Reps",
            desc: "<strong>Cost: 50 research</strong> - How to build endurance. Doubles the effectiveness of endurance.",
            cost: 50,
        },
        {
            isPurchased: false,
            name: "Advanced Research Techniques",
            desc: "<strong>Cost: 100 research</strong> - I am one with the universe. Doubles the effectivess of intelligence.",
            cost: 100,
        },
        {
            isPurchased: false,
            name: "Research Recruiting Influencers",
            desc: "<strong>Cost: 100 research</strong> - Recruit influencers to increase follower growth.",
            cost: 100,
        },
        {
            isPurchased: false,
            name: "Leg Day",
            desc: "<strong>Cost: 250 research</strong> - Stop being a bro. Unlocks squats and glute ham raises.",
            cost: 250,
        },
        {
            isPurchased: false,
            name: "Examine Your Beliefs",
            desc: "<strong>Cost: 500 research</strong> - Double the intellect growth of research.",
            cost: 500,
        },
    ]
}

var checks = {
    isResting: false,
    story1: false,
    story2: false,
    story3: false,
    story4: false,
}

var upgrades = [
    {
        isPurchased: false,
        name: "Buy Coffee",
        desc: "<strong>Cost: $1</strong> - Increase energy with coffee",
        cost: 1
    },
    {
        isPurchased: false,
        name: "Buy Stronger Coffee",
        desc: "<strong>Cost: $5</strong> - Increase energy with coffee",
        cost: 5
    },
    {
        isPurchased: false,
        name: "Buy Creatine",
        desc: "<strong>Cost: $10, $.01/s</strong> - Creatine will double your energy recovery.",
        cost: 10
    },
    {
        isPurchased: false,
        name: "Protein Shakes",
        desc: "<strong>Cost: $50, $.02/s</strong> - Protein shakes let you build strength faster. Why get your protein from chicken when you can drink it.",
        cost: 50
    },
    {
        isPurchased: false,
        name: "Buy Endurance Supplements",
        desc: "<strong>Cost: $100, $.03/s</strong> - Supplements should give my endurance more of an impact.",
        cost: 100
    },
    {
        isPurchased: false,
        name: "Buy Agility Supplements",
        desc: "<strong>Cost: $250, $.04/s</strong> - Supplements should give my agility more of an impact.",
        cost: 250
    },
    {
        isPurchased: false,
        name: "Buy Intelligence Supplements",
        desc: "<strong>Cost: $500, $.05/s</strong> - Supplements should give my intelligence more of an impact.",
        cost: 500
    },
    {
        isPurchased: false,
        name: "Purchase Bulk Supplements to Sell",
        desc: "<strong>Cost: $1000, $.06/s</strong> - Increases follower growth based on all stats.",
        cost: 1000
    },
    {
        isPurchased: false,
        name: "Buy L-Citrulline in Bulk",
        desc: "<strong>Cost: $2500, $.07/s</strong> - A bit more expensive, but doubles energy recovery again.",
        cost: 2500
    },
];

$(document).ready(function () {
    // loading here
    setupPushupTimer();

    if (!checks.story1) {
        $("#story1").removeClass("d-none").addClass("show");
    }
    if (checks.story2) {
        $("#work-tab").removeClass("d-none");
        setupJobTimer();
        setupMoneyTimer()
    }
    if (checks.story4) {
        setupBrowseRedditTimer();
        setupResearchTimer();
        $("#research-tab").removeClass("d-none");
    }
    if (bodyweight.upgrades[1].isPurchased) {
        $("#bwRows").removeClass("d-none");
        setupRowTimer();
    }
    if (research.upgrades[3].isPurchased) {
        $("#bwDips").removeClass("d-none");
        setupDipTimer();
    }
    if (bodyweight.upgrades[4].isPurchased) {
        $("#bwPullups").removeClass("d-none");
        setupPullupTimer();
    }
    if (research.upgrades[8].isPurchased) {
        $("#bwRdl").removeClass("d-none");
        $("#bwSquats").removeClass("d-none");
        setupBwSquatTimer();
        setupBwRdlTimer();
    }
    if (research.upgrades[10].isPurchased) {
        $("#influencerWrap").removeClass("d-none");
        setupInfluencerTimer();
        setupInfluencerFollowerGrowthTimer();
    }

    for (var i = 0; i < job.upgrades.length; i++) {
        $("#jobUpgrades").append("<div class='d-none' id='jobUpgrade" + i + "'><button type='button' id='jobUpgradeBtn" + i + "' class='btn btn-secondary btn-block disabled' onclick='jobUpgradeClick(this);'>" + job.upgrades[i].name + "</button><p id='jobUpgradeDesc" + i + "'>" + job.upgrades[i].desc + "</p></div>")
    }

    var tempUpgrades = upgrades;
    tempUpgrades = tempUpgrades.concat(bodyweight.upgrades);
    tempUpgrades.sort(function (a, b) {
        return a.cost > b.cost
    });

    for (var i = 0; i < tempUpgrades.length; i++) {
        for (var j = 0; j < upgrades.length; j++) {
            if (tempUpgrades[i] == upgrades[j]) {
                $("#upgrades").append("<div class='d-none' id='upgrade" + j + "'><button type='button' id='upgradeBtn" + j + "' class='btn btn-secondary btn-block disabled' onclick='upgradeClick(this);'>" + upgrades[j].name + "</button><p id='upgradeDesc" + j + "'>" + upgrades[j].desc + "</p></div>")
            }
        }
        for (var j = 0; j < bodyweight.upgrades.length; j++) {
            if (tempUpgrades[i] == bodyweight.upgrades[j]) {
                $("#upgrades").append("<div class='d-none' id='bwUpgrade" + j + "'><button type='button' id='bwUpgradeBtn" + j + "' class='btn btn-secondary btn-block disabled' onclick='bwUpgradeClick(this);'>" + bodyweight.upgrades[j].name + "</button><p id='bwUpgradeDesc" + j + "'>" + bodyweight.upgrades[j].desc + "</p></div>")
            }
        }
    }

    if (upgrades[0].isPurchased) {
        $("#coffee").removeClass("d-none");
    }

    for (var i = 0; i < research.upgrades.length; i++) {
        $("#resUpgrades").append("<div class='d-none' id='resUpgrade" + i + "'><button type='button' id='resUpgradeBtn" + i + "' class='btn btn-secondary btn-block disabled' onclick='resUpgradeClick(this);'>" + research.upgrades[i].name + "</button><p id='resUpgradeDesc" + i + "'>" + research.upgrades[i].desc + "</p></div>")
    }
});

var refreshId = setInterval(function () {
    $("#energyProgress").css("width", ((stats.energy.current / stats.energy.max) * 100) + "%");
    $("#energyProgress").html(stats.energy.current.toFixed(2) + "/" + stats.energy.max.toFixed(2));

    stats.energy.max = math.evaluate(stats.energy.originalMax + (stats.endurance * stats.enduranceBoost));

    if (stats.energy.coffee.isActive == true) {
        $("#coffeeBtn").html("COFFEE ACTIVATED! - " + (stats.energy.coffee.timer - stats.energy.coffee.current) + "s");
    }
    else if (stats.energy.coffee.isCooldown == true) {
        $("#coffeeBtn").html("coffee gone - " + (stats.energy.coffee.cooldown - stats.energy.coffee.current) + "s");
    }
    else {
        $("#coffeeBtn").html("Drink Coffee");
        clearInterval(coffeeTimerId);
    }

    if (checks.isResting) {
        $("#resting").html(" <em>(Resting)</em>");
        if (checks.story1 == false) {
            checks.story1 = true;
        }
        if (checks.story2 == false) {
            setupStory2();
        }
    }
    else {
        $("#resting").html("");
    }

    refreshProgressBars("pushup", bodyweight.pushups);
    refreshProgressBars("row", bodyweight.rows);
    refreshProgressBars("dip", bodyweight.dips);
    refreshProgressBars("pullup", bodyweight.pullups);
    refreshProgressBars("bwSquat", bodyweight.squats);
    refreshProgressBars("bwRdl", bodyweight.rdl);

    $("#makeVideoProgress").css("width", ((job.makeVideo.current / job.makeVideo.max) * 100) + "%");
    $("#influencerProgress").css("width", ((job.recruitInfluencers.current / job.recruitInfluencers.max) * 100) + "%");
    $("#browseRedditProgress").css("width", ((research.browseReddit.current / research.browseReddit.max) * 100) + "%");

    if (job.views > 100 && !checks.story3) {
        $("#story3").removeClass("d-none").addClass("show");
        checks.story3 = true;
    }

    $("#strength").html(stats.strength.toFixed(2));
    $("#endurance").html(stats.endurance.toFixed(2));
    $("#agility").html(stats.agility.toFixed(2));
    $("#intelligence").html(stats.intelligence.toFixed(2));

    stats.money < 1000000 ? $("#money").html(stats.money.toFixed(2)) : $("#money").html(math.format(stats.money, 5));

    $("#views").html(job.views.toFixed(2));
    $("#followers").html(job.followers.toFixed(2));
    $("#influencers").html(job.influencers.toFixed(2));

    $("#posts").html(research.posts.toFixed(2));
    $("#research").html(research.points.toFixed(2));

    for (var i = 0; i < job.upgrades.length; i++) {
        if (job.followers > (job.upgrades[i].cost / 4) && !job.upgrades[i].isPurchased) {
            // don't show rows unless rings are purchased
            if ((i == 3 && bodyweight.upgrades[1].isPurchased) || i != 3) {
                $("#jobUpgrade" + i).removeClass("d-none");
            }
            if (job.followers >= job.upgrades[i].cost) {
                $("#jobUpgradeBtn" + i).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#jobUpgradeBtn" + i).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            $("#jobUpgrade" + i).addClass("d-none");
        }
    }
    for (var i = 0; i < upgrades.length; i++) {
        if (stats.money > (upgrades[i].cost / 4) && !upgrades[i].isPurchased) {
            $("#upgrade" + i).removeClass("d-none");

            if (stats.money >= upgrades[i].cost) {
                $("#upgradeBtn" + i).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#upgradeBtn" + i).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            $("#upgrade" + i).addClass("d-none");
        }
    }

    for (var i = 0; i < bodyweight.upgrades.length; i++) {
        if (stats.money > (bodyweight.upgrades[i].cost / 4) && !bodyweight.upgrades[i].isPurchased) {
            $("#bwUpgrade" + i).removeClass("d-none");

            if (stats.money >= bodyweight.upgrades[i].cost) {
                $("#bwUpgradeBtn" + i).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#bwUpgradeBtn" + i).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            $("#bwUpgrade" + i).addClass("d-none");
        }
    }

    for (var i = 0; i < research.upgrades.length; i++) {
        if (research.points > (research.upgrades[i].cost / 4) && !research.upgrades[i].isPurchased) {
            $("#resUpgrade" + i).removeClass("d-none");

            if (research.points >= research.upgrades[i].cost) {
                $("#resUpgradeBtn" + i).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#resUpgradeBtn" + i).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            $("#resUpgrade" + i).addClass("d-none");
        }
    }

}, 50);

function refreshProgressBars(text, exercise) {
    $("#" + text + "Progress").css("width", ((exercise.current / exercise.max) * 100) + "%");
    $("#" + text + "UpgradeProgress").css("width", ((exercise.total / exercise.tiers[exercise.tier].upgrade) * 100) + "%");
    $("#" + text + "Text").html(exercise.tiers[exercise.tier].name);
}

var energyTimerId = setInterval(function () {
    if (stats.energy.current < stats.energy.max) {
        var increase = math.evaluate(stats.energy.increase + (stats.agility * stats.agilityBoost));
        if (math.evaluate(stats.energy.current + increase) > stats.energy.max) {
            stats.energy.current = stats.energy.max;
        }
        else {
            if (stats.energy.coffee.isActive) {
                if ((stats.energy.current + (increase * stats.energy.coffee.boost)) > stats.energy.max) {
                    stats.energy.current = stats.energy.max;
                }
                else {
                    stats.energy.current = math.evaluate(stats.energy.current + (increase * stats.energy.coffee.boost));
                }
            }
            else {
                stats.energy.current = math.evaluate(stats.energy.current + increase);
            }
        }
    }
    else {
        checks.isResting = false;
    }
}, stats.energy.speed)

function setupPushupTimer() {
    pushupTimerId = setInterval(function () {
        exerciseTick(bodyweight.pushups);
    }, bodyweight.pushups.speed / bodyweight.pushups.speedModifier);
}

function setupRowTimer() {
    rowTimerId = setInterval(function () {
        exerciseTick(bodyweight.rows);
    }, bodyweight.rows.speed / bodyweight.rows.speedModifier);
}

function setupDipTimer() {
    dipTimerId = setInterval(function () {
        exerciseTick(bodyweight.dips);
    }, bodyweight.dips.speed / bodyweight.dips.speedModifier);
}

function setupPullupTimer() {
    pullupTimerId = setInterval(function () {
        exerciseTick(bodyweight.pullups);
    }, bodyweight.pullups.speed / bodyweight.pullups.speedModifier);
}

function setupBwRdlTimer() {
    bwRdlTimerId = setInterval(function () {
        exerciseTick(bodyweight.rdl);
    }, bodyweight.pullups.speed / bodyweight.pullups.speedModifier);
}

function setupBwSquatTimer() {
    bwSquatTimerId = setInterval(function () {
        exerciseTick(bodyweight.squats);
    }, bodyweight.pullups.speed / bodyweight.pullups.speedModifier);
}


function exerciseTick(exercise) {
    if (stats.energy.current < exercise.energy && exercise.current == 0) {
        checks.isResting = true;
    }

    if (!checks.isResting || exercise.current != 0) {
        if (exercise.current == 0) {
            stats.energy.current = math.evaluate(stats.energy.current - exercise.energy);
        }
        if (exercise.current < exercise.max) {
            exercise.current = math.evaluate(exercise.current + exercise.increase);
        }
        else {
            var totalToAdd = math.evaluate(1 + (stats.strength * stats.strengthBoost))
            exercise.total = math.evaluate(exercise.total + totalToAdd);
            if (exercise.total > exercise.tiers[exercise.tier].upgrade && exercise.tier != 4) {
                exercise.strength *= exercise.tiers[exercise.tier].multiplier * totalToAdd;
                exercise.endurance *= exercise.tiers[exercise.tier].multiplier * totalToAdd;
                exercise.agility *= exercise.tiers[exercise.tier].multiplier * totalToAdd;
                exercise.tier += 1;
            }
            stats.strength = math.evaluate(stats.strength + exercise.strength + (stats.intelligence * stats.intelligenceBoost));
            stats.endurance = math.evaluate(stats.endurance + exercise.endurance + (stats.intelligence * stats.intelligenceBoost));
            stats.agility = math.evaluate(stats.agility + exercise.agility + (stats.intelligence * stats.intelligenceBoost));
            exercise.current = 0;
        }
    }
}

function setupJobTimer() {
    makeVideoTimerId = setInterval(function () {
        if (job.makeVideo.current < job.makeVideo.max) {
            job.makeVideo.current = math.evaluate(job.makeVideo.current + job.makeVideo.increase);
        }
        else {
            job.makeVideo.total += 1;
            job.followers = math.evaluate(job.followers + job.followerGrowth + (bodyweight.pushups.total * job.pushupFollowerMod) + (bodyweight.rows.total * job.rowFollowerMod) + (bodyweight.dips.total * job.dipFollowerMod) + (bodyweight.pullups.total * job.pullupFollowerMod) + (bodyweight.squats.total * job.bwSquatFollowerMod) + (bodyweight.rdl.total * job.bwRdlFollowerMod) + ((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost));
            job.views = math.evaluate(job.views + (job.viewGrowth * job.followers));
            job.makeVideo.current = 0;
        }
    }, job.makeVideo.speed / job.makeVideo.speedModifier);
}

function setupInfluencerTimer() {
    influencerId = setInterval(function () {
        if (job.recruitInfluencers.current < job.recruitInfluencers.max) {
            job.recruitInfluencers.current = math.evaluate(job.recruitInfluencers.current + job.recruitInfluencers.increase);
        }
        else {
            job.recruitInfluencers.total += 1;
            job.influencers += job.influencerGrowth;
            job.recruitInfluencers.current = 0;
        }
    }, job.recruitInfluencers.speed / job.recruitInfluencers.speedModifier);
}

function setupInfluencerFollowerGrowthTimer() {
    influencerFollowerId = setInterval(function () {
            job.followerGrowth += math.evaluate(job.influencers * job.influencerMulti);
    }, job.influencerSpeed);
}

function setupMoneyTimer() {
    moneyTimerId = setInterval(function () {
        if (math.evaluate(stats.money + (job.views * job.moneyGrowth) - job.moneyDrain) > 0) {
            stats.money = math.evaluate(stats.money + (job.views * job.moneyGrowth) - job.moneyDrain);
        }
        else {
            stats.money = 0;
        }

    }, job.moneySpeed);
}

function setupBrowseRedditTimer() {
    browseRedditTimerId = setInterval(function () {
        if (research.browseReddit.current < research.browseReddit.max) {
            research.browseReddit.current = math.evaluate(research.browseReddit.current + research.browseReddit.increase);
        }
        else {
            research.browseReddit.total += 1;
            research.posts = math.evaluate(research.posts + research.postGrowth + (stats.intelligence * stats.intelligenceBoost));
            stats.intelligence = math.evaluate(stats.intelligence + research.browseReddit.intelligence);
            research.browseReddit.current = 0;
        }
    }, research.browseReddit.speed / research.browseReddit.speedModifier);
}

function setupResearchTimer() {
    researchTimerId = setInterval(function () {
        research.points = math.evaluate(research.points + (research.posts * research.pointGrowth));
    }, research.pointSpeed);
}

function setupStory2() {
    checks.story2 = true;
    $("#story2").removeClass("d-none").addClass("show");
    $("#work-tab").removeClass("d-none");
    setupJobTimer();
    setupMoneyTimer();
}

function drinkCoffee() {
    if (!$("#coffeeBtn").hasClass("disabled")) {
        $("#coffeeBtn").addClass("disabled");
        stats.energy.coffee.total += 1;
        stats.energy.coffee.isActive = true;
        stats.energy.coffee.isCooldown = true;
        coffeeTimerId = setInterval(function () {
            if (stats.energy.coffee.current < stats.energy.coffee.timer) {
                stats.energy.coffee.current += 1;
            }
            else {
                stats.energy.coffee.isActive = false;
                if (stats.energy.coffee.current < stats.energy.coffee.cooldown) {
                    stats.energy.coffee.current += 1;
                }
                else {
                    stats.energy.coffee.current = 0;
                    stats.energy.coffee.isCooldown = false;
                    $("#coffeeBtn").removeClass("disabled");
                }
            }
        }, 1000);
    }
}

function upgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("upgradeBtn")[1]);
        switch (id) {
            case 0:
                upgrades[id].isPurchased = true;
                $("#coffee").removeClass("d-none");
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                break;
            case 1:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.energy.coffee.boost *= 2;
                break;
            case 2:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.energy.increase *= 2;
                job.moneyDrain += .01;
                break;
            case 3:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.strengthBoost *= 2;
                job.moneyDrain += .02
                break;
            case 4:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.enduranceBoost *= 2;
                job.moneyDrain += .03
                break;
            case 5:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.agilityBoost *= 2;
                job.moneyDrain += .04
                break;
            case 6:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.intelligenceBoost *= 2;
                job.moneyDrain += .05
                break;
            case 7:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.allStatBoost *= 2;
                job.moneyDrain += .06
                break;
            case 8:
                upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[id].cost);
                stats.energy.increase *= 2;
                job.moneyDrain += .07
                break;
            default:
        }
    }
}

function bwUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("bwUpgradeBtn")[1]);
        switch (id) {
            case 0:
                bodyweight.upgrades[id].isPurchased = true;
                bodyweight.pushups.speedModifier *= 2;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                clearInterval(pushupTimerId);
                setupPushupTimer();
                break;
            case 1:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                $("#bwRows").removeClass("d-none");
                setupRowTimer();
                break;
            case 2:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.pushups.energy /= 2;
                bodyweight.rows.energy /= 2;
                break;
            case 3:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.rows.speedModifier *= 2;
                clearInterval(rowTimerId);
                setupRowTimer();
                break;
            case 4:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                $("#bwPullups").removeClass("d-none");
                setupPullupTimer();
                break;
            case 5:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.pullups.speedModifier *= 2;
                clearInterval(pullupTimerId);
                setupPullupTimer();
                break;
            case 6:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.dips.speedModifier *= 2;
                clearInterval(dipTimerId);
                setupDipTimer();
                break;
            case 7:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.pullups.energy /= 2;
                break;
            case 8:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.dips.energy /= 2;
                break;
            case 9:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.squats.speedModifier *= 2;
                clearInterval(bwSquatTimerId);
                setupBwSquatTimer();
                break;
            case 10:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.rdl.speedModifier *= 2;
                clearInterval(bwRdlTimerId);
                setupBwRdlTimer();
                break;
            case 11:
                bodyweight.upgrades[id].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[id].cost);
                bodyweight.rdl.energy /= 2;
                bodyweight.squats.energy /= 2;
                break;
            default:
        }
    }
}

function jobUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("jobUpgradeBtn")[1]);
        switch (id) {
            case 0:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.views += 5000;
                break;
            case 1:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.makeVideo.speedModifier *= 2;
                clearInterval(makeVideoTimerId);
                setupJobTimer();
                break;
            case 2:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.pushupFollowerMod += .0001;
                break;
            case 3:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.rowFollowerMod += .0001;
                break;
            case 4:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                setupBrowseRedditTimer();
                setupResearchTimer();
                $("#research-tab").removeClass("d-none");
                $("#researchText").removeClass("d-none");
                $("#story4").removeClass("d-none").addClass("show");
                checks.story4 = true;
                break;
            case 5:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.viewGrowth *= 2;
                break;
            case 6:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.moneyGrowth *= 2;
                break;
            case 7:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                stats.allStatBoost *= 2;
                break;
            case 8:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                research.browseReddit.intelligence *= 2;
                break;
            case 9:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.makeVideo.viewGrowth *= 2;
                break;
            case 10:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.pullupFollowerMod += .0001;
                break;
            case 11:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.dipFollowerMod += .0001;
                break;
            case 12:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.bwSquatFollowerMod += .0001;
                break;
            case 13:
                job.upgrades[id].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[id].cost);
                job.bwRdlFollowerMod += .0001;
                break;
            default:
        }
    }
}

function resUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("resUpgradeBtn")[1]);
        switch (id) {
            case 0:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                job.followerGrowth *= 2;
                break;
            case 1:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                stats.energy.increase *= 2;
                break;
            case 2:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                research.pointGrowth *= 2;
                break;
            case 3:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                job.moneyGrowth *= 2;
                break;
            case 4:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                $("#bwDips").removeClass("d-none");
                setupDipTimer();
                break;
            case 5:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                stats.strengthBoost *= 2;
                break;
            case 6:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                research.pointGrowth *= 2;
                break;
            case 7:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                stats.agilityBoost *= 2;
                break;
            case 8:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                stats.enduranceBoost *= 2;
                break;
            case 9:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                stats.intelligenceBoost *= 2;
                break;
            case 10:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                $("#influencerWrap").removeClass("d-none");
                setupInfluencerTimer();
                setupInfluencerFollowerGrowthTimer();
                break;
            case 11:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                $("#bwRdl").removeClass("d-none");
                $("#bwSquats").removeClass("d-none");
                setupBwSquatTimer();
                setupBwRdlTimer();
                break;
            case 12:
                research.upgrades[id].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[id].cost);
                research.browseReddit.intelligence *= 2;
                break;
            default:
        }
    }
}
