var energyTimerId;
var pushupTimerId;
var rowTimerId;
var dipTimerId;
var pullupTimerId;
var bwRdlTimerId;
var bwSquatTimerId;
var makeVideoTimerId;
var influencerId;
var oneSecondTimerId;
var browseRedditTimerId;
var codeBotsTimerId;
var coffeeTimerId;


/* 
 QoL

    buttons to pause exercises
    start a discord
    favicon
    move javascript local

Future

    Unique researches, upgrades for each
    general upgrades, and exercise modality specific upgrades
    Gym
        Franchise points grow very slowly
        Franchise points give boosts across entire game
        Spent on gym upgrades that are persistent
    lifting
        run comps 
        leadership stat that increases the stat growth of all proteges
        competitions will give you money
        each upgrade gives 1.01* the energy cost and stat boost
    bodyweight
        start a street workout gang
        notoriety? stat that increases money gain 
    yoga
        Run through routines and different types of yoga
        Flexibility that increases a stat or resource of your choice, unlock ability to add another eventually. 
        What to do for competition-style stuff?
    cardio  
        exercises are of varying speeds, run through different types of training before upgrading. 
        Setup races and compete in them to increase
        overall tick speed for that run
        speed stat that grows and adds to all tick speeds

Optional/Maybe

    good/evil path for follower upgrades
    show upgrades?
    offline time

*/

$(document).ready(function () {
    load(null);
});

