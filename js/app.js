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
var payDayTimerId;
var saveName;
var saveTimerId;
var trainerTimerId;
var createClassesTimerId;
var runCampaignTimerId;
var designAdTimerId;
var fightGangTimerId;
var refreshId;

var liftingBenchTimerId;
var liftingRowTimerId;
var liftingOhpTimerId;
var liftingSquatsTimerId;
var liftingDlsTimerId;
var liftingCurlsTimerId;

//#region notes

/* 

TODO:

    consider a spending area for the special 4 stats?

    spend unused prestige points on generators
    issue with clicking fitness

    1. 25% speed increase for all bar fill
    2. double money
    3. double research/influence

Future

    yoga
        Run through routines and different types of yoga
        Flexibility that increases a stat or resource of your choice, unlock ability to add another eventually. 
        What to do for competition-style stuff?
    cardio  
        exercises are of varying speeds, run through different types of training before upgrading. 
        Setup races and compete in them to increase
        overall tick speed for that run
        speed stat that grows and adds to all tick speeds

Challenges could be per prestige 2

*/

//#endregion

//#region saving and loading

switch (window.location.pathname) {
    case "/gainz/":
        saveName = "gainz";
        break;
    case "/gainz_beta/":
        saveName = "gainz_beta";
        break;
    default:
        saveName = "gainz_local";
}

$(document).ready(function () {
    load(null, false, true);
    setupRefresh();
});

function exportSave() {
    let saveData = localStorage.getItem(saveName);
    let base64Save = btoa(saveData);
    $("#exportImportArea").val(base64Save);
}

function importSave() {
    try {

        if (confirm("Are you sure you want to import this save?")) {
            let base64Save = $("#exportImportArea").val();
            let decryptedSave = atob(base64Save);
            if (decryptedSave.includes("gameVersion")) {
                localStorage.setItem(saveName, decryptedSave);

                load($("#loadBtn"), false, false);
            }
            else {
                $("#resetWrapper").html("<div id='resetAlert' class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Not a valid save.</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>")
            }
        }
    }
    catch (ex) {
        console.log(ex);
        $("#resetWrapper").html("<div id='resetAlert' class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Couldn't import your save.</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>")
    }
}

function save() {
    let date = new Date();
    stats.saveTime = date.getTime();

    let bodyweightPrep = JSON.parse(JSON.stringify(bodyweight));
    let upgradesPrep = JSON.parse(JSON.stringify(upgrades));
    let jobPrep = JSON.parse(JSON.stringify(job));
    let researchPrep = JSON.parse(JSON.stringify(research));
    let gymPrep = JSON.parse(JSON.stringify(gym));
    let prestigePrep = JSON.parse(JSON.stringify(prestige));

    trimUpgradeSaveData(bodyweightPrep.upgrades);
    trimUpgradeSaveData(upgradesPrep);
    trimUpgradeSaveData(jobPrep.upgrades);
    trimUpgradeSaveData(researchPrep.upgrades);
    trimUpgradeSaveData(gymPrep.upgrades);
    trimUpgradeSaveData(gymPrep.gymUpgrades);
    trimUpgradeSaveData(gymPrep.adUpgrades);
    trimUpgradeSaveData(gymPrep.bw.upgrades);
    trimUpgradeSaveData(gymPrep.bw.gymUpgrades);
    trimUpgradeSaveData(gymPrep.bw.adUpgrades);
    trimUpgradeSaveData(gymPrep.lifting.upgrades);
    trimUpgradeSaveData(gymPrep.lifting.gymUpgrades);
    trimUpgradeSaveData(gymPrep.lifting.adUpgrades);
    trimUpgradeSaveData(prestigePrep.upgrades);
    trimUpgradeSaveData(prestigePrep.bw.upgrades);
    trimUpgradeSaveData(prestigePrep.lifting.upgrades);

    let saveData = [stats, bodyweightPrep, upgradesPrep, jobPrep, researchPrep, checks, gymPrep, prestigePrep, lifting, null, null, null, null, null, null, null, null, null, null, null];
    localStorage.setItem(saveName, JSON.stringify(saveData));

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
    clearInterval(payDayTimerId);
    clearInterval(trainerTimerId);
    clearInterval(createClassesTimerId);
    clearInterval(runCampaignTimerId);
    clearInterval(designAdTimerId);
    clearInterval(fightGangTimerId);
    clearInterval(liftingBenchTimerId);
    clearInterval(liftingRowTimerId);
    clearInterval(liftingOhpTimerId);
    clearInterval(liftingSquatsTimerId);
    clearInterval(liftingDlsTimerId);
    clearInterval(liftingCurlsTimerId);
    $("#work-tab").addClass("d-none");
    $("#followerWrap").addClass("d-none");
    $("#research-tab").addClass("d-none");
    $("#researchText").addClass("d-none");
    $("#bwRows").addClass("d-none");
    $("#bwDips").addClass("d-none");
    $("#bwPullups").addClass("d-none");
    $("#bwRdl").addClass("d-none");
    $("#bwSquats").addClass("d-none");
    $("#influencerWrap").addClass("d-none");
    $("#botWrap").addClass("d-none");
    $("#jobUpgrades").html("");
    $("#upgrades").html("");
    $("#resUpgrades").html("");
    $("#coffee").addClass("d-none");
    $("#payDay").addClass("d-none");
    $("#story").html("");
    $("#upgrades").html("");
    $("#jobUpgrades").html("");
    $("#resUpgrades").html("");
    $("#globalUpgrades").html("");
    $("#globalBwUpgrades").html("");
    $("#globalLiftingUpgrades").html("");
    $("#gymUpgrades").html("");
    $("#gymBwUpgrades").html("");
    $("#adUpgrades").html("");
    $("#adBwUpgrades").html("");
    $("#research-tab").html("Research");
    $("#influenceText").addClass("d-none")

    $("#gym-tab").addClass("d-none");
    $("#openGym-tab").addClass("d-none");
    $("#phase1Research").removeClass("d-none");
    $("#phase2Research").addClass("d-none");
    $("#gang-tab").addClass("d-none");
    $("#comp-tab").addClass("d-none");
    $("#gangRivalWrap").removeClass("d-none");
    $("#gangCompleteWrap").addClass("d-none");
    $("#confidenceWrap").addClass("d-none");
    $("#leadershipWrap").addClass("d-none");
    $("#autoBuyers").html("");
    $(".gymTierFocus").addClass("d-none");
    $("#bwWorkoutWrap").addClass("d-none");
    $("#liftingWorkoutWrap").addClass("d-none");
    $("#globalLiftingUpgradesModalTrigger").addClass("d-none");
    $("#newGymLifting").addClass("d-none");
    $("#createCompBtn").removeClass("d-none");
}

function load(button, prestigeCheck, firstLoad) {
    if (!prestigeCheck) {
        let saveData = JSON.parse(localStorage.getItem(saveName));

        // fix issue with upgrades not registering by updating all upgrades before loading
        bodyweight.upgrades = JSON.parse(JSON.stringify(baseBodyweight.upgrades));
        upgrades = JSON.parse(JSON.stringify(baseUpgrades));
        job.upgrades = JSON.parse(JSON.stringify(baseJob.upgrades));
        research.upgrades = JSON.parse(JSON.stringify(baseResearch.upgrades));

        gym.upgrades = JSON.parse(JSON.stringify(baseGym.upgrades));
        gym.gymUpgrades = JSON.parse(JSON.stringify(baseGym.gymUpgrades));
        gym.adUpgrades = JSON.parse(JSON.stringify(baseGym.adUpgrades));

        gym.bw.upgrades = JSON.parse(JSON.stringify(baseGym.bw.upgrades));
        gym.bw.gymUpgrades = JSON.parse(JSON.stringify(baseGym.bw.gymUpgrades));
        gym.bw.adUpgrades = JSON.parse(JSON.stringify(baseGym.bw.adUpgrades));

        gym.lifting.upgrades = JSON.parse(JSON.stringify(baseGym.lifting.upgrades));
        gym.lifting.gymUpgrades = JSON.parse(JSON.stringify(baseGym.lifting.gymUpgrades));
        gym.lifting.adUpgrades = JSON.parse(JSON.stringify(baseGym.lifting.adUpgrades));

        gym.yoga.upgrades = JSON.parse(JSON.stringify(baseGym.yoga.upgrades));
        gym.yoga.gymUpgrades = JSON.parse(JSON.stringify(baseGym.yoga.gymUpgrades));
        gym.yoga.adUpgrades = JSON.parse(JSON.stringify(baseGym.yoga.adUpgrades));

        gym.cardio.upgrades = JSON.parse(JSON.stringify(baseGym.cardio.upgrades));
        gym.cardio.gymUpgrades = JSON.parse(JSON.stringify(baseGym.cardio.gymUpgrades));
        gym.cardio.adUpgrades = JSON.parse(JSON.stringify(baseGym.cardio.adUpgrades));

        prestige.upgrades = JSON.parse(JSON.stringify(basePrestige.upgrades));
        prestige.bw.upgrades = JSON.parse(JSON.stringify(basePrestige.bw.upgrades));
        prestige.lifting.upgrades = JSON.parse(JSON.stringify(basePrestige.lifting.upgrades));
        prestige.yoga.upgrades = JSON.parse(JSON.stringify(basePrestige.yoga.upgrades));
        prestige.cardio.upgrades = JSON.parse(JSON.stringify(basePrestige.cardio.upgrades));

        if (button != null) {
            loadReset();
        }

        try {
            if (saveData != null) {
                if (saveData[5].gymType == -1) {
                    saveData[1].upgrades = updateUpgradesAfterLoad(bodyweight.upgrades, saveData[1].upgrades);
                    saveData[2] = updateUpgradesAfterLoad(upgrades, saveData[2]);
                    saveData[3].upgrades = updateUpgradesAfterLoad(job.upgrades, saveData[3].upgrades);
                    saveData[4].upgrades = updateUpgradesAfterLoad(research.upgrades, saveData[4].upgrades);
                }
                else {
                    if (saveData[6] != null) {
                        saveData[6].upgrades = updateUpgradesAfterLoad(gym.upgrades, saveData[6].upgrades);
                        saveData[6].gymUpgrades = updateUpgradesAfterLoad(gym.gymUpgrades, saveData[6].gymUpgrades);
                        saveData[6].adUpgrades = updateUpgradesAfterLoad(gym.adUpgrades, saveData[6].adUpgrades);

                        saveData[6].bw.upgrades = updateUpgradesAfterLoad(gym.bw.upgrades, saveData[6].bw.upgrades);
                        saveData[6].bw.gymUpgrades = updateUpgradesAfterLoad(gym.bw.gymUpgrades, saveData[6].bw.gymUpgrades);
                        saveData[6].bw.adUpgrades = updateUpgradesAfterLoad(gym.bw.adUpgrades, saveData[6].bw.adUpgrades);

                        saveData[6].lifting.upgrades = updateUpgradesAfterLoad(gym.lifting.upgrades, saveData[6].lifting.upgrades);
                        saveData[6].lifting.gymUpgrades = updateUpgradesAfterLoad(gym.lifting.gymUpgrades, saveData[6].lifting.gymUpgrades);
                        saveData[6].lifting.adUpgrades = updateUpgradesAfterLoad(gym.lifting.adUpgrades, saveData[6].lifting.adUpgrades);

                        saveData[6].yoga.upgrades = updateUpgradesAfterLoad(gym.yoga.upgrades, saveData[6].yoga.upgrades);
                        saveData[6].yoga.gymUpgrades = updateUpgradesAfterLoad(gym.yoga.gymUpgrades, saveData[6].yoga.gymUpgrades);
                        saveData[6].yoga.adUpgrades = updateUpgradesAfterLoad(gym.yoga.adUpgrades, saveData[6].yoga.adUpgrades);

                        saveData[6].cardio.upgrades = updateUpgradesAfterLoad(gym.cardio.upgrades, saveData[6].cardio.upgrades);
                        saveData[6].cardio.gymUpgrades = updateUpgradesAfterLoad(gym.cardio.gymUpgrades, saveData[6].cardio.gymUpgrades);
                        saveData[6].cardio.adUpgrades = updateUpgradesAfterLoad(gym.cardio.adUpgrades, saveData[6].cardio.adUpgrades);
                    }
                }

                if (saveData[7] != null) {
                    saveData[7].upgrades = updateUpgradesAfterLoad(prestige.upgrades, saveData[7].upgrades);
                    saveData[7].bw.upgrades = updateUpgradesAfterLoad(prestige.bw.upgrades, saveData[7].bw.upgrades);
                    saveData[7].lifting.upgrades = updateUpgradesAfterLoad(prestige.lifting.upgrades, saveData[7].lifting.upgrades);
                    saveData[7].yoga.upgrades = updateUpgradesAfterLoad(prestige.yoga.upgrades, saveData[7].yoga.upgrades);
                    saveData[7].cardio.upgrades = updateUpgradesAfterLoad(prestige.cardio.upgrades, saveData[7].cardio.upgrades);
                }

                $.extend(true, stats, saveData[0]);
                $.extend(true, bodyweight, saveData[1]);
                $.extend(true, upgrades, saveData[2]);
                $.extend(true, job, saveData[3]);
                $.extend(true, research, saveData[4]);
                $.extend(true, checks, saveData[5]);
                if (saveData[6] != null) {
                    $.extend(true, gym, saveData[6]);
                }
                else {
                    gym = JSON.parse(JSON.stringify(baseGym));
                }
                if (saveData[7] != null) {
                    $.extend(true, prestige, saveData[7]);
                }
                else {
                    prestige = JSON.parse(JSON.stringify(basePrestige));
                }
                if (saveData[8] != null) {
                    $.extend(true, lifting, saveData[8]);
                }
                else {
                    lifting = JSON.parse(JSON.stringify(baseLifting));
                }
            }
        }
        catch (ex) {
            console.log(ex);
            firstLoad = false;
            $("#story").prepend("<div id='error' class='alert alert-danger alert-dismissible fade show fixed-bottom' role='alert'><strong>Something went wrong loading your save!</strong> This is likely a bug - come on the discord chat and ask me for help. Resetting game progress will likely fix the issue if you don't mind losing progress.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
            // input error message warning user that saving is off
        }
    }

    $('[data-toggle="tooltip"]').tooltip();

    setupEnergyTimer();

    if (checks.gymType == -1 || checks.gymType == 0) {
        startStop(bodyweight.pushups, pushupTimerId, true);
        $("#bwWorkoutWrap").removeClass("d-none");
    }

    if (checks.gymType == 0) {
        $("#bwRows").removeClass("d-none");
        $("#bwDips").removeClass("d-none");
        $("#bwPullups").removeClass("d-none");
        $("#bwRdl").removeClass("d-none");
        $("#bwSquats").removeClass("d-none");
        startStop(bodyweight.rows, rowTimerId, true);
        startStop(bodyweight.dips, dipTimerId, true);
        startStop(bodyweight.pullups, pullupTimerId, true);
        startStop(bodyweight.squats, bwSquatTimerId, true);
        startStop(bodyweight.rdl, bwRdlTimerId, true);
    }

    setupOneSecondTimer();


    if (checks.gymType == -1) {
        if (!checks.story1) {
            $("#story").prepend("<div id='story1' class='alert alert-primary alert-dismissible fade show fixed-bottom' role='alert'><strong>Wow I'm out of shape!</strong> I'll do some pushups to get stronger.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
        }
        if (checks.story2) {
            $("#work-tab").removeClass("d-none");
            $("#followerWrap").removeClass("d-none");
            setupMakeVideoTimer();
        }

        if (checks.story4) {
            setupBrowseRedditTimer();
            $("#research-tab").removeClass("d-none");
            $("#researchText").removeClass("d-none");
        }
        if (bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 1 })[0].isPurchased) {
            $("#bwRows").removeClass("d-none");
            startStop(bodyweight.rows, rowTimerId, true);
        }
        if (research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 4 })[0].isPurchased) {
            $("#bwDips").removeClass("d-none");
            startStop(bodyweight.dips, dipTimerId, true);
        }
        if (bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 4 })[0].isPurchased) {
            $("#bwPullups").removeClass("d-none");
            startStop(bodyweight.pullups, pullupTimerId, true);
        }
        if (research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 11 })[0].isPurchased) {
            $("#bwRdl").removeClass("d-none");
            $("#bwSquats").removeClass("d-none");
            startStop(bodyweight.squats, bwSquatTimerId, true);
            startStop(bodyweight.rdl, bwRdlTimerId, true);
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
            $("#openGym-tab").removeClass("d-none");
            if (checks.gymType == -1) {
                checks.isPrestige = true;
            }
            updatePrestigeValues();
        }

        writeAllUpgrades(upgrades, bodyweight.upgrades, "upgrades", "upgrade", "bwUpgrade", "upgradeClick", "bwUpgradeClick");
        writeAllUpgrades(job.upgrades, null, "jobUpgrades", "jobUpgrade", null, "jobUpgradeClick", null);
        writeAllUpgrades(research.upgrades, null, "resUpgrades", "resUpgrade", null, "resUpgradeClick", null);

        if (upgrades.filter(function (upgradeArray) { return upgradeArray.id == 0 })[0].isPurchased) {
            $("#coffee").removeClass("d-none");
        }
        if (job.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 29 })[0].isPurchased) {
            $("#payDay").removeClass("d-none");
        }
    }
    else {
        $("#coffee").removeClass("d-none");
        $("#payDay").removeClass("d-none");
        $("#openGym-tab").removeClass("d-none");
        $("#gym-tab").removeClass("d-none");
        $("#research-tab").removeClass("d-none");
        $("#researchText").removeClass("d-none");
        $("#phase1Research").addClass("d-none");
        $("#phase2Research").removeClass("d-none");
        $("#influence").removeClass("d-none");
        $("#research-tab").html("Advertising");
        $("#researchText").addClass("d-none");
        $("#influenceText").removeClass("d-none");

        updatePrestigeValues();
        setupTrainerTimer();
        setupClassesTimer();
        setupCampaignTimer();
        setupAdTimer();

        updateAutobuyerToggles();
        if (prestige.bw.confidence > 0) {
            $("#confidenceWrap").removeClass("d-none");
        }
        if (prestige.lifting.leadership > 0) {
            $("#leadershipWrap").removeClass("d-none");
        }

        let trainerFocusUpgrade = prestige.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 25 });
        if (trainerFocusUpgrade[0] && trainerFocusUpgrade[0].isPurchased) {
            $(".gymTierFocus").removeClass("d-none");
            focusMemberTier(gym.members.focusId);
        }

        let liftingGymUpgrade = prestige.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 26 });
        if (liftingGymUpgrade[0] && liftingGymUpgrade[0].isPurchased) {
            $("#globalLiftingUpgradesModalTrigger").removeClass("d-none");
            $("#newGymLifting").removeClass("d-none");
        }
    }

    writeAllPrestigeUpgrades(prestige.upgrades, "globalUpgrades", "globalUpgrade", "globalUpgradeClick", prestige.current);
    writeAllPrestigeUpgrades(prestige.bw.upgrades, "globalBwUpgrades", "globalBwUpgrade", "globalBwUpgradeClick", prestige.bw.current);
    writeAllPrestigeUpgrades(prestige.lifting.upgrades, "globalLiftingUpgrades", "globalLiftingUpgrade", "globalLiftingUpgradeClick", prestige.lifting.current);

    switch (checks.gymType) {
        case 0:
            writeAllUpgrades(gym.upgrades, gym.bw.upgrades, "upgrades", "upgrade", "bwUpgrade", "phase2UpgradeClick", "phase2BwUpgradeClick");
            writeAllUpgrades(gym.gymUpgrades, gym.bw.gymUpgrades, "gymUpgrades", "gymUpgrade", "gymBwUpgrade", "gymUpgradeClick", "gymBwUpgradeClick");
            writeAllUpgrades(gym.adUpgrades, gym.bw.adUpgrades, "adUpgrades", "adUpgrade", "adBwUpgrade", "adUpgradeClick", "adBwUpgradeClick");
            if (prestige.bw.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 0 })[0].isPurchased) {
                $("#gang-tab").removeClass("d-none");
                $("#gangName").html(bodyweight.gang.name);
            }
            break;
        case 1:
            $("#liftingWorkoutWrap").removeClass("d-none");
            startStop(lifting.bench, liftingBenchTimerId, true);
            startStop(lifting.rows, liftingRowTimerId, true);
            startStop(lifting.ohp, liftingOhpTimerId, true);
            startStop(lifting.squats, liftingSquatsTimerId, true);
            startStop(lifting.dls, liftingDlsTimerId, true);
            startStop(lifting.curls, liftingCurlsTimerId, true);

            writeAllUpgrades(gym.upgrades, gym.lifting.upgrades, "upgrades", "upgrade", "liftingUpgrade", "phase2UpgradeClick", "phase2LiftingUpgradeClick");
            writeAllUpgrades(gym.gymUpgrades, gym.lifting.gymUpgrades, "gymUpgrades", "gymUpgrade", "gymLiftingUpgrade", "gymUpgradeClick", "gymLiftingUpgradeClick");
            writeAllUpgrades(gym.adUpgrades, gym.lifting.adUpgrades, "adUpgrades", "adUpgrade", "adLiftingUpgrade", "adUpgradeClick", "adLiftingUpgradeClick");
            if (prestige.lifting.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 0 })[0].isPurchased) {
                $("#comp-tab").removeClass("d-none");
            }
            break;
        default:
    }

    if (stats.energy.coffee.isActive || stats.energy.coffee.isCooldown) {
        setupCoffeeTimer();
    }
    if (stats.payday.isCooldown) {
        setupPayDayTimer();
    }

    if (button != null) {
        $("#loadWrapper").html("<div id='loadAlert' class='alert alert-info alert-dismissible fade show' role='alert'><strong>Loaded.</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>")
        $("#loadAlert").alert();
        setTimeout(function () {
            $("#loadAlert").alert('close');
        }, 5000);
    }
    if (firstLoad) {
        saveTimerId = setInterval(function () {
            save();
        }, 30000);
    }
}

