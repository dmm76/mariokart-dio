const ATRIBUTE_ENUM = {
  RETA: {
    param: 'velocidade',
    block: 'RETA',
    total: 'totalSkill'
  },
  CURVA: {
    param: 'manobrabilidade',
    block: 'CURVA',
    total: 'totalSkill'
  },
  CONFRONTO: {
    param: 'poder', block: 'CONFRONTO', total: 'powerResult'
  }
}

//node é sincrono: todas as funcoes tentam executar ao mesmo tempo
//async e await sao estruturas que fazem as funcoes serem executadas uma por vez
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  const random = Math.random();

  if (random < 0.33) {
    return "RETA";
  }
  if (random < 0.66) {
    return "CURVA";
  }

  return "CONFRONTO";
}

function logRollResult(player1, player2, gameControl, atribute) {
  console.log(`${player1.nome} 🎲 rolou um dado de ${atribute.block}\nRESULTADO: dado: ${gameControl.diceResult1} + atributo: ${atribute.param} | ${player1[atribute.param]} | = total: ${player1[atribute.total]}`);
  console.log(`${player2.nome} 🎲 rolou um dado de ${atribute.block}\nRESULTADO: dado: ${gameControl.diceResult2} + atributo: ${atribute.param} | ${player2[atribute.param]} | = total: ${player2[atribute.total]}\n`);
}

function blockReta(player1, player2, gameControl) {
  player1.totalSkill = gameControl.diceResult1 + player1.velocidade;
  player2.totalSkill = gameControl.diceResult2 + player2.velocidade;

  logRollResult(
    player1,
    player2,
    gameControl,
    ATRIBUTE_ENUM.RETA,
  );
}

function blockCurva(player1, player2, gameControl) {
  player1.totalSkill = gameControl.diceResult1 + player1.manobrabilidade;
  player2.totalSkill = gameControl.diceResult2 + player2.manobrabilidade;

  logRollResult(
    player1,
    player2,
    gameControl,
    ATRIBUTE_ENUM.CURVA,
  );
}

function blockConfronto(player1, player2, gameControl) {
  //Felipao criou um variavel com escopo local aqui
  player1.powerResult = gameControl.diceResult1 + player1.poder;
  player2.powerResult = gameControl.diceResult2 + player2.poder;

  console.log(`🥊${player1.nome} confrontou com ${player2.nome}!🥊`);
  //CONFRONTO: PLAYER 1
  logRollResult(
    player1,
    player2,
    gameControl,
    ATRIBUTE_ENUM.CONFRONTO,
  );

  //COMPARACAO DE RESULTADOS DO CONFRONTO
  if (player1.powerResult > player2.powerResult) {
    if (player2.pontos > 0) {
      player2.pontos = player2.pontos - 1;
    }
    console.log(`${player1.nome} venceu o confronto! ${player2.nome} perdeu 1(um) ponto 🐢`)
  }
  if (player2.powerResult > player1.powerResult) {
    if (player1.pontos > 0) {
      player1.pontos = player1.pontos - 1;
    }
    console.log(`${player2.nome} venceu o confronto! ${player1.nome} perdeu 1(um) ponto 🐢`)
  }

  if (player2.powerResult === player1.powerResult) {
    console.log("Confronto empatado! Nenhum ponto perdido")
  }
}

function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    //sortear bloco
    let block = getRandomBlock();
    console.log(`Bloco: ${block}`);

    //DESTE PONTO PARA BAIXO É LIGICA DE RESULTADOS
    //Aula de Convenções - rolar os dados
    const gameControl = {
      diceResult1: rollDice(),
      diceResult2: rollDice()
    }

    if (block === "RETA") {
      blockReta(player1, player2, gameControl)
    }

    if (block === "CURVA") {
      blockCurva(player1, player2, gameControl)
    }

    if (block === "CONFRONTO") {
      blockConfronto(player1, player2, gameControl)
    }

    //VERIFICANDO O VENCEDOR
    if (player1.totalSkill > player2.totalSkill) {
      player1.pontos = player1.pontos + 1;
      console.log(`${player1.nome} marcou um ponto. {Total de Pontos: ${player1.pontos}}`);
    } else if (player2.totalSkill > player1.totalSkill) {
      player2.pontos = player2.pontos + 1;
      console.log(`${player2.nome} marcou um ponto. {Total de Pontos: ${player2.pontos}}`);
    }

    console.log("--------------------")

  }
}
//DECLARAR O VENCEDOR
function declareWinner(player1, player2) {
  console.log("Resultado Final: ");
  console.log(`${player1.nome}: ${player1.pontos} ponto(s)`)
  console.log(`${player2.nome}: ${player2.pontos} ponto(s)`)

  if (player1.pontos > player2.pontos) {
    console.log(`\n${player1.nome} vendeu a corrida! Parabéns 🏆`)
  } else if (player2.pontos > player1.pontos) {
    console.log(`\n${player2.nome} vendeu a corrida! Parabéns 🏆`)
  } else {
    console.log("A corrida terminou em empate")
  }
}


(async function main() {
  const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
    totalSkill: 0,
    powerResult: 0
  };

  const player2 = {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
    totalSkill: 0,
    powerResult: 0
  };
  console.log(
    `🏁🎌 Corrida entre ${player1.nome} e ${player2.nome} começando...🚨\n`
  );
  //await = espera a funcao executar para continuar o codigo
  playRaceEngine(player1, player2);
  declareWinner(player1, player2)
  console.log()
})();