function save() {
    var date = new Date();
    stats.saveTime = date.getTime();
    var saveData = [stats, bodyweight, upgrades, job, research, checks, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    localStorage.setItem("gainz", JSON.stringify(saveData));

    $("#saveWrapper").html("<div id='saveAlert' class='alert alert-success alert-dismissible fade show' role='alert'><strong>Saved</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>")
    $("#saveAlert").alert();
    setTimeout(function () {
        $("#saveAlert").alert('close');
    }, 5000);

}

function loadReset() {
    clearInterval(energyTimerId);
    clearInterval(pushupTimerId);
    clearInterval(rowTimerId);
    clearInterval(dipTimerId);
    clearInterval(pullupTimerId);
    clearInterval(bwRdlTimerId);
    clearInterval(bwSquatTimerId);
    clearInterval(makeVideoTimerId);
    clearInterval(influencerId);
    clearInterval(oneSecondTimerId);
    clearInterval(browseRedditTimerId);
    clearInterval(codeBotsTimerId);
    clearInterval(coffeeTimerId);
    $("#work-tab").addClass("d-none");
    $("#followerWrap").removeClass("d-none");
    $("#research-tab").addClass("d-none");
    $("#researchText").addClass("d-none");
    $("#bwRows").addClass("d-none");
    $("#bwDips").addClass("d-none");
    $("#bwPullups").addClass("d-none");
    $("#bwRdl").addClass("d-none");
    $("#bwSquats").addClass("d-none");
    $("#influencerWrap").addClass("d-none");
    $("#botWrap").addClass("d-none");
    $("#deload-tab").addClass("d-none");
    $("#jobUpgrades").html("");
    $("#upgrades").html("");
    $("#resUpgrades").html("");
    $("#coffee").addClass("d-none");
    $("#story").html("");
}

function load(button) {
    var saveData = JSON.parse(localStorage.getItem("gainz"));

    if (button != null) {
        loadReset();
    }

    if (saveData != null) {
        var saveDataId = 1;
        for (var i = 0; bodyweight.upgrades.length > i; i++) {
            for (var j = 0; saveData[saveDataId].upgrades.length > j; j++) {
                if (bodyweight.upgrades[i].id == saveData[saveDataId].upgrades[j].id) {
                    saveData[saveDataId].upgrades[j].name = bodyweight.upgrades[i].name;
                    saveData[saveDataId].upgrades[j].desc = bodyweight.upgrades[i].desc;
                    saveData[saveDataId].upgrades[j].cost = bodyweight.upgrades[i].cost;
                }
            }
        }
        saveDataId = 2;
        for (var i = 0; upgrades.length > i; i++) {
            for (var j = 0; saveData[saveDataId].length > j; j++) {
                if (upgrades[i].id == saveData[saveDataId][j].id) {
                    saveData[saveDataId][j].name = upgrades[i].name;
                    saveData[saveDataId][j].desc = upgrades[i].desc;
                    saveData[saveDataId][j].cost = upgrades[i].cost;
                }
            }
        }
        saveDataId = 3;
        for (var i = 0; job.upgrades.length > i; i++) {
            for (var j = 0; saveData[saveDataId].upgrades.length > j; j++) {
                if (job.upgrades[i].id == saveData[saveDataId].upgrades[j].id) {
                    saveData[saveDataId].upgrades[j].name = job.upgrades[i].name;
                    saveData[saveDataId].upgrades[j].desc = job.upgrades[i].desc;
                    saveData[saveDataId].upgrades[j].cost = job.upgrades[i].cost;
                }
            }
        }
        saveDataId = 4;
        for (var i = 0; research.upgrades.length > i; i++) {
            for (var j = 0; saveData[saveDataId].upgrades.length > j; j++) {
                if (research.upgrades[i].id == saveData[saveDataId].upgrades[j].id) {
                    saveData[saveDataId].upgrades[j].name = research.upgrades[i].name;
                    saveData[saveDataId].upgrades[j].desc = research.upgrades[i].desc;
                    saveData[saveDataId].upgrades[j].cost = research.upgrades[i].cost;
                }
            }
        }

        $.extend(true, stats, saveData[0]);
        $.extend(true, bodyweight, saveData[1]);
        $.extend(true, upgrades, saveData[2]);
        $.extend(true, job, saveData[3]);
        $.extend(true, research, saveData[4]);
        $.extend(true, checks, saveData[5]);
    }

    $('[data-toggle="tooltip"]').tooltip();

    setupEnergyTimer();
    setupPushupTimer();

    if (!checks.story1) {
        $("#story").append("<div id='story1' class='alert alert-primary alert-dismissible fade show' role='alert'><strong>Wow I'm out of shape!</strong> I'll do some pushups to get stronger.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
    }
    if (checks.story2) {
        $("#work-tab").removeClass("d-none");
        $("#followerWrap").removeClass("d-none");
        setupMakeVideoTimer();
        setupOneSecondTimer()
    }
    if (checks.story4) {
        setupBrowseRedditTimer();
        $("#research-tab").removeClass("d-none");
        $("#researchText").removeClass("d-none");
    }
    if (bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 1 })[0].isPurchased) {
        $("#bwRows").removeClass("d-none");
        setupRowTimer();
    }
    if (research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 4 })[0].isPurchased) {
        $("#bwDips").removeClass("d-none");
        setupDipTimer();
    }
    if (bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 4 })[0].isPurchased) {
        $("#bwPullups").removeClass("d-none");
        setupPullupTimer();
    }
    if (research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 11 })[0].isPurchased) {
        $("#bwRdl").removeClass("d-none");
        $("#bwSquats").removeClass("d-none");
        setupBwSquatTimer();
        setupBwRdlTimer();
    }
    if (research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 10 })[0].isPurchased) {
        $("#influencerWrap").removeClass("d-none");
        setupInfluencerTimer();
    }
    if (research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 13 })[0].isPurchased) {
        $("#botWrap").removeClass("d-none");
        setupCodeBotsTimer();
    }
    if (checks.story5) {
        $("#deload-tab").removeClass("d-none");
    }

    var tempUpgrades = job.upgrades;
    tempUpgrades.sort(function (a, b) {
        return a.cost > b.cost ? 1 : -1
    });

    for (var i = 0; i < tempUpgrades.length; i++) {
        var active = "";
        if (!tempUpgrades[i].isActive) {
            active = "d-none";
        }
        $("#jobUpgrades").append("<div class='" + active + "' id='jobUpgrade" + tempUpgrades[i].id + "'><button type='button' id='jobUpgradeBtn" + tempUpgrades[i].id + "' class='btn btn-secondary btn-block disabled' onclick='jobUpgradeClick(this);'>" + tempUpgrades[i].name + "</button><p id='jobUpgradeDesc" + tempUpgrades[i].id + "'>" + tempUpgrades[i].desc + "</p></div>")
    }

    tempUpgrades = upgrades;
    tempUpgrades = tempUpgrades.concat(bodyweight.upgrades);
    tempUpgrades.sort(function (a, b) {
        return a.cost > b.cost ? 1 : -1
    });

    for (var i = 0; i < tempUpgrades.length; i++) {
        for (var j = 0; j < upgrades.length; j++) {
            if (tempUpgrades[i] == upgrades[j]) {
                var active = "";
                if (!upgrades[j].isActive) {
                    active = "d-none";
                }
                $("#upgrades").append("<div class='" + active + "' id='upgrade" + upgrades[j].id + "'><button type='button' id='upgradeBtn" + upgrades[j].id + "' class='btn btn-secondary btn-block disabled' onclick='upgradeClick(this);'>" + upgrades[j].name + "</button><p id='upgradeDesc" + upgrades[j].id + "'>" + upgrades[j].desc + "</p></div>")
            }
        }
        for (var j = 0; j < bodyweight.upgrades.length; j++) {
            if (tempUpgrades[i] == bodyweight.upgrades[j]) {
                var active = "";
                if (!bodyweight.upgrades[j].isActive) {
                    active = "d-none";
                }
                $("#upgrades").append("<div class='" + active + "' id='bwUpgrade" + bodyweight.upgrades[j].id + "'><button type='button' id='bwUpgradeBtn" + bodyweight.upgrades[j].id + "' class='btn btn-secondary btn-block disabled' onclick='bwUpgradeClick(this);'>" + bodyweight.upgrades[j].name + "</button><p id='bwUpgradeDesc" + bodyweight.upgrades[j].id + "'>" + bodyweight.upgrades[j].desc + "</p></div>")
            }
        }
    }

    tempUpgrades = research.upgrades;
    tempUpgrades.sort(function (a, b) {
        return a.cost > b.cost ? 1 : -1
    });

    for (var i = 0; i < tempUpgrades.length; i++) {
        var active = "";
        if (!tempUpgrades[i].isActive) {
            active = "d-none";
        }
        $("#resUpgrades").append("<div class='" + active + "' id='resUpgrade" + tempUpgrades[i].id + "'><button type='button' id='resUpgradeBtn" + tempUpgrades[i].id + "' class='btn btn-secondary btn-block disabled' onclick='resUpgradeClick(this);'>" + tempUpgrades[i].name + "</button><p id='resUpgradeDesc" + tempUpgrades[i].id + "'>" + tempUpgrades[i].desc + "</p></div>")
    }

    if (upgrades.filter(function (upgradeArray) { return upgradeArray.id == 0 })[0].isPurchased) {
        $("#coffee").removeClass("d-none");
    }

    if (stats.energy.coffee.isActive || stats.energy.coffee.isCooldown) {
        setupCoffeeTimer();
    }

    if (button != null) {
        $("#loadWrapper").html("<div id='loadAlert' class='alert alert-info alert-dismissible fade show' role='alert'><strong>Loaded.</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>")
        $("#loadAlert").alert();
        setTimeout(function () {
            $("#loadAlert").alert('close');
        }, 5000);
    }
}

