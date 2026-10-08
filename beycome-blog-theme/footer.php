<?php
$bc_ai_prompt = 'How does Beycome work and what is their flat-fee MLS listing service? I Want to understand how Beycome can help me sell my home without paying agent commission, keep more of my equity at closing, and access the same MLS, title, and closing tools that traditional agents use.';
$bc_ai_query  = rawurlencode($bc_ai_prompt);

$bc_footer_topics = [
    'selling-a-home'   => ['Preparing Your Home' => 'preparing-your-home', 'Pricing Your Home' => 'pricing-your-home', 'Flat Fee MLS' => 'flat-fee-mls', 'FSBO Contracts' => 'fsbo-contracts', 'Selling Process' => 'selling-process', 'Handling Negotiations' => 'handling-negotiations', 'Finances of Selling' => 'finances-of-selling'],
    'buying-a-home'    => ['Buying Process' => 'buying-process', 'Finding a Home' => 'finding-a-home', 'Inspecting a Home' => 'inspecting-a-home', 'Making an Offer' => 'making-an-offer', 'Mortgage Basics' => 'mortgage-basics', 'Moving Tips' => 'moving-tips', 'Preparing to Buy' => 'preparing-to-buy', 'Where to Live' => 'where-to-live'],
    'homeowner-guides' => ['Home Improvements' => 'home-improvements', 'Landscaping' => 'landscaping', 'Lifestyle & Design' => 'lifestyle-design', 'Refinancing' => 'refinancing', 'Renting a Home' => 'renting-a-home'],
];
$bc_footer_modifiers = [
    'selling-a-home'   => 'bc-footer-topics--selling',
    'buying-a-home'    => 'bc-footer-topics--buying',
    'homeowner-guides' => 'bc-footer-topics--homeowner',
];
?>
<section class="bc-footer-topics-section">
    <div class="bc-container">
        <div class="bc-footer-topics-label">Dive into more topics</div>
        <div class="bc-footer-topics-pills">
            <?php foreach ($bc_footer_topics as $parent_slug => $subcats) :
                $modifier = $bc_footer_modifiers[$parent_slug] ?? '';
                foreach ($subcats as $label => $slug) :
                    $t = get_term_by('slug', $slug, 'category');
                    if (!$t || $t->count === 0) continue;
            ?>
            <a href="<?php echo esc_url(get_category_link($t->term_id)); ?>" class="bc-topic-sub <?php echo esc_attr($modifier); ?>"><?php echo esc_html($label); ?></a>
            <?php endforeach; endforeach; ?>
        </div>
    </div>
</section>