function reset() {
    if (confirm("Are you sure you want to reset your save data?")) {
        localStorage.removeItem(saveName);

        stats = JSON.parse(JSON.stringify(baseStats));
        bodyweight = JSON.parse(JSON.stringify(baseBodyweight));
        upgrades = JSON.parse(JSON.stringify(baseUpgrades));
        job = JSON.parse(JSON.stringify(baseJob));
        research = JSON.parse(JSON.stringify(baseResearch));
        checks = JSON.parse(JSON.stringify(baseChecks));
        gym = JSON.parse(JSON.stringify(baseGym));
        prestige = JSON.parse(JSON.stringify(basePrestige));

        save();
        loadReset();
        load(null, false, false);

        $("#resetWrapper").html("<div id='resetAlert' class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Game Reset.</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>")
        $("#resetAlert").alert();
        setTimeout(function () {
            $("#resetAlert").alert('close');
        }, 5000);
    }
}

//#endregion

function setupRefresh() {
    refreshId = setInterval(function () {
        let energyPerSecond = math.evaluate((stats.energy.increase * ((stats.agility * stats.agilityBoost) + 1)) * 2);
        let energyCurrent = stats.energy.current < 1000000 ? stats.energy.current.toFixed(2) : math.format(stats.energy.current, 3);
        let energyMax = stats.energy.max < 1000000 ? stats.energy.max.toFixed(2) : math.format(stats.energy.max, 3);
        $("#energyProgress").attr("aria-valuenow", energyCurrent);
        $("#energyProgress").attr("aria-valuemax", energyMax);
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

        if (stats.payday.isCooldown == true) {
            $("#payDayBtn").html("waiting for pay day - " + (stats.payday.cooldown - stats.payday.current) + "s");
            $("#payDayBtn").addClass("disabled");
        }
        else {
            $("#payDayBtn").html("Pay Day!");
            $("#payDayBtn").removeClass("disabled");
            clearInterval(payDayTimerId);
        }

        energyPerSecond < 1000000 ? $("#energyPerSecond").html("<span class='text-success'>(" + energyPerSecond.toFixed(2) + "/s)</span>") : "<span class='text-success'>(" + math.format(energyPerSecond, 3) + "/s)</span>";

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

        stats.strength < 1000000 ? $("#strength").html(stats.strength.toFixed(2)) : $("#strength").html(math.format(stats.strength, 3));
        stats.endurance < 1000000 ? $("#endurance").html(stats.endurance.toFixed(2)) : $("#endurance").html(math.format(stats.endurance, 3));
        stats.agility < 1000000 ? $("#agility").html(stats.agility.toFixed(2)) : $("#agility").html(math.format(stats.agility, 3));
        stats.intelligence < 1000000 ? $("#intelligence").html(stats.intelligence.toFixed(2)) : $("#intelligence").html(math.format(stats.intelligence, 3));

        let strengthMod = math.evaluate((stats.strength * stats.strengthBoost) + 1);
        let enduranceMod = math.evaluate((stats.endurance * stats.enduranceBoost) + 1);
        let agilitymod = math.evaluate((stats.agility * stats.agilityBoost) + 1);
        let intMod = math.evaluate((stats.intelligence * stats.intelligenceBoost) + 1);
        let allMod = math.evaluate((((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1));

        strengthMod < 1000000 ? $("#strengthMod").html(strengthMod.toFixed(2)) : $("#strengthMod").html(math.format(strengthMod, 3));
        enduranceMod < 1000000 ? $("#enduranceMod").html(enduranceMod.toFixed(2)) : $("#enduranceMod").html(math.format(enduranceMod, 3));
        agilitymod < 1000000 ? $("#agilityMod").html(agilitymod.toFixed(2)) : $("#agilityMod").html(math.format(agilitymod, 3));
        intMod < 1000000 ? $("#intMod").html(intMod.toFixed(2)) : $("#intMod").html(math.format(intMod, 3));
        allMod < 1000000 ? $("#allMod").html(allMod.toFixed(2)) : $("#allMod").html(math.format(allMod, 3));

        if (checks.gymType == -1 || checks.gymType == 0) {
            bodyweight.pushups.isStopped ? $("#startStopPushups").html("Start").removeClass("text-danger") : $("#startStopPushups").html("Stop").addClass("text-danger")
            bodyweight.rows.isStopped ? $("#startStopRows").html("Start").removeClass("text-danger") : $("#startStopRows").html("Stop").addClass("text-danger")
            bodyweight.dips.isStopped ? $("#startStopDips").html("Start").removeClass("text-danger") : $("#startStopDips").html("Stop").addClass("text-danger")
            bodyweight.pullups.isStopped ? $("#startStopPullups").html("Start").removeClass("text-danger") : $("#startStopPullups").html("Stop").addClass("text-danger")
            bodyweight.squats.isStopped ? $("#startStopBwSquats").html("Start").removeClass("text-danger") : $("#startStopBwSquats").html("Stop").addClass("text-danger")
            bodyweight.rdl.isStopped ? $("#startStopBwRdls").html("Start").removeClass("text-danger") : $("#startStopBwRdls").html("Stop").addClass("text-danger")

            let finalMessage = "Energy and stat growth is doubled every progression.";
            refreshProgressBarsAndStats("pushup", bodyweight.pushups, "Incline Pushups -> Pushups -> Diamond Pushups -> Pseudo Planche Pushups -> Planche Pushups<br /><br />", finalMessage);
            refreshProgressBarsAndStats("row", bodyweight.rows, "Incline Rows -> Horizontal Rows -> Tuck Front Lever Rows -> Advanced Tuck Front Lever Rows -> Front Lever Rows<br /><br />", finalMessage);
            refreshProgressBarsAndStats("dip", bodyweight.dips, "Support Holds -> Dip Negatives -> Dips -> Ring Dips -> Rings Turned-Out Dips<br /><br />", finalMessage);
            refreshProgressBarsAndStats("pullup", bodyweight.pullups, "Arch Hangs -> Pullup Negatives -> Pullups -> Assisted One-Arm Pullups -> One-Arm Pullups<br /><br />", finalMessage);
            refreshProgressBarsAndStats("bwSquat", bodyweight.squats, "Assisted Squat -> Squat -> Split Squat -> Bulgarian Split Squat -> Pistol Squat<br /><br />", finalMessage);
            refreshProgressBarsAndStats("bwRdl", bodyweight.rdl, "Romanian Deadlifts (No Weight) -> Single-Legged Deadlifts -> Banded Nordic Curl Negatives -> Banded Nordic Curls -> Nordic Curls<br /><br />", finalMessage);
        }
        else if (checks.gymType == 1) {
            lifting.bench.isStopped ? $("#startStopLiftingBench").html("Start").removeClass("text-danger") : $("#startStopLiftingBench").html("Stop").addClass("text-danger");
            lifting.rows.isStopped ? $("#startStopLiftingRow").html("Start").removeClass("text-danger") : $("#startStopLiftingRow").html("Stop").addClass("text-danger")
            lifting.ohp.isStopped ? $("#startStopliftingOhp").html("Start").removeClass("text-danger") : $("#startStopliftingOhp").html("Stop").addClass("text-danger")
            lifting.squats.isStopped ? $("#startStopliftingSquats").html("Start").removeClass("text-danger") : $("#startStopliftingSquats").html("Stop").addClass("text-danger")
            lifting.dls.isStopped ? $("#startStopliftingDls").html("Start").removeClass("text-danger") : $("#startStopliftingDls").html("Stop").addClass("text-danger")
            lifting.curls.isStopped ? $("#startStopliftingCurls").html("Start").removeClass("text-danger") : $("#startStopliftingCurls").html("Stop").addClass("text-danger")
            let finalMessage = "Energy and stat growth are multiplied by 1.02 each weight increase.";
            refreshProgressBarsAndStats("liftingBench", lifting.bench, "", finalMessage);
            refreshProgressBarsAndStats("liftingRow", lifting.rows, "", finalMessage);
            refreshProgressBarsAndStats("liftingOhp", lifting.ohp, "", finalMessage);
            refreshProgressBarsAndStats("liftingSquats", lifting.squats, "", finalMessage);
            refreshProgressBarsAndStats("liftingDls", lifting.dls, "", finalMessage);
            refreshProgressBarsAndStats("liftingCurls", lifting.curls, "", finalMessage);
        }

        if (checks.gymType == -1) {
            $("#makeVideoProgress").css("width", ((job.makeVideo.current / job.makeVideo.max) * 100) + "%");
            $("#influencerProgress").css("width", ((job.recruitInfluencers.current / job.recruitInfluencers.max) * 100) + "%");
            $("#browseRedditProgress").css("width", ((research.browseReddit.current / research.browseReddit.max) * 100) + "%");
            $("#codeBotsProgress").css("width", ((research.codeBots.current / research.codeBots.max) * 100) + "%");

            if (job.views > 5000 && !checks.story3) {
                $("#story").prepend("<div id='story3' class='alert alert-primary alert-dismissible fade show fixed-bottom' role='alert'><strong>It might take a while to become popular</strong>. Let's see if there's anything I can buy in the meantime to get harder better faster stronger. (check workout tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
                checks.story3 = true;
            }

            let moneyPerSecond = math.evaluate((job.views * job.moneyGrowth));
            stats.money < 1000000 ? $("#money").html(stats.money.toFixed(2)) : $("#money").html(math.format(stats.money, 3));
            moneyPerSecond < 1000000 ? $("#money").append(" <span class='text-success'>(" + moneyPerSecond.toFixed(2) + "/s)</span>") : $("#money").append(" <span class='text-success'>(" + math.format(moneyPerSecond, 3) + "/s)</span>");

            let viewsPerSecond = math.evaluate(((job.viewGrowth * (job.followers + followerFormula())) + 1) / ((job.makeVideo.max / job.makeVideo.increase) / (job.makeVideo.speed / 1000)) * job.makeVideo.speedModifier);
            job.views < 1000000 ? $("#views").html(job.views.toFixed(2)) : $("#views").html(math.format(job.views, 3));
            viewsPerSecond < 1000000 ? $("#views").append(" <span class='text-success'>(" + viewsPerSecond.toFixed(3) + "/s)</span>") : $("#views").append(" <span class='text-success'>(" + math.format(viewsPerSecond, 3) + "/s)</span>");

            let followersPerSecond = math.evaluate((followerFormula()) / ((job.makeVideo.max / job.makeVideo.increase) / (job.makeVideo.speed / 1000)) * job.makeVideo.speedModifier);
            job.followers < 1000000 ? $(".followers").html(job.followers.toFixed(2)) : $(".followers").html(math.format(job.followers, 3));
            followersPerSecond < 1000000 ? $(".followers").append(" <span class='text-success'>(" + followersPerSecond.toFixed(3) + "/s)</span>") : $(".followers").append(" <span class='text-success'>(" + math.format(followersPerSecond, 3) + "/s)</span>");

            let followerGrowthPerSecond = math.evaluate(job.influencers * job.influencerMulti * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1));
            followerFormula() < 1000000 ? $("#followerGrowth").html(followerFormula().toFixed(4)) : $("#followerGrowth").html(math.format(followerFormula(), 3));
            if (followerGrowthPerSecond > 0) {
                followerGrowthPerSecond < 1000000 ? $("#followerGrowth").append(" <span class='text-success'>(" + followerGrowthPerSecond.toFixed(4) + "/s)</span>") : $("#followerGrowth").append(" <span class='text-success'>(" + math.format(followerGrowthPerSecond, 3) + "/s)</span>");
            }

            let influencersPerSecond = math.evaluate(job.influencerGrowth / ((job.recruitInfluencers.max / job.recruitInfluencers.increase) / (job.recruitInfluencers.speed / 1000)) * job.recruitInfluencers.speedModifier);
            job.influencers < 1000000 ? $("#influencers").html(job.influencers.toFixed(2)) : $("#influencers").html(math.format(job.influencers, 3));
            influencersPerSecond < 1000000 ? $("#influencers").append(" <span class='text-success'>(" + influencersPerSecond.toFixed(4) + "/s)</span>") : $("#influencers").append(" <span class='text-success'>(" + math.format(influencersPerSecond, 3) + "/s)</span>");

            let postsPerSecond = math.evaluate(postFormula() / ((research.browseReddit.max / research.browseReddit.increase) / (research.browseReddit.speed / 1000)) * research.browseReddit.speedModifier);
            research.posts < 1000000 ? $("#posts").html(research.posts.toFixed(2)) : $("#posts").html(math.format(research.posts, 3));
            postsPerSecond < 1000000 ? $("#posts").append(" <span class='text-success'>(" + postsPerSecond.toFixed(2) + "/s)</span>") : $("#posts").append(" <span class='text-success'>(" + math.format(postsPerSecond, 3) + "/s)</span>");

            let postGrowthPerSecond = math.evaluate(research.bots * research.botMulti * (1 + (stats.strength * stats.strengthBoost * research.postStrengthMod)));
            postFormula() < 1000000 ? $("#postGrowth").html(postFormula().toFixed(4)) : $("#postGrowth").html(math.format(postFormula(), 3));
            if (postGrowthPerSecond > 0) {
                postGrowthPerSecond < 1000000 ? $("#postGrowth").append(" <span class='text-success'>(" + postGrowthPerSecond.toFixed(4) + "/s)</span>") : $("#postGrowth").append(" <span class='text-success'>(" + math.format(postGrowthPerSecond, 3) + "/s)</span>");
            }

            let researchPerSecond = math.evaluate(research.posts * research.pointGrowth);
            research.points < 1000000 ? $("#research").html(research.points.toFixed(2)) : $("#research").html(math.format(research.points, 3));
            researchPerSecond < 1000000 ? $("#research").append(" <span class='text-success'>(" + researchPerSecond.toFixed(3) + "/s)</span>") : $("#research").append(" <span class='text-success'>(" + math.format(researchPerSecond, 3) + "/s)</span>");

            let botsPerSecond = math.evaluate(research.botGrowth / ((research.codeBots.max / research.codeBots.increase) / (research.codeBots.speed / 1000)) * research.codeBots.speedModifier);
            research.bots < 1000000 ? $("#bots").html(research.bots.toFixed(2)) : $("#bots").html(math.format(research.bots, 3));
            botsPerSecond < 1000000 ? $("#bots").append(" <span class='text-success'>(" + botsPerSecond.toFixed(4) + "/s)</span>") : $("#bots").append(" <span class='text-success'>(" + math.format(botsPerSecond, 3) + "/s)</span>");

            checkUpgradeDisable(upgrades, stats.money, "upgrade", false);
            checkUpgradeDisable(bodyweight.upgrades, stats.money, "bwUpgrade", false);
            checkUpgradeDisable(job.upgrades, job.followers, "jobUpgrade", true);
            checkUpgradeDisable(research.upgrades, research.points, "resUpgrade", false);
        }
        else {
            $("#trainMembersProgress").css("width", ((gym.trainMembers.current / gym.trainMembers.max) * 100) + "%");
            $("#createClassesProgress").css("width", ((gym.createClasses.current / gym.createClasses.max) * 100) + "%");
            $("#runCampaignProgress").css("width", ((gym.runCampaigns.current / gym.runCampaigns.max) * 100) + "%");
            $("#designAdProgress").css("width", ((gym.designAds.current / gym.designAds.max) * 100) + "%");

            stats.money < 1000000 ? $("#money").html(stats.money.toFixed(2)) : $("#money").html(math.format(stats.money, 3));
            gymMoneyPerSecond() < 1000000 ? $("#money").append(" <span class='text-success'>(" + gymMoneyPerSecond().toFixed(3) + "/s)</span>") : $("#money").append(" <span class='text-success'>(" + math.format(gymMoneyPerSecond(), 3) + "/s)</span>");

            gym.members.current < 1000000 ? $("#members").html(gym.members.current.toFixed(2)) : $("#members").html(math.format(gym.members.current, 3));
            gymMembersPerSecond < 1000000 ? $("#members").append(" <span class='text-success'>(" + gymMembersPerSecond().toFixed(3) + "/s)</span>") : $("#members").append(" <span class='text-success'>(" + math.format(gymMembersPerSecond(), 3) + "/s)</span>");
            gym.members.capacity < 1000000 ? $("#capacity").html(gym.members.capacity.toFixed(2)) : $("#capacity").html(math.format(gym.members.capacity, 3));

            gymMembersTrainedPerSecond() < 1000000 ? $("#trainedPerSecond").html(" <span class='text-success'>(" + gymMembersTrainedPerSecond().toFixed(4) + "/s)</span>") : $("#trainedPerSecond").html(" <span class='text-success'>(" + math.format(gymMembersTrainedPerSecond(), 3) + "/s)</span>");

            gym.classes < 1000000 ? $("#classes").html(gym.classes.toFixed(2)) : $("#classes").html(math.format(gym.classes, 3));
            gymClassesPerSecond() < 1000000 ? $("#classes").append(" <span class='text-success'>(" + gymClassesPerSecond().toFixed(2) + "/s)</span>") : $("#classes").append(" <span class='text-success'>(" + math.format(gymClassesPerSecond(), 3) + "/s)</span>");

            gym.advertising.influence < 1000000 ? $("#influence").html(gym.advertising.influence.toFixed(2)) : $("#influence").html(math.format(gym.advertising.influence, 3));
            gymInfluencePerSecond() < 1000000 ? $("#influence").append(" <span class='text-success'>(" + gymInfluencePerSecond().toFixed(3) + "/s)</span>") : $("#influence").append(" <span class='text-success'>(" + math.format(gymInfluencePerSecond(), 3) + "/s)</span>");

            gym.advertising.campaigns < 1000000 ? $("#campaigns").html(gym.advertising.campaigns.toFixed(2)) : $("#campaigns").html(math.format(gym.advertising.campaigns, 3));
            gymCampaignsPerSecond() < 1000000 ? $("#campaigns").append(" <span class='text-success'>(" + gymCampaignsPerSecond().toFixed(3) + "/s)</span>") : $("#campaigns").append(" <span class='text-success'>(" + math.format(gymCampaignsPerSecond(), 3) + "/s)</span>");

            gymCampaignFormula() < 1000000 ? $("#campaignGrowth").html(gymCampaignFormula().toFixed(2)) : $("#campaignGrowth").html(math.format(gymCampaignFormula(), 3));
            gymCampaignGrowthPerSecond() < 1000000 ? $("#campaignGrowth").append(" <span class='text-success'>(" + gymCampaignGrowthPerSecond().toFixed(4) + "/s)</span>") : $("#campaignGrowth").append(" <span class='text-success'>(" + math.format(gymCampaignGrowthPerSecond(), 3) + "/s)</span>");

            gym.advertising.ads < 1000000 ? $("#adsDesigned").html(gym.advertising.ads.toFixed(2)) : $("#adsDesigned").html(math.format(gym.advertising.ads, 3));
            gymAdsPerSecond() < 1000000 ? $("#adsDesigned").append(" <span class='text-success'>(" + gymAdsPerSecond().toFixed(3) + "/s)</span>") : $("#adsDesigned").append(" <span class='text-success'>(" + math.format(gymAdsPerSecond(), 3) + "/s)</span>");

            checkUpgradeDisable(gym.upgrades, stats.money, "upgrade", false);

            checkUpgradeDisable(gym.gymUpgrades, stats.money, "gymUpgrade", false);
            checkUpgradeDisable(gym.adUpgrades, gym.advertising.influence, "adUpgrade", false);

            checkEmployeeDisable(gym.employees.sales, stats.money, "sales");
            checkEmployeeDisable(gym.employees.trainers, stats.money, "trainer");
            checkEmployeeDisable(gym.employees.coordinators, stats.money, "coordinator");
            checkEmployeeDisable(gym.employees.nutritionists, stats.money, "nutritionist");
            checkEmployeeDisable(gym.advertising.employees.coordinators, stats.money, "adCoordinator");
            checkEmployeeDisable(gym.advertising.employees.designers, stats.money, "designer");
            checkEmployeeDisable(gym.advertising.employees.managers, stats.money, "manager");

            $("#nutritionistMulti").html(math.evaluate(gym.employees.nutritionists.boost * 100))
            $("#managerMulti").html(math.evaluate(gym.advertising.employees.managers.boost * 100))

            if (prestige.bw.confidence > 0) {
                $("#confidenceWrap").removeClass("d-none");
            }
            prestige.bw.confidence < 1000000 ? $("#confidence").html(prestige.bw.confidence.toFixed(2)) : $("#confidence").html(math.format(prestige.bw.confidence, 3));

            if (prestige.lifting.leadership > 0) {
                $("#leadershipWrap").removeClass("d-none");
            }
            prestige.lifting.leadership < 1000000 ? $("#leadership").html(prestige.lifting.leadership.toFixed(2)) : $("#leadership").html(math.format(prestige.lifting.leadership, 3));

            for (let i = 0; i < gym.members.tiers.length; i++) {
                let amountAtTier = math.evaluate(gym.members.tiers[i].current * ((gym.money.growth * (gym.members.tiers[i].multiplier * (i + 1)))));
                $("#gymMemberTier" + i).html(gym.members.tiers[i].current.toFixed(3));
                amountAtTier < 1000000 ? $("#gymAmountTier" + i).html("<span class='text-success'>$" + amountAtTier.toFixed(4) + "/s</span>") : $("#gymAmountTier").html("<span class='text-success'>$" + math.format(gymAdsPerSecond(), 3) + "/s</span>");
            }

            let classMulti = math.evaluate((gym.classes * gym.money.classMultiplier) + 1)
            classMulti < 1000000 ? $("#classMulti").html(classMulti.toFixed(3) + "x") : $("#classMulti").html(math.format(classMulti, 3) + "x");

            switch (checks.gymType) {
                case 0:
                    if (prestige.bw.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 0 })[0].isPurchased) {
                        writeGangInfo();
                    }
                    checkUpgradeDisable(gym.bw.upgrades, stats.money, "bwUpgrade", false);
                    checkUpgradeDisable(gym.bw.gymUpgrades, stats.money, "gymBwUpgrade", false);
                    checkUpgradeDisable(gym.bw.adUpgrades, gym.advertising.influence, "adBwUpgrade", false);
                    break;
                case 1:
                    checkUpgradeDisable(gym.lifting.upgrades, stats.money, "liftingUpgrade", false);
                    checkUpgradeDisable(gym.lifting.gymUpgrades, stats.money, "gymliftingUpgrade", false);
                    checkUpgradeDisable(gym.lifting.adUpgrades, gym.advertising.influence, "adliftingUpgrade", false);
                    checkLiftingCompDisable(lifting.comps.conferences, "liftingLocalConference", null, null);
                    checkLiftingCompDisable(lifting.comps.regionalConferences, "liftingRegionalConference", lifting.comps.conferences, "liftingLocalConference");
                    checkLiftingCompDisable(lifting.comps.stateConferences, "liftingStateConference", lifting.comps.regionalConferences, "liftingRegionalConference");
                    checkLiftingCompDisable(lifting.comps.nationalConferences, "liftingNationalConference", lifting.comps.stateConferences, "liftingStateConference");
                    checkLiftingCompDisable(lifting.comps.worldConferences, "liftingWorldConference", lifting.comps.nationalConferences, "liftingNationalConference");
                    if (prestige.lifting.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 0 })[0].isPurchased) {
                        writeCompInfo();
                        $("#compMoneyMulti").html(Math.pow(lifting.comps.competitions.current, .001).toFixed(2));
                    }
                    
                    break;
                default:
            }
        }
    }, 50);
}

