<?php
/**
 * Beycome Blog Theme — Functions
 */

function beycome_blog_enqueue() {
    wp_enqueue_style('beycome-blog-main', get_template_directory_uri() . '/assets/main.css', [], filemtime(get_template_directory() . '/assets/main.css'));
    wp_enqueue_script('beycome-blog-js', get_template_directory_uri() . '/assets/blog.js', [], filemtime(get_template_directory() . '/assets/blog.js'), true);
}
add_action('wp_enqueue_scripts', 'beycome_blog_enqueue');

function beycome_blog_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('beycome-blog-card', 800, 450, true);
    add_image_size('beycome-blog-hero', 1200, 675, true);
    add_image_size('beycome-blog-thumb', 192, 144, true);
    add_theme_support('custom-logo', ['height' => 110, 'width' => 768, 'flex-height' => true, 'flex-width' => true]);
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    register_nav_menus(['primary' => 'Primary Menu']);
}
add_action('after_setup_theme', 'beycome_blog_setup');

function beycome_blog_admin_bar() {
    if (is_admin_bar_showing()) {
        echo '<style>html{margin-top:0!important}#wpadminbar{position:fixed!important}</style>';
    }
}
add_action('wp_head', 'beycome_blog_admin_bar');

// ===== SEO: Custom title ===== //
function beycome_blog_title($title) {
    if (is_front_page() || is_home()) {
        return 'Beycome Blog — Real Estate Guides, Market Insights & FSBO Tips';
    }
    if (is_single()) {
        return get_the_title() . ' — Beycome Blog';
    }
    if (is_category()) {
        $term  = get_queried_object();
        $name  = $term->name;
        $paged = get_query_var('paged');
        $pg    = $paged > 1 ? ' — Page ' . $paged : '';
        if ($term->parent) {
            $parent = get_term($term->parent, 'category');
            if ($parent && !is_wp_error($parent)) {
                return $name . ' Guides — ' . $parent->name . ' | Beycome Blog' . $pg;
            }
        }
        return $name . ' Articles & Guides | Beycome Blog' . $pg;
    }
    if (is_tag()) {
        $paged = get_query_var('paged');
        $pg    = $paged > 1 ? ' — Page ' . $paged : '';
        return single_tag_title('', false) . ' Real Estate Articles | Beycome Blog' . $pg;
    }
    if (is_search()) {
        return 'Search Results for "' . get_search_query() . '" — Beycome Blog';
    }
    if (is_404()) {
        return 'Page Not Found — Beycome Blog';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beycome_blog_title');

// ===== SEO: Meta description helper ===== //
function beycome_blog_meta_description() {
    if (is_front_page() || is_home()) {
        return 'Real estate guides, market reads, and how-tos for people buying, selling, or renting — without paying a fortune in commissions. Updated weekly by Beycome.';
    }
    if (is_single()) {
        $excerpt = get_the_excerpt();
        if (!$excerpt) {
            $excerpt = wp_trim_words(strip_tags(get_the_content()), 25, '...');
        }
        return wp_strip_all_tags($excerpt);
    }
    if (is_category()) {
        $term = get_queried_object();
        $desc = strip_tags(category_description());
        if ($desc) {
            $trimmed = wp_strip_all_tags($desc);
            return mb_strlen($trimmed) > 155 ? mb_substr($trimmed, 0, 152) . '...' : $trimmed;
        }
        $name = $term->name;
        if ($term->parent) {
            $parent = get_term($term->parent, 'category');
            $pname  = ($parent && !is_wp_error($parent)) ? $parent->name : '';
            $desc   = 'Browse ' . $name . ' guides and tips' . ($pname ? ' in ' . $pname : '') . '. Expert real estate advice from Beycome to help you buy, sell, and close smarter.';
        } else {
            $desc = 'Browse all ' . $name . ' articles on Beycome Blog — real estate guides, tips, and how-tos to help you navigate every step of buying or selling your home.';
        }
        return mb_strlen($desc) > 155 ? mb_substr($desc, 0, 152) . '...' : $desc;
    }
    if (is_tag()) {
        $name = single_tag_title('', false);
        $desc = 'Find real estate articles tagged ' . $name . ' on Beycome Blog — guides, market insights, and tips for buyers and sellers.';
        return mb_strlen($desc) > 155 ? mb_substr($desc, 0, 152) . '...' : $desc;
    }
    if (is_search()) {
        return 'Search results for "' . get_search_query() . '" on Beycome Blog.';
    }
    return 'Beycome Blog — Real estate help center for buyers and sellers.';
}

// ===== SEO: Canonical URL helper ===== //
function beycome_blog_canonical() {
    // The proxy serves the blog home without a trailing slash and 301s /blog/ to
    // /blog, so home_url('/') names a URL that redirects. Posts are unaffected.
    if (is_front_page() || is_home()) return untrailingslashit(home_url('/'));
    if (is_single()) return get_permalink();
    if (is_category()) {
        $url = get_category_link(get_queried_object_id());
        $paged = get_query_var('paged');
        if ($paged > 1) $url = trailingslashit($url) . 'page/' . $paged . '/';
        return $url;
    }
    if (is_tag()) {
        $url = get_tag_link(get_queried_object_id());
        $paged = get_query_var('paged');
        if ($paged > 1) $url = trailingslashit($url) . 'page/' . $paged . '/';
        return $url;
    }
    if (is_search()) return home_url('/?s=' . urlencode(get_search_query()));
    return home_url($_SERVER['REQUEST_URI']);
}

// ===== Paginated archives need their own title ===== //
// Yoast gives page 2 and page 6 of a tag the same title as page 1, so six URLs
// compete under one. The theme's own title filter already handles this, but Yoast
// outranks it, so the page number is added to whatever Yoast produces.
function beycome_blog_paged_title($title) {
    if (is_singular()) return $title;

    $paged = max((int) get_query_var('paged'), (int) get_query_var('page'));
    if ($paged < 2) return $title;

    // Yoast's category template already ends with "Page 3 of 46"; only tags come
    // through without one. Adding a second would read "Page 3 | Page 3 of 46".
    if (preg_match('/\bpage\s+\d+/i', $title)) return $title;

    $suffix = ' — Page ' . $paged;
    $sep = ' | ';
    $at = strrpos($title, $sep);
    if ($at === false) return $title . $suffix;

    return substr($title, 0, $at) . $suffix . substr($title, $at);
}
add_filter('wpseo_title', 'beycome_blog_paged_title');

// ===== Point Yoast's home canonical at the URL that actually answers ===== //
function beycome_blog_home_canonical($url) {
    return (is_home() || is_front_page()) ? untrailingslashit($url) : $url;
}
add_filter('wpseo_canonical', 'beycome_blog_home_canonical');
add_filter('wpseo_opengraph_url', 'beycome_blog_home_canonical');

// ===== SEO: Reading time helper ===== //
function beycome_blog_reading_time($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(strip_tags($content));
    return max(1, ceil($word_count / 250));
}

// ===== SEO: Organization schema ===== //
function beycome_blog_org_schema() {
    return [
        '@type' => 'Organization',
        '@id' => 'https://www.beycome.com/#organization',
        'name' => 'Beycome',
        'url' => 'https://www.beycome.com',
        'logo' => [
            '@type' => 'ImageObject',
            'url' => 'https://www.beycome.com/logos/logo-beycome-512x512.png',
            'width' => 512,
            'height' => 512,
        ],
        'sameAs' => [
            'https://www.facebook.com/beycomeUSA/',
            'https://www.instagram.com/beycome/',
            'https://linkedin.com/company/beycome',
            'https://x.com/beycome',
        ],
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => '7900 SW 57th Ave. Unit 23',
            'addressLocality' => 'South Miami',
            'addressRegion' => 'FL',
            'postalCode' => '33143',
            'addressCountry' => 'US',
        ],
        'telephone' => '+1-804-656-5007',
        'email' => 'contact@beycome.com',
    ];
}

// ===== SEO: feed the postal address into Yoast's Organization ===== //
// Yoast's own Organization node carries no address, so the theme's address would be
// lost once its graph is suppressed above. Merge it into Yoast's node instead.
function beycome_blog_yoast_org($data) {
    $org = beycome_blog_org_schema();
    if (empty($data['address'])) $data['address'] = $org['address'];
    if (empty($data['telephone'])) $data['telephone'] = $org['telephone'];
    return $data;
}
add_filter('wpseo_schema_organization', 'beycome_blog_yoast_org');

// ===== SEO: Article schema for single posts ===== //
function beycome_blog_article_schema() {
    if (!is_single()) return;
    if (defined('WPSEO_VERSION')) return; // Yoast emits its own @graph — don't duplicate it

    $post = get_post();
    $cats = get_the_category();
    $cat_name = $cats ? $cats[0]->name : 'Real Estate';
    $thumbnail = get_the_post_thumbnail_url(null, 'beycome-blog-hero');
    if (!$thumbnail) $thumbnail = 'https://www.beycome.com/logos/logo-beycome-512x512.png';

    $schema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            beycome_blog_org_schema(),
            [
                '@type' => 'BlogPosting',
                '@id' => get_permalink() . '#article',
                'headline' => get_the_title(),
                'description' => beycome_blog_meta_description(),
                'image' => ['@type' => 'ImageObject', 'url' => $thumbnail],
                'datePublished' => get_the_date('c'),
                'dateModified' => get_the_modified_date('c'),
                'author' => ['@type' => 'Organization', '@id' => 'https://www.beycome.com/#organization'],
                'publisher' => ['@type' => 'Organization', '@id' => 'https://www.beycome.com/#organization'],
                'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => get_permalink()],
                'articleSection' => $cat_name,
                'inLanguage' => 'en-US',
                'speakable' => beycome_blog_speakable(),
            ],
            [
                '@type' => 'BreadcrumbList',
                'itemListElement' => array_filter([
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => home_url('/')],
                    $cats ? ['@type' => 'ListItem', 'position' => 2, 'name' => $cats[0]->name, 'item' => get_category_link($cats[0]->term_id)] : null,
                    ['@type' => 'ListItem', 'position' => $cats ? 3 : 2, 'name' => get_the_title()],
                ]),
            ],
        ],
    ];

    $faq = beycome_blog_faq_items();
    if ($faq) {
        $schema['@graph'][] = [
            '@type' => 'FAQPage',
            '@id' => get_permalink() . '#faq',
            'mainEntity' => $faq,
        ];
    }

    echo '<script type="application/ld+json">' . beycome_blog_schema_json($schema) . '</script>' . "\n";
}
add_action('wp_head', 'beycome_blog_article_schema');

