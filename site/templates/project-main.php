
<?php snippet('header') ?>

<main>
	<h1 class="title title-project"><?php echo page()->title() ?></h1>

	<div class="abstact-content">
	<?php foreach ( page()->paragraphs()->toStructure() as $content): ?>
		<section>
			<h3><?php echo $content->header()->html() ?></h3>
			<div><?php echo $content->content()->kt()->html() ?></div>
		</section>
	<?php endforeach ?>
	</div>
		
<?php snippet('enti-sostenitori') ?>

</main>

<?php snippet('footer') ?>