//#region energy

function setupEnergyTimer() {
    energyTimerId = setInterval(function () {
        if (stats.energy.current < stats.energy.max) {
            let increase = math.evaluate((stats.energy.increase * ((stats.agility * stats.agilityBoost) + 1)));
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
    }, stats.energy.speed)
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

function getPayDay() {
    if (!$("#payDayBtn").hasClass("disabled")) {
        $("#payDayBtn").addClass("disabled");
        stats.payday.total += 1;
        stats.payday.isCooldown = true;
        if (checks.gymType == -1) {
            if (math.evaluate(stats.money + (job.views * job.moneyGrowth)) > 0) {
                stats.money += math.evaluate((job.views * job.moneyGrowth) * stats.payday.boost);
            }
            else {
                stats.money = 0;
            }
        }
        else {
            stats.money += math.evaluate(gymMoneyPerSecond() * stats.payday.boost);
            if (stats.money > 1e200) {
                stats.money = 1e200;
            }
        }
        setupPayDayTimer();
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

function setupPayDayTimer() {
    payDayTimerId = setInterval(function () {
        if (stats.payday.current < stats.payday.cooldown) {
            stats.payday.current += 1;
        }
        else {
            stats.payday.current = 0;
            stats.payday.isCooldown = false;
        }
    }, 1000);
}

//#endregion

//#region generic functions

function trimUpgradeSaveData(upgradeArray) {
    for (let i = 0; i < upgradeArray.length; i++) {
        upgradeArray[i].name = "";
        upgradeArray[i].desc = "";
    }
}

function writeAllUpgrades(array1, array2, divText, text1, text2, function1, function2) {
    tempUpgrades = array1;
    if (array2 != null) {
        tempUpgrades = tempUpgrades.concat(array2);
    }
    tempUpgrades.sort(function (a, b) {
        return a.name < b.name ? 1 : -1
    });
    tempUpgrades.sort(function (a, b) {
        return a.cost > b.cost ? 1 : -1
    });

    if (array2 != null) {
        for (let i = 0; i < tempUpgrades.length; i++) {
            for (let j = 0; j < array1.length; j++) {
                if (tempUpgrades[i] == array1[j]) {
                    let active = "";
                    if (!array1[j].isActive) {
                        active = "d-none";
                    }
                    $("#" + divText).append("<div class='" + active + "' id='" + text1 + "" + array1[j].id + "'><button type='button' id='" + text1 + "Btn" + array1[j].id + "' class='btn btn-secondary btn-block disabled' onclick='" + function1 + "(this);'>" + array1[j].name + "</button><p id='" + text1 + "Desc" + array1[j].id + "'>" + array1[j].desc + "</p></div>");
                }
            }

            for (let j = 0; j < array2.length; j++) {
                if (tempUpgrades[i] == array2[j]) {
                    let active = "";
                    if (!array2[j].isActive) {
                        active = "d-none";
                    }
                    $("#" + divText).append("<div class='" + active + "' id='" + text2 + "" + array2[j].id + "'><button type='button' id='" + text2 + "Btn" + array2[j].id + "' class='btn btn-secondary btn-block disabled' onclick='" + function2 + "(this);'>" + array2[j].name + "</button><p id='" + text2 + "Desc" + array2[j].id + "'>" + array2[j].desc + "</p></div>");
                }
            }
        }
    }
    else {
        for (let i = 0; i < tempUpgrades.length; i++) {
            let active = "";
            if (!tempUpgrades[i].isActive) {
                active = "d-none";
            }
            $("#" + divText).append("<div class='" + active + "' id='" + text1 + "" + tempUpgrades[i].id + "'><button type='button' id='" + text1 + "Btn" + tempUpgrades[i].id + "' class='btn btn-secondary btn-block disabled' onclick='" + function1 + "(this);'>" + tempUpgrades[i].name + "</button><p id='" + text1 + "Desc" + tempUpgrades[i].id + "'>" + tempUpgrades[i].desc + "</p></div>");
        }
    }
}

function writeAllPrestigeUpgrades(array1, divText, text1, function1, points) {
    tempUpgrades = array1;
    tempUpgrades.sort(function (a, b) {
        return a.name < b.name ? 1 : -1
    });
    tempUpgrades.sort(function (a, b) {
        return a.cost > b.cost ? 1 : -1
    });


    // split into 3 columns
    let rowId = 0;
    for (let i = 0; i < tempUpgrades.length; i++) {
        let classes = "";
        if (tempUpgrades[i].isPurchased) {
            classes = " btn-success disabled";
        }
        else if (points >= tempUpgrades[i].cost) {
            classes = " btn-primary";
        }
        else {
            classes = " btn-secondary disabled";
        }
        if (((i + 3) % 3) == 0) {
            rowId += 1;
            $("#" + divText).append("<div id='" + divText + "Row" + rowId + "' class='row'></div>");
        }
        $("#" + divText + "Row" + rowId).append("<div class='col'><div id='" + text1 + "" + tempUpgrades[i].id + "'><button type='button' id='" + text1 + "Btn" + tempUpgrades[i].id + "' class='btn btn-block" + classes + "' onclick='" + function1 + "(this, false);'>" + tempUpgrades[i].name + "</button><p id='" + text1 + "Desc" + tempUpgrades[i].id + "'>" + tempUpgrades[i].desc + "</p></div></div>");
    }
    if (((tempUpgrades.length) % 3) == 1) {
        $("#" + divText + "Row" + rowId).append("<div class='col'></div><div class='col'></div>");
    }
    else if (((tempUpgrades.length) % 3) == 2) {
        $("#" + divText + "Row" + rowId).append("<div class='col'></div>");
    }
}

function updateUpgradesAfterLoad(upgradeArray, saveDataArray) {
    try {
        let purchasedArray = [];
        let purchased = false;
        let active = false;
        for (let i = 0; upgradeArray.length > i; i++) {
            purchased = false;
            active = false;
            for (let j = 0; saveDataArray.length > j; j++) {
                if (upgradeArray[i].id == saveDataArray[j].id) {
                    if (saveDataArray[j].isPurchased) {
                        purchased = true;
                    }
                    if (saveDataArray[j].isActive) {
                        active = true;
                    }
                    if (purchased || active) {
                        let valueToPush = new Array();
                        valueToPush[0] = upgradeArray[i].id;
                        valueToPush[1] = saveDataArray[j].isPurchased;
                        valueToPush[2] = saveDataArray[j].isActive
                        purchasedArray.push(valueToPush);
                    }
                }
            }
        }
        saveDataArray = JSON.parse(JSON.stringify(upgradeArray));

        for (let i = 0; saveDataArray.length > i; i++) {
            for (let j = 0; purchasedArray.length > j; j++) {
                if (saveDataArray[i].id == purchasedArray[j][0]) {
                    if (purchasedArray[j][1] == true) {
                        saveDataArray[i].isPurchased = true;
                    }
                    if (purchasedArray[j][2] == true) {
                        saveDataArray[i].isActive = true;
                    }
                }
            }
        }
        upgradeArray = JSON.parse(JSON.stringify(saveDataArray));
        return upgradeArray;
    }
    catch (ex) {
        console.log(ex);
    }
}

function checkUpgradeDisable(upgradeArray, points, text, jobCheck) {
    for (let i = 0; i < upgradeArray.length; i++) {
        if (points > (upgradeArray[i].cost / 4) && !upgradeArray[i].isPurchased) {
            upgradeArray[i].isActive = true;
            if (jobCheck) {
                if ((upgradeArray[i].id == 3 && bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 1 })[0].isPurchased) || upgradeArray[i].id != 3) {
                    $("#" + text + upgradeArray[i].id).removeClass("d-none");
                }
                else {
                    $("#" + text + upgradeArray[i].id).addClass("d-none");
                }
            }
            else {
                $("#" + text + upgradeArray[i].id).removeClass("d-none");
            }

            if (points >= upgradeArray[i].cost) {
                $("#" + text + "Btn" + upgradeArray[i].id).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#" + text + "Btn" + upgradeArray[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            if (upgradeArray[i].isPurchased) {
                $("#" + text + upgradeArray[i].id).addClass("d-none");
            }
            else if (upgradeArray[i].isActive) {
                $("#" + text + "Btn" + upgradeArray[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
    }
}

function checkEmployeeDisable(employee, points, text) {
    let cost = getEmployeeCost(employee);
    cost < 1000000 ? $("#" + text + "Cost").html(cost.toFixed(0)) : $("#" + text + "Cost").html(math.format(cost, 3));
    $("#" + text + "Owned").html(employee.current);
    if (points >= cost) {
        $("#" + text + "Btn").removeClass("disabled").removeClass("btn-secondary").addClass("btn-outline-warning");
    }
    else {
        $("#" + text + "Btn").addClass("disabled").removeClass("btn-outline-warning").addClass("btn-secondary");
    }
}

function checkLiftingCompDisable(compType, text, previousCompType, text2) {
    let cost = compType.cost
    cost < 1000000 ? $("#" + text + "Cost").html(cost.toFixed(0)) : $("#" + text + "Cost").html(math.format(cost, 3));
    $("#" + text + "Owned").html(compType.current);
    if (lifting.comps.competitions.current >= cost && !compType.hidden) {
        if (previousCompType != null) {
            previousCompType.hidden = true;
        }
        $("#" + text + "Btn").removeClass("disabled").removeClass("btn-secondary").addClass("btn-outline-warning");
    }
    else {
        $("#" + text + "Btn").addClass("disabled").removeClass("btn-outline-warning").addClass("btn-secondary");
    }
    if (previousCompType != null && previousCompType.hidden) {
        $("#" + text2 + "Wrap").addClass("d-none");
        $("#" + text2 + "Btn").addClass("disabled");
    }
    else if (previousCompType != null) {
        $("#" + text2 + "Wrap").removeClass("d-none");
    }
    else {
        if (compType.current > 0) {
            $("#createCompBtn").addClass("d-none");
        }
    }
}

function checkPrestigeUpgradeDisable(upgradeArray, points, text) {
    for (let i = 0; i < upgradeArray.length; i++) {
        if (!upgradeArray[i].isPurchased) {
            upgradeArray[i].isActive = true;

            if (points >= upgradeArray[i].cost) {
                $("#" + text + "Btn" + upgradeArray[i].id).removeClass("disabled").removeClass("btn-secondary").addClass("btn-primary");
            }
            else {
                $("#" + text + "Btn" + upgradeArray[i].id).addClass("disabled").removeClass("btn-primary").addClass("btn-secondary");
            }
        }
        else {
            $("#" + text + "Btn" + upgradeArray[i].id).addClass("disabled").removeClass("btn-secondary").removeClass("btn-primary").addClass("btn-success");
        }
    }
}

function fightGang() {
    if (!$("#gangFightBtn").hasClass("disabled")) {
        $("#gangFightBtn").addClass("disabled");
        $("#gangFight").removeClass("d-none");
        let found = false;
        bodyweight.gang.playerFightPowerTemp = gangPower(bodyweight.gang.strength, bodyweight.gang.members);
        for (let i = 0; i < bodyweight.gang.rivals.length; i++) {
            if (!bodyweight.gang.rivals[i].isAbsorbed && !found) {
                found = true;
                bodyweight.gang.rivalFightPowerTemp = gangPower(bodyweight.gang.rivals[i].strength, bodyweight.gang.rivals[i].members);
                bodyweight.gang.rivalId = i;
            }
        }


        fightGangTimerId = setInterval(function () {
            let playerValue = math.evaluate(gangPower(bodyweight.gang.strength, bodyweight.gang.members));
            let rivalValue = math.evaluate(gangPower(bodyweight.gang.rivals[bodyweight.gang.rivalId].strength, bodyweight.gang.rivals[bodyweight.gang.rivalId].members));

            let playerRandom = math.random(0, playerValue);
            let rivalRandom = math.random(0, rivalValue);

            let combined = bodyweight.gang.playerFightPowerTemp + bodyweight.gang.rivalFightPowerTemp;

            if (playerRandom >= rivalRandom) {
                bodyweight.gang.playerFightPowerTemp += math.evaluate(gangPower(bodyweight.gang.rivals[bodyweight.gang.rivalId].strength, bodyweight.gang.rivals[bodyweight.gang.rivalId].members) * .06);
                bodyweight.gang.rivalFightPowerTemp -= math.evaluate(gangPower(bodyweight.gang.rivals[bodyweight.gang.rivalId].strength, bodyweight.gang.rivals[bodyweight.gang.rivalId].members) * .06);
            }
            else {
                bodyweight.gang.playerFightPowerTemp -= math.evaluate(gangPower(bodyweight.gang.strength, bodyweight.gang.members) * .06);
                bodyweight.gang.rivalFightPowerTemp += math.evaluate(gangPower(bodyweight.gang.strength, bodyweight.gang.members) * .06);
            }
            let winner = false;
            // is there a winner
            if (bodyweight.gang.rivalFightPowerTemp < 0) {
                if (math.evaluate(gangPower(bodyweight.gang.strength, bodyweight.gang.members) * .4) >= gangPower(bodyweight.gang.rivals[bodyweight.gang.rivalId].strength, bodyweight.gang.rivals[bodyweight.gang.rivalId].members)) {
                    bodyweight.gang.rivals[bodyweight.gang.rivalId].isAbsorbed = true;
                    $("#gangWinLoseMessage").prepend("<div id='gangWinLoseAlert' class='alert alert-success alert-dismissible fade show' role='alert'><strong>All of the " + bodyweight.gang.rivals[bodyweight.gang.rivalId].name + " have joined me now!</strong> I've gained .1 confidence and they brought along $" + bodyweight.gang.rivals[bodyweight.gang.rivalId].members.toFixed(2) + "! On to the next contender.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
                    stats.money += bodyweight.gang.rivals[bodyweight.gang.rivalId].members;
                    bodyweight.gang.members += bodyweight.gang.rivals[bodyweight.gang.rivalId].members;

                    // gain confidence points
                    prestige.bw.confidence += .1;

                }
                else {
                    $("#gangWinLoseMessage").prepend("<div id='gangWinLoseAlert' class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success!</strong> 10% of their members joined me!<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
                }

                setTimeout(function () {
                    $("#gangWinLoseAlert").alert('close');
                }, 10000);

                let members = math.evaluate(bodyweight.gang.rivals[bodyweight.gang.rivalId].members * .1)
                bodyweight.gang.members += members
                bodyweight.gang.rivals[bodyweight.gang.rivalId].members -= members;
                bodyweight.gang.rivals[bodyweight.gang.rivalId].isDefeated = true;

                winner = true;
            }
            else if (bodyweight.gang.playerFightPowerTemp < 0) {
                $("#gangWinLoseMessage").append("<div id='gangWinLoseAlert' class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Failure!</strong> 10% of my members left to join them!<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");

                setTimeout(function () {
                    $("#gangWinLoseAlert").alert('close');
                }, 10000);

                let members = math.evaluate(bodyweight.gang.members * .1)
                bodyweight.gang.members -= members
                bodyweight.gang.rivals[bodyweight.gang.rivalId].members += members;
                winner = true;
            }

            if (winner) {
                $("#gangFight").addClass("d-none");
                $("#gangFightBtn").removeClass("disabled");
                clearInterval(fightGangTimerId);
            }
            else {
                $("#gangFightProgress").css("width", ((bodyweight.gang.playerFightPowerTemp / combined) * 100) + "%");
            }
        }, 50);
    }
}

function addGangStrength() {
    bodyweight.gang.strength += math.evaluate(bodyweight.gang.strengthAmount * ((stats.strength * stats.strengthBoost) + 1));
    writeGangInfo();
}

function addGangMembers() {
    bodyweight.gang.members += math.evaluate(bodyweight.gang.memberAmount * ((stats.intelligence * stats.intelligenceBoost) + 1));
    writeGangInfo();
}

function gangPower(strength, members) {
    return math.evaluate(strength * members);
}

function changeGangName() {
    bodyweight.gang.name = $("#gangNameInput").val();
    $("#gangName").html(bodyweight.gang.name);
    $("#editGangNameGroup").addClass("d-none");
}

function editGangName() {
    $("#editGangNameGroup").removeClass("d-none");
}
function writeGangInfo() {
    let _gangPower = gangPower(bodyweight.gang.strength, bodyweight.gang.members)
    bodyweight.gang.strength < 1000000 ? $("#gangStrength").html(bodyweight.gang.strength.toFixed(2)) : $("#gangStrength").html(math.format(bodyweight.gang.strength, 3));
    bodyweight.gang.members < 1000000 ? $("#gangMembers").html(bodyweight.gang.members.toFixed(2)) : $("#gangMembers").html(math.format(bodyweight.gang.members, 3));
    _gangPower < 1000000 ? $("#gangPower").html(_gangPower.toFixed(2)) : $("#gangPower").html(math.format(_gangPower, 3));

    let found = false;
    for (let i = 0; i < bodyweight.gang.rivals.length; i++) {
        if (!bodyweight.gang.rivals[i].isAbsorbed && !found) {
            found = true;
            let rivalPower = gangPower(bodyweight.gang.rivals[i].strength, bodyweight.gang.rivals[i].members);
            $("#rivalGangName").html(bodyweight.gang.rivals[i].name);
            $("#rivalGangDesc").html(bodyweight.gang.rivals[i].desc);
            bodyweight.gang.rivals[i].strength < 1000000 ? $("#rivalGangStrength").html(bodyweight.gang.rivals[i].strength.toFixed(2)) : $("#rivalGangStrength").html(math.format(bodyweight.gang.rivals[i].strength, 3));
            bodyweight.gang.rivals[i].members < 1000000 ? $("#rivalGangMembers").html(bodyweight.gang.rivals[i].members.toFixed(2)) : $("#rivalGangMembers").html(math.format(bodyweight.gang.rivals[i].members, 3));
            rivalPower < 1000000 ? $("#rivalGangPower").html(rivalPower.toFixed(2)) : $("#rivalGangPower").html(math.format(rivalPower, 3));

            if (math.evaluate(_gangPower * .4) >= rivalPower) {
                $("#gangFightBtn").html("Absorb Gang");
            }
            else {
                $("#gangFightBtn").html("Compete Against Gang");
            }
        }
    }
    if (!found) {
        $("#gangRivalWrap").addClass("d-none");
        $("#gangCompleteWrap").removeClass("d-none");
    }
}

function writeCompInfo() {
    lifting.comps.competitions.current < 100000 ? $("#liftingCompetitions").html(lifting.comps.competitions.current.toFixed(2)) : $("#liftingCompetitions").html(math.format(lifting.comps.competitions.current, 3));
    lifting.comps.conferences.current < 100000 ? $("#liftingLocalConferences").html(lifting.comps.conferences.current.toFixed(2)) : $("#liftingLocalConferences").html(math.format(lifting.comps.conferences.current, 3));
    lifting.comps.regionalConferences.current < 100000 ? $("#liftingRegionalConferences").html(lifting.comps.regionalConferences.current.toFixed(2)) : $("#liftingRegionalConferences").html(math.format(lifting.comps.regionalConferences.current, 3));
    lifting.comps.stateConferences.current < 100000 ? $("#liftingStateConferences").html(lifting.comps.stateConferences.current.toFixed(2)) : $("#liftingStateConferences").html(math.format(lifting.comps.stateConferences.current, 3));
    lifting.comps.nationalConferences.current < 100000 ? $("#liftingNationalConferences").html(lifting.comps.nationalConferences.current.toFixed(2)) : $("#liftingNationalConferences").html(math.format(lifting.comps.nationalConferences.current, 3))
    lifting.comps.worldConferences.current < 100000 ? $("#liftingWorldConferences").html(lifting.comps.worldConferences.current.toFixed(2)) : $("#liftingWorldConferences").html(math.format(lifting.comps.worldConferences.current, 3));
}

function updatePrestigeValues() {
    $("#pointsReceived").html(prestige.total + 1);
    checks.gymType == 0 || checks.gymType == -1 ? $("#bwPointsReceived").html(prestige.bw.total + 1) : $("#bwPointsReceived").html("0");
    checks.gymType == 1 ? $("#liftingPointsReceived").html(prestige.lifting.total + 1) : $("#liftingPointsReceived").html("0");
    checks.gymType == 2 ? $("#yogaPointsReceived").html(prestige.yoga.total + 1) : $("#yogaPointsReceived").html("0");
    checks.gymType == 3 ? $("#cardioPointsReceived").html(prestige.cardio.total + 1) : $("#cardioPointsReceived").html("0");

    $("#pointsOwned").html(prestige.current);
    $("#bwPointsOwned").html(prestige.bw.current);
    $("#liftingPointsOwned").html(prestige.lifting.current);
    $("#yogaPointsOwned").html(prestige.yoga.current);
    $("#cardioPointsOwned").html(prestige.cardio.current);

    if (checks.isPrestige) {
        $("#prestigeReady").removeClass("d-none");
    }
    else {
        $("#prestigeReady").addClass("d-none");
    }
}

function startStop(exercise, timerId, load) {
    if ((exercise.isStopped && !load) || (load && !exercise.isStopped)) {
        clearInterval(timerId);
        switch (exercise.id) {
            case 0:
                setupPushupTimer();
                break;
            case 1:
                setupRowTimer();
                break;
            case 2:
                setupDipTimer();
                break;
            case 3:
                setupPullupTimer();
                break;
            case 4:
                setupBwSquatTimer();
                break;
            case 5:
                setupBwRdlTimer();
                break;
            case 6:
                setupLiftingBenchTimer();
                break;
            case 7:
                setupLiftingRowTimer();
                break;
            case 8:
                setupLiftingOhpTimer();
                break;
            case 9:
                setupLiftingSquatsTimer();
                break;
            case 10:
                setupLiftingDlsTimer();
                break;
            case 11:
                setupLiftingCurlsTimer();
                break;
            default:
        }
        if (!load) {
            exercise.isStopped = false;
        }
    }
    else {
        clearInterval(timerId);
        if (!load) {
            exercise.isStopped = true;
        }
    }
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
            let totalToAdd = math.evaluate(1 + (stats.strength * stats.strengthBoost));
            exercise.total += totalToAdd;
            if (exercise.total > 1e200) {
                exercise.total = 1e200;
            }
            if (checks.gymType == -1 || checks.gymType == 0) {
                if (exercise.total > exercise.tiers[exercise.tier].upgrade && exercise.tier != 4) {
                    exercise.strength *= exercise.tiers[exercise.tier].multiplier;
                    exercise.endurance *= exercise.tiers[exercise.tier].multiplier;
                    exercise.agility *= exercise.tiers[exercise.tier].multiplier;
                    exercise.energy *= 2;
                    exercise.tier += 1;
                }
            }
            else if (checks.gymType == 1) {
                if (exercise.weight < exercise.maxWeight) {
                    exercise.repsToNext += totalToAdd;
                    if (exercise.repsToNext >= exercise.repsToNextBase) {
                        exercise.repsToNext = 0;
                        exercise.repsToNextBase += 1;
                        exercise.strength *= exercise.multi;
                        exercise.endurance *= exercise.multi;
                        exercise.agility *= exercise.multi;
                        exercise.energy *= math.evaluate(exercise.multi);
                        exercise.weight += exercise.weightIncrease;
                    }
                }
            }
            stats.strength += math.evaluate(exercise.strength * ((stats.intelligence * stats.intelligenceBoost) + 1) * ((prestige.lifting.leadership * prestige.lifting.leadershipBoost) + 1));
            if (stats.strength > 1e200) {
                stats.strength = 1e200;
            }
            stats.endurance += math.evaluate(exercise.endurance * ((stats.intelligence * stats.intelligenceBoost) + 1) * ((prestige.lifting.leadership * prestige.lifting.leadershipBoost) + 1));
            if (stats.endurance > 1e200) {
                stats.endurance = 1e200;
            }
            stats.agility += math.evaluate(exercise.agility * ((stats.intelligence * stats.intelligenceBoost) + 1) * ((prestige.lifting.leadership * prestige.lifting.leadershipBoost) + 1));
            if (stats.agility > 1e200) {
                stats.agility = 1e200;
            }
            exercise.current = 0;
        }
    }
}

function setupOneSecondTimer() {
    oneSecondTimerId = setInterval(function () {
        if (checks.gymType == -1) {
            if (math.evaluate(stats.money + (job.views * job.moneyGrowth)) > 0) {
                stats.money += math.evaluate((job.views * job.moneyGrowth));
            }
            else {
                stats.money = 0;
            }

            job.followerGrowth += math.evaluate(job.influencers * job.influencerMulti);
            research.points += math.evaluate(research.posts * research.pointGrowth);
            research.postGrowth += math.evaluate(research.bots * research.botMulti);
        }
        else {
            stats.money += gymMoneyPerSecond();
            if (stats.money > 1e200) {
                stats.money = 1e200;
            }
            gym.advertising.influence += gymInfluencePerSecond();
            if (gym.advertising.influence > 1e200) {
                gym.advertising.influence = 1e200;
            }

            let totalToAdd = gymMembersPerSecond();
            gym.members.current += totalToAdd;
            gym.members.tiers[0].current += totalToAdd;
            gym.advertising.campaignGrowth += gymCampaignGrowthPerSecond();

            if (gym.advertising.campaignGrowth > 1e200) {
                gym.advertising.campaignGrowth = 1e200;
            }

            // street gang
            bodyweight.gang.strength += math.evaluate(bodyweight.gang.strengthAmount * ((stats.strength * stats.strengthBoost) + 1) * bodyweight.gang.on);
            if (bodyweight.gang.strength > 1e100) {
                bodyweight.gang.strength = 1e100;
            }

            bodyweight.gang.members += math.evaluate(bodyweight.gang.memberAmount * ((stats.intelligence * stats.intelligenceBoost) + 1) * bodyweight.gang.on);
            if (bodyweight.gang.members > 1e100) {
                bodyweight.gang.members = 1e100;
            }

            for (let i = 0; i < bodyweight.gang.rivals.length; i++) {
                bodyweight.gang.rivals[i].strength += bodyweight.gang.rivals[i].strengthAmount * bodyweight.gang.on;
                bodyweight.gang.rivals[i].members += bodyweight.gang.rivals[i].memberAmount * bodyweight.gang.on;
            }

            lifting.comps.competitions.current += math.evaluate(lifting.comps.conferences.current * ((lifting.dls.weight * lifting.comps.conferences.mod) + 1));
            lifting.comps.conferences.current += math.evaluate(lifting.comps.regionalConferences.current * ((lifting.squats.weight * lifting.comps.regionalConferences.mod) + 1));
            lifting.comps.regionalConferences.current += math.evaluate(lifting.comps.stateConferences.current * ((lifting.rows.weight * lifting.comps.stateConferences.mod) + 1));
            lifting.comps.stateConferences.current += math.evaluate(lifting.comps.nationalConferences.current * ((lifting.bench.weight * lifting.comps.nationalConferences.mod) + 1));
            lifting.comps.nationalConferences.current += math.evaluate(lifting.comps.worldConferences.current * ((lifting.ohp.weight * lifting.comps.worldConferences.mod) + 1));

            if (lifting.comps.competitions > 1e200) {
                lifting.comps.competitions = 1e200;
            }
            if (lifting.comps.conferences > 1e200) {
                lifting.comps.conferences = 1e200;
            }
            if (lifting.comps.regionalConferences > 1e200) {
                lifting.comps.regionalConferences = 1e200;
            }
            if (lifting.comps.stateConferences > 1e200) {
                lifting.comps.stateConferences = 1e200;
            }
            if (lifting.comps.nationalConferences > 1e200) {
                lifting.comps.nationalConferences = 1e200;
            }


            // check for autoclickers
            if (checks.bwGymBuyerOn && checks.gymType == 0) {
                autobuyUpgrades(gym.gymUpgrades, "gymUpgrade", stats.money);
            }
            if (checks.bwUpgradeBuyerOn && checks.gymType == 0) {
                autobuyUpgrades(gym.upgrades, "upgrade", stats.money);
                autobuyUpgrades(gym.bw.upgrades, "bwUpgrade", stats.money);
            }
            if (checks.bwAdBuyerOn && checks.gymType == 0) {
                autobuyUpgrades(gym.adUpgrades, "adUpgrade", gym.advertising.influence);
            }
            if (checks.liftingGymBuyerOn && checks.gymType == 1) {
                autobuyUpgrades(gym.gymUpgrades, "gymUpgrade", stats.money);
            }
            if (checks.liftingUpgradeBuyerOn && checks.gymType == 1) {
                autobuyUpgrades(gym.upgrades, "upgrade", stats.money);
                autobuyUpgrades(gym.lifting.upgrades, "liftingUpgrade", stats.money);
            }
            if (checks.liftingAdBuyerOn && checks.gymType == 1) {
                autobuyUpgrades(gym.adUpgrades, "adUpgrade", gym.advertising.influence);
            }
            if (checks.gymSalesBuyerOn) {
                autobuyEmployees(gym.employees.sales, "salesBtn", stats.money);
            }
            if (checks.gymTrainerBuyerOn) {
                autobuyEmployees(gym.employees.trainers, "trainerBtn", stats.money);
            }
            if (checks.gymCoordinatorBuyerOn) {
                autobuyEmployees(gym.employees.coordinators, "coordinatorBtn", stats.money);
            }
            if (checks.gymNutritionistBuyerOn) {
                autobuyEmployees(gym.employees.nutritionists, "nutritionistBtn", stats.money);
            }
            if (checks.adCoordinatorBuyerOn) {
                autobuyEmployees(gym.advertising.employees.coordinators, "adCoordinatorBtn", stats.money);
            }
            if (checks.adDesignerBuyerOn) {
                autobuyEmployees(gym.advertising.employees.designers, "designerBtn", stats.money);
            }
            if (checks.adManagerBuyerOn) {
                autobuyEmployees(gym.advertising.employees.managers, "managerBtn", stats.money);
            }
            if (checks.coffeeClickerOn) {
                $("#coffeeBtn").click();
            }

            let found = false;
            for (let i = 0; i < bodyweight.gang.rivals.length; i++) {
                if (!bodyweight.gang.rivals[i].isAbsorbed && !found) {
                    found = true;
                    bodyweight.gang.rivalId = i;
                }
            }

            if (checks.absorbGangsOn && checks.gymType == 0 && found && math.evaluate(gangPower(bodyweight.gang.strength, bodyweight.gang.members) * .4) >= gangPower(bodyweight.gang.rivals[bodyweight.gang.rivalId].strength, bodyweight.gang.rivals[bodyweight.gang.rivalId].members)) {
                $("#gangFightBtn").click();
            }

            if (checks.conferenceBuyerOn) {
                autobuyConferences(lifting.comps.worldConferences, "liftingWorldConferenceBtn");
                autobuyConferences(lifting.comps.nationalConferences, "liftingNationalConferenceBtn");
                autobuyConferences(lifting.comps.stateConferences, "liftingStateConferenceBtn");
                autobuyConferences(lifting.comps.regionalConferences, "liftingRegionalConferenceBtn");
                autobuyConferences(lifting.comps.conferences, "liftingLocalConferenceBtn");
            }
        }
    }, 1000);
}

function autobuyUpgrades(upgradeArray, text, points) {
    for (let i = 0; i < upgradeArray.length; i++) {
        if (!upgradeArray[i].isPurchased && points >= upgradeArray[i].cost) {
            $("#" + text + "Btn" + upgradeArray[i].id).click();
            points -= upgradeArray[i].cost;
        }
    }
}
function autobuyEmployees(employee, text) {
    if (stats.money >= getEmployeeCost(employee)) {
        $("#" + text).click();
    }
}

function autobuyConferences(compType, text) {
    if (lifting.comps.competitions.current >= compType.cost) {
        $("#" + text).click();
    }
}

function refreshProgressBarsAndStats(text, exercise, progression, finalMessage) {
    let strength = math.evaluate(exercise.strength * ((stats.intelligence * stats.intelligenceBoost) + 1));
    var strengthFormat = strength < 1000000 ? strength.toFixed(2) : math.format(strength, 3);
    let endurance = math.evaluate(exercise.endurance * ((stats.intelligence * stats.intelligenceBoost) + 1));
    var enduranceFormat = endurance < 1000000 ? endurance.toFixed(2) : math.format(endurance, 3);
    let agility = math.evaluate(exercise.agility * ((stats.intelligence * stats.intelligenceBoost) + 1));
    var agilityFormat = agility < 1000000 ? agility.toFixed(2) : math.format(agility, 3);
    var totalFormat = exercise.total < 1000000 ? exercise.total.toFixed(2) : math.format(exercise.total, 3);

    $("#" + text + "Progress").css("width", ((exercise.current / exercise.max) * 100) + "%");
    if (checks.gymType == -1 || checks.gymType == 0) {
        $("#" + text + "UpgradeProgress").css("width", ((exercise.total / exercise.tiers[exercise.tier].upgrade) * 100) + "%");
        $("#" + text + "Text").html(exercise.tiers[exercise.tier].name);
    }
    else if (checks.gymType == 1) {
        $("#" + text + "UpgradeProgress").css("width", ((exercise.repsToNext / exercise.repsToNextBase) * 100) + "%");
        $("#" + text + "Text").html(exercise.name + " (" + exercise.weight + "lbs)");
    }

    $("#" + text + "Tooltip").prop("title", progression + "Energy: " + exercise.energy.toFixed(2) + "<br />Strength: " + strengthFormat + "<br />Endurance: " + enduranceFormat + "<br />Agility: " + agilityFormat + "<br />Total Reps:" + totalFormat + "<br /><br />" + finalMessage).tooltip("_fixTitle");
}

function toggleAlert(alert) {
    $(alert).tooltip("toggle");
}

function buyLiftingComp(button, compType) {
    if (!$(button).hasClass("disabled")) {
        if (lifting.comps.competitions.current >= compType.cost) {
            if (compType.id == 5 && compType.current < 10) {
                prestige.lifting.leadership += .1;
            }
            compType.current += 1;
            lifting.comps.competitions.current -= compType.cost;
            compType.cost *= compType.multi;

            switch (compType.id) {
                case 1:
                    break;
                default:
            }
        }
    }
}

function addCompetition() {
    lifting.comps.competitions.current += 1;
}

//#endregion

//#region bodyweight

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
    }, bodyweight.rdl.speed / bodyweight.rdl.speedModifier);
}

function setupBwSquatTimer() {
    bwSquatTimerId = setInterval(function () {
        exerciseTick(bodyweight.squats);
    }, bodyweight.squats.speed / bodyweight.squats.speedModifier);
}

function setupLiftingBenchTimer() {
    liftingBenchTimerId = setInterval(function () {
        exerciseTick(lifting.bench);
    }, lifting.bench.speed / lifting.bench.speedModifier);
}

function setupLiftingRowTimer() {
    liftingRowTimerId = setInterval(function () {
        exerciseTick(lifting.rows);
    }, lifting.rows.speed / lifting.rows.speedModifier);
}

function setupLiftingOhpTimer() {
    liftingOhpTimerId = setInterval(function () {
        exerciseTick(lifting.ohp);
    }, lifting.ohp.speed / lifting.ohp.speedModifier);
}

function setupLiftingSquatsTimer() {
    liftingSquatsTimerId = setInterval(function () {
        exerciseTick(lifting.squats);
    }, lifting.squats.speed / lifting.squats.speedModifier);
}

function setupLiftingDlsTimer() {
    liftingDlsTimerId = setInterval(function () {
        exerciseTick(lifting.dls);
    }, lifting.dls.speed / lifting.dls.speedModifier);
}

function setupLiftingCurlsTimer() {
    liftingCurlsTimerId = setInterval(function () {
        exerciseTick(lifting.curls);
    }, lifting.curls.speed / lifting.curls.speedModifier);
}


//#endregion

//#region phase 2

function newGym(type) {
    if (checks.isPrestige) {
        if (confirm("Are you sure you want to select this type of gym?")) {
            checks.isPrestige = false;
            // points
            prestige.current += prestige.total + 1
            prestige.total += 1
            let gang = bodyweight.gang.name;
            switch (checks.gymType) {
                case -1:
                    prestige.bw.current += prestige.bw.total + 1;
                    prestige.bw.total += 1;
                    break;
                case 0:
                    prestige.bw.current += prestige.bw.total + 1;
                    prestige.bw.total += 1;
                    break;
                case 1:
                    prestige.lifting.current += prestige.lifting.total + 1;
                    prestige.lifting.total += 1;
                    break;
                case 2:
                    prestige.yoga.current += prestige.yoga.total + 1;
                    prestige.yoga.total += 1;
                    break;
                case 3:
                    prestige.cardio.current += prestige.cardio.total + 1;
                    prestige.cardio.total += 1;
                    break;
                default:
            }

            // set gym type
            checks.gymType = type;
            // reset game
            stats = JSON.parse(JSON.stringify(baseStats));
            bodyweight = JSON.parse(JSON.stringify(baseBodyweight));
            upgrades = JSON.parse(JSON.stringify(baseUpgrades));
            job = JSON.parse(JSON.stringify(baseJob));
            research = JSON.parse(JSON.stringify(baseResearch));
            gym = JSON.parse(JSON.stringify(baseGym));
            lifting = JSON.parse(JSON.stringify(baseLifting));

            bodyweight.gang.name = gang;
            $("#gym-tab").removeClass("d-none");
            checks.story6 = true;

            loadReset();
            load(null, true, false);

            // apply existing prestige upgrades
            reapplyPrestige(prestige.upgrades, "globalUpgrade", -1);
            switch (checks.gymType) {
                case 0:
                    reapplyPrestige(prestige.bw.upgrades, "globalBwUpgrade", 0);
                    break;
                case 1:
                    reapplyPrestige(prestige.lifting.upgrades, "globalLiftingUpgrade", 1);
                    break;
                case 2:
                    reapplyPrestige(prestige.yoga.upgrades, "globalYogaUpgrade", 2);
                    break;
                case 3:
                    reapplyPrestige(prestige.cardio.upgrades, "globalCardioUpgrade", 3);
                    break;
                default:
            }

            gym.members.focusId = 0;
            focusMemberTier(0);

            $("#story").prepend("<div id='story6' class='alert alert-primary alert-dismissible fade show fixed-bottom' role='alert'><strong>My new gym is open!</strong> I can now train my replacement before opening another franchise location.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
            updatePrestigeValues();
            updateAutobuyerToggles();
        }
    }
}

function reapplyPrestige(upgradeArray, text, type) {
    for (let i = 0; i < upgradeArray.length; i++) {

        if (upgradeArray[i].isPurchased) {
            switch (type) {
                case -1:
                    globalUpgradeClick($("#" + text + "Btn" + upgradeArray[i].id), true);
                    break;
                case 0:
                    globalBwUpgradeClick($("#" + text + "Btn" + upgradeArray[i].id), true);
                    break;
                case 1:
                    globalLiftingUpgradeClick($("#" + text + "Btn" + upgradeArray[i].id), true);
                    break;
                default:
            }

        }
    }
}

function updateAutobuyerToggles() {
    $("#autoBuyers").html("");
    if (checks.liftingAdBuyer || checks.liftingGymBuyer || checks.liftingUpgradeBuyer || checks.conferenceBuyer || checks.absorbGangs || checks.coffeeClicker || checks.bwAdBuyer || checks.bwUpgradeBuyer || checks.bwAdBuyer || checks.gymSalesBuyer || checks.gymTrainerBuyer || checks.gymCoordinatorBuyer || checks.gymNutritionistBuyer || checks.adCoordinatorBuyer || checks.adDesignerBuyer || checks.adManagerBuyer) {
        $("#autoBuyers").append("<h5>Autobuyers</h5>");
        $("#autoBuyers").append("<div class='form-group' id='autoBuyerGroup'></div>");
    }
    if (checks.bwUpgradeBuyer && checks.gymType == 0) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='bwUpgradeBuyer' onchange='toggleAutobuyer(0);'" + (checks.bwUpgradeBuyerOn ? " checked" : "") + "><label class='form-check-label' for='bwUpgradeBuyer'>Buy Workout Upgrades</label></div>");
    }
    if (checks.bwGymBuyer && checks.gymType == 0) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='bwGymBuyer' onchange='toggleAutobuyer(1);'" + (checks.bwGymBuyerOn ? " checked" : "") + "><label class='form-check-label' for='bwGymBuyer'>Buy Gym Upgrades</label></div>");
    }
    if (checks.bwAdBuyer && checks.gymType == 0) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='bwAdBuyer' onchange='toggleAutobuyer(2);'" + (checks.bwAdBuyerOn ? " checked" : "") + "><label class='form-check-label' for='bwAdBuyer'>Buy Advertising Upgrades</label></div>");
    }
    if (checks.liftingUpgradeBuyer && checks.gymType == 1) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='liftingUpgradeBuyer' onchange='toggleAutobuyer(12);'" + (checks.liftingUpgradeBuyerOn ? " checked" : "") + "><label class='form-check-label' for='liftingUpgradeBuyer'>Buy Workout Upgrades</label></div>");
    }
    if (checks.liftingGymBuyer && checks.gymType == 1) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='liftingGymBuyer' onchange='toggleAutobuyer(13);'" + (checks.liftingGymBuyerOn ? " checked" : "") + "><label class='form-check-label' for='liftingGymBuyer'>Buy Gym Upgrades</label></div>");
    }
    if (checks.liftingAdBuyer && checks.gymType == 1) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='liftingAdBuyer' onchange='toggleAutobuyer(14);'" + (checks.liftingAdBuyerOn ? " checked" : "") + "><label class='form-check-label' for='liftingAdBuyer'>Buy Advertising Upgrades</label></div>");
    }
    if (checks.gymSalesBuyer) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='gymSalesBuyer' onchange='toggleAutobuyer(3);'" + (checks.gymSalesBuyerOn ? " checked" : "") + "><label class='form-check-label' for='gymSalesBuyer'>Buy Sales Representatives</label></div>");
    }
    if (checks.gymTrainerBuyer) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='gymTrainerBuyer' onchange='toggleAutobuyer(4);'" + (checks.gymTrainerBuyerOn ? " checked" : "") + "><label class='form-check-label' for='gymTrainerBuyer'>Buy Trainers</label></div>");
    }
    if (checks.gymCoordinatorBuyer) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='gymCoordinatorBuyer' onchange='toggleAutobuyer(5);'" + (checks.gymCoordinatorBuyerOn ? " checked" : "") + "><label class='form-check-label' for='gymCoordinatorBuyer'>Buy Program Coordinators</label></div>");
    }
    if (checks.gymNutritionistBuyer) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='gymNutritionistBuyer' onchange='toggleAutobuyer(6);'" + (checks.gymNutritionistBuyerOn ? " checked" : "") + "><label class='form-check-label' for='gymNutritionistBuyer'>Buy Nutritionists</label></div>");
    }
    if (checks.adCoordinatorBuyer) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='adCoordinatorBuyer' onchange='toggleAutobuyer(7);'" + (checks.adCoordinatorBuyerOn ? " checked" : "") + "><label class='form-check-label' for='adCoordinatorBuyer'>Buy Ad Coordinators</label></div>");
    }
    if (checks.adDesignerBuyer) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='adDesignerBuyer' onchange='toggleAutobuyer(8);'" + (checks.adDesignerBuyerOn ? " checked" : "") + "><label class='form-check-label' for='adDesignerBuyer'>Buy Ad Designers</label></div>");
    }
    if (checks.adManagerBuyer) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='adManagerBuyer' onchange='toggleAutobuyer(9);'" + (checks.adManagerBuyerOn ? " checked" : "") + "><label class='form-check-label' for='adManagerBuyer'>Buy Marketing Managers</label></div>");
    }
    if (checks.coffeeClicker) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='coffeeBuyer' onchange='toggleAutobuyer(10);'" + (checks.coffeeClickerOn ? " checked" : "") + "><label class='form-check-label' for='coffeeBuyer'>Click Coffee</label></div>");
    }
    if (checks.absorbGangs && checks.gymType == 0) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='absorbGangs' onchange='toggleAutobuyer(11);'" + (checks.absorbGangsOn ? " checked" : "") + "><label class='form-check-label' for='absorbGangs'>Absorb Gangs</label></div>");
    }
    if (checks.conferenceBuyer && checks.gymType == 1) {
        $("#autoBuyerGroup").append("<div class='form-group form-check'><input type='checkbox' class='form-check-input' id='buyConferences' onchange='toggleAutobuyer(15);'" + (checks.conferenceBuyerOn ? " checked" : "") + "><label class='form-check-label' for='buyConferences'>Buy Conferences</label></div>");
    }
}