function reset() {
    if (confirm("Are you sure you want to reset your save data?")) {
        localStorage.removeItem("gainz");

        stats = JSON.parse(JSON.stringify(baseStats));;
        bodyweight = JSON.parse(JSON.stringify(baseBodyweight));;
        upgrades = JSON.parse(JSON.stringify(baseUpgrades));;
        job = JSON.parse(JSON.stringify(baseJob));;
        research = JSON.parse(JSON.stringify(baseResearch));;
        checks = JSON.parse(JSON.stringify(baseChecks));;

        loadReset();
        load(null);

        $("#resetWrapper").html("<div id='resetAlert' class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Game Reset.</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>")
        $("#resetAlert").alert();
        setTimeout(function () {
            $("#resetAlert").alert('close');
        }, 5000);
    }
}


var refreshId = setInterval(function () {
    var energyPerSecond = math.evaluate((stats.energy.increase * ((stats.agility * stats.agilityBoost) + 1)) / (stats.energy.energyAdjust / 2))
    var energyCurrent = stats.energy.current < 1000000 ? stats.energy.current.toFixed(2) : math.format(stats.energy.current, 3);
    var energyMax = stats.energy.max < 1000000 ? stats.energy.max.toFixed(2) : math.format(stats.energy.max, 3);
    $("#energyProgress").css("width", ((stats.energy.current / stats.energy.max) * 100) + "%");
    $("#energyProgress").html(energyCurrent + "/" + energyMax);
    stats.energy.max = math.evaluate(stats.energy.originalMax * ((stats.endurance * stats.enduranceBoost) + 1));

    if (stats.energy.coffee.isActive == true) {
        $("#coffeeBtn").html("COFFEE ACTIVATED! - " + (stats.energy.coffee.timer - stats.energy.coffee.current) + "s");
        $("#coffeeBtn").addClass("disabled");
        energyPerSecond *= stats.energy.coffee.boost;
    }
    else if (stats.energy.coffee.isCooldown == true) {
        $("#coffeeBtn").html("coffee gone - " + (stats.energy.coffee.cooldown - stats.energy.coffee.current) + "s");
        $("#coffeeBtn").addClass("disabled");
    }
    else {
        $("#coffeeBtn").html("Drink Coffee");
        $("#coffeeBtn").removeClass("disabled");
        clearInterval(coffeeTimerId);
    }

    energyPerSecond < 1000000 ? $("#energyPerSecond").html("<span class='text-success'>(" + energyPerSecond.toFixed(2) + "/s)</span>") :  "<span class='text-success'>(" + math.format(energyPerSecond, 3) + "/s)</span>";

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
    $("#codeBotsProgress").css("width", ((research.codeBots.current / research.codeBots.max) * 100) + "%");

    if (job.views > 5000 && !checks.story3) {
        $("#story").append("<div id='story3' class='alert alert-primary alert-dismissible fade show' role='alert'><strong>It might take a while to become popular</strong>. Let's see if there's anything I can buy in the meantime to get harder better faster stronger. (check workout tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
        checks.story3 = true;
    }

    stats.strength < 1000000 ? $("#strength").html(stats.strength.toFixed(2)) : $("#strength").html(math.format(stats.strength, 3));
    stats.endurance < 1000000 ? $("#endurance").html(stats.endurance.toFixed(2)) : $("#endurance").html(math.format(stats.endurance, 3));
    stats.agility < 1000000 ? $("#agility").html(stats.agility.toFixed(2)) : $("#agility").html(math.format(stats.agility, 3));
    stats.intelligence < 1000000 ? $("#intelligence").html(stats.intelligence.toFixed(2)) : $("#intelligence").html(math.format(stats.intelligence, 3));

    var moneyPerSecond = math.evaluate((job.views * job.moneyGrowth) - job.moneyDrain);
    stats.money < 1000000 ? $("#money").html(stats.money.toFixed(2)) : $("#money").html(math.format(stats.money, 3));
    moneyPerSecond < 1000000 ? $("#money").append(" <span class='text-success'>(" + moneyPerSecond.toFixed(2) + "/s)</span>") : $("#money").append(" <span class='text-success'>(" + math.format(moneyPerSecond, 3) + "/s)</span>");

    var viewsPerSecond = math.evaluate((job.viewGrowth * (job.followers + followerFormula())) / ((job.makeVideo.max / job.makeVideo.increase) / (job.makeVideo.speed / 1000)));
    job.views < 1000000 ? $("#views").html(job.views.toFixed(2)) : $("#views").html(math.format(job.views, 3));
    viewsPerSecond < 1000000 ? $("#views").append(" <span class='text-success'>(" + viewsPerSecond.toFixed(3) + "/s)</span>") : $("#views").append(" <span class='text-success'>(" + math.format(viewsPerSecond, 3) + "/s)</span>");

    var followersPerSecond = math.evaluate(followerFormula()) / ((job.makeVideo.max / job.makeVideo.increase) / (job.makeVideo.speed / 1000));
    job.followers < 1000000 ? $(".followers").html(job.followers.toFixed(2)) : $(".followers").html(math.format(job.followers, 3));
    followersPerSecond < 1000000 ? $(".followers").append(" <span class='text-success'>(" + followersPerSecond.toFixed(3) + "/s)</span>") : $(".followers").append(" <span class='text-success'>(" + math.format(followersPerSecond, 3) + "/s)</span>");

    var followerGrowthPerSecond = math.evaluate(job.influencers * job.influencerMulti);
    followerFormula() < 1000000 ? $("#followerGrowth").html(followerFormula().toFixed(4)) : $("#followerGrowth").html(math.format(followerFormula(), 3));
    if (followerGrowthPerSecond > 0) {
        followerGrowthPerSecond < 1000000 ? $("#followerGrowth").append(" <span class='text-success'>(" + followerGrowthPerSecond.toFixed(4) + "/s)</span>") : $("#followerGrowth").append(" <span class='text-success'>(" + math.format(followerGrowthPerSecond, 3) + "/s)</span>");
    }

    var influencersPerSecond = math.evaluate(job.influencerGrowth / ((job.recruitInfluencers.max / job.recruitInfluencers.increase) / (job.recruitInfluencers.speed / 1000)));
    job.influencers < 1000000 ? $("#influencers").html(job.influencers.toFixed(2)) : $("#influencers").html(math.format(job.influencers, 3));
    influencersPerSecond < 1000000 ? $("#influencers").append(" <span class='text-success'>(" + influencersPerSecond.toFixed(3) + "/s)</span>") : $("#influencers").append(" <span class='text-success'>(" + math.format(influencersPerSecond, 3) + "/s)</span>");

    var postsPerSecond = math.evaluate(postFormula() / ((research.browseReddit.max / research.browseReddit.increase) / (research.browseReddit.speed / 1000)));
    research.posts < 1000000 ? $("#posts").html(research.posts.toFixed(2)) : $("#posts").html(math.format(research.posts, 3));
    postsPerSecond < 1000000 ? $("#posts").append(" <span class='text-success'>(" + postsPerSecond.toFixed(2) + "/s)</span>") : $("#posts").append(" <span class='text-success'>(" + math.format(postsPerSecond, 3) + "/s)</span>");

    var postGrowthPerSecond = math.evaluate(research.bots * research.botMulti);
    postFormula() < 1000000 ? $("#postGrowth").html(postFormula().toFixed(4)) : $("#postGrowth").html(math.format(postFormula(), 3));
    if (postGrowthPerSecond > 0) {
        postGrowthPerSecond < 1000000 ? $("#postGrowth").append(" <span class='text-success'>(" + postGrowthPerSecond.toFixed(4) + "/s)</span>") : $("#postGrowth").append(" <span class='text-success'>(" + math.format(postGrowthPerSecond, 3) + "/s)</span>");
    }

    var researchPerSecond = math.evaluate(research.posts * research.pointGrowth);
    research.points < 1000000 ? $("#research").html(research.points.toFixed(2)) : $("#research").html(math.format(research.points, 3));
    researchPerSecond < 1000000 ? $("#research").append(" <span class='text-success'>(" + researchPerSecond.toFixed(3) + "/s)</span>") : $("#research").append(" <span class='text-success'>(" + math.format(researchPerSecond, 3) + "/s)</span>");

    var botsPerSecond = math.evaluate(research.botGrowth / ((research.codeBots.max / research.codeBots.increase) / (research.codeBots.speed / 1000)));
    research.bots < 1000000 ? $("#bots").html(research.bots.toFixed(2)) : $("#bots").html(math.format(research.bots, 3));
    botsPerSecond < 1000000 ? $("#bots").append(" <span class='text-success'>(" + botsPerSecond.toFixed(3) + "/s)</span>") : $("#bots").append(" <span class='text-success'>(" + math.format(botsPerSecond, 3) + "/s)</span>");

    for (var i = 0; i < job.upgrades.length; i++) {
        if (job.followers > (job.upgrades[i].cost / 4) && !job.upgrades[i].isPurchased) {
            job.upgrades[i].isActive = true;
            // don't show rows unless rings are purchased
            if ((job.upgrades[i].id == 3 && bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 1 })[0].isPurchased) || job.upgrades[i].id != 3) {
                $("#jobUpgrade" + job.upgrades[i].id).removeClass("d-none");
            }
            else {
                $("#jobUpgrade" + job.upgrades[i].id).addClass("d-none");
            }

            if (job.followers >= job.upgrades[i].cost) {
                $("#jobUpgradeBtn" + job.upgrades[i].id).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#jobUpgradeBtn" + job.upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            if (job.upgrades[i].isPurchased) {
                $("#jobUpgrade" + job.upgrades[i].id).addClass("d-none");
            }
            else if (job.upgrades[i].isActive) {
                $("#jobUpgradeBtn" + job.upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
    }
    for (var i = 0; i < upgrades.length; i++) {
        if (stats.money > (upgrades[i].cost / 4) && !upgrades[i].isPurchased) {
            upgrades[i].isActive = true;
            $("#upgrade" + upgrades[i].id).removeClass("d-none");

            if (stats.money >= upgrades[i].cost) {
                $("#upgradeBtn" + upgrades[i].id).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#upgradeBtn" + upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            if (upgrades[i].isPurchased) {
                $("#upgrade" + upgrades[i].id).addClass("d-none");
            }
            else if (upgrades[i].isActive) {
                $("#upgradeBtn" + upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
    }

    for (var i = 0; i < bodyweight.upgrades.length; i++) {
        if (stats.money > (bodyweight.upgrades[i].cost / 4) && !bodyweight.upgrades[i].isPurchased) {
            bodyweight.upgrades[i].isActive = true;
            $("#bwUpgrade" + bodyweight.upgrades[i].id).removeClass("d-none");

            if (stats.money >= bodyweight.upgrades[i].cost) {
                $("#bwUpgradeBtn" + bodyweight.upgrades[i].id).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#bwUpgradeBtn" + bodyweight.upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            if (bodyweight.upgrades[i].isPurchased) {
                $("#bwUpgrade" + bodyweight.upgrades[i].id).addClass("d-none");
            }
            else if (bodyweight.upgrades[i].isActive) {
                $("#bwUpgradeBtn" + bodyweight.upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
    }

    for (var i = 0; i < research.upgrades.length; i++) {
        if (research.points > (research.upgrades[i].cost / 4) && !research.upgrades[i].isPurchased) {
            research.upgrades[i].isActive = true;
            $("#resUpgrade" + research.upgrades[i].id).removeClass("d-none");

            if (research.points >= research.upgrades[i].cost) {
                $("#resUpgradeBtn" + research.upgrades[i].id).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#resUpgradeBtn" + research.upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            if (research.upgrades[i].isPurchased) {
                $("#resUpgrade" + research.upgrades[i].id).addClass("d-none");
            }
            else if (research.upgrades[i].isActive) {
                $("#resUpgradeBtn" + research.upgrades[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
    }

}, 50);

function refreshProgressBars(text, exercise) {
    $("#" + text + "Progress").css("width", ((exercise.current / exercise.max) * 100) + "%");
    $("#" + text + "UpgradeProgress").css("width", ((exercise.total / exercise.tiers[exercise.tier].upgrade) * 100) + "%");
    $("#" + text + "Text").html(exercise.tiers[exercise.tier].name);
}

var saveTimerId = setInterval(function () {
    save();
}, 30000)

function setupEnergyTimer() {
    energyTimerId = setInterval(function () {
        if (stats.energy.current < stats.energy.max) {
            var increase = math.evaluate((stats.energy.increase * ((stats.agility * stats.agilityBoost) + 1)) / stats.energy.energyAdjust);
            if (math.evaluate(stats.energy.current + increase) > stats.energy.max) {
                stats.energy.current = stats.energy.max;
            }
            else {
                if (stats.energy.coffee.isActive) {
                    if ((stats.energy.current + (increase * stats.energy.coffee.boost)) > stats.energy.max) {
                        stats.energy.current = stats.energy.max;
                    }
                    else {
                        stats.energy.current += math.evaluate(increase * stats.energy.coffee.boost);
                    }
                }
                else {
                    stats.energy.current += increase;
                }
            }
        }
        else {
            checks.isResting = false;
        }
    }, stats.energy.speed / stats.energy.energyAdjust)
}

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
            stats.energy.current -= exercise.energy;
        }
        if (exercise.current < exercise.max) {
            exercise.current += exercise.increase;
        }
        else {
            exercise.total += math.evaluate(1 + (stats.strength * stats.strengthBoost));
            if (exercise.total > exercise.tiers[exercise.tier].upgrade && exercise.tier != 4) {
                exercise.strength *= exercise.tiers[exercise.tier].multiplier;
                exercise.endurance *= exercise.tiers[exercise.tier].multiplier;
                exercise.agility *= exercise.tiers[exercise.tier].multiplier;
                exercise.energy *= 2;
                exercise.tier += 1;
            }
            stats.strength += math.evaluate(exercise.strength * ((stats.intelligence * stats.intelligenceBoost) + 1));
            stats.endurance += math.evaluate(exercise.endurance * ((stats.intelligence * stats.intelligenceBoost) + 1));
            stats.agility += math.evaluate(exercise.agility * ((stats.intelligence * stats.intelligenceBoost) + 1));
            exercise.current = 0;
        }
    }
}

function setupMakeVideoTimer() {
    makeVideoTimerId = setInterval(function () {
        if (job.makeVideo.current < job.makeVideo.max) {
            job.makeVideo.current += job.makeVideo.increase;
        }
        else {
            job.makeVideo.total += 1;
            job.followers += followerFormula();
            job.views += math.evaluate(job.viewGrowth * job.followers);
            job.makeVideo.current = 0;
        }
    }, job.makeVideo.speed / job.makeVideo.speedModifier);
}

function setupInfluencerTimer() {
    influencerId = setInterval(function () {
        if (job.recruitInfluencers.current < job.recruitInfluencers.max) {
            job.recruitInfluencers.current += job.recruitInfluencers.increase;
        }
        else {
            job.recruitInfluencers.total += 1;
            job.influencers += job.influencerGrowth;
            job.recruitInfluencers.current = 0;
        }
    }, job.recruitInfluencers.speed / job.recruitInfluencers.speedModifier);
}

function setupOneSecondTimer() {
    oneSecondTimerId = setInterval(function () {
        if (math.evaluate(stats.money + (job.views * job.moneyGrowth) - job.moneyDrain) > 0) {
            stats.money += math.evaluate((job.views * job.moneyGrowth) - job.moneyDrain);
        }
        else {
            stats.money = 0;
        }

        job.followerGrowth += math.evaluate(job.influencers * job.influencerMulti);
        research.points += math.evaluate(research.posts * research.pointGrowth);
        research.postGrowth += math.evaluate(research.bots * research.botMulti);

    }, 1000);
}

function setupBrowseRedditTimer() {
    browseRedditTimerId = setInterval(function () {
        if (research.browseReddit.current < research.browseReddit.max) {
            research.browseReddit.current += research.browseReddit.increase;
        }
        else {
            research.browseReddit.total += 1;
            research.posts += postFormula();
            stats.intelligence += math.evaluate(research.browseReddit.intelligence * ((stats.intelligence * stats.intelligenceBoost) + 1));
            research.browseReddit.current = 0;
        }
    }, research.browseReddit.speed / research.browseReddit.speedModifier);
}

function setupCodeBotsTimer() {
    codeBotsTimerId = setInterval(function () {
        if (research.codeBots.current < research.codeBots.max) {
            research.codeBots.current += research.codeBots.increase;
        }
        else {
            research.codeBots.total += 1;
            research.bots += research.botGrowth;
            stats.intelligence += math.evaluate(research.codeBots.intelligence * ((stats.intelligence * stats.intelligenceBoost) + 1));
            research.codeBots.current = 0;
        }
    }, research.codeBots.speed / research.codeBots.speedModifier);
}

function setupStory2() {
    checks.story2 = true;
    $("#story").append("<div id='story2' class='alert alert-primary alert-dismissible fade show' role='alert'><strong>I need a break!</strong> I'm actually so strong now, I should start a YouTube channel! (check work tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
    $("#work-tab").removeClass("d-none");
    $("#followerWrap").removeClass("d-none");
    setupMakeVideoTimer();
    setupOneSecondTimer();
}

function drinkCoffee() {
    if (!$("#coffeeBtn").hasClass("disabled")) {
        $("#coffeeBtn").addClass("disabled");
        stats.energy.coffee.total += 1;
        stats.energy.coffee.isActive = true;
        stats.energy.coffee.isCooldown = true;
        setupCoffeeTimer();
    }
}

function setupCoffeeTimer() {
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
            }
        }
    }, 1000);
}

function followerFormula() {
    return math.evaluate((job.followerGrowth + (bodyweight.pushups.total * job.pushupFollowerMod) + (bodyweight.rows.total * job.rowFollowerMod) + (bodyweight.dips.total * job.dipFollowerMod) + (bodyweight.pullups.total * job.pullupFollowerMod) + (bodyweight.squats.total * job.bwSquatFollowerMod) + (bodyweight.rdl.total * job.bwRdlFollowerMod) + (research.posts * job.postFollowerMod)) * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1));
}

function postFormula() {
    return math.evaluate(research.postGrowth * (1 + (stats.strength * stats.strengthBoost * research.postStrengthMod)));
}

function toggleAlert(alert) {
    $(alert).tooltip("toggle");
}

function upgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("upgradeBtn")[1]);
        var upgrade = upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        upgrade[0].isPurchased = true;
        stats.money -= upgrade[0].cost;
        switch (upgrade[0].id) {
            case 0:
                $("#coffee").removeClass("d-none");
                break;
            case 1:
                stats.energy.coffee.boost *= 2;
                break;
            case 2:
                stats.energy.increase *= 2;
                break;
            case 3:
                stats.strengthBoost *= 2;
                break;
            case 4:
                stats.enduranceBoost *= 2;
                break;
            case 5:
                stats.agilityBoost *= 2;
                break;
            case 6:
                stats.intelligenceBoost *= 2;
                break;
            case 7:
                stats.allStatBoost *= 2;
                break;
            case 8:
                stats.energy.increase *= 2;
                break;
            case 9:
                stats.strengthBoost *= 2;
                break;
            case 10:
                stats.agilityBoost *= 2;
                break;
            case 11:
                stats.enduranceBoost *= 2;
                break;
            case 12:
                stats.intelligenceBoost *= 2;
                break;
            default:
        }
    }
}

function bwUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("bwUpgradeBtn")[1]);
        var upgrade = bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        upgrade[0].isPurchased = true;
        stats.money -= upgrade[0].cost;
        switch (upgrade[0].id) {
            case 0:
                bodyweight.pushups.speedModifier *= 2;
                clearInterval(pushupTimerId);
                setupPushupTimer();
                break;
            case 1:
                $("#bwRows").removeClass("d-none");
                setupRowTimer();
                break;
            case 2:
                bodyweight.pushups.energy /= 2;
                bodyweight.rows.energy /= 2;
                break;
            case 3:
                bodyweight.rows.speedModifier *= 2;
                clearInterval(rowTimerId);
                setupRowTimer();
                break;
            case 4:
                $("#bwPullups").removeClass("d-none");
                setupPullupTimer();
                break;
            case 5:
                bodyweight.pullups.speedModifier *= 2;
                clearInterval(pullupTimerId);
                setupPullupTimer();
                break;
            case 6:
                bodyweight.dips.speedModifier *= 2;
                clearInterval(dipTimerId);
                setupDipTimer();
                break;
            case 7:
                bodyweight.pullups.energy /= 2;
                break;
            case 8:
                bodyweight.dips.energy /= 2;
                break;
            case 9:
                bodyweight.squats.speedModifier *= 2;
                clearInterval(bwSquatTimerId);
                setupBwSquatTimer();
                break;
            case 10:
                bodyweight.rdl.speedModifier *= 2;
                clearInterval(bwRdlTimerId);
                setupBwRdlTimer();
                break;
            case 11:
                bodyweight.rdl.energy /= 2;
                bodyweight.squats.energy /= 2;
                break;
            case 12:
                bodyweight.pushups.energy *= 2;
                bodyweight.pushups.strength *= 2;
                bodyweight.pushups.endurance *= 2;
                bodyweight.pushups.agility *= 2;
                bodyweight.rows.energy *= 2;
                bodyweight.rows.strength *= 2;
                bodyweight.rows.endurance *= 2;
                bodyweight.rows.agility *= 2;
                break;
            case 13:
                bodyweight.dips.energy *= 2;
                bodyweight.dips.strength *= 2;
                bodyweight.dips.endurance *= 2;
                bodyweight.dips.agility *= 2;
                bodyweight.pullups.energy *= 2;
                bodyweight.pullups.strength *= 2;
                bodyweight.pullups.endurance *= 2;
                bodyweight.pullups.agility *= 2;
                break;
            case 14:
                bodyweight.squats.energy *= 2;
                bodyweight.squats.strength *= 2;
                bodyweight.squats.endurance *= 2;
                bodyweight.squats.agility *= 2;
                bodyweight.rdl.energy *= 2;
                bodyweight.rdl.strength *= 2;
                bodyweight.rdl.endurance *= 2;
                bodyweight.rdl.agility *= 2;
                break;
            default:
        }
    }
}

function jobUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("jobUpgradeBtn")[1]);
        var upgrade = job.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        upgrade[0].isPurchased = true;
        job.followers -= upgrade[0].cost;
        switch (upgrade[0].id) {
            case 0:
                job.views += 5000;
                break;
            case 1:
                job.makeVideo.speedModifier *= 2;
                clearInterval(makeVideoTimerId);
                setupMakeVideoTimer();
                break;
            case 2:
                job.pushupFollowerMod += .0001;
                break;
            case 3:
                job.rowFollowerMod += .0001;
                break;
            case 4:
                setupBrowseRedditTimer();
                $("#research-tab").removeClass("d-none");
                $("#researchText").removeClass("d-none");
                $("#story").append("<div id='story4' class='alert alert-primary alert-dismissible fade show' role='alert'><strong>Why do my followers keep leaving?</strong> I'll browse Reddit for some insights and fitness information. (check research tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
                checks.story4 = true;
                break;
            case 5:
                job.viewGrowth *= 2;
                break;
            case 6:
                job.moneyGrowth *= 2;
                break;
            case 7:
                stats.allStatBoost *= 2;
                break;
            case 8:
                research.browseReddit.intelligence *= 2;
                research.codeBots.intelligence *= 2;
                break;
            case 9:
                job.makeVideo.viewGrowth *= 2;
                break;
            case 10:
                job.pullupFollowerMod += .0001;
                break;
            case 11:
                job.dipFollowerMod += .0001;
                break;
            case 12:
                job.bwSquatFollowerMod += .0001;
                break;
            case 13:
                job.bwRdlFollowerMod += .0001;
                break;
            case 14:
                job.postFollowerMod += .0001;
                break;
            case 15:
                job.viewGrowth *= 2;
                break;
            case 16:
                job.influencerGrowth *= 2;
                break;
            case 17:
                job.influencerMulti *= 2;
                break;
            case 18:
                job.allStatBoost *= 2;
                break;
            case 19:
                job.influencerGrowth *= 2;
                break;
            case 20:
                job.viewGrowth *= 2;
                break;
            case 21:
                job.viewGrowth *= 2;
                break;
            case 22:
                job.followerGrowth *= 2;
                break;
            case 23:
                research.browseReddit.intelligence *= 2;
                research.codeBots.intelligence *= 2;
                break;
            case 24:
                job.viewGrowth *= 2;
                break;
            case 25:
                research.pointGrowth *= 2;
                break;
            case 26:
                job.moneyGrowth *= 2;
                break;
            case 27:
                research.pointGrowth *= 2;
                break;
            case 28:
                job.moneyGrowth *= 2;
                break;
            default:
        }
    }
}

function resUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        var buttonId = $(button).attr("id");
        var id = parseInt(buttonId.split("resUpgradeBtn")[1]);
        var upgrade = research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        upgrade[0].isPurchased = true;
        research.points -= upgrade[0].cost;
        switch (upgrade[0].id) {
            case 0:
                job.followerGrowth *= 2;
                break;
            case 1:
                stats.energy.increase *= 2;
                break;
            case 2:
                research.pointGrowth *= 2;
                break;
            case 3:
                job.moneyGrowth *= 2;
                break;
            case 4:
                $("#bwDips").removeClass("d-none");
                setupDipTimer();
                break;
            case 5:
                stats.strengthBoost *= 2;
                break;
            case 6:
                research.pointGrowth *= 2;
                break;
            case 7:
                stats.agilityBoost *= 2;
                break;
            case 8:
                stats.enduranceBoost *= 2;
                break;
            case 9:
                stats.intelligenceBoost *= 2;
                break;
            case 10:
                $("#influencerWrap").removeClass("d-none");
                setupInfluencerTimer();
                break;
            case 11:
                $("#bwRdl").removeClass("d-none");
                $("#bwSquats").removeClass("d-none");
                setupBwSquatTimer();
                setupBwRdlTimer();
                break;
            case 12:
                research.browseReddit.intelligence *= 2;
                research.codeBots.intelligence *= 2;
                break;
            case 13:
                $("#botWrap").removeClass("d-none");
                setupCodeBotsTimer();
                break;
            case 14:
                research.botMulti *= 2;
                break;
            case 15:
                research.botGrowth *= 2;
                break;
            case 16:
                research.browseReddit.speedModifier *= 2;
                clearInterval(browseRedditTimerId);
                setupBrowseRedditTimer();
                break;
            case 17:
                $("#deload-tab").removeClass("d-none");
                $("#story").append("<div id='story5' class='alert alert-primary alert-dismissible fade show' role='alert'><strong>I'm so strong now</strong>! It's probably time for a well-deserved break. (check deload tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
                checks.story5 = true;
                break;
            case 18:
                research.postStrengthMod += 1;
                break;
            case 19:
                stats.allStatBoost *= 2;
                break;
            case 20:
                job.followerGrowth *= 2;
                break;
            case 21:
                job.influencerMulti *= 2;
                break;
            case 22:
                stats.energy.increase *= 2;
                break;
            default:
        }
    }
}
