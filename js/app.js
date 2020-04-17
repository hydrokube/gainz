var pushupTimerId;
var rowTimerId;
var makeVideoTimerId;
var moneyTimerId;
var browseRedditTimerId;
var researchTimerId
var coffeeTimerId;

// switch disabled buttons to grey
// review research point growth
// more upgrades

var stats = {
    energy: {
        current: 10,
        increase: 0.1,
        speed: 5000,
        max: 10,
        originalMax: 10,
        enduranceBoost: .1,
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
    endurance: 0,
    agility: 0,
    intelligence: 0,
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
    followers: 0.00,
    views: 0.00,
    followerGrowth: .1,
    viewGrowth: .001,
    moneyGrowth: .00001,
    moneySpeed: 1000,
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
            desc: "<strong>Cost: 1 followers</strong> - Double your work speed.",
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
            desc: "<strong>Cost: 10 followers</strong> - Double your money per view.",
            cost: 10,
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
        intelligence: .1,
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
            desc: "<strong>Cost: 1 research</strong> - Market your channel in your posts to double money growth.",
            cost: 1,
        },
        {
            isPurchased: false,
            name: "Sleeping Better",
            desc: "<strong>Cost: 1 research</strong> - It's time to get serious about sleep hygiene. Double your energy recovery.",
            cost: 2.5,
        },
        {
            isPurchased: false,
            name: "Sort Comments by Best",
            desc: "<strong>Cost: 5 followers</strong> - Double your research speed.",
            cost: 5,
        },
        {
            isPurchased: false,
            name: "Put Ads on Videos",
            desc: "<strong>Cost: 7.5 followers</strong> - Double your money per view.",
            cost: 7.5,
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
    if (checks.story3) {
        //$("#story").addClass("d-none");
    }
    if (checks.story4) {
        setupBrowseRedditTimer();
        setupResearchTimer();
        $("#research-tab").removeClass("d-none");
        $("researchText").removeClass("d-none");
    }
    if (bodyweight.upgrades[1].isPurchased) {
        $("#bwRows").removeClass("d-none");
        setupRowTimer();
    }



    for (var i = 0; i < job.upgrades.length; i++) {
        $("#jobUpgrade" + i + "Btn").html(job.upgrades[i].name);
        $("#jobUpgrade" + i + "Desc").html(job.upgrades[i].desc);
    }

    for (var i = 0; i < upgrades.length; i++) {
        $("#upgrade" + i + "Btn").html(upgrades[i].name);
        $("#upgrade" + i + "Desc").html(upgrades[i].desc);

        if (upgrades[0].isPurchased) {
            $("#coffee").removeClass("d-none");
        }
    }

    for (var i = 0; i < bodyweight.upgrades.length; i++) {
        $("#bwUpgrade" + i + "Btn").html(bodyweight.upgrades[i].name);
        $("#bwUpgrade" + i + "Desc").html(bodyweight.upgrades[i].desc);
    }

    for (var i = 0; i < research.upgrades.length; i++) {
        $("#resUpgrade" + i + "Btn").html(research.upgrades[i].name);
        $("#resUpgrade" + i + "Desc").html(research.upgrades[i].desc);
    }
});