function toggleAutobuyer(buyerId) {
    switch (buyerId) {
        case 0:
            checks.bwUpgradeBuyerOn ? checks.bwUpgradeBuyerOn = false : checks.bwUpgradeBuyerOn = true;
            break;
        case 1:
            checks.bwGymBuyerOn ? checks.bwGymBuyerOn = false : checks.bwGymBuyerOn = true;
            break;
        case 2:
            checks.bwAdBuyerOn ? checks.bwAdBuyerOn = false : checks.bwAdBuyerOn = true;
            break;
        case 3:
            checks.gymSalesBuyerOn ? checks.gymSalesBuyerOn = false : checks.gymSalesBuyerOn = true;
            break;
        case 4:
            checks.gymTrainerBuyerOn ? checks.gymTrainerBuyerOn = false : checks.gymTrainerBuyerOn = true;
            break;
        case 5:
            checks.gymCoordinatorBuyerOn ? checks.gymCoordinatorBuyerOn = false : checks.gymCoordinatorBuyerOn = true;
            break;
        case 6:
            checks.gymNutritionistBuyerOn ? checks.gymNutritionistBuyerOn = false : checks.gymNutritionistBuyerOn = true;
            break;
        case 7:
            checks.adCoordinatorBuyerOn ? checks.adCoordinatorBuyerOn = false : checks.adCoordinatorBuyerOn = true;
            break;
        case 8:
            checks.adDesignerBuyerOn ? checks.adDesignerBuyerOn = false : checks.adDesignerBuyerOn = true;
            break;
        case 9:
            checks.adManagerBuyerOn ? checks.adManagerBuyerOn = false : checks.adManagerBuyerOn = true;
            break;
        case 10:
            checks.coffeeClickerOn ? checks.coffeeClickerOn = false : checks.coffeeClickerOn = true;
            break;
        case 11:
            checks.absorbGangsOn ? checks.absorbGangsOn = false : checks.absorbGangsOn = true;
            break;
        case 12:
            checks.liftingUpgradeBuyerOn ? checks.liftingUpgradeBuyerOn = false : checks.liftingUpgradeBuyerOn = true;
            break;
        case 13:
            checks.liftingGymBuyerOn ? checks.liftingGymBuyerOn = false : checks.liftingGymBuyerOn = true;
            break;
        case 14:
            checks.liftingAdBuyerOn ? checks.liftingAdBuyerOn = false : checks.liftingAdBuyerOn = true;
            break;
        case 15:
            checks.conferenceBuyerOn ? checks.conferenceBuyerOn = false : checks.conferenceBuyerOn = true;
            break; 
        default:
    }
}

