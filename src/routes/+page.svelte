<script lang="ts">
	import CardDisplay from '$lib/components/CardDisplay.svelte';
	import ResultLog from '$lib/components/ResultLog.svelte';
	import { simulateFanfare } from '$lib/simulator/fanfare';
	import type { SimulationResult, AbilityResult } from '$lib/simulator/types';

	let result: SimulationResult | null = $state(null);
	let isAnimating = $state(false);
	let revealedSteps: AbilityResult[] = $state([]);
	let generation = $state(0);

	let damage = $derived(result?.totalDamage ?? 0);
	let buffCount = $derived(result?.totalBuffCount ?? 0);
	let attack = $derived(result?.totalAttack ?? 4);
	let health = $derived(result?.totalHealth ?? 4);
	let ppRecovered = $derived(result?.totalPPRecovered ?? 0);

	function delay(ms: number): Promise<void> {
		return new Promise((r) => setTimeout(r, ms));
	}

	function shareOnX() {
		if (!result) return;
		const lines = [
			'畏怖の象徴・オメガオテプのファンファーレ結果',
			`⚡ ダメージ: ${result.totalDamage}`,
			`✨ PP回復: ${result.totalPPRecovered}`,
			`🔄 バフ: +4×${result.totalBuffCount} → ${result.totalAttack}/${result.totalHealth}`,
			'#シャドバ #ShadowverseWB'
		];
		const text = encodeURIComponent(lines.join('\n'));
		window.open(`https://x.com/intent/post?text=${text}`, '_blank', 'noopener,noreferrer');
	}

	async function play() {
		const thisGen = ++generation;
		result = null;
		revealedSteps = [];
		isAnimating = true;

		const sim = simulateFanfare();
		result = sim;

		for (let ri = 0; ri < sim.rounds.length; ri++) {
			const round = sim.rounds[ri];
			for (const step of round) {
				if (generation !== thisGen) return;
				revealedSteps = [...revealedSteps, step];
				await delay(600);
			}
			if (ri < sim.rounds.length - 1) {
				await delay(300);
			}
		}

		if (generation === thisGen) {
			isAnimating = false;
		}
	}
</script>

<main>
	<div class="simulator">
		<div class="top-counters">
			<div class="counter damage-counter">
				<span class="counter-label">ダメージ</span>
				{#key damage}
					<span class="counter-value">{damage}</span>
				{/key}
			</div>
			<div class="counter pp-counter">
				<span class="counter-label">回復</span>
				{#key ppRecovered}
					<span class="counter-value">{ppRecovered}</span>
				{/key}
			</div>
		</div>

		<div class="center-row">
			<div class="buff-counter">
				{#key buffCount}
					<span class="buff-value">+4×{buffCount}</span>
				{/key}
				<span class="buff-label">バフ回数</span>
			</div>

			<CardDisplay {attack} {health} />

			<div class="action-area">
				<button class="play-btn" onclick={play} disabled={isAnimating}>
					場に出す
				</button>
			</div>
		</div>

		{#if revealedSteps.length > 0}
			<div class="log-area">
				<ResultLog steps={revealedSteps} rounds={result?.rounds ?? []} />
			</div>
		{/if}

		{#if result && !isAnimating}
			<button class="share-btn" onclick={shareOnX}>
				<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
				</svg>
				結果をポスト
			</button>
		{/if}
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.simulator {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 520px;
	}

	.top-counters {
		display: flex;
		justify-content: space-around;
		gap: 0.75rem;
	}

	.counter {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		padding: 10px 20px;
		flex: 1;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.counter-label {
		font-size: 0.85rem;
		color: #9ca3af;
		letter-spacing: 0.1em;
		margin-bottom: 4px;
	}

	.damage-counter .counter-value {
		font-size: 2.5rem;
		font-weight: bold;
		color: #f87171;
		animation: pop 0.35s ease-out;
	}

	.pp-counter .counter-value {
		font-size: 2.5rem;
		font-weight: bold;
		color: #34d399;
		animation: pop 0.35s ease-out;
	}

	.center-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.buff-counter {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 72px;
	}

	.buff-value {
		font-size: 1.5rem;
		font-weight: bold;
		color: #c4b5fd;
		animation: pop 0.35s ease-out;
	}

	.buff-label {
		font-size: 0.75rem;
		color: #6b7280;
		letter-spacing: 0.05em;
		margin-top: 2px;
	}

	.action-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 88px;
	}

	.play-btn {
		background: linear-gradient(135deg, #7c3aed, #4f46e5);
		color: white;
		border: none;
		border-radius: 10px;
		padding: 14px 20px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		letter-spacing: 0.05em;
		box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
		transition:
			transform 0.1s,
			box-shadow 0.1s,
			opacity 0.2s;
		white-space: nowrap;
	}

	.play-btn:hover:not(:disabled) {
		transform: scale(1.05);
		box-shadow: 0 6px 16px rgba(124, 58, 237, 0.6);
	}

	.play-btn:active:not(:disabled) {
		transform: scale(0.97);
	}

	.play-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.log-area {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		padding: 12px;
	}

	.share-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		padding: 12px;
		background: #000;
		color: #fff;
		border: none;
		border-radius: 10px;
		font-size: 0.95rem;
		font-weight: bold;
		cursor: pointer;
		letter-spacing: 0.05em;
		transition: background 0.15s, transform 0.1s;
		animation: fadeIn 0.4s ease-out;
	}

	.share-btn svg {
		width: 18px;
		height: 18px;
	}

	.share-btn:hover {
		background: #1a1a1a;
		transform: scale(1.02);
	}

	.share-btn:active {
		transform: scale(0.98);
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(8px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	@keyframes pop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.4);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