var refreshId = setInterval(function () {
    $("#energyProgress").css("width", ((stats.energy.current / stats.energy.max) * 100) + "%");
    $("#energyProgress").html(stats.energy.current.toFixed(2) + "/" + stats.energy.max.toFixed(2));

    stats.energy.max = math.evaluate(stats.energy.originalMax + (stats.endurance * stats.energy.enduranceBoost));

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
    }
    else {
        $("#resting").html("");
    }

    $("#pushupProgress").css("width", ((bodyweight.pushups.current / bodyweight.pushups.max) * 100) + "%");
    $("#pushupUpgradeProgress").css("width", ((bodyweight.pushups.total / bodyweight.pushups.tiers[bodyweight.pushups.tier].upgrade) * 100) + "%");
    $("#pushupText").html(bodyweight.pushups.tiers[bodyweight.pushups.tier].name);

    $("#rowProgress").css("width", ((bodyweight.rows.current / bodyweight.rows.max) * 100) + "%");
    $("#rowUpgradeProgress").css("width", ((bodyweight.rows.total / bodyweight.rows.tiers[bodyweight.rows.tier].upgrade) * 100) + "%");
    $("#rowText").html(bodyweight.rows.tiers[bodyweight.rows.tier].name);

    $("#makeVideoProgress").css("width", ((job.makeVideo.current / job.makeVideo.max) * 100) + "%");

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

    $("#posts").html(research.posts.toFixed(2));
    $("#research").html(research.points.toFixed(2));

    for (var i = 0; i < job.upgrades.length; i++) {
        if (job.followers > (job.upgrades[i].cost / 10) && !job.upgrades[i].isPurchased) {
            // don't show rows unless rings are purchased
            if ((i == 3 && bodyweight.upgrades[1].isPurchased) || i != 3) {
                $("#jobUpgrade" + i).removeClass("d-none");
            }
            if (job.followers >= job.upgrades[i].cost) {
                $("#jobUpgrade" + i + "Btn").removeClass("disabled");
            }
            else {
                $("#jobUpgrade" + i + "Btn").addClass("disabled");
            }
        }
        else if (job.upgrades[i].isPurchased) {
            $("#jobUpgrade" + i).addClass("d-none");
        }
    }
    for (var i = 0; i < upgrades.length; i++) {
        if (stats.money > (upgrades[i].cost / 10) && !upgrades[i].isPurchased) {
            $("#upgrade" + i).removeClass("d-none");

            if (stats.money >= upgrades[i].cost) {
                $("#upgrade" + i + "Btn").removeClass("disabled");
            }
            else {
                $("#upgrade" + i + "Btn").addClass("disabled");
            }
        }
        else {
            $("#upgrade" + i).addClass("d-none");
        }
    }

    for (var i = 0; i < bodyweight.upgrades.length; i++) {
        if (stats.money > (bodyweight.upgrades[i].cost / 10) && !bodyweight.upgrades[i].isPurchased) {
            $("#bwUpgrade" + i).removeClass("d-none");

            if (stats.money >= bodyweight.upgrades[i].cost) {
                $("#bwUpgrade" + i + "Btn").removeClass("disabled");
            }
            else {
                $("#bwUpgrade" + i + "Btn").addClass("disabled");
            }
        }
        else {
            $("#bwUpgrade" + i).addClass("d-none");
        }
    }

    for (var i = 0; i < research.upgrades.length; i++) {
        if (research.points > (research.upgrades[i].cost / 10) && !research.upgrades[i].isPurchased) {
            $("#resUpgrade" + i).removeClass("d-none");

            if (research.points >= research.upgrades[i].cost) {
                $("#resUpgrade" + i + "Btn").removeClass("disabled");
            }
            else {
                $("#resUpgrade" + i + "Btn").addClass("disabled");
            }
        }
        else {
            $("#resUpgrade" + i).addClass("d-none");
        }
    }

}, 50);

var energyTimerId = setInterval(function () {
    if (stats.energy.current < stats.energy.max) {
        if (math.evaluate(stats.energy.current + stats.energy.increase) > stats.energy.max) {
            stats.energy.current = stats.energy.max;
        }
        else {
            if (stats.energy.coffee.isActive) {
                if ((stats.energy.current + (stats.energy.increase * stats.energy.coffee.boost)) > stats.energy.max) {
                    stats.energy.current = stats.energy.max;
                }
                else {
                    stats.energy.current = math.evaluate(stats.energy.current + (stats.energy.increase * stats.energy.coffee.boost));
                }
            }
            else {
                stats.energy.current = math.evaluate(stats.energy.current + stats.energy.increase);
            }

        }
    }
    else {
        checks.isResting = false;
    }
}, stats.energy.speed)

function setupPushupTimer() {
    pushupTimerId = setInterval(function () {
        pushupTick();
    }, bodyweight.pushups.speed / bodyweight.pushups.speedModifier);
}