// ===== SEO: Blog homepage schema ===== //
function beycome_blog_home_schema() {
    if (!is_home() && !is_front_page()) return;
    if (defined('WPSEO_VERSION')) return; // Yoast emits its own @graph — don't duplicate it
    $schema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            beycome_blog_org_schema(),
            [
                '@type' => 'Blog',
                '@id' => home_url('/') . '#blog',
                'name' => 'Beycome Blog',
                'description' => 'Real estate guides, market reads, and how-tos for buyers and sellers.',
                'url' => home_url('/'),
                'publisher' => ['@type' => 'Organization', '@id' => 'https://www.beycome.com/#organization'],
                'inLanguage' => 'en-US',
            ],
        ],
    ];
    echo '<script type="application/ld+json">' . beycome_blog_schema_json($schema) . '</script>' . "\n";
}
add_action('wp_head', 'beycome_blog_home_schema');

// ===== SEO: Increase posts per page for archives ===== //
function beycome_blog_posts_per_page($query) {
    if (!is_admin() && $query->is_main_query()) {
        if (is_category() || is_tag()) {
            $query->set('posts_per_page', 24);
        }
    }
}
add_action('pre_get_posts', 'beycome_blog_posts_per_page');

// ===== SEO: Remove unnecessary head clutter ===== //
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

