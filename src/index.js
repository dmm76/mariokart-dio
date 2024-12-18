const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: "Peach",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 2,
  pontos: 0,
};
//node é sincrono: todas as funcoes tentam executar ao mesmo tempo
//async e await sao estruturas que fazem as funcoes serem executadas uma por vez
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (
    true //true pq sempre vai executar
  ) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}
async function logRollResult(characterName, block, diceResult, atribute) {
  console.log(`${characterName} 🎲 rolou um dado de ${block}\nRESULTADO: dado: ${diceResult} + atributo: ${atribute} = total: ${diceResult+atribute}`);
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    //sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    //DESTE PONTO PARA BAIXO É LIGICA DE RESULTADOS
    //Aula de Convenções - rolar os dados

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //Teste de Habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;

      // console.log(`${player1.nome} 🎲 rolou um dado de ${block} ${diceResult1}`)
      // console.log(`${player2.nome} 🎲 rolou um dado de ${block} ${diceResult2}`)
      await logRollResult(
        player1.nome,
        "velocidade",
        diceResult1,
        character1.velocidade
      );
      await logRollResult(
        player2.nome,
        "velocidade",
        diceResult2,
        character2.velocidade
      );
      console.log()
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;

      // console.log(`${player1.nome} 🎲 rolou um dado de ${block} ${diceResult1}`)
      // console.log(`${player2.nome} 🎲 rolou um dado de ${block} ${diceResult2}`)
      await logRollResult(
        player1.nome,
        "manobrabilidade",
        diceResult1,
        character1.manobrabilidade
      );
      await logRollResult(
        player2.nome,
        "manobrabilidade",
        diceResult2,
        character2.manobrabilidade
      );
      console.log()
    }

    if (block === "CONFRONTO") {
      //Felipao criou um variavel com escopo local aqui
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;

      console.log(`🥊${character1.nome} confrontou com ${character2.nome}!🥊`);
      //CONFRONTO: PLAYER 1
      await logRollResult(
        player1.nome,
        "poder",
        diceResult1,
        character1.poder
      );
      //CONFRONTO: PLAYER 2
      await logRollResult(
        player2.nome,
       "poder",
        diceResult2,
        character2.poder
      );

      //COMPARACAO DE RESULTADOS DO CONFRONTO
      if(powerResult1>powerResult2){
        if(character2.pontos > 0){
          character2.pontos--;
        }        
      console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1(um) ponto 🐢`)
      }
      if(powerResult2>powerResult1){
        if(character1.pontos > 0){
          character1.pontos--;
        }
        console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1(um) ponto 🐢`)
      }

      if(powerResult2===powerResult1){
        console.log("Confronto empatado! Nenhum ponto perdido")
      }
      console.log()
    }

    //VERIFICANDO O VENCEDOR
    if(totalTestSkill1 > totalTestSkill2){      
      character1.pontos++;
      console.log(`${character1.nome} marcou um ponto. {Total de Pontos: ${character1.pontos}}`);
    }else if(totalTestSkill2>totalTestSkill1){      
      character2.pontos++
      console.log(`${character2.nome} marcou um ponto. {Total de Pontos: ${character2.pontos}}`);
    }

    console.log("--------------------")
   
  }
}
//DECLARAR O VENCEDOR
async function declareWinner(character1, character2){
    console.log("Resultado Final: ");
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

    if(character1.pontos>character2.pontos){
      console.log(`\n${character1.nome} vendeu a corrida! Parabéns 🏆`)
    }else if(character2.pontos>character1.pontos){
      console.log(`\n${character2.nome} vendeu a corrida! Parabéns 🏆`)
    }else{
      console.log("A corrida terminou em empate")
    }
}


(async function main() {
  console.log(
    `🏁🎌 Corrida entre ${player1.nome} e ${player2.nome} começando...🚨\n`
  );
  //await = espera a funcao executar para continuar o codigo
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2)
  console.log()
})();