function pushupTick() {
    if (stats.energy.current < bodyweight.pushups.energy && bodyweight.pushups.current == 0) {
        checks.isResting = true;
        if (checks.story1 == false) {
            checks.story1 = true;
        }

        if (checks.story2 == false) {
            setupStory2();
        }
    }

    if (!checks.isResting || bodyweight.pushups.current != 0) {
        if (bodyweight.pushups.current == 0) {
            stats.energy.current = math.evaluate(stats.energy.current - bodyweight.pushups.energy);
        }
        if (bodyweight.pushups.current < bodyweight.pushups.max) {
            bodyweight.pushups.current = math.evaluate(bodyweight.pushups.current + bodyweight.pushups.increase);
        }
        else {
            bodyweight.pushups.total += 1;
            if (bodyweight.pushups.total > bodyweight.pushups.tiers[bodyweight.pushups.tier].upgrade && bodyweight.pushups.tier != 4) {
                bodyweight.pushups.strength *= bodyweight.pushups.tiers[bodyweight.pushups.tier].multiplier;
                bodyweight.pushups.endurance *= bodyweight.pushups.tiers[bodyweight.pushups.tier].multiplier;
                bodyweight.pushups.agility *= bodyweight.pushups.tiers[bodyweight.pushups.tier].multiplier;
                bodyweight.pushups.tier += 1;
            }
            stats.strength = math.evaluate(stats.strength + bodyweight.pushups.strength);
            stats.endurance = math.evaluate(stats.endurance + bodyweight.pushups.endurance);
            stats.agility = math.evaluate(stats.agility + bodyweight.pushups.agility);
            bodyweight.pushups.current = 0;
        }
    }
}

function setupRowTimer() {
    rowTimerId = setInterval(function () {
        rowTick();
    }, bodyweight.rows.speed / bodyweight.rows.speedModifier);
}


function rowTick() {
    if (stats.energy.current < bodyweight.rows.energy && bodyweight.rows.current == 0) {
        checks.isResting = true;
    }

    if (!checks.isResting || bodyweight.rows.current != 0) {
        if (bodyweight.rows.current == 0) {
            stats.energy.current = math.evaluate(stats.energy.current - bodyweight.rows.energy);
        }
        if (bodyweight.rows.current < bodyweight.rows.max) {
            bodyweight.rows.current = math.evaluate(bodyweight.rows.current + bodyweight.rows.increase);
        }
        else {
            bodyweight.rows.total += 1;
            if (bodyweight.rows.total > bodyweight.rows.tiers[bodyweight.rows.tier].upgrade && bodyweight.rows.tier != 4) {
                bodyweight.rows.strength *= bodyweight.rows.tiers[bodyweight.rows.tier].multiplier;
                bodyweight.rows.endurance *= bodyweight.rows.tiers[bodyweight.rows.tier].multiplier;
                bodyweight.rows.agility *= bodyweight.rows.tiers[bodyweight.rows.tier].multiplier;
                bodyweight.rows.tier += 1;
            }
            stats.strength = math.evaluate(stats.strength + bodyweight.rows.strength);
            stats.endurance = math.evaluate(stats.endurance + bodyweight.rows.endurance);
            stats.agility = math.evaluate(stats.agility + bodyweight.rows.agility);
            bodyweight.rows.current = 0;
        }
    }
}

function setupStory2() {
    checks.story2 = true;
    $("#story2").removeClass("d-none").addClass("show");
    $("#work-tab").removeClass("d-none");
    setupJobTimer();
    setupMoneyTimer();
}


function setupJobTimer() {
    makeVideoTimerId = setInterval(function () {
        if (job.makeVideo.current < job.makeVideo.max) {
            job.makeVideo.current = math.evaluate(job.makeVideo.current + job.makeVideo.increase);
        }
        else {
            job.makeVideo.total += 1;
            if (job.upgrades[2].isPurchased && job.upgrades[3].isPurchased) {
                job.followers = math.evaluate(job.followers + job.followerGrowth + (bodyweight.pushups.total * .0001) + (bodyweight.rows.total * .0001));
            }
            else if (job.upgrades[2].isPurchased) {
                job.followers = math.evaluate(job.followers + job.followerGrowth + (bodyweight.pushups.total * .0001));
            }
            else if (job.upgrades[3].isPurchased) {
                job.followers = math.evaluate(job.followers + job.followerGrowth + (bodyweight.rows.total * .0001));
            }
            else {
                job.followers = math.evaluate(job.followers + job.followerGrowth);
            }

            job.views = math.evaluate(job.views + (job.viewGrowth * job.followers));

            job.makeVideo.current = 0;
        }
    }, job.makeVideo.speed / job.makeVideo.speedModifier);
}

