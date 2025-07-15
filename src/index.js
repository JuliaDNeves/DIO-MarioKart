const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};


const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};


async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}



async function getRandomBlock(){
    let random = Math.random()

    let result
    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random< 0.66:
            result = "CURVA"
            break;
    
        default:
            result = "CONFRONTO";
    }

    return result
}

async function randomConfrontBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.5:
            result = "CASCO";
            break;
        case random >= 0.5:
            result = "BOMBA";
            break;
    }

    return result;
}

async function randomTurbo(){
    let random = Math.random()

    let result
    switch (true) {
        case random < 0.33:
            result = "TURBOVELOCIDADE"
            break;

        case random< 0.66:
            result = "TURBOMANOBRABILIDADE"
            break;
    
        default:
            result = "TURBOPODER";
    }

    return result
}


function applyDemage (character, damageblock) {
    if (damageblock === "CASCO") {
        console.log(`${character.NOME} foi atacado por um CASCO 🐢. Perdeu 1 ponto`);
        character.PONTOS = Math.max(0, character.PONTOS - 1);
    } 
    else if (damageblock === "BOMBA") {
        console.log(`${character.NOME} foi atacado por uma BOMBA 💥. Perdeu 2 pontos`);
        character.PONTOS = Math.max(0, character.PONTOS - 2);
    }
};



function applyTurbo (characterName, turboExtra) {
    if (turboExtra === "TURBOVELOCIDADE") {
        console.log(`${characterName.NOME} ganhou 1 ponto extra em VELOCIDADE após o combate`);
        characterName.VELOCIDADE++;
    } 
    else if (turboExtra === "TURBOMANOBRABILIDADE") {
        console.log(`${characterName.NOME} ganhou 1 ponto extra em MANOBRABILIDADE após o combate`);
        characterName.MANOBRABILIDADE++;
    }
    else if (turboExtra === "TURBOPODER") {
        console.log(`${characterName.NOME} ganhou 1 ponto extra em PODER após o combate`);
        characterName.PODER++;
    }
};



async function logRollResult(characterName, block, diceResult, attribute) {
    
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}



async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block =   await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME, 
                "velocidade", 
                diceResult1, 
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME, 
                "velocidade", 
                diceResult2, 
                character2.VELOCIDADE
            );

        }
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME, 
                "manobrabilidade", 
                diceResult1, 
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME, 
                "manobrabilidade", 
                diceResult2, 
                character2.MANOBRABILIDADE
            );

        }
        if(block === "CONFRONTO"){

            
            let confrontBlock =   await randomConfrontBlock()
            console.log(`Bloco de confronto: ${confrontBlock}`)

            let turbo =   await randomTurbo();

            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`🥊 ${character1.NOME} confrontou com ${character2.NOME}! `)

            await logRollResult(
                character1.NOME, 
                "poder", 
                diceResult1, 
                character1.PODER
            );

            await logRollResult(
                character2.NOME, 
                "poder", 
                diceResult2, 
                character2.PODER
            );



            if(powerResult1 > powerResult2){
                console.log(`${character1.NOME} venceu o confronto! \n`);
                applyDemage(character2, confrontBlock);
                applyTurbo(character1, turbo)
            }

            if(powerResult2 > powerResult1){
                console.log(`${character2.NOME} venceu o confronto! \n`);
                applyDemage(character1, confrontBlock);
                applyTurbo(character2, turbo)
                
            }

            console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido" : "");

        }


        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`)
            character1.PONTOS++;
        }
        else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++;
        }

        console.log("-----------------------------------------")
    }
}


async function declareWinner(character1, character2) {
    console.log(`Resultado final:`)
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS)
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns!🏆`)
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns!🏆`)
    else
        console.log("A corrida terminou em empate")
}



(async function main() {
    console.log(` 🚦🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`)

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();