function hireEmployee(button, employee) {
    if (!$(button).hasClass("disabled")) {
        if (stats.money >= getEmployeeCost(employee)) {
            stats.money -= getEmployeeCost(employee);
            employee.cost *= employee.costMultiplier;
            employee.current += 1;
        }
    }
}

function gymMoneyPerSecond() {
    let total = 0;
    for (let i = 0; i < gym.members.tiers.length; i++) {
        total += math.evaluate(((gym.members.tiers[i].current * ((gym.money.growth * (gym.members.tiers[i].multiplier * (i + 1))) * ((gym.classes * gym.money.classMultiplier) + 1)))));
    }
    if (prestige.lifting.upgrades.filter(function (upgradeArray) { return upgradeArray.id == 0 })[0].isPurchased && lifting.comps.competitions.current > 0) {
        total *= Math.pow(lifting.comps.competitions.current, .001);
    }
    return math.evaluate(total + gym.money.flatIncrease);
}

function gymInfluencePerSecond() {
    return math.evaluate(gym.advertising.campaigns * gym.advertising.influenceGrowth);
}
function gymCampaignsPerSecond() {
    let increase = math.evaluate(gym.advertising.employees.coordinators.current * gym.runCampaigns.barIncrease);
    return math.evaluate(gymCampaignFormula() / ((gym.runCampaigns.max / increase) / (gym.runCampaigns.speed / 1000)) * gym.runCampaigns.speedModifier);
}
function gymCampaignGrowthPerSecond() {
    return math.evaluate(gym.advertising.ads * gym.advertising.adMulti);
}
function gymAdsPerSecond() {
    let increase = math.evaluate(gym.advertising.employees.designers.current * gym.designAds.barIncrease);
    return math.evaluate(gymAdFormula() / ((gym.designAds.max / increase) / (gym.designAds.speed / 1000)) * gym.designAds.speedModifier);
}
function gymCampaignFormula() {
    let total = math.evaluate(gym.advertising.campaignGrowth * gym.advertising.employees.coordinators.current * ((gym.advertising.employees.managers.current * gym.advertising.employees.managers.boost) + 1) * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1));
    if (total > 1e200) {
        return 1e200;
    }
    else {
        return total;
    }
}
function gymAdFormula() {
    return math.evaluate(gym.advertising.adGrowth * gym.advertising.employees.designers.current * ((gym.advertising.employees.managers.current * gym.advertising.employees.managers.boost) + 1) * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1));
}
function gymMembersPerSecond() {
    if (gym.members.current >= gym.members.capacity) {
        return 0;
    }
    else {
        let total = math.evaluate((gym.members.growth + ((gym.employees.sales.boost * gym.employees.sales.current)) * ((gym.employees.nutritionists.current * gym.employees.nutritionists.boost) + 1)) * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1) * ((prestige.bw.confidence * prestige.bw.confidenceBoost) + 1));
        if ((total + gym.members.current) > gym.members.capacity) {
            return math.evaluate(gym.members.capacity - gym.members.current);
        }
        else {
            return total;
        }
    }
}

