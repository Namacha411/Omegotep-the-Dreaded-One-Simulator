<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>畏怖の象徴・オメガオテプ シミュレータ</title>
</svelte:head>

{@render children()}

<footer>
	<p>© Cygames, Inc.</p>
	<p> 本ウェブサイト/アプリケーションは、Cygamesと提携関係にあるものでも、Cygamesが推薦するものでも、スポンサーとなっているものでも、個別に承認したものでもありません。Cygamesは本サイト/アプリケーションの運営または内容について責任を負うものではありません。Cygamesの商標およびその他の知的財産の利用は、Cygamesのファンキット利用規約に従う必要があります。Cygamesについて詳しくは、同社ウェブサイト（https://www.cygames.co.jp/）をご覧ください。 </p>
</footer>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background: #0d0d1a;
		color: #e5e7eb;
		font-family:
			'Hiragino Kaku Gothic ProN',
			'Noto Sans JP',
			sans-serif;
	}

	footer {
		text-align: center;
		padding: 1rem;
		color: #4b5563;
		font-size: 0.7rem;
		line-height: 1.6;
	}
</style>