// ===== Old category URLs, renamed during the 2026 restructure ===== //
// Verified against archived copies of each page: Guides was the general homeowner
// archive, DIY Realty was FSBO, Resources was For Sale By Owner Resources, and
// Local Real Estate information became Local Insights. Runs only on a 404, so a
// redirect configured anywhere else still wins.
function beycome_blog_legacy_redirects() {
    if (!is_404()) return;

    $map = [
        'guides'                        => '/blog/homeowner-guides/',
        'diy-real-estate'               => '/blog/homeowner-guides/selling-a-home/for-sale-by-owner/',
        'resources'                     => '/blog/homeowner-guides/selling-a-home/for-sale-by-owner/',
        'local-real-estate-information' => '/blog/local-insights/',
    ];

    $path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '', '/');
    $path = preg_replace('#^blog/#', '', $path);
    $path = preg_replace('#/page/\d+$#', '', $path);   // /page/35/ lands on page one

    if (isset($map[$path])) {
        wp_redirect(home_url(str_replace('/blog/', '/', $map[$path])), 301);
        exit;
    }
}
add_action('template_redirect', 'beycome_blog_legacy_redirects', 1);

// ===== llms.txt — what AI engines read to understand this site ===== //
// Served at /blog/llms.txt. Yoast ships its own and only lists a handful of posts,
// so switch that off in Yoast > Settings > Site features, then flush permalinks
// once (Settings > Permalinks > Save) so the rule below takes effect.

// The facts an answer engine needs first. Everything else on this page is generated.
function beycome_blog_llms_facts() {
    return [
        'beycome is a technology platform for buying and selling homes without paying a traditional agent commission.',
        'Sellers list on the MLS for a $99 flat fee instead of paying a listing agent around 3%.',
        'Buyers who use a beycome agent get a rebate of up to 2% of the purchase price, paid at closing.',
        'Real estate brokerage is provided by licensed affiliates in FL, CA, CT, AL, DC, GA, IL, IN, MD, MI, MN, NC, NJ, NY, OH, PA, SC, TN, TX and VA.',
        'Title insurance is provided by Beycome Title of Florida LLC in Florida and Beycome Title of Texas LLC in Texas. Mortgage origination in Florida is provided by Beycome Mortgage LLC.',
        'beycome Corp. is at 7900 SW 57th Ave. Unit 23, South Miami, FL 33143, reachable at +1-804-656-5007 and contact@beycome.com.',
        'Customers rate beycome 4.7 out of 5 across 1,004 reviews.',
    ];
}

function beycome_blog_llms_txt() {
    $cached = get_transient('beycome_blog_llms');
    if ($cached !== false) return $cached;

    $clean = function ($text, $words = 22) {
        $text = html_entity_decode(wp_strip_all_tags((string) $text), ENT_QUOTES, 'UTF-8');
        $text = preg_replace('/\s+/', ' ', $text);
        return trim(wp_trim_words($text, $words, '...'));
    };

    $out = "# beycome Blog\n\n";
    $out .= "> Guides, market reads and how-tos for people buying, selling or renting a home without paying a traditional agent commission. Published by beycome Corp.\n\n";
    $out .= "## About beycome\n\n";
    foreach (beycome_blog_llms_facts() as $fact) {
        $out .= '- ' . $fact . "\n";
    }

    $listed = [];
    $cats = get_categories(['hide_empty' => true, 'orderby' => 'count', 'order' => 'DESC']);
    if ($cats) {
        $out .= "\n## Topics\n\n";
        foreach ($cats as $cat) {
            $desc = $cat->description ? ': ' . $clean($cat->description, 25) : '';
            $out .= '- [' . $clean($cat->name, 12) . '](' . get_category_link($cat->term_id) . ') — ' . (int) $cat->count . ' articles' . $desc . "\n";
        }

        foreach ($cats as $cat) {
            $posts = get_posts([
                'category' => $cat->term_id,
                'numberposts' => 15,
                'orderby' => 'modified',
                'order' => 'DESC',
                'post_status' => 'publish',
                'exclude' => $listed,
            ]);
            if (!$posts) continue;

            $out .= "\n## " . $clean($cat->name, 12) . "\n\n";
            foreach ($posts as $post) {
                $listed[] = $post->ID;
                $excerpt = $post->post_excerpt ? $post->post_excerpt : $post->post_content;
                $out .= '- [' . $clean($post->post_title, 20) . '](' . get_permalink($post->ID) . '): ' . $clean($excerpt, 22) . "\n";
            }
        }
    }

    $out .= "\n## Optional\n\n";
    $out .= '- [All articles](' . home_url('/') . ")\n";
    $out .= '- [Sitemap](' . home_url('/sitemap_index.xml') . ")\n";
    $out .= "- [Flat fee MLS listing](https://www.beycome.com/flat-fee-mls/)\n";
    $out .= "- [Buy with a rebate](https://www.beycome.com/i-want-to-buy-a-home/)\n";
    $out .= "- [Customer reviews](https://www.beycome.com/reviews)\n";

    set_transient('beycome_blog_llms', $out, 12 * HOUR_IN_SECONDS);
    return $out;
}

add_action('init', function () {
    add_rewrite_rule('^llms\.txt$', 'index.php?bc_llms=1', 'top');
});

add_filter('query_vars', function ($vars) {
    $vars[] = 'bc_llms';
    return $vars;
});

add_filter('redirect_canonical', function ($redirect) {
    return get_query_var('bc_llms') ? false : $redirect;
});

add_action('template_redirect', function () {
    if (!get_query_var('bc_llms')) return;
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Robots-Tag: noindex');
    echo beycome_blog_llms_txt();
    exit;
});

