<script lang="ts">
	import type { AbilityResult } from '$lib/simulator/types';
	import { ABILITY_LABELS, ABILITY_ICONS } from '$lib/simulator/types';

	let { steps, rounds }: { steps: AbilityResult[]; rounds: AbilityResult[][] } = $props();

	let logEl: HTMLDivElement;

	$effect(() => {
		steps; // track changes
		if (logEl) {
			logEl.scrollTop = logEl.scrollHeight;
		}
	});

	function isRoundStart(step: AbilityResult, index: number): boolean {
		if (index === 0) return false;
		const prev = steps[index - 1];
		return prev.round !== step.round;
	}
</script>

<div class="log" bind:this={logEl}>
	{#each steps as step, i (i)}
		{#if isRoundStart(step, i)}
			<div class="separator">
				<span>━━ ファンファーレ再発動! ━━</span>
			</div>
		{/if}
		<div class="log-entry ability-{step.abilityId}">
			<span class="icon">{ABILITY_ICONS[step.abilityId]}</span>
			<span class="label">{ABILITY_LABELS[step.abilityId]}</span>
		</div>
	{/each}
</div>

<style>
	.log {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-height: 240px;
		overflow-y: auto;
		padding: 4px;
	}

	.log-entry {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 500;
		animation: slideIn 0.4s ease-out;
		border-left: 3px solid transparent;
	}

	.ability-1 {
		background: rgba(239, 68, 68, 0.15);
		border-left-color: #ef4444;
		color: #fca5a5;
	}
	.ability-2 {
		background: rgba(234, 179, 8, 0.15);
		border-left-color: #eab308;
		color: #fde047;
	}
	.ability-3 {
		background: rgba(52, 211, 153, 0.15);
		border-left-color: #34d399;
		color: #6ee7b7;
	}
	.ability-4 {
		background: rgba(167, 139, 250, 0.15);
		border-left-color: #a78bfa;
		color: #c4b5fd;
	}

	.icon {
		font-size: 1.1rem;
	}

	.separator {
		text-align: center;
		color: #a78bfa;
		font-size: 0.9rem;
		font-weight: bold;
		letter-spacing: 0.1em;
		animation: slideIn 0.4s ease-out;
		padding: 4px 0;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
