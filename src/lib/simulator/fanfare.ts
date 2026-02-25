import type { AbilityId, AbilityResult, SimulationResult } from './types';

function pickTwo(): [AbilityId, AbilityId] {
	const pool: AbilityId[] = [1, 2, 3, 4];
	const i = Math.floor(Math.random() * 4);
	[pool[0], pool[i]] = [pool[i], pool[0]];
	const j = 1 + Math.floor(Math.random() * 3);
	[pool[1], pool[j]] = [pool[j], pool[1]];
	return [pool[0], pool[1]];
}

export function simulateFanfare(maxRounds = 100): SimulationResult {
	const rounds: AbilityResult[][] = [];
	let totalDamage = 0;
	let totalBuffCount = 0;
	let totalDestroys = 0;
	let totalPPRecovered = 0;

	let round = 0;
	let continueChain = true;

	while (continueChain && round < maxRounds) {
		const [a, b] = pickTwo();
		const picked: AbilityResult[] = [
			{ abilityId: a, round },
			{ abilityId: b, round }
		];
		rounds.push(picked);

		continueChain = false;

		for (const p of picked) {
			switch (p.abilityId) {
				case 1:
					totalDestroys++;
					break;
				case 2:
					totalDamage += 2;
					break;
				case 3:
					totalPPRecovered += 2;
					break;
				case 4:
					totalBuffCount++;
					continueChain = true;
					break;
			}
		}
		round++;
	}

	return {
		rounds,
		totalDamage,
		totalBuffCount,
		totalAttack: 4 + totalBuffCount * 4,
		totalHealth: 4 + totalBuffCount * 4,
		totalDestroys,
		totalPPRecovered
	};
}
