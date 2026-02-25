<script lang="ts">
	let { attack, health }: { attack: number; health: number } = $props();
</script>

<div class="card-wrapper">
	<div class="card">
		<img src="/4ec13599293d4166969ab5994880bf88.png" alt="畏怖の象徴・オメガオテプ" />
		<div class="card-name">オメガオテプ</div>
		<div class="stats">
			<span class="attack">{attack}</span>
			<span class="slash">/</span>
			<span class="health">{health}</span>
		</div>
	</div>
</div>

<style>
	.card-wrapper {
		display: flex;
		justify-content: center;
	}

	.card {
		position: relative;
		width: 160px;
		border-radius: 12px;
		border: 2px solid #7c3aed;
		box-shadow: 0 0 16px rgba(124, 58, 237, 0.5);
		background: #0f0f23;
		overflow: hidden;
		cursor: default;
	}

	img {
		width: 100%;
		display: block;
	}

	.card-name {
		text-align: center;
		font-size: 0.7rem;
		color: #c4b5fd;
		padding: 4px 4px 2px;
		font-weight: bold;
		letter-spacing: 0.05em;
	}

	.stats {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2px;
		padding-bottom: 8px;
		font-size: 1.1rem;
		font-weight: bold;
	}

	.attack {
		color: #f87171;
	}

	.slash {
		color: #9ca3af;
	}

	.health {
		color: #34d399;
	}
</style>