add_action('save_post', function () {
    delete_transient('beycome_blog_llms');
});

// ===== Schema output: encode once, and never let a value close the script tag ===== //
function beycome_blog_schema_json($data) {
    $json = wp_json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    return str_replace('</', '<\\/', $json);
}

// ===== Per-post JSON-LD from a custom field ===== //
// Paste raw JSON into a custom field named bc_schema — no <script> tags, no HTML.
// It is printed in <head>, so it never appears in the article body and the editor
// cannot escape or strip it. Invalid JSON is ignored rather than printed broken.
function beycome_blog_custom_schema() {
    if (!is_singular()) return;

    $raw = trim((string) get_post_meta(get_the_ID(), 'bc_schema', true));
    if ($raw === '') return;

    // accept a value pasted with its <script> wrapper, and a stray BOM
    $raw = preg_replace('#^\s*<script[^>]*>|</script>\s*$#i', '', $raw);
    $raw = trim($raw, " \t\n\r\0\x0B\xEF\xBB\xBF");

    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
        // say so in the source rather than failing silently — readers never see it
        echo '<!-- bc_schema ignored: ' . esc_html(str_replace('--', '-', json_last_error_msg())) . ' -->' . "\n";
        return;
    }

    if (empty($data['@context'])) $data['@context'] = 'https://schema.org';

    echo '<script type="application/ld+json">' . beycome_blog_schema_json($data) . '</script>' . "\n";
}
add_action('wp_head', 'beycome_blog_custom_schema');

// ===== [bc_review] — a rated verdict on something the article reviews ===== //
// Renders the visible box AND the matching Review markup, so the rating Google
// reads is the rating a reader sees. Never point it at beycome itself: Google
// does not show review snippets for a publisher rating its own product.
// [bc_review item="Houzeo" rating="2" verdict="..." url="https://..." date="2026-10-01"]
function beycome_blog_review_shortcode($atts) {
    $a = shortcode_atts([
        'item'    => '',
        'rating'  => '',
        'best'    => '5',
        'worst'   => '1',
        'verdict' => '',
        'url'     => '',
        'date'    => '',
        'author'  => 'beycome',
    ], $atts, 'bc_review');

    $item   = trim($a['item']);
    $rating = (float) $a['rating'];
    $best   = max(1, (float) $a['best']);
    if ($item === '' || $rating <= 0) return '';

    $rating = min($rating, $best);
    $date   = $a['date'] !== '' ? $a['date'] : get_the_date('Y-m-d');
    $full   = (int) floor($rating);
    $half   = ($rating - $full) >= 0.5;
    $empty  = (int) $best - $full - ($half ? 1 : 0);

    $stars = str_repeat('★', $full) . ($half ? '<span class="bc-review-box-star-half">★</span>' : '')
           . ($empty > 0 ? '<span class="bc-review-box-star-off">' . str_repeat('★', $empty) . '</span>' : '');

    // The reviewed thing is the entity Google reads, so the Product goes on top
    // with the review nested inside it. A Product carrying only itemReviewed fails
    // validation with "either offers, review, or aggregateRating should be specified".
    $review = [
        '@type' => 'Review',
        'reviewRating' => [
            '@type' => 'Rating',
            'ratingValue' => rtrim(rtrim(number_format($rating, 1, '.', ''), '0'), '.'),
            'bestRating' => (string) (int) $best,
            'worstRating' => (string) (int) $a['worst'],
        ],
        'name' => $item . ' review',
        'author' => ['@type' => 'Organization', 'name' => $a['author'], 'url' => 'https://www.beycome.com'],
        'datePublished' => $date,
    ];
    if ($a['verdict'] !== '') $review['reviewBody'] = wp_strip_all_tags($a['verdict']);

    $schema = array_filter([
        '@context' => 'https://schema.org',
        '@type' => 'Product',
        'name' => $item,
        'brand' => ['@type' => 'Brand', 'name' => $item],
        'url' => $a['url'] !== '' ? $a['url'] : null,
        'review' => $review,
    ]);

    ob_start();
    ?>
    <div class="bc-review-box">
        <div class="bc-review-box-top">
            <p class="bc-review-box-name"><?php echo esc_html($item); ?></p>
            <div class="bc-review-box-stars" role="img" aria-label="<?php echo esc_attr($rating . ' out of ' . (int) $best); ?>"><?php echo $stars; ?></div>
            <p class="bc-review-box-score"><?php echo esc_html($rating); ?> <span>out of <?php echo (int) $best; ?></span></p>
        </div>
        <?php if ($a['verdict'] !== '') : ?>
        <p class="bc-review-box-verdict"><?php echo esc_html($a['verdict']); ?></p>
        <?php endif; ?>
        <p class="bc-review-box-by">Reviewed by <?php echo esc_html($a['author']); ?> &middot; <?php echo esc_html(date_i18n('F Y', strtotime($date))); ?></p>
    </div>
    <script type="application/ld+json"><?php echo beycome_blog_schema_json($schema); ?></script>
    <?php
    return ob_get_clean();
}
add_shortcode('bc_review', 'beycome_blog_review_shortcode');

// ===== Archive descriptions may carry one internal link ===== //
/**
 * Term descriptions may carry one internal link. wp_trim_words() would cut
 * through the markup, so only plain descriptions are trimmed; linked ones are
 * kept whole and run through kses on output.
 */
function beycome_blog_archive_desc($raw) {
    $raw = trim(preg_replace('/\s+/', ' ', wp_kses($raw, [
        'a'      => ['href' => [], 'title' => [], 'rel' => []],
        'strong' => [],
        'em'     => [],
    ])));
    if (strpos($raw, '<a ') === false) {
        return wp_trim_words(wp_strip_all_tags($raw), 40, '.');
    }
    return $raw;
}

// ===== Jump links: slug ids on article headings ===== //
function beycome_blog_heading_slug($text, &$used) {
    $text = html_entity_decode(wp_strip_all_tags($text), ENT_QUOTES, 'UTF-8');
    // emoji, curly quotes and nbsp survive sanitize_title as %E2%AD%90 and friends
    $text = preg_replace('/[^\x20-\x7E]/u', ' ', $text);

    $slug = trim(preg_replace('/-+/', '-', sanitize_title($text)), '-');
    if ($slug === '') $slug = 'section';
    if (mb_strlen($slug) > 60) $slug = trim(mb_substr($slug, 0, 60), '-');
    $base = $slug;
    $n = 2;
    while (isset($used[$slug])) {
        $slug = $base . '-' . $n;
        $n++;
    }
    $used[$slug] = true;
    return $slug;
}

function beycome_blog_heading_anchors($content) {
    if (!is_singular('post')) return $content;

    // Editor plugins write their own ids, and theirs keep the question mark as a
    // trailing dash and percent-encode emoji. Normalise every heading, then point
    // any link that used the old id at the new one.
    $used = [];
    $renamed = [];

    $content = preg_replace_callback('#<h([23])([^>]*)>(.*?)</h\1>#is', function ($m) use (&$used, &$renamed) {
        $slug  = beycome_blog_heading_slug($m[3], $used);
        $attrs = $m[2];

        if (preg_match('/\sid\s*=\s*(["\'])(.*?)\1/i', $attrs, $old)) {
            if ($old[2] === $slug) return $m[0];
            $renamed[$old[2]] = $slug;
            $attrs = preg_replace('/\sid\s*=\s*(["\']).*?\1/i', '', $attrs);
        }

        return '<h' . $m[1] . ' id="' . esc_attr($slug) . '"' . $attrs . '>' . $m[3] . '</h' . $m[1] . '>';
    }, $content);

    foreach ($renamed as $old => $new) {
        $content = str_replace(['href="#' . $old . '"', "href='#" . $old . "'"],
                               ['href="#' . $new . '"', "href='#" . $new . "'"], $content);
    }
    return $content;
}
add_filter('the_content', 'beycome_blog_heading_anchors', 9);

// ===== FAQ: questions already written in the post body ===== //
// Any h2/h3 ending in a question mark becomes a Question, with the markup that
// follows it as the answer. Two or more are needed before anything is emitted.
function beycome_blog_faq_items($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $content = strip_shortcodes(get_post_field('post_content', $post_id));
    if (!$content) return [];

    $parts = preg_split('#<h([23])[^>]*>(.*?)</h\1>#is', $content, -1, PREG_SPLIT_DELIM_CAPTURE);
    $items = [];
    for ($i = 1; $i < count($parts) - 1; $i += 3) {
        $question = trim(wp_strip_all_tags($parts[$i + 1]));
        if ($question === '' || substr($question, -1) !== '?') continue;

        $answer = isset($parts[$i + 2]) ? trim(wp_strip_all_tags($parts[$i + 2])) : '';
        if ($answer === '') continue;
        if (mb_strlen($answer) > 1000) $answer = mb_substr($answer, 0, 997) . '...';

        $items[] = [
            '@type' => 'Question',
            'name' => $question,
            'acceptedAnswer' => ['@type' => 'Answer', 'text' => $answer],
        ];
    }
    return count($items) >= 2 ? $items : [];
}

function beycome_blog_speakable() {
    return [
        '@type' => 'SpeakableSpecification',
        'cssSelector' => ['h1', '.bc-article-content > p'],
    ];
}

// WordPress accounts that are not people. Their posts are credited to the
// Organization in the markup. Add more with the beycome_blog_ai_authors filter.
function beycome_blog_ai_authors() {
    return apply_filters('beycome_blog_ai_authors', ['admin']);
}

// ===== Hand FAQ + speakable to Yoast's graph (one graph, no duplicates) ===== //
function beycome_blog_yoast_graph($graph) {
    if (!is_singular('post') || !is_array($graph)) return $graph;

    // Artur is beycome's AI, not a person, so posts under that account credit the
    // Organization rather than claiming a human wrote them. Posts by real people
    // keep their Person node — that is the authorship signal worth having.
    $post_id     = get_queried_object_id();
    $author_slug = $post_id ? get_the_author_meta('user_nicename', (int) get_post_field('post_author', $post_id)) : '';
    $org_id = in_array($author_slug, beycome_blog_ai_authors(), true) ? null : false;
    if ($org_id === null) {
        foreach ($graph as $piece) {
            if (isset($piece['@type']) && in_array('Organization', (array) $piece['@type'], true) && !empty($piece['@id'])) {
                $org_id = $piece['@id'];
                break;
            }
        }
    }
    if ($org_id) {
        foreach ($graph as $i => $piece) {
            $types = isset($piece['@type']) ? (array) $piece['@type'] : [];
            if (array_intersect(['Article', 'BlogPosting'], $types)) {
                $graph[$i]['author'] = ['@id' => $org_id];
            }
        }
        $graph = array_values(array_filter($graph, function ($piece) {
            return !(isset($piece['@type']) && in_array('Person', (array) $piece['@type'], true));
        }));
    }

    foreach ($graph as $i => $piece) {
        if (!isset($piece['@type'])) continue;
        if (in_array('WebPage', (array) $piece['@type'], true)) {
            $graph[$i]['speakable'] = beycome_blog_speakable();
            break;
        }
    }

    $faq = beycome_blog_faq_items();
    if ($faq) {
        $graph[] = [
            '@type' => 'FAQPage',
            '@id' => get_permalink() . '#faq',
            'mainEntity' => $faq,
        ];
    }
    return $graph;
}
add_filter('wpseo_schema_graph', 'beycome_blog_yoast_graph');

// ===== Helper: render a blog card (image + meta + title) ===== //
function beycome_blog_card($post_id, $size = 'beycome-blog-card', $show_excerpt = false) {
    $title = get_the_title($post_id);
    $url = get_permalink($post_id);
    $cats = get_the_category($post_id);
    $cat = $cats ? $cats[0] : null;
    $date = get_the_date('M j, Y', $post_id);
    $reading_time = beycome_blog_reading_time($post_id);
    $has_thumb = has_post_thumbnail($post_id);
    $thumb = $has_thumb ? get_the_post_thumbnail($post_id, $size, ['alt' => esc_attr($title), 'loading' => 'lazy']) : '';
    $excerpt = $show_excerpt ? wp_trim_words(get_the_excerpt($post_id) ?: strip_tags(get_post_field('post_content', $post_id)), 18, '…') : '';

    $cat_colors = ['selling-a-home' => 'selling', 'buying-a-home' => 'buying', 'homeowner-guides' => 'homeowner', 'local-insights' => 'local'];
    $card_modifier = '';
    if ($cat) {
        $root_slug = $cat->slug;
        if ($cat->parent) {
            $parent = get_term($cat->parent, 'category');
            if ($parent && !is_wp_error($parent)) $root_slug = $parent->slug;
        }
        if (isset($cat_colors[$root_slug])) $card_modifier = ' bc-blog-card--' . $cat_colors[$root_slug];
    }

    ob_start();
    ?>
    <a href="<?php echo esc_url($url); ?>" class="bc-blog-card<?php echo esc_attr($card_modifier); ?>">
        <div class="bc-blog-card-img">
            <?php if ($has_thumb): echo $thumb; else: ?>
            <div class="bc-blog-card-img-placeholder"></div>
            <?php endif; ?>
            <?php if ($cat): ?>
            <span class="bc-blog-card-cat"><?php echo esc_html($cat->name); ?></span>
            <?php endif; ?>
        </div>
        <div class="bc-blog-card-body">
            <h3 class="bc-blog-card-title"><?php echo esc_html($title); ?></h3>
            <?php if ($show_excerpt && $excerpt): ?>
            <p class="bc-blog-card-excerpt"><?php echo esc_html($excerpt); ?></p>
            <?php endif; ?>
            <div class="bc-blog-card-footer">
                <span class="bc-blog-card-time"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><?php echo (int)$reading_time; ?> min</span>
                <span class="bc-blog-card-date"><?php echo esc_html($date); ?></span>
            </div>
        </div>
    </a>
    <?php
    return ob_get_clean();
}

