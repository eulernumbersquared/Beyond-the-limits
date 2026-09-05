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
        <p id="matterfart" v-if="player.infinity.hmatter.gte(10)">Points are boosted by x{{ formatNumber(player.infinity.matter.add(1).log10()) }}</p>
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
    align-items: flex-start;
    gap: 400px;
    width: 100%;
}
.hello {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
#matter {
    color: rgb(254, 254, 255);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 40px;
    padding-top: 30px;
    margin: 0;
}
#matterfart {
    color: rgb(254, 254, 255);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 15px;
}
.matterrX {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#matterX {
    color: rgb(255, 0, 0);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 30px;
    padding-top: 30px;
    margin: 0;
}
#matterXre {
    background-color: beige;
    background-image: linear-gradient(to right, #535353, #ff0000);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 30px;
    margin-top: 10px;
    width: 300px;
}
.HADRONIZE {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
}
#hadbutton {
    background-color: rgb(114, 114, 0);
    outline-color: invert;
    height: 150px;
    width: 500px;
}
#hadtext {
    font-size: 30px;
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    font-family: MG;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
    animation: shineText 5s linear infinite;
}
@keyframes shineText {
    0% {
        background-position: 0% center;
    }
    100% {
        background-position: 200% center;
    }
}
#hadgain{
    font-family:Verdana, Geneva, Tahoma, sans-serif ;
    font-size: 15px;
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
    animation: shineText 5s linear infinite;
}
#hadcurrent{
    font-family:Verdana, Geneva, Tahoma, sans-serif ;
    font-size: 30px;
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
}
#hadmall{
    font-family:Verdana, Geneva, Tahoma, sans-serif ;
    font-size: 15px;
    background-image: linear-gradient(to right, #ffe11a, #e0932e, #000000, #ffe11a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 200% auto;
}
</style>