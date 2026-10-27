<?php
/**
 * Beycome FAQ Theme — Functions
 */

function beycome_faq_enqueue() {
    wp_enqueue_style('beycome-faq-main', get_template_directory_uri() . '/assets/main.css', [], '3.1.20');

    // Footer bar + header search. External so the browser caches them across pages.
    wp_enqueue_script('beycome-faq-footer', get_template_directory_uri() . '/assets/footer.js', [], '3.1.17', true);

    if (is_single()) {
        wp_enqueue_script('beycome-faq-single', get_template_directory_uri() . '/assets/single.js', [], '3.1.17', true);
    }
}
add_action('wp_enqueue_scripts', 'beycome_faq_enqueue');

function beycome_faq_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', ['height' => 110, 'width' => 768, 'flex-height' => true, 'flex-width' => true]);
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    register_nav_menus(['primary' => 'Primary Menu']);
}
add_action('after_setup_theme', 'beycome_faq_setup');

// Fix admin bar
function beycome_faq_admin_bar() {
    if (is_admin_bar_showing()) {
        echo '<style>html{margin-top:0!important}#wpadminbar{position:fixed!important}</style>';
    }
}
add_action('wp_head', 'beycome_faq_admin_bar');

// ===== SEO: Custom title ===== //
function beycome_faq_title($title) {
    if (is_front_page()) {
        return 'Beycome FAQ — Real Estate Help Center | Buy, Sell & Close Your Home';
    }
    if (is_single()) {
        return get_the_title() . ' — Beycome FAQ';
    }
    if (is_category()) {
        return single_cat_title('', false) . ' — Beycome FAQ & Knowledge Base';
    }
    if (is_tag()) {
        return single_tag_title('', false) . ' — Beycome FAQ';
    }
    if (is_search()) {
        return 'Search Results for "' . get_search_query() . '" — Beycome FAQ';
    }
    if (is_404()) {
        return 'Page Not Found — Beycome FAQ';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beycome_faq_title');

// ===== SEO: Meta description helper ===== //
function beycome_faq_meta_description() {
    if (is_front_page()) {
        return 'Get answers to common real estate questions. Beycome FAQ covers mortgages, closing costs, MLS listings, title insurance, buyer programs, and 20+ free calculators.';
    }
    if (is_single()) {
        $excerpt = get_the_excerpt();
        if (!$excerpt) {
            $excerpt = wp_trim_words(strip_tags(get_the_content()), 25, '...');
        }
        return wp_strip_all_tags($excerpt);
    }
    if (is_category()) {
        $desc = strip_tags(category_description());
        if ($desc) return wp_trim_words($desc, 25, '...');
        return single_cat_title('', false) . ' — Browse articles and guides from Beycome\'s real estate knowledge base.';
    }
    if (is_tag()) {
        return single_tag_title('', false) . ' — Articles and guides from Beycome\'s real estate FAQ.';
    }
    if (is_search()) {
        return 'Search results for "' . get_search_query() . '" on Beycome FAQ.';
    }
    return 'Beycome FAQ — Real estate help center for buyers and sellers.';
}

// ===== SEO: Canonical URL helper ===== //
function beycome_faq_canonical() {
    if (is_front_page()) return home_url('/');
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

// ===== SEO: Reading time helper ===== //
function beycome_faq_reading_time($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(strip_tags($content));
    return max(1, ceil($word_count / 250));
}

// ===== GEO: Extract question-shaped headings and their answers ===== //
function beycome_faq_extract_qa($content) {
    if (!preg_match_all('#<h[23][^>]*>(.*?)</h[23]>#is', $content, $m, PREG_OFFSET_CAPTURE)) {
        return [];
    }

    $qa = [];
    foreach ($m[0] as $i => $heading) {
        $question = trim(html_entity_decode(wp_strip_all_tags($m[1][$i][0]), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        if (substr($question, -1) !== '?') {
            continue;
        }

        $start = $heading[1] + strlen($heading[0]);
        $end = isset($m[0][$i + 1]) ? $m[0][$i + 1][1] : strlen($content);
        // Space before tags so stripped words don't run together; decode entities so the JSON-LD carries plain text.
        $answer = wp_strip_all_tags(str_replace('<', ' <', substr($content, $start, $end - $start)));
        $answer = html_entity_decode($answer, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $answer = str_replace("\xC2\xA0", ' ', $answer);
        $answer = trim(preg_replace('/\s+/', ' ', $answer));

        if ($answer !== '') {
            $qa[] = ['q' => $question, 'a' => $answer]; // full text: FAQPage markup must match the visible answer
        }
    }

    return $qa;
}

// ===== SEO: Organization schema (shared) ===== //
function beycome_faq_org_schema() {
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

// ===== SEO: Increase posts per page for archives ===== //
function beycome_faq_posts_per_page($query) {
    if (!is_admin() && $query->is_main_query()) {
        if (is_category() || is_tag() || is_search()) {
            // Every result on one page: no page/2, page/3 to split a listing.
            $query->set('posts_per_page', -1);
        }
    }
}
add_action('pre_get_posts', 'beycome_faq_posts_per_page');

// ===== SEO: Fill the gaps Yoast leaves ===== //
// Yoast owns description, canonical, robots, OG and schema when active, but it
// ships several of them empty on this install. These filters only ever add a
// value where Yoast produced none.

function beycome_faq_yoast_metadesc($description) {
    if (trim((string) $description) !== '') {
        return $description;
    }

    return beycome_faq_meta_description();
}
add_filter('wpseo_metadesc', 'beycome_faq_yoast_metadesc');

function beycome_faq_yoast_image($image) {
    if (trim((string) $image) !== '') {
        return $image;
    }

    return 'https://www.beycome.com/logos/logo-beycome-512x512.png';
}
add_filter('wpseo_opengraph_image', 'beycome_faq_yoast_image');
add_filter('wpseo_twitter_image', 'beycome_faq_yoast_image');

// The FAQ home is a hub, not an article.
function beycome_faq_yoast_graph($graph) {
    if (!is_front_page() || !is_array($graph)) {
        return $graph;
    }

    foreach ($graph as $i => $piece) {
        if (isset($piece['@type']) && $piece['@type'] === 'Article') {
            unset($graph[$i]);
        }
    }

    return array_values($graph);
}
add_filter('wpseo_schema_graph', 'beycome_faq_yoast_graph');

// ===== GEO: serve the theme's llms.txt at /llms.txt ===== //
function beycome_faq_llms_txt() {
    $request = trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $expected = trim((string) parse_url(home_url('/llms.txt'), PHP_URL_PATH), '/');

    if ($request !== $expected) {
        return;
    }

    $file = get_template_directory() . '/llms.txt';
    if (!is_readable($file)) {
        return;
    }

    status_header(200);
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Robots-Tag: all');
    readfile($file);
    exit;
}
add_action('template_redirect', 'beycome_faq_llms_txt');

// ===== Performance: drop block CSS this theme never uses ===== //
// Classic theme, no theme.json. The colour-palette and duotone rules WordPress
// prints inline are ~14KB per page and no post uses has-*-color or wp-duotone.
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles_custom_css');

// ===== SEO: retire the old paginated archive URLs ===== //
// Categories, tags and search now list every result, so /page/2/ and friends
// no longer exist. They are indexed, so redirect instead of 404ing.
function beycome_faq_redirect_paged_archives() {
    if (is_admin() || (int) get_query_var('paged') < 2) {
        return;
    }

    if (is_search()) {
        wp_safe_redirect(home_url('/?s=' . urlencode(get_search_query())), 301);
        exit;
    }

    $term = get_queried_object();
    if (!$term instanceof WP_Term) {
        return;
    }

    $link = get_term_link($term);
    if (is_wp_error($link)) {
        return;
    }

    wp_safe_redirect($link, 301);
    exit;
}
add_action('template_redirect', 'beycome_faq_redirect_paged_archives', 1);

// ===== SEO: Remove unnecessary head clutter ===== //
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

// ===== SEO: titles and descriptions for the FAQ home and category pages (FAQ audit, Oct 2026) ===== //
// Yoast's own settings for these pages had typos and vague text; these filters win over them.
function beycome_faq_archive_seo() {
    if (is_front_page()) {
        return [
            'title' => 'Beycome FAQ: Flat Fee MLS, Selling, Buying & Closing',
            'desc'  => 'Answers on listing your home on the MLS from $99, showings and offers, the buyer program (up to 2% back) and closing with Beycome Title.',
        ];
    }
    if (is_category('how-to')) {
        return [
            'title' => 'How to Use Beycome: Step-by-Step Guides for Sellers',
            'desc'  => 'Step-by-step guides for your Beycome listing: log in, edit photos and price, schedule open houses, pause, go under contract or cancel.',
        ];
    }
    if (is_category('knowledge-base')) {
        return [
            'title' => 'Real Estate Knowledge Base: Selling, Buying & Closing',
            'desc'  => 'Plain-English answers on selling by owner, the MLS, offers, closing costs, title insurance and mortgages, from Beycome.',
        ];
    }
    return null;
}
add_filter('wpseo_title', function ($title) {
    $seo = beycome_faq_archive_seo();
    return $seo ? $seo['title'] : $title;
}, 20);
add_filter('wpseo_opengraph_title', function ($title) {
    $seo = beycome_faq_archive_seo();
    return $seo ? $seo['title'] : $title;
}, 20);
add_filter('wpseo_metadesc', function ($desc) {
    $seo = beycome_faq_archive_seo();
    return $seo ? $seo['desc'] : $desc;
}, 20);
add_filter('wpseo_opengraph_desc', function ($desc) {
    $seo = beycome_faq_archive_seo();
    return $seo ? $seo['desc'] : $desc;
}, 20);