function setupMoneyTimer() {
    moneyTimerId = setInterval(function () {
        if (upgrades[2].isPurchased) {
            if (math.evaluate(stats.money + (job.views * job.moneyGrowth) - .01) > 0) {
                stats.money = math.evaluate(stats.money + (job.views * job.moneyGrowth) - .01);
            }
            else {
                stats.money = 0;
            }
        }
        else {
            stats.money = math.evaluate(stats.money + (job.views * job.moneyGrowth));
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
            research.posts = math.evaluate(research.posts + research.postGrowth);
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

// function tryHarder(button) {
//     if (!$("#tryHarderBtn").hasClass("disabled")) {
//         if (!checks.isResting && (stats.energy.current - stats.energy.tryHarderCost) > 0) {
//             stats.energy.current = math.evaluate(stats.energy.current - stats.energy.tryHarderCost);
//             pushupTick();
//             rowTick();
//         }
//     }
// }

function jobUpgradeClick(button) {
    // get id and set it
    var id = $(button).attr("id");
    //var id = parseInt(buttonId.substring(buttonId.lastIndexOf("Upgrade") + 1, buttonId.lastIndexOf("Btn")));
    //console.log(buttonId.lastIndexOf("Upgrade") + 1);
    //console.log(buttonId.lastIndexOf("Btn"));
    //console.log(id);
    if (!$(button).hasClass("disabled")) {
        
        switch (id) {
            case "jobUpgrade0Btn":
                job.upgrades[0].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[0].cost);
                job.views += 5000;
                break;
            case "jobUpgrade1Btn":
                job.upgrades[1].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[1].cost);
                job.makeVideo.speedModifier *= 2;
                clearInterval(makeVideoTimerId);
                setupJobTimer();
                break;
            case "jobUpgrade2Btn":
                job.upgrades[2].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[2].cost);
                break;
            case "jobUpgrade3Btn":
                job.upgrades[3].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[3].cost);
                break;
            case "jobUpgrade4Btn":
                job.upgrades[4].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[4].cost);
                setupBrowseRedditTimer();
                setupResearchTimer();
                $("#research-tab").removeClass("d-none");
                $("#researchText").removeClass("d-none");
                $("#story4").removeClass("d-none").addClass("show");
                checks.story4 = true;
                break;
            case "jobUpgrade5Btn":
                job.upgrades[5].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[5].cost);
                job.viewGrowth *= 2;
                break;
            case "jobUpgrade6Btn":
                job.upgrades[6].isPurchased = true;
                job.followers = math.evaluate(job.followers - job.upgrades[6].cost);
                job.moneyGrowth *= 2;
            default:
        }
    }
}

function upgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var id = $(button).attr("id");
        switch (id) {
            case "upgrade0Btn":
                upgrades[0].isPurchased = true;
                $("#coffee").removeClass("d-none");
                stats.money = math.evaluate(stats.money - upgrades[0].cost);
                break;
            case "upgrade1Btn":
                upgrades[1].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[1].cost);
                stats.energy.coffee.boost *= 2;
                break;
            case "upgrade2Btn":
                upgrades[2].isPurchased = true;
                stats.money = math.evaluate(stats.money - upgrades[2].cost);
                stats.energy.increase *= 2;
                break;
            default:
        }
    }
}

function bwUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var id = $(button).attr("id");
        switch (id) {
            case "bwUpgrade0Btn":
                bodyweight.upgrades[0].isPurchased = true;
                bodyweight.pushups.speedModifier *= 2;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[0].cost);
                clearInterval(pushupTimerId);
                setupPushupTimer();
                break;
            case "bwUpgrade1Btn":
                bodyweight.upgrades[1].isPurchased = true;
                stats.money = math.evaluate(stats.money - bodyweight.upgrades[0].cost);
                $("#bwRows").removeClass("d-none");
                setupRowTimer();
                break;
            default:
        }
    }
}

function resUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var id = $(button).attr("id");
        switch (id) {
            case "resUpgrade0Btn":
                research.upgrades[0].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[0].cost);
                job.moneyGrowth *= 2;
                break;
            case "resUpgrade1Btn":
                research.upgrades[1].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[1].cost);
                stats.energy.increase *= 2;
                break;
            case "resUpgrade2Btn":
                research.upgrades[2].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[2].cost);
                research.pointGrowth *= 2;
                break;
            case "resUpgrade3Btn":
                research.upgrades[3].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[3].cost);
                break;
            case "resUpgrade4Btn":
                research.upgrades[4].isPurchased = true;
                research.points = math.evaluate(research.points - research.upgrades[4].cost);
                break;
            default:
        }
    }
}
