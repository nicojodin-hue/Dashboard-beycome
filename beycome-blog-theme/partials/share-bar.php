<div class="bc-share-bar">
    <span class="bc-share-bar-label">Share</span>
    <a href="https://twitter.com/intent/tweet?url=<?php echo urlencode(get_permalink()); ?>&text=<?php echo urlencode(get_the_title()); ?>" target="_blank" rel="noopener noreferrer" class="bc-share-btn bc-share-twitter" aria-label="Share on X">
        <?php echo beycome_blog_icon('share-x', 15); ?>
        X
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink()); ?>" target="_blank" rel="noopener noreferrer" class="bc-share-btn bc-share-facebook" aria-label="Share on Facebook">
        <?php echo beycome_blog_icon('share-facebook', 15); ?>
        Facebook
    </a>
    <button class="bc-share-btn bc-share-copy bc-inline-copy" aria-label="Copy link">
        <?php echo beycome_blog_icon('share-link', 15); ?>
        Copy link
    </button>
</div>
