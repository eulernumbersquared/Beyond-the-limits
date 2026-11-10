<script setup lang="ts">
import { formatNumber } from '../../format';
import { hmatergain, hmatter, mattergain, matterX, matterXgain } from '../../infinity/matter';
import { player } from '../../player';

</script>

<template>
    <div class="the-entire-thing">
    <div class="hello">
        <p id="matter">You have {{ formatNumber(player.infinity.matter) }} matter.</p>
        <p id="matterfart">Replicates itself at a rate of x{{ formatNumber(mattergain()) }}</p>
        <p id="matterfart" v-if="player.infinity.hmatter.gte(10)">Points are boosted by x{{ formatNumber(player.infinity.matter.add(1).log10().pow(1.25)) }}</p>
        <p id="matterfart" v-if="player.infinity.matter.gte(1e100)">At 1e100 matter, gain is reduced by ^0.3</p>
        <p id="matterfart" v-if="player.infinity.matter.gte(1e150)">At 1e150 matter, gain is reduced by ^0.4</p>
        <p id="matterfart" v-if="player.infinity.matter.gte('1e500')">At 1e500 matter, gain is reduced by ^0.1</p>
        <p id="matterfart" v-if="player.infinity.matter.gte('1e1500')">At 1e1500 matter, gain is reduced by ^0.05</p>
        <p id="matterfart" v-if="player.infinity.matter.gte('2.71e7389056')">At 2.71e738056 matter, gain is double logged by 10 ( log10(log10(x)) )</p>
    </div>
    <div class="matterrX">
        <p id="matterX">You have {{ player.infinity.matterX }} matter-X. Boosting matter by x{{ formatNumber(player.infinity.matterX.div(10).add(1)) }}</p>
        <p id="matterX" v-if="player.infinity.calamitytier.gte(1+1)">Due to calamity tier 2, matter-X also reduces crop grow time by {{ formatNumber(player.infinity.matterX) }}</p>
        <button id="matterXre" v-on:click="matterXgain()">Reset to gain +1 matter X at {{ formatNumber(matterX()) }}</button>
    </div>
    </div>
                <div class="HADRONIZE">
        <p id="hadcurrent">You have {{ formatNumber(player.infinity.hmatter) }} hadronic matter</p>
        <p id="hadmall">Boosting points by {{ formatNumber(player.infinity.hmatter.mul(1e10)) }} and matter gain by x{{ formatNumber(player.infinity.hmatter.add(1).mul(1.5)) }}</p>
        <button id="hadbutton" v-on:click="hmatter()">
            <p id="hadtext">HADRONIZE</p>
            <p id="hadgain">Chaotically bond into a new being and gain {{ formatNumber(hmatergain()) }} hadronic matter (Requirement: 10 matter-X)</p>
        </button>
        <p id="hadmall" v-if="!player.infinity.hmatter.gte(1)">At 1 hadronic matter, unlock a new eternal letter</p>
        <p id="hadmall" v-if="!player.infinity.hmatter.gte(10)">At 10 hadronic matter, matter is boosted by x100 and unlock a new boost from matter</p>
        <p id="hadmall" v-if="!player.infinity.hmatter.gte(15)">At 15 hadronic matter, add a new factor to hadronic matter</p>
        <p id="hadmall" v-if="!player.infinity.hmatter.gte(5000)">At 5k hadronic matter, empower matter gain by ^3</p>
        <p id="hadmall" v-if="!player.infinity.hmatter.gte(10000)">At 10k hadronic matter, matter-X exponentially boosts matter at the same rate</p>
        <p id="hadmall" v-if="!player.infinity.hmatter.gte(100000)">At 100k hadronic matter, hadronic matter exponentially boosts matter</p>
        <p id="hadmall" v-if="!player.infinity.hmatter.gte(1e15)">At 1 Qd hadronic matter, multiply point gain by 1e700</p>
    </div>
</template>

<style scoped>

.the-entire-thing {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 2rem;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
}

.hello,
.matterrX {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    flex: 1;
    min-width: 0;
    padding: 20px;
    background: rgba(25, 25, 25, 0.85);
    border: 1px solid #555;
    border-radius: 14px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

#matter {
    color: rgb(254, 254, 255);
    font-family: 'Trebuchet MS', sans-serif;
    font-size: clamp(22px, 3vw, 40px);
    padding-top: 10px;
    margin: 0 0 15px;
}

#matterfart {
    color: #ccc;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    margin: 5px 0;
}

#matterX {
    color: #ff4545;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: clamp(20px, 2.5vw, 30px);
    padding-top: 10px;
    margin: 0 0 15px;
    overflow-wrap: anywhere;
}

#matterXre {
    background-color: beige;
    background-image: linear-gradient(to right, #535353, #ff0000);
    background-size: 200% auto;
    animation: shineText 5s linear infinite;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: clamp(16px, 2vw, 25px);
    font-weight: bold;
    margin-top: 15px;
    width: 100%;
    max-width: 300px;
    min-height: 55px;
    border: 1px solid #777;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px;
}

.HADRONIZE {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: min(90%, 700px);
    margin: 30px auto;
    padding: 25px;
    box-sizing: border-box;
    background: rgba(25, 25, 25, 0.9);
    border: 1px solid #8b762c;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(255, 200, 0, 0.08);
}

#hadbutton {
    background: linear-gradient(135deg, #6e5b00, #a17b00, #302700);
    border: 2px solid #b99b32;
    border-radius: 12px;
    min-height: 140px;
    width: 100%;
    max-width: 500px;
    padding: 10px 20px;
    cursor: pointer;
}

#hadtext {
    font-size: clamp(22px, 4vw, 30px);
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    font-family: MG;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
    animation: shineText 5s linear infinite;
}

#hadgain {
    font-family: Verdana, sans-serif;
    font-size: clamp(11px, 2vw, 15px);
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
    animation: shineText 5s linear infinite;
}

#hadcurrent {
    font-family: Verdana, sans-serif;
    font-size: clamp(20px, 3vw, 30px);
    text-align: center;
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
    overflow-wrap: anywhere;
}

#hadmall {
    font-family: Verdana, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
}

@keyframes shineText {
    0% {
        background-position: 0% center;
    }
    100% {
        background-position: 200% center;
    }
}

@media (max-width: 800px) {
    .the-entire-thing {
        gap: 1rem;
        padding: 12px;
    }

    .hello,
    .matterrX {
        padding: 15px 10px;
    }
}

@media (max-width: 600px) {
    .the-entire-thing {
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
        padding: 10px;
    }

    .hello,
    .matterrX {
        width: 100%;
        box-sizing: border-box;
        padding: 18px 12px;
    }

    .HADRONIZE {
        width: calc(100% - 20px);
        margin: 20px auto;
        padding: 18px 12px;
    }

    #hadbutton {
        min-height: 130px;
        padding: 8px 12px;
    }

    #matter,
    #matterX,
    #hadcurrent {
        overflow-wrap: anywhere;
    }

    #matterfart,
    #hadmall {
        max-width: 100%;
    }
}

</style>