// ===== Force category/tag archives to be indexed even if Yoast has them noindexed ===== //
add_filter('wpseo_robots', function($robots) {
    if (is_category() || is_tag()) return 'index, follow';
    return $robots;
});

// ===== Mid-article CTA injection ===== //
function beycome_blog_mid_cta($content) {
    if (!is_singular('post')) return $content;

    $count = substr_count($content, '</p>');
    if ($count < 4) return $content;

    $target = max(2, (int) round($count / 2));
    $seen   = 0;
    $done   = false;

    $cta = '<div class="bc-mid-cta" aria-label="Beycome — Buy or Sell Without the Commission">'
         . '<div class="bc-mid-cta-card bc-mid-cta-card--sell">'
         . '<p class="bc-mid-cta-label">Sell smarter</p>'
         . '<p class="bc-mid-cta-title">List your home on the MLS for $99</p>'
         . '<p class="bc-mid-cta-desc">No listing agent, no 3% commission. Beycome handles your MLS listing so you keep more of what your home is worth.</p>'
         . '<a href="https://www.beycome.com/flat-fee-mls/" class="bc-mid-cta-btn bc-mid-cta-btn--sell">Sell your home &rarr;</a>'
         . '</div>'
         . '<div class="bc-mid-cta-card bc-mid-cta-card--buy">'
         . '<p class="bc-mid-cta-label">Buy smarter</p>'
         . '<p class="bc-mid-cta-title">Get up to 2% back at closing</p>'
         . '<p class="bc-mid-cta-desc">Buy any home with a Beycome agent and receive a rebate of up to 2% of the purchase price — paid to you at closing.</p>'
         . '<a href="https://www.beycome.com/i-want-to-buy-a-home/" class="bc-mid-cta-btn bc-mid-cta-btn--buy">Buy a home &rarr;</a>'
         . '</div>'
         . '</div>';

    return preg_replace_callback('#</p>#i', function($m) use (&$seen, &$done, $target, $cta) {
        $seen++;
        if (!$done && $seen === $target) {
            $done = true;
            return '</p>' . $cta;
        }
        return '</p>';
    }, $content);
}
add_filter('the_content', 'beycome_blog_mid_cta');

// ===== Helper: render a compact aside card (small thumb + title) ===== //
function beycome_blog_aside_card($post_id) {
    $title = get_the_title($post_id);
    $url = get_permalink($post_id);
    $cats = get_the_category($post_id);
    $cat = $cats ? $cats[0] : null;
    $has_thumb = has_post_thumbnail($post_id);
    $date = get_the_date('M j, Y', $post_id);

    ob_start();
    ?>
    <a href="<?php echo esc_url($url); ?>" class="bc-aside-card">
        <div class="bc-aside-card-img">
            <?php if ($has_thumb): echo get_the_post_thumbnail($post_id, 'beycome-blog-thumb', ['alt' => esc_attr($title), 'loading' => 'lazy']); else: ?>
            <div class="bc-aside-card-img-placeholder"></div>
            <?php endif; ?>
        </div>
        <div class="bc-aside-card-body">
            <?php if ($cat): ?><div class="bc-aside-card-cat"><?php echo esc_html(strtoupper($cat->name)); ?></div><?php endif; ?>
            <div class="bc-aside-card-title"><?php echo esc_html($title); ?></div>
            <div class="bc-aside-card-date"><?php echo esc_html($date); ?></div>
        </div>
    </a>
    <?php
    return ob_get_clean();
}
