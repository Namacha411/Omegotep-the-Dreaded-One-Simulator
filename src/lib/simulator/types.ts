export const ABILITY_IDS = [1, 2, 3, 4] as const;
export type AbilityId = (typeof ABILITY_IDS)[number];

export interface AbilityResult {
	abilityId: AbilityId;
	round: number;
}

export interface SimulationResult {
	rounds: AbilityResult[][];
	totalDamage: number;
	totalBuffCount: number;
	totalAttack: number;
	totalHealth: number;
	totalDestroys: number;
	totalPPRecovered: number;
}

export const ABILITY_LABELS: Record<AbilityId, string> = {
	1: '相手フォロワー1体を破壊',
	2: '相手リーダーに2ダメージ',
	3: 'PPを2回復',
	4: '+4/+4してファンファーレ再発動'
};

export const ABILITY_ICONS: Record<AbilityId, string> = {
	1: '💀',
	2: '⚡',
	3: '✨',
	4: '🔄'
};