function focusMemberTier(tier) {
    gym.members.focusId = tier;
    for (let i = 0; i < gym.members.tiers.length; i++) {
        if (i != 8) {
            if (i == tier) {
                $("#gymFocusTier" + i).html("<em>focused</em>");
            }
            else {
                $("#gymFocusTier" + i).html("<a class='text-info' href='#' onclick='focusMemberTier(" + i + ");'>focus</a>");
            }
        }
    }
}

function trainMembersFormula() {
    return math.evaluate(gym.trainMembers.trainAmount * gym.employees.trainers.current * ((gym.employees.nutritionists.current * gym.employees.nutritionists.boost) + 1) * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1) * ((prestige.bw.confidence * prestige.bw.confidenceBoost) + 1));
}

function gymMembersTrainedPerSecond() {
    let increase = math.evaluate(gym.employees.trainers.current * gym.trainMembers.barIncrease);
    return math.evaluate(trainMembersFormula() / ((gym.trainMembers.max / increase) / (gym.trainMembers.speed / 1000)) * gym.trainMembers.speedModifier);
}

function createClassesFormula() {
    return math.evaluate(gym.createClasses.classAmount * gym.employees.coordinators.current * ((gym.employees.nutritionists.current * gym.employees.nutritionists.boost) + 1) * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1) * ((prestige.bw.confidence * prestige.bw.confidenceBoost) + 1));
}