<style>
.bc-footer{background:#1b1b1b;color:#fff;font-size:16px;padding:80px 0 32px}
.bc-footer-inner{max-width:1280px;margin:0 auto;padding:0 16px}
.bc-footer-grid{max-width:1200px;margin:0 auto 56px;display:grid;grid-template-columns:1fr 1fr;column-gap:20px;row-gap:48px}
.bc-footer-col-title{font-size:16px;font-weight:700;letter-spacing:normal;text-transform:uppercase;color:#ffffffa6;margin-bottom:24px}
.bc-footer-col ul{list-style:none}
.bc-footer-col ul li{margin-bottom:16px}
.bc-footer-col ul li a{text-decoration:none;color:#fff;font-size:16px;font-weight:400}
.bc-footer-col ul li a:hover{opacity:.85}
.bc-footer-states{margin:32px 0 0;padding-top:24px;border-top:1px solid #ffffff1a}
.bc-footer-states-links{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:14px}
.bc-footer-states-links a{color:#ffffffa6;font-size:14px;text-decoration:none}
.bc-footer-states-links a:hover{color:#fff}
.bc-footer-btn{display:inline-flex;align-items:center;justify-content:center;flex:1 1 0;min-width:0;gap:8px;padding:10px 12px;border-radius:8px;border:1px solid #3a3a3a;background:#2a2a2a;text-decoration:none;color:#fff;transition:border-color .15s,background .15s;white-space:nowrap}
.bc-footer-btn:hover{border-color:#666;background:#333}
.bc-footer-btn-icon{flex-shrink:0;display:flex;align-items:center}
.bc-footer-btn-text{display:flex;flex-direction:column}
.bc-footer-btn-name{font-size:16px;font-weight:700;color:#fff;line-height:1.3}
.bc-footer-bar{display:flex;align-items:center;gap:20px;padding:20px 0;flex-wrap:wrap}
.bc-footer-bar-learn{font-size:14px;font-weight:400;color:#ffffffa6;white-space:nowrap}
.bc-footer-bar-socials{display:flex;gap:2px;align-items:center}
.bc-footer-bar-socials a{color:#ffffffa6;text-decoration:none;display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;transition:color .15s}
.bc-footer-bar-socials a:hover{color:#fff}
.bc-footer-bar-sep{width:1px;height:20px;background:#374151;flex-shrink:0}
.bc-footer-bar-ai{display:flex;gap:2px;align-items:center}
.bc-footer-bar-ai a,.bc-footer-bar-ai button{color:#ffffffa6;text-decoration:none;display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;transition:color .15s;background:none;border:none;cursor:pointer;padding:0}
.bc-footer-bar-ai a:hover,.bc-footer-bar-ai button:hover{color:#fff}
.bc-footer-bar-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.bc-footer-bar-ctas{display:flex;gap:10px;order:-1;width:100%;flex-wrap:nowrap}
.bc-footer-divider{margin:0 0 20px;border:none;border-top:1px solid #2a2a2a}
.bc-footer-bottom-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.bc-footer-bottom-row-address{font-size:14px;color:#ffffffa6}
.bc-footer-bottom-row-address a{color:#ffffffa6;text-decoration:none;transition:color .15s}
.bc-footer-bottom-row-address a:hover{color:#fff}
.bc-footer-bottom-row-sep{color:#374151}
.bc-footer-bottom-row-sep--wide{display:none}
.bc-footer-bottom-row-links{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:nowrap;width:100%}
.bc-footer-bottom-row-links a{font-size:12px;color:#ffffffa6;text-decoration:none;white-space:nowrap;transition:color .15s}
.bc-footer-bottom-row-links a:hover{color:#fff}
.bc-footer-legal{font-size:14px;color:#ffffffa6;line-height:1.65}
.bc-footer-legal p{margin-bottom:12px}
.bc-footer-legal a{color:#7d8ff7;text-decoration:underline}
.bc-footer-topics-pills .bc-topic-sub{text-transform:none;letter-spacing:normal;font-size:16px;font-weight:400}
.bc-footer-heart { animation: bc-heartbeat 2.4s ease-in-out infinite; transform-origin: center; width: 14px; height: 14px; }
.bc-footer-copy-sep{display:none}
@media (min-width:768px){.bc-footer-copy-sep{display:inline}}
@media (min-width:640px){
.bc-footer-bottom-row-links{justify-content:flex-start;gap:16px;flex-wrap:wrap;width:auto}
.bc-footer-bottom-row-links a{font-size:14px}
}
@media (min-width:768px){
.bc-footer-grid{grid-template-columns:repeat(4,1fr);column-gap:48px;margin-bottom:80px}
.bc-footer-btn{flex:none;min-width:180px;gap:12px;padding:10px 16px}
.bc-footer-bar-ctas{order:0;width:auto}
.bc-footer-bottom-row-sep--wide{display:inline}
}
@media (min-width:1024px){
.bc-footer-grid{max-width:1054px}
.bc-footer-bar-ctas{margin-left:auto}
}
.text-red-500 { color: oklch(63.7% .237 25.331); }
@keyframes bc-heartbeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.25); }
    28% { transform: scale(1); }
    42% { transform: scale(1.18); }
    56% { transform: scale(1); }
}
</style>
<footer class="bc-footer">
<div class="bc-footer-inner">
    <div class="bc-footer-grid">
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Features</div>
            <ul>
                <li><a href="https://www.beycome.com/flat-fee-mls/">Sell my home</a></li>
                <li><a href="https://www.beycome.com/i-want-to-buy-a-home/">Buy a home</a></li>
                <li><a href="https://www.beycometitle.com/" target="_blank" rel="noopener noreferrer">Title</a></li>
                <li><a href="https://www.beycome.com/military-fsbo/">Military</a></li>
                <li><a href="https://www.beycome.com/closed-homes/">Closed homes</a></li>
            </ul>
        </div>
		<div class="bc-footer-col">
            <div class="bc-footer-col-title">Company</div>
            <ul>
                <li><a href="https://www.beycome.com/about-us/">About us</a></li>
                <li><a href="https://www.beycome.com/reviews/">Reviews</a></li>
                <li><a href="https://www.beycome.com/press/">Press</a></li>
                <li><a href="https://www.beycome.com/technology/">Technology</a></li>
                <li><a href="https://investor.beycome.com/" target="_blank" rel="noopener noreferrer">Investors</a></li>
            </ul>
        </div>
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Resources</div>
            <ul>
                <li><a href="<?php echo esc_url(home_url('/')); ?>">Blog</a></li>
                <li><a href="https://www.beycome.com/faq/">FAQ</a></li>
                <li><a href="https://www.beycome.com/how-it-works/">How it works</a></li>
                <li><a href="https://www.beycome.com/real-estate-glossary/">Real estate glossary</a></li>
            </ul>
        </div>
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Tools</div>
            <ul>
                <li><a href="https://www.beycome.com/how-much-is-my-home-worth/">Property price estimator</a></li>
                <li><a href="https://www.beycome.com/market-trends/">Market trends</a></li>
                <li><a href="https://www.beycome.com/calculators/">Real estate calculators</a></li>
            </ul>
        </div>
    </div>


    <div class="bc-footer-states">
        <div class="bc-footer-col-title">Flat fee MLS by state</div>
        <div class="bc-footer-states-links">
            <a href="https://www.beycome.com/flat-fee-mls/alabama">Alabama</a>
            <a href="https://www.beycome.com/flat-fee-mls/california">California</a>
            <a href="https://www.beycome.com/flat-fee-mls/connecticut">Connecticut</a>
            <a href="https://www.beycome.com/flat-fee-mls/washington-dc">Washington DC</a>
            <a href="https://www.beycome.com/flat-fee-mls/florida">Florida</a>
            <a href="https://www.beycome.com/flat-fee-mls/georgia">Georgia</a>
            <a href="https://www.beycome.com/flat-fee-mls/illinois">Illinois</a>
            <a href="https://www.beycome.com/flat-fee-mls/indiana">Indiana</a>
            <a href="https://www.beycome.com/flat-fee-mls/maryland">Maryland</a>
            <a href="https://www.beycome.com/flat-fee-mls/michigan">Michigan</a>
            <a href="https://www.beycome.com/flat-fee-mls/minnesota">Minnesota</a>
            <a href="https://www.beycome.com/flat-fee-mls/new-jersey">New Jersey</a>
            <a href="https://www.beycome.com/flat-fee-mls/new-york">New York</a>
            <a href="https://www.beycome.com/flat-fee-mls/north-carolina">North Carolina</a>
            <a href="https://www.beycome.com/flat-fee-mls/ohio">Ohio</a>
            <a href="https://www.beycome.com/flat-fee-mls/pennsylvania">Pennsylvania</a>
            <a href="https://www.beycome.com/flat-fee-mls/south-carolina">South Carolina</a>
            <a href="https://www.beycome.com/flat-fee-mls/tennessee">Tennessee</a>
            <a href="https://www.beycome.com/flat-fee-mls/texas">Texas</a>
            <a href="https://www.beycome.com/flat-fee-mls/virginia">Virginia</a>
        </div>
    </div>

    <div class="bc-footer-bar">
        <span class="bc-footer-bar-learn">Learn more</span>
        <div class="bc-footer-bar-socials">
            <a href="https://www.facebook.com/beycomeUSA/" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on Facebook">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true"><title>Facebook</title><path d="M10.51,6.68v-1.56c0-.81.06-1.25,1.19-1.25h2.09V.75h-3c-2.91,0-3.58,1.55-3.58,4.09v1.84h-2.21v3.12h2.21v9.05h3.29v-9.05h2.99l.32-3.12h-3.3Z" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Beycome on Facebook</span>
            </a>
            <a href="https://x.com/beycome" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on X">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true"><title>X</title><path d="M11.49,8.4L18.14.68h-1.57l-5.77,6.71L6.18.68H.87l6.97,10.14L.87,18.92h1.58l6.09-7.08,4.87,7.08h5.32l-7.23-10.52h0ZM9.34,10.91l-.71-1.01L3.01,1.86h2.42l4.53,6.49.71,1.01,5.89,8.43h-2.42l-4.81-6.88h0Z" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Beycome on X</span>
            </a>
            <a href="https://www.instagram.com/beycome/" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on Instagram">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true"><title>Instagram</title><path d="M13.1115 0.753906H5.00447C3.68082 0.755758 2.4119 1.2824 1.47594 2.21837C0.539968 3.15434 0.0133264 4.42325 0.0114746 5.74691L0.0114746 13.8539C0.0133264 15.1776 0.539968 16.4465 1.47594 17.3824C2.4119 18.3184 3.68082 18.8451 5.00447 18.8469H13.1115C14.4353 18.8453 15.7045 18.3188 16.6407 17.3828C17.5768 16.4468 18.1036 15.1777 18.1055 13.8539V5.74691C18.1036 4.42308 17.5768 3.15401 16.6407 2.21801C15.7045 1.28202 14.4353 0.755494 13.1115 0.753906ZM16.4995 13.8539C16.4984 14.7521 16.1411 15.6133 15.506 16.2484C14.8708 16.8836 14.0097 17.2408 13.1115 17.2419H5.00447C4.10625 17.2408 3.24511 16.8836 2.60997 16.2484C1.97482 15.6133 1.61753 14.7521 1.61647 13.8539V5.74691C1.61753 4.84868 1.97482 3.98754 2.60997 3.3524C3.24511 2.71725 4.10625 2.35996 5.00447 2.35891H13.1115C14.0097 2.35996 14.8708 2.71725 15.506 3.3524C16.1411 3.98754 16.4984 4.84868 16.4995 5.74691V13.8539Z" fill="currentColor"/><path d="M9.05845 5.14258C8.13719 5.14258 7.23661 5.41577 6.47061 5.92759C5.7046 6.43942 5.10758 7.1669 4.75502 8.01804C4.40247 8.86917 4.31023 9.80575 4.48996 10.7093C4.66969 11.6129 5.11332 12.4428 5.76475 13.0943C6.41618 13.7457 7.24616 14.1893 8.14972 14.3691C9.05329 14.5488 9.98985 14.4566 10.841 14.104C11.6921 13.7515 12.4196 13.1544 12.9314 12.3884C13.4433 11.6224 13.7165 10.7218 13.7165 9.80058C13.7151 8.5656 13.224 7.38159 12.3507 6.50834C11.4774 5.63508 10.2934 5.1439 9.05845 5.14258ZM9.05845 12.8546C8.45443 12.8546 7.86397 12.6755 7.36174 12.3399C6.85951 12.0043 6.46807 11.5273 6.23692 10.9693C6.00577 10.4112 5.94529 9.79719 6.06313 9.20477C6.18097 8.61235 6.47184 8.06818 6.89895 7.64107C7.32606 7.21396 7.87023 6.9231 8.46265 6.80526C9.05506 6.68742 9.66912 6.7479 10.2272 6.97905C10.7852 7.2102 11.2622 7.60164 11.5978 8.10387C11.9333 8.60609 12.1125 9.19655 12.1125 9.80058C12.1114 10.6102 11.7893 11.3864 11.2168 11.9589C10.6443 12.5314 9.8681 12.8535 9.05845 12.8546Z" fill="currentColor"/><circle cx="13.9165" cy="4.98" r="1.2" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Beycome on Instagram</span>
            </a>
            <a href="https://linkedin.com/company/beycome" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on LinkedIn">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true"><title>LinkedIn</title><path d="M4.61,18.92V7.36H.77v11.56h3.84ZM2.69,5.79c.57,0,1.11-.23,1.51-.64.4-.4.62-.95.62-1.52s-.23-1.11-.63-1.52c-.4-.4-.95-.63-1.52-.63s-1.11.23-1.52.63c-.4.4-.63.95-.63,1.52,0,.57.22,1.12.62,1.52.4.4.95.63,1.51.64h.02ZM6.74,18.92h3.84v-6.46c-.01-.32.03-.63.13-.94.14-.41.41-.76.76-1.01.35-.25.77-.39,1.21-.39,1.39,0,1.95,1.06,1.95,2.61v6.18h3.84v-6.63c0-3.55-1.9-5.2-4.42-5.2-.7-.03-1.4.14-2.02.48-.62.34-1.12.85-1.47,1.46h.03v-1.68h-3.84c.05,1.08,0,11.56,0,11.56Z" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Beycome on LinkedIn</span>
            </a>
            <a href="https://www.zillow.com/profile/gobeycome/" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on Zillow">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true"><title>Zillow</title><path d="M12.15,5.86c.08-.02.11,0,.16.06.26.32,1.09,1.41,1.32,1.71,0,.01.01.02.02.04,0,.01,0,.03,0,.04,0,.01,0,.03-.01.04,0,.01-.02.02-.03.03-1.7,1.45-3.24,3.08-4.6,4.86-.02.03,0,.03.01.03,2.59-1.08,5.27-1.94,8.01-2.57v-2.64L9.51,1.04,1.97,7.47v2.88c3.22-1.86,6.63-3.37,10.18-4.48h0ZM5.87,16.89s.05.04.08.05c.03,0,.06,0,.09-.02,3.51-1.71,7.2-3.02,11-3.91v5.91H1.97v-6.14c2.32-1.29,4.73-2.43,7.2-3.41.03-.01.04,0,.01.03-1.8,1.63-3.39,3.49-4.71,5.53-.05.08-.05.11,0,.16l1.4,1.81Z" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Beycome on Zillow</span>
            </a>
        </div>

        <div class="bc-footer-bar-sep"></div>

        <div class="bc-footer-bar-ai">
            <a href="https://chat.openai.com/?q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask ChatGPT about Beycome">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><title>ChatGPT</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Ask ChatGPT about Beycome</span>
            </a>
            <a href="https://claude.ai/new?q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Claude about Beycome">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><title>Claude</title><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.49-.364-.461-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.146-.103.018-.073-.164-.273-1.355-2.45-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 0 1-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.42 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.243.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.413.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.087-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.005.006Z" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Ask Claude about Beycome</span>
            </a>
            <a href="https://www.google.com/search?udm=50&aep=11&q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Gemini about Beycome">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><title>Gemini</title><path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12" fill="currentColor"/></svg>
                <span class="bc-footer-bar-sr">Ask Gemini about Beycome</span>
            </a>
            <a href="https://x.com/i/grok?text=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Grok about Beycome">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd" aria-hidden="true"><title>Grok</title><path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"/></svg>
                <span class="bc-footer-bar-sr">Ask Grok about Beycome</span>
            </a>
            <a href="https://www.perplexity.ai/?q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Perplexity about Beycome">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd" aria-hidden="true"><title>Perplexity</title><path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z"/></svg>
                <span class="bc-footer-bar-sr">Ask Perplexity about Beycome</span>
            </a>
        </div>

        <div class="bc-footer-bar-ctas">
            <a href="https://beycome.zohobookings.com/#/customer/beycome" target="_blank" rel="noopener noreferrer" class="bc-footer-btn">
                <span class="bc-footer-btn-icon"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2zm13 8H4v10h16V10z" fill="currentColor"/></svg></span>
                <span class="bc-footer-btn-text">
                    <span class="bc-footer-btn-name">Schedule a call</span>
                </span>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=18046565007" target="_blank" rel="noopener noreferrer" class="bc-footer-btn">
                <span class="bc-footer-btn-icon"><svg viewBox="0 0 17 17" width="22" height="22" aria-hidden="true"><path d="M16.5333 8.7668C16.5333 13.0668 13.02 16.5535 8.67999 16.5535C7.29999 16.5535 6.01333 16.2001 4.87999 15.5868L0.533325 16.9668L1.95333 12.7868C1.21185 11.5746 0.81965 10.1811 0.819992 8.76013C0.826659 4.45346 4.34666 0.966797 8.68666 0.966797C13.0133 0.966797 16.5333 4.45346 16.5333 8.7668ZM8.67999 2.20013C5.03999 2.20013 2.07999 5.14013 2.07999 8.75346C2.07999 10.1868 2.54666 11.5135 3.33333 12.5935L2.50666 15.0335L5.03999 14.2335C6.12135 14.9422 7.38707 15.3178 8.67999 15.3135C12.32 15.3135 15.28 12.3801 15.28 8.76013C15.2712 7.01671 14.5715 5.3479 13.3343 4.11948C12.0972 2.89106 10.4234 2.20325 8.67999 2.2068V2.20013ZM12.6467 10.5535C12.5933 10.4735 12.4667 10.4268 12.2733 10.3335C12.0867 10.2401 11.14 9.77346 10.96 9.71346C10.7867 9.6468 10.6533 9.61346 10.5267 9.8068C10.3933 10.0001 10.0267 10.4268 9.91999 10.5535C9.80666 10.6868 9.69333 10.7001 9.49999 10.6068C9.30666 10.5068 8.68666 10.3068 7.95333 9.65346C7.53454 9.26854 7.17509 8.82372 6.88666 8.33346C6.76666 8.14013 6.86666 8.04013 6.96666 7.9468C7.05333 7.86013 7.15999 7.72013 7.25333 7.61346C7.35333 7.50013 7.38666 7.41346 7.44666 7.29346C7.51333 7.16013 7.47999 7.05346 7.43333 6.96013C7.37999 6.86013 6.99999 5.92013 6.83333 5.54013C6.67333 5.15346 6.51333 5.22013 6.40666 5.22013C6.29333 5.22013 6.15999 5.20013 6.03333 5.20013C5.89999 5.20013 5.69999 5.25346 5.51999 5.44013C5.34666 5.63346 4.85333 6.09346 4.85333 7.04013C4.85333 7.97346 5.53999 8.88013 5.63333 9.01346C5.72666 9.14013 6.96666 11.1268 8.91999 11.8935C10.88 12.6601 10.88 12.4068 11.2333 12.3735C11.5867 12.3401 12.3667 11.9068 12.5333 11.4668C12.6933 11.0201 12.6933 10.6335 12.6467 10.5535Z" fill="currentColor"/></svg></span>
                <span class="bc-footer-btn-text">
                    <span class="bc-footer-btn-name">WhatsApp</span>
                </span>
            </a>
        </div>
    </div>

    <hr class="bc-footer-divider">

    <div class="bc-footer-bottom-row">
        <span class="bc-footer-bottom-row-address">Beycome Corp., 7900 SW 57th Ave. Unit 23, South Miami, FL 33143</span>
        <span class="bc-footer-bottom-row-sep bc-footer-bottom-row-sep--wide">|</span>
        <div class="bc-footer-bottom-row-links">
            <a href="https://www.beycome.com/terms-and-conditions/">Terms &amp; conditions</a>
            <a href="https://www.beycome.com/privacy-policy/">Privacy policy</a>
            <a href="https://www.beycome.com/dmca/">DMCA</a>
            <a href="https://www.beycome.com/accessibility/">Accessibility</a>
        </div>
    </div>

    <div class="bc-footer-legal">
        <p><strong>Agreement to terms and privacy policy:</strong> By using beycome.com, you agree to our <a href="https://www.beycome.com/terms-and-conditions/">Terms and conditions</a> and our <a href="https://www.beycome.com/privacy-policy/">Privacy policy</a>.</p>
        <p><strong>Technology platform — not a brokerage:</strong> Beycome Corp. is a software technology company and does not provide real estate brokerage, mortgage lending, or title insurance services. Beycome Corp. is not a licensed real estate broker, mortgage lender, or title insurer, and nothing on this platform constitutes real estate, legal, financial, or investment advice. The beycome.com platform connects consumers with independently operated licensed entities and third-party service providers. Beycome Corp. expressly disclaims any liability arising from real estate transactions, brokerage activities, loan origination, or title services conducted by any affiliated or third-party company.</p>
        <p><strong>Affiliated licensed entities (separate legal entities):</strong> Beycome Corp.&rsquo;s affiliated companies share common ownership but are separate legal entities. Each operates under its own licensed management, as required by applicable law, and is solely responsible for its licensed activities. Real estate brokerage services are provided by Beycome of Florida LLC in FL; Beycome Brokerage Realty Inc. in CA (CalDRE #02247733); Beycome of Connecticut in CT; and Beycome Brokerage Realty LLC in AL, DC, GA, IL, IN, MD, MI, MN, NC, NJ, NY, OH, PA, SC, TN, TX, and VA. Mortgage loan origination services in Florida are provided by Beycome Mortgage LLC. Title insurance services are provided by Beycome Title of Florida LLC in Florida and Beycome Title of Texas LLC in Texas. TREC: <a href="https://www.beycome.com/legal/IABS-12.pdf" rel="noreferrer noopener" target="_blank">Information About Brokerage Services</a> | <a href="https://www.trec.texas.gov/forms/consumer-protection-notice" rel="noreferrer noopener" target="_blank">Consumer Protection Notice</a>.</p>
        <p><strong>Legal disclaimer:</strong> Information is current as of May 14, 2024. Beycome Corp. may modify or discontinue products and benefits without notice. No guarantee, warranty, or representation of any kind is made regarding the completeness or accuracy of descriptions or measurements (including square footage and property condition); such should be independently verified, and Beycome Corp. expressly disclaims any liability in connection therewith.</p>
        <p><strong>Trademark notice:</strong> Logos and trademarks on this website are used to illustrate industry partnerships and do not imply endorsement unless explicitly stated. All trademarks belong to their respective owners.</p>
        <p>IDX&copy; information is provided exclusively for consumers' personal, non-commercial use. It may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Information deemed reliable but not guaranteed to be accurate. Listings information is updated daily. Broker Compensation is fully negotiable and is not fixed, controlled, recommended, or suggested by any MLS or association of REALTORS&reg;. Beycome fully supports the <a href="https://www.hud.gov" rel="noreferrer noopener" target="_blank">Equal Housing Opportunity</a> laws.</p>
		<p>All rights reserved, Copyright ©<?php echo date('Y') ?> beycome&trade; <span class="bc-footer-copy-sep">·</span> Made with <svg class="bc-footer-heart h-3.5 w-3.5 flex-none text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="none"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"></path></svg> 
            in the USA for the people. 
		</p>
    </div>
</div>
</footer>

<?php /* Header-search + mobile-menu JS is enqueued via assets/blog.js
       in functions.php. We used to also include it as an inline <script>
       here, which caused WP Fastest Cache to attach two copies of every
       click listener — every other click toggled state back to nothing.
       Single source now. */ ?>
<?php wp_footer(); ?>
</body>
</html>