function gymClassesPerSecond() {
    let increase = math.evaluate(gym.employees.coordinators.current * gym.createClasses.barIncrease);
    return math.evaluate(createClassesFormula() / ((gym.createClasses.max / increase) / (gym.createClasses.speed / 1000)) * gym.createClasses.speedModifier);
}

function getEmployeeCost(employee) {
    return employee.cost;
}

function setupTrainerTimer() {
    trainerTimerId = setInterval(function () {
        let increase = math.evaluate(gym.employees.trainers.current * gym.trainMembers.barIncrease);
        if (gym.trainMembers.current < gym.trainMembers.max) {
            gym.trainMembers.current += increase;
        }
        else {
            gym.trainMembers.total += 1;
            // implement training
            let totalToTrain = trainMembersFormula();
            let totalToTrainOriginal = trainMembersFormula();
            for (let i = gym.members.focusId; i < gym.members.tiers.length; i++) {
                if (totalToTrain > 0) {
                    if (i != 8) {
                        if (gym.members.tiers[i].current >= totalToTrain) {
                            gym.members.tiers[i + 1].current += totalToTrain;
                            gym.members.tiers[i].current -= totalToTrain;
                            totalToTrain = 0;
                        }
                        else {
                            totalToTrain -= gym.members.tiers[i].current;
                            gym.members.tiers[i + 1].current += gym.members.tiers[i].current;
                            gym.members.tiers[i].current = 0;
                        }
                    }
                    else {
                        if (totalToTrain == totalToTrainOriginal) {
                            focusMemberTier(0);
                        }
                    }
                }
            }

            gym.trainMembers.current = 0;
        }
    }, gym.trainMembers.speed / gym.trainMembers.speedModifier);
}

function setupClassesTimer() {
    createClassesTimerId = setInterval(function () {
        let increase = math.evaluate(gym.employees.coordinators.current * gym.createClasses.barIncrease);
        if (gym.createClasses.current < gym.createClasses.max) {
            gym.createClasses.current += increase;
        }
        else {
            gym.createClasses.total += 1;
            gym.classes += createClassesFormula();
            if (gym.classes > 1e200) {
                gym.classes = 1e200;
            }
            gym.createClasses.current = 0;
        }
    }, gym.createClasses.speed / gym.createClasses.speedModifier);
}

function setupCampaignTimer() {
    runCampaignTimerId = setInterval(function () {
        let increase = math.evaluate(gym.advertising.employees.coordinators.current * gym.runCampaigns.barIncrease);
        if (gym.runCampaigns.current < gym.runCampaigns.max) {
            gym.runCampaigns.current += increase;
        }
        else {
            gym.runCampaigns.total += 1;
            gym.advertising.campaigns += gymCampaignFormula();
            if (gym.advertising.campaigns > 1e200) {
                gym.advertising.campaigns = 1e200;
            }
            stats.intelligence += math.evaluate(gym.runCampaigns.intelligence * ((stats.intelligence * stats.intelligenceBoost) + 1) * ((prestige.lifting.leadership * prestige.lifting.leadershipBoost) + 1));
            if (stats.intelligence > 1e200) {
                stats.intelligence = 1e200;
            }
            gym.runCampaigns.current = 0;
        }
    }, gym.runCampaigns.speed / gym.runCampaigns.speedModifier);
}

function setupAdTimer() {
    designAdTimerId = setInterval(function () {
        let increase = math.evaluate(gym.advertising.employees.designers.current * gym.designAds.barIncrease);
        if (gym.designAds.current < gym.designAds.max) {
            gym.designAds.current += increase;
        }
        else {
            gym.designAds.total += 1;
            gym.advertising.ads += gymAdFormula();
            if (gym.advertising.ads > 1e200) {
                gym.advertising.ads = 1e200;
            }
            stats.intelligence += math.evaluate(gym.designAds.intelligence * ((stats.intelligence * stats.intelligenceBoost) + 1) * ((prestige.lifting.leadership * prestige.lifting.leadershipBoost) + 1));
            if (stats.intelligence > 1e200) {
                stats.intelligence = 1e200;
            }
            gym.designAds.current = 0;
        }
    }, gym.designAds.speed / gym.designAds.speedModifier);
}

function gymUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("gymUpgradeBtn")[1]);
        let upgrade = gym.gymUpgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            stats.money -= upgrade[0].cost;
            switch (upgrade[0].id) {
                case 0:
                    gym.members.capacity *= 2;
                    break;
                case 1:
                    gym.members.capacity *= 2;
                    break;
                case 2:
                    gym.members.capacity *= 2;
                    break;
                case 3:
                    gym.members.capacity *= 2;
                    break;
                case 4:
                    gym.members.capacity *= 2;
                    break;
                case 5:
                    gym.members.capacity *= 2;
                    break;
                case 6:
                    gym.employees.nutritionists.boost *= 2;
                    break;
                case 7:
                    gym.employees.sales.boost *= 2;
                    break;
                case 8:
                    gym.trainMembers.trainAmount *= 2;
                    break;
                case 9:
                    stats.allStatBoost *= 2;
                    break;
                case 10:
                    gym.designAds.intelligence *= 2;
                    gym.runCampaigns.intelligence *= 2;
                    break;
                case 11:
                    stats.allStatBoost *= 2;
                    break;
                case 12:
                    gym.designAds.intelligence *= 2;
                    gym.runCampaigns.intelligence *= 2;
                    break;
                case 13:
                    gym.employees.sales.boost *= 2;
                    break;
                case 14:
                    gym.employees.nutritionists.boost *= 2;
                    break;
                case 15:
                    gym.money.classMultiplier *= 2;
                    break;
                case 16:
                    gym.createClasses.classAmount *= 2;
                    break;
                case 17:
                    gym.employees.sales.cost /= 2;
                    break;
                case 18:
                    gym.employees.trainers.cost /= 2;
                    break;
                case 19:
                    gym.employees.coordinators.cost /= 2;
                    break;
                case 20:
                    gym.employees.nutritionists.cost /= 2;
                    break;
                case 21:
                    gym.money.growth *= 2;
                    break;
                case 22:
                    gym.members.capacity *= 2;
                    break;
                case 23:
                    gym.advertising.influenceGrowth *= 2;
                    break;
                case 24:
                    gym.designAds.intelligence *= 2;
                    gym.runCampaigns.intelligence *= 2;
                    break;
                default:
            }
        }
    }
}

function gymBwUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("gymBwUpgradeBtn")[1]);
        let upgrade = gym.bw.gymUpgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            stats.money -= upgrade[0].cost;
            switch (upgrade[0].id) {

                default:
            }
        }
    }
}

function gymLiftingUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("gymLiftingUpgradeBtn")[1]);
        let upgrade = gym.lifting.gymUpgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            stats.money -= upgrade[0].cost;
            switch (upgrade[0].id) {

                default:
            }
        }
    }
}

function adUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("adUpgradeBtn")[1]);
        let upgrade = gym.adUpgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (gym.advertising.influence >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            gym.advertising.influence -= upgrade[0].cost;
            switch (upgrade[0].id) {
                case 0:
                    gym.money.growth *= 2;
                    break;
                case 1:
                    stats.energy.increase *= 2;
                    break;
                case 2:
                    gym.advertising.influenceGrowth *= 2;
                    break;
                case 3:
                    gym.money.growth *= 2;
                    break;
                case 4:
                    stats.strengthBoost *= 2;
                    break;
                case 5:
                    gym.advertising.influenceGrowth *= 2;
                    break;
                case 6:
                    stats.agilityBoost *= 2;
                    break;
                case 7:
                    stats.enduranceBoost *= 2;
                    break;
                case 8:
                    stats.intelligenceBoost *= 2;
                    break;
                case 9:
                    gym.members.capacity *= 2;
                    break;
                case 10:
                    gym.designAds.intelligence *= 2;
                    gym.runCampaigns.intelligence *= 2;
                    break;
                case 11:
                    gym.advertising.adMulti *= 2;
                    break;
                case 12:
                    gym.advertising.adGrowth *= 2;
                    break;
                case 13:
                    gym.advertising.employees.managers.boost *= 2;
                    break;
                case 14:
                    checks.isPrestige = true;
                    updatePrestigeValues();
                    checkPrestigeUpgradeDisable(prestige.upgrades, prestige.current, "globalUpgrade");
                    break;
                case 15:
                    gym.advertising.campaignGrowth *= 2;
                    break;
                case 16:
                    stats.allStatBoost *= 2;
                    break;
                case 17:
                    gym.trainMembers.trainAmount *= 2;
                    break;
                case 18:
                    gym.money.classMultiplier *= 2;
                    break;
                case 19:
                    stats.energy.increase *= 2;
                    break;
                case 20:
                    gym.advertising.employees.managers.boost *= 2;
                    break;
                default:
            }
        }
    }
}

function adBwUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("adBwUpgradeBtn")[1]);
        let upgrade = gym.bw.adUpgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (gym.advertising.influence >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            gym.advertising.influence -= upgrade[0].cost;
            switch (upgrade[0].id) {
                default:
            }
        }
    }
}

function adLiftingUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("adLiftingUpgradeBtn")[1]);
        let upgrade = gym.lifting.adUpgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (gym.advertising.influence >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            gym.advertising.influence -= upgrade[0].cost;
            switch (upgrade[0].id) {
                default:
            }
        }
    }
}

function phase2UpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("upgradeBtn")[1]);
        let upgrade = gym.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            stats.money -= upgrade[0].cost;
            switch (upgrade[0].id) {
                case 0:
                    stats.energy.coffee.boost *= 2;
                    break;
                case 1:
                    stats.energy.increase *= 2;
                    break;
                case 2:
                    stats.strengthBoost *= 2;
                    break;
                case 3:
                    stats.enduranceBoost *= 2;
                    break;
                case 4:
                    stats.agilityBoost *= 2;
                    break;
                case 5:
                    stats.intelligenceBoost *= 2;
                    break;
                case 6:
                    stats.energy.increase *= 2;
                    break;
                case 7:
                    stats.strengthBoost *= 2;
                    break;
                case 8:
                    stats.agilityBoost *= 2;
                    break;
                case 9:
                    stats.enduranceBoost *= 2;
                    break;
                case 10:
                    stats.intelligenceBoost *= 2;
                    break;
                case 11:
                    stats.allStatBoost *= 2;
                    break;
                case 12:
                    stats.energy.coffee.timer *= 2;
                    break;
                default:
            }
        }
    }
}

function phase2BwUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("bwUpgradeBtn")[1]);
        let upgrade = gym.bw.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            stats.money -= upgrade[0].cost;
            switch (upgrade[0].id) {
                case 0:
                    bodyweight.pushups.speedModifier *= 2;
                    startStop(bodyweight.pushups, pushupTimerId, true);
                    break;
                case 1:
                    bodyweight.pushups.energy /= 2;
                    bodyweight.rows.energy /= 2;
                    break;
                case 2:
                    bodyweight.rows.speedModifier *= 2;
                    startStop(bodyweight.rows, rowTimerId, true);
                    break;
                case 3:
                    bodyweight.pullups.speedModifier *= 2;
                    startStop(bodyweight.pullups, pullupTimerId, true);
                    break;
                case 4:
                    bodyweight.dips.speedModifier *= 2;
                    startStop(bodyweight.dips, dipTimerId, true);
                    break;
                case 5:
                    bodyweight.pullups.energy /= 2;
                    break;
                case 6:
                    bodyweight.dips.energy /= 2;
                    break;
                case 7:
                    bodyweight.squats.speedModifier *= 2;
                    startStop(bodyweight.squats, bwSquatTimerId, true);
                    break;
                case 8:
                    bodyweight.rdl.speedModifier *= 2;
                    startStop(bodyweight.rdl, bwRdlTimerId, true);
                    break;
                case 9:
                    bodyweight.rdl.energy /= 2;
                    bodyweight.squats.energy /= 2;
                    break;
                case 10:
                    bodyweight.pushups.energy *= 2;
                    bodyweight.pushups.strength *= 2;
                    bodyweight.pushups.endurance *= 2;
                    bodyweight.pushups.agility *= 2;
                    bodyweight.rows.energy *= 2;
                    bodyweight.rows.strength *= 2;
                    bodyweight.rows.endurance *= 2;
                    bodyweight.rows.agility *= 2;
                    break;
                case 11:
                    bodyweight.dips.energy *= 2;
                    bodyweight.dips.strength *= 2;
                    bodyweight.dips.endurance *= 2;
                    bodyweight.dips.agility *= 2;
                    bodyweight.pullups.energy *= 2;
                    bodyweight.pullups.strength *= 2;
                    bodyweight.pullups.endurance *= 2;
                    bodyweight.pullups.agility *= 2;
                    break;
                case 12:
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
}

function phase2LiftingUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("liftingUpgradeBtn")[1]);
        let upgrade = gym.lifting.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            stats.money -= upgrade[0].cost;
            switch (upgrade[0].id) {
                case 0:
                    lifting.bench.speedModifier *= 2;
                    startStop(lifting.bench, liftingBenchTimerId, true);
                    break;
                case 1:
                    lifting.bench.energy /= 2;
                    lifting.rows.energy /= 2;
                    break;
                case 2:
                    lifting.rows.speedModifier *= 2;
                    startStop(lifting.rows, liftingRowTimerId, true);
                    break;
                case 3:
                    lifting.ohp.speedModifier *= 2;
                    startStop(lifting.ohp, liftingOhpTimerId, true);
                    break;
                case 4:
                    lifting.curls.speedModifier *= 2;
                    startStop(lifting.curls, liftingCurlsTimerId, true);
                    break;
                case 5:
                    lifting.ohp.energy /= 2;
                    break;
                case 6:
                    lifting.curls.energy /= 2;
                    break;
                case 7:
                    lifting.squats.speedModifier *= 2;
                    startStop(lifting.squats, liftingSquatsTimerId, true);
                    break;
                case 8:
                    lifting.dls.speedModifier *= 2;
                    startStop(lifting.dls, liftingDlsTimerId, true);
                    break;
                case 9:
                    lifting.squats.energy /= 2;
                    lifting.dls.energy /= 2;
                    break;
                case 10:
                    lifting.bench.energy *= 2;
                    lifting.bench.strength *= 2;
                    lifting.bench.endurance *= 2;
                    lifting.bench.agility *= 2;
                    lifting.rows.energy *= 2;
                    lifting.rows.strength *= 2;
                    lifting.rows.endurance *= 2;
                    lifting.rows.agility *= 2;
                    break;
                case 11:
                    lifting.ohp.energy *= 2;
                    lifting.ohp.strength *= 2;
                    lifting.ohp.endurance *= 2;
                    lifting.ohp.agility *= 2;
                    lifting.curls.energy *= 2;
                    lifting.curls.strength *= 2;
                    lifting.curls.endurance *= 2;
                    lifting.curls.agility *= 2;
                    break;
                case 12:
                    lifting.squats.energy *= 2;
                    lifting.squats.strength *= 2;
                    lifting.squats.endurance *= 2;
                    lifting.squats.agility *= 2;
                    lifting.dls.energy *= 2;
                    lifting.strength *= 2;
                    lifting.endurance *= 2;
                    lifting.agility *= 2;
                    break;
                default:
            }
        }
    }
}

function globalUpgradeClick(button, prestigeCheck) {
    if (!$(button).hasClass("disabled") || prestigeCheck) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("globalUpgradeBtn")[1]);
        let upgrade = prestige.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        upgrade[0].isPurchased = true;
        if (!prestigeCheck) {
            prestige.current -= upgrade[0].cost;
        }
        switch (upgrade[0].id) {
            case 0:
                gym.employees.sales.current += 1;
                gym.employees.trainers.current += 1;
                gym.employees.nutritionists.current += 1;
                gym.employees.coordinators.current += 1;
                stats.money += 10;
                break;
            case 1:
                gym.money.flatIncrease += .10;
                break;
            case 2:
                stats.energy.increase *= 2;
                stats.energy.originalMax *= 2;
                stats.energy.current = stats.energy.originalMax;
                break;
            case 3:
                gym.advertising.employees.coordinators.current += 1;
                gym.advertising.employees.managers.current += 1;
                gym.advertising.employees.designers.current += 1;
                stats.money += 10;
                break;
            case 4:
                gym.members.capacity *= 2;
                break;
            case 5:
                gym.trainMembers.trainAmount *= 2;
                break;
            case 6:
                stats.strength += 10;
                stats.endurance += 10;
                stats.agility += 10;
                stats.intelligence += 10;
                break;
            case 7:
                if (!checks.gymSalesBuyer) {
                    checks.gymSalesBuyerOn = true;
                }
                checks.gymSalesBuyer = true;
                updateAutobuyerToggles();
                break;
            case 8:
                if (!checks.gymTrainerBuyer) {
                    checks.gymTrainerBuyerOn = true;
                }
                checks.gymTrainerBuyer = true;
                updateAutobuyerToggles();
                break;
            case 9:
                if (!checks.adCoordinatorBuyer) {
                    checks.adCoordinatorBuyerOn = true;
                }
                checks.adCoordinatorBuyer = true;
                updateAutobuyerToggles();
                break;
            case 10:
                if (!checks.gymCoordinatorBuyer) {
                    checks.gymCoordinatorBuyerOn = true;
                }
                checks.gymCoordinatorBuyer = true;
                updateAutobuyerToggles();
                break;
            case 11:
                if (!checks.adDesignerBuyer) {
                    checks.adDesignerBuyerOn = true;
                }
                checks.adDesignerBuyer = true;
                updateAutobuyerToggles();
                break;
            case 12:
                if (!checks.gymNutritionistBuyer) {
                    checks.gymNutritionistBuyerOn = true;
                }
                checks.gymNutritionistBuyer = true;
                updateAutobuyerToggles();
                break;
            case 13:
                if (!checks.adManagerBuyer) {
                    checks.adManagerBuyerOn = true;
                }
                checks.adManagerBuyer = true;
                updateAutobuyerToggles();
                break;
            case 14:
                stats.strengthBoost *= 2;
                break;
            case 15:
                stats.enduranceBoost *= 2;
                break;
            case 16:
                stats.agilityBoost *= 2;
                break;
            case 17:
                stats.intelligenceBoost *= 2;
                break;
            case 18:
                stats.allStatBoost *= 2;
                break;
            case 19:
                gym.money.flatIncrease += .10;
                break;
            case 20:
                gym.employees.sales.current += 1;
                gym.employees.trainers.current += 1;
                gym.employees.nutritionists.current += 1;
                gym.employees.coordinators.current += 1;
                stats.money += 50;
                break;
            case 21:
                gym.advertising.employees.coordinators.current += 1;
                gym.advertising.employees.managers.current += 1;
                gym.advertising.employees.designers.current += 1;
                stats.money += 50;
                break;
            case 22:
                stats.strength += 100;
                stats.endurance += 100;
                stats.agility += 100;
                stats.intelligence += 100;
                break;
            case 23:
                gym.designAds.intelligence *= 2;
                gym.runCampaigns.intelligence *= 2;
                break;
            case 24:
                if (!checks.coffeeClicker) {
                    checks.coffeeClickerOn = true;
                }
                checks.coffeeClicker = true;
                updateAutobuyerToggles();
                break;
            case 25:
                $(".gymTierFocus").removeClass("d-none");
                focusMemberTier(0);
                break;
            case 26:
                $("#globalLiftingUpgradesModalTrigger").removeClass("d-none");
                $("#newGymLifting").removeClass("d-none");
                break;
            default:
        }

        updatePrestigeValues();
        checkPrestigeUpgradeDisable(prestige.upgrades, prestige.current, "globalUpgrade");
    }
}

function globalBwUpgradeClick(button, prestigeCheck) {
    if (!$(button).hasClass("disabled") || prestigeCheck) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("globalBwUpgradeBtn")[1]);
        let upgrade = prestige.bw.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        upgrade[0].isPurchased = true;
        if (!prestigeCheck) {
            prestige.bw.current -= upgrade[0].cost;
        }
        switch (upgrade[0].id) {
            case 0:
                $("#gang-tab").removeClass("d-none");
                $("#gangName").html(bodyweight.gang.name);
                bodyweight.gang.on = 1;
                break;
            case 1:
                prestige.bw.confidenceBoost = 0;
                prestige.bw.confidenceBoost += .02;
                break;
            case 2:
                bodyweight.pushups.energy /= 2;
                break;
            case 3:
                bodyweight.rows.energy /= 2;
                break;
            case 4:
                bodyweight.dips.energy /= 2;
                break;
            case 5:
                bodyweight.pullups.energy /= 2;
                break;
            case 6:
                bodyweight.pushups.strength *= 2;
                bodyweight.pushups.endurance *= 2;
                bodyweight.pushups.agility *= 2;
                break;
            case 7:
                bodyweight.rows.strength *= 2;
                bodyweight.rows.endurance *= 2;
                bodyweight.rows.agility *= 2;
                break;
            case 8:
                bodyweight.squats.energy /= 2;
                break;
            case 9:
                bodyweight.rdl.energy /= 2;
                break;
            case 10:
                bodyweight.dips.strength *= 2;
                bodyweight.dips.endurance *= 2;
                bodyweight.dips.agility *= 2;
                break;
            case 11:
                bodyweight.pullups.strength *= 2;
                bodyweight.pullups.endurance *= 2;
                bodyweight.pullups.agility *= 2;
                break;
            case 12:
                bodyweight.squats.strength *= 2;
                bodyweight.squats.endurance *= 2;
                bodyweight.squats.agility *= 2;
                break;
            case 13:
                bodyweight.rdl.strength *= 2;
                bodyweight.rdl.endurance *= 2;
                bodyweight.rdl.agility *= 2;
                break;
            case 14:
                if (!checks.bwUpgradeBuyer) {
                    checks.bwUpgradeBuyerOn = true;
                }
                checks.bwUpgradeBuyer = true;
                updateAutobuyerToggles();
                break;
            case 15:
                if (!checks.bwGymBuyer) {
                    checks.bwGymBuyerOn = true;
                }
                checks.bwGymBuyer = true;
                updateAutobuyerToggles();
                break;
            case 16:
                if (!checks.bwAdBuyer) {
                    checks.bwAdBuyerOn = true;
                }
                checks.bwAdBuyer = true;
                updateAutobuyerToggles();
                break;
            case 17:
                bodyweight.gang.memberAmount *= 2;
                break;
            case 18:
                bodyweight.gang.strengthAmount *= 2;
                break;
            case 19:
                if (!checks.absorbGangs) {
                    checks.absorbGangsOn = true;
                }
                checks.absorbGangs = true;
                updateAutobuyerToggles();
                break;
            default:
        }

        updatePrestigeValues();
        checkPrestigeUpgradeDisable(prestige.bw.upgrades, prestige.bw.current, "globalBwUpgrade");
    }
}

function globalLiftingUpgradeClick(button, prestigeCheck) {
    if (!$(button).hasClass("disabled") || prestigeCheck) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("globalLiftingUpgradeBtn")[1]);
        let upgrade = prestige.lifting.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        upgrade[0].isPurchased = true;
        if (!prestigeCheck) {
            prestige.lifting.current -= upgrade[0].cost;
        }
        switch (upgrade[0].id) {
            case 0:
                $("#comp-tab").removeClass("d-none");
                break;
            case 1:
                prestige.lifting.leadershipBoost = 0;
                prestige.lifting.leadershipBoost += .02;
                break;
            case 2:
                lifting.bench.energy /= 2;
                break;
            case 3:
                lifting.rows.energy /= 2;
                break;
            case 4:
                lifting.ohp.energy /= 2;
                break;
            case 5:
                lifting.curls.energy /= 2;
                break;
            case 6:
                lifting.bench.strength *= 2;
                lifting.bench.endurance *= 2;
                lifting.bench.agility *= 2;
                break;
            case 7:
                lifting.rows.strength *= 2;
                lifting.rows.endurance *= 2;
                lifting.rows.agility *= 2;
                break;
            case 8:
                lifting.squats.energy /= 2;
                break;
            case 9:
                lifting.dls.energy /= 2;
                break;
            case 10:
                lifting.ohp.strength *= 2;
                lifting.ohp.endurance *= 2;
                lifting.ohp.agility *= 2;
                break;
            case 11:
                lifting.curls.strength *= 2;
                lifting.curls.endurance *= 2;
                lifting.curls.agility *= 2;
                break;
            case 12:
                lifting.squats.strength *= 2;
                lifting.squats.endurance *= 2;
                lifting.squats.agility *= 2;
                break;
            case 13:
                lifting.dls.strength *= 2;
                lifting.dls.endurance *= 2;
                lifting.dls.agility *= 2;
                break;
            case 14:
                if (!checks.liftingUpgradeBuyer) {
                    checks.liftingUpgradeBuyerOn = true;
                }
                checks.liftingUpgradeBuyer = true;
                updateAutobuyerToggles();
                break;
            case 15:
                if (!checks.liftingGymBuyer) {
                    checks.liftingGymBuyerOn = true;
                }
                checks.liftingGymBuyer = true;
                updateAutobuyerToggles();
                break;
            case 16:
                if (!checks.liftingAdBuyer) {
                    checks.liftingAdBuyerOn = true;
                }
                checks.liftingAdBuyer = true;
                updateAutobuyerToggles();
                break;
            case 17:
                lifting.comps.competitions.mod *= 2;
                lifting.comps.conferences.mod *= 2;
                lifting.comps.regionalConferences.mod *= 2;
                lifting.comps.stateConferences.mod *= 2;
                lifting.comps.nationalConferences.mod *= 2;
                break;
            case 18:
                if (!checks.conferenceBuyer) {
                    checks.conferenceBuyerOn = true;
                }
                checks.conferenceBuyer = true;
                lifting.comps.competitions.current = 10;
                updateAutobuyerToggles();
                break;
            default:
        }

        updatePrestigeValues();
        checkPrestigeUpgradeDisable(prestige.lifting.upgrades, prestige.lifting.current, "globalLiftingUpgrade");
    }
}

//#endregion

//#region phase 1

function setupMakeVideoTimer() {
    makeVideoTimerId = setInterval(function () {
        if (job.makeVideo.current < job.makeVideo.max) {
            job.makeVideo.current += job.makeVideo.increase;
        }
        else {
            job.makeVideo.total += 1;
            job.followers += followerFormula();
            job.views += math.evaluate((job.viewGrowth * job.followers) + 1);
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

function followerFormula() {
    return math.evaluate((job.followerGrowth + (bodyweight.pushups.total * job.pushupFollowerMod) + (bodyweight.rows.total * job.rowFollowerMod) + (bodyweight.dips.total * job.dipFollowerMod) + (bodyweight.pullups.total * job.pullupFollowerMod) + (bodyweight.squats.total * job.bwSquatFollowerMod) + (bodyweight.rdl.total * job.bwRdlFollowerMod) + (research.posts * job.postFollowerMod)) * (((stats.strength + stats.endurance + stats.agility + stats.intelligence) * stats.allStatBoost) + 1));
}

function postFormula() {
    return math.evaluate(research.postGrowth * (1 + (stats.strength * stats.strengthBoost * research.postStrengthMod)));
}

function setupStory2() {
    checks.story2 = true;
    $("#story").prepend("<div id='story2' class='alert alert-primary alert-dismissible fade show fixed-bottom' role='alert'><strong>I need a break!</strong> I'm actually so strong now, I should start a YouTube channel! (check work tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
    $("#work-tab").removeClass("d-none");
    $("#followerWrap").removeClass("d-none");
    setupMakeVideoTimer();
}

function upgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("upgradeBtn")[1]);
        let upgrade = upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
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
}

function bwUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("bwUpgradeBtn")[1]);
        let upgrade = bodyweight.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (stats.money >= upgrade[0].cost) {
            upgrade[0].isPurchased = true;
            stats.money -= upgrade[0].cost;
            switch (upgrade[0].id) {
                case 0:
                    bodyweight.pushups.speedModifier *= 2;
                    startStop(bodyweight.pushups, pushupTimerId, true);
                    break;
                case 1:
                    $("#bwRows").removeClass("d-none");
                    startStop(bodyweight.rows, rowTimerId, true);
                    break;
                case 2:
                    bodyweight.pushups.energy /= 2;
                    bodyweight.rows.energy /= 2;
                    break;
                case 3:
                    bodyweight.rows.speedModifier *= 2;
                    startStop(bodyweight.rows, rowTimerId, true);
                    break;
                case 4:
                    $("#bwPullups").removeClass("d-none");
                    startStop(bodyweight.pullups, pullupTimerId, true);
                    break;
                case 5:
                    bodyweight.pullups.speedModifier *= 2;
                    startStop(bodyweight.pullups, pullupTimerId, true);
                    break;
                case 6:
                    bodyweight.dips.speedModifier *= 2;
                    startStop(bodyweight.dips, dipTimerId, true);
                    break;
                case 7:
                    bodyweight.pullups.energy /= 2;
                    break;
                case 8:
                    bodyweight.dips.energy /= 2;
                    break;
                case 9:
                    bodyweight.squats.speedModifier *= 2;
                    startStop(bodyweight.squats, bwSquatTimerId, true);
                    break;
                case 10:
                    bodyweight.rdl.speedModifier *= 2;
                    startStop(bodyweight.rdl, bwRdlTimerId, true);
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
}

function jobUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("jobUpgradeBtn")[1]);
        let upgrade = job.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (job.followers >= upgrade[0].cost) {
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
                    $("#story").prepend("<div id='story4' class='alert alert-primary alert-dismissible fade show fixed-bottom' role='alert'><strong>Why do my followers keep leaving?</strong> I'll browse Reddit for some insights and fitness information. (check research tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
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
                    job.viewGrowth *= 2;
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
                case 29:
                    $("#payDay").removeClass("d-none");
                    break;
                default:
            }
        }
    }
}

function resUpgradeClick(button) {
    if (!$(button).hasClass("disabled")) {
        let buttonId = $(button).attr("id");
        let id = parseInt(buttonId.split("resUpgradeBtn")[1]);
        let upgrade = research.upgrades.filter(function (upgradeArray) { return upgradeArray.id == id });
        if (research.points >= upgrade[0].cost) {
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
                    startStop(bodyweight.dips, dipTimerId, true);
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
                    startStop(bodyweight.squats, bwSquatTimerId, true);
                    startStop(bodyweight.rdl, bwRdlTimerId, true);
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
                    $("#openGym-tab").removeClass("d-none");
                    $("#story").prepend("<div id='story5' class='alert alert-primary alert-dismissible fade show fixed-bottom' role='alert'><strong>I'm so rich and strong now</strong>! It's time to fulfill my dream and open a gym. (check Open Gym tab)<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
                    checks.isPrestige = true;
                    checks.story5 = true;
                    updatePrestigeValues();
                    checkPrestigeUpgradeDisable(prestige.upgrades, prestige.current, "globalUpgrade");
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
}

//#